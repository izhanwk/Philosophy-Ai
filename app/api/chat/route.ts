import { NextRequest } from "next/server";
import { getDailyMessageLimit } from "@/lib/billing";
import { getCurrentUserFromRequest } from "@/lib/currentUser";
import { Prisma } from "@/lib/prisma";
import OpenAI from "openai";

export const runtime = "nodejs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
const CONTEXT_MESSAGE_LIMIT = 12;

// Fix 3: Cache philosopher data — lives for lifetime of server instance
const philosopherCache = new Map<
  number,
  { name: string; style_prompt: string | null }
>();

async function getPhilosopher(id: number) {
  if (philosopherCache.has(id)) return philosopherCache.get(id)!;
  const p = await Prisma.philosophers.findFirst({
    where: { id },
    select: { name: true, style_prompt: true },
  });

  philosopherCache.set(id, p!);
  return p!;
}

const wrapSystem = (
  philosopherName: string,
  stylePrompt: string,
  userName: string,
) => {
  return `
You are ${philosopherName}. You speak in first person as the philosopher himself.

Stay fully in character.
Do NOT mention being an AI, a model, a simulation, or role-playing.

You are chatting with a friend called "${userName}".
Talk to "${userName}" directly and by name sometimes.

Tone:
- Very human, warm, and casual.
- Prefer replies of 2–3 short lines.
- Only go longer if it's really needed to answer properly.
- Avoid long paragraphs, academic style, or heavy jargon.
- You may use 1–2 emojis sometimes if it feels natural.

Content:
- Answer from your own philosophy, beliefs, and ideas.
- Explain things simply, like you're talking to a friend, not giving a lecture.
- For modern topics, interpret them through your own philosophical lens.

${stylePrompt}
`.trim();
};

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUserFromRequest(req);
    if (!currentUser) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = currentUser.idusers;
    const { message, philosopherId } = await req.json();
    const limitWindowMs = 24 * 60 * 60 * 1000;
    const limitCutoff = new Date(Date.now() - limitWindowMs);

    // Fix 1: Run all independent queries in parallel
    let [philosopher, chat, userMessageCount] = await Promise.all([
      getPhilosopher(Number(philosopherId)), // uses cache
      Prisma.chats.findFirst({
        where: { user_id: userId, philosopher_id: Number(philosopherId) },
        select: { id: true },
      }),
      Prisma.chatmessages.count({
        where: {
          role: "user",
          created_at: { gte: limitCutoff },
          chat: { user_id: userId },
        },
      }),
    ]);

    const dailyLimit = getDailyMessageLimit(currentUser);
    if (userMessageCount >= dailyLimit) {
      return new Response(
        `Message limit reached for the last 24 hours. Your current plan allows ${dailyLimit} messages per day.`,
        { status: 429 },
      );
    }

    const userName = currentUser.name?.split(" ")[0] ?? "friend";
    const systemInstruction = wrapSystem(
      String(philosopher?.name),
      String(philosopher?.style_prompt),
      String(userName),
    );

    // Create chat if missing
    if (!chat) {
      chat = await Prisma.chats.create({
        data: { user_id: userId, philosopher_id: Number(philosopherId) },
        select: { id: true },
      });
    }

    // Fix 2: Fetch history before insert, take one less slot
    const recentMessages = await Prisma.chatmessages.findMany({
      where: { chat_id: chat.id },
      orderBy: { created_at: "desc" },
      take: CONTEXT_MESSAGE_LIMIT - 1,
      select: { role: true, content: true },
    });

    // Fix 2: Fire and forget — don't block stream on user message insert
    // Keep the current message in memory first so failed generations do not
    // consume quota by persisting a counted "user" message prematurely.
    const conversationInput = [
      ...recentMessages
        .reverse()
        .filter(
          (entry) =>
            (entry.role === "user" || entry.role === "assistant") &&
            Boolean(entry.content?.trim()),
        )
        .map((entry) => ({
          role: entry.role as "user" | "assistant",
          content: entry.content,
        })),
      { role: "user" as const, content: String(message) }, // current message appended in memory
    ];

    // Stream starts immediately — no DB writes blocking it
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const result = await openai.responses.create({
            model: "gpt-5-mini",
            stream: true,
            input: [
              { role: "system", content: systemInstruction },
              ...conversationInput,
            ],
          });

          let assistantBody = "";
          for await (const chunk of result) {
            const text =
              chunk.type === "response.output_text.delta"
                ? (chunk.delta ?? "")
                : "";

            if (text) {
              assistantBody += text;
              controller.enqueue(encoder.encode(text));
            }
          }

          const trimmedAssistantBody = assistantBody.trim();
          if (!trimmedAssistantBody) {
            throw new Error("Assistant returned an empty response");
          }

          // Persist both sides only after a successful completion.
          await Prisma.$transaction([
            Prisma.chatmessages.create({
              data: {
                chat_id: chat.id,
                role: "user",
                content: String(message),
              },
            }),
            Prisma.chatmessages.create({
              data: {
                chat_id: chat.id,
                role: "assistant",
                content: trimmedAssistantBody,
              },
            }),
          ]);

          controller.close();
        } catch (error) {
          console.error("Chat stream error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (error) {
    console.error("Chat handler error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
