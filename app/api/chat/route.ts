import { NextRequest } from "next/server";
import { Prisma } from "@/lib/prisma";
import OpenAI from "openai";

export const runtime = "nodejs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

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
- Only go longer if it’s really needed to answer properly.
- Avoid long paragraphs, academic style, or heavy jargon.
- You may use 1–2 emojis sometimes if it feels natural.

Content:
- Answer from your own philosophy, beliefs, and ideas.
- Explain things simply, like you’re talking to a friend, not giving a lecture.
- For modern topics, interpret them through your own philosophical lens.

${stylePrompt}
`.trim();
};

export async function POST(req: NextRequest) {
  try {
    let userIdStr = req.headers.get("x-user-id");

    if (!userIdStr) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(userIdStr);
    const { message, philosopherId } = await req.json();
    const limitWindowMs = 24 * 60 * 60 * 1000;
    const limitCutoff = new Date(Date.now() - limitWindowMs);
    const userMessageCount = await Prisma.chatmessages.count({
      where: {
        role: "user",
        created_at: { gte: limitCutoff },
        chat: { user_id: userId },
      },
    });

    //

    if (userMessageCount >= 50) {
      return new Response("Message limit reached for the last 24 hours.", {
        status: 429,
      });
    }

    let philosopher = await Prisma.philosophers.findFirst({
      where: {
        id: Number(philosopherId),
      },
      select: { name: true, style_prompt: true },
    });

    const user = await Prisma.users.findFirst({
      where: { idusers: userId },
      select: { name: true },
    });

    const userName = user?.name?.split(" ")[0] ?? "friend";

    const systemInstruction = wrapSystem(
      String(philosopher?.name),
      String(philosopher?.style_prompt),
      String(userName),
    );

    // 1) Find chat
    let chat = await Prisma.chats.findFirst({
      where: {
        user_id: userId,
        philosopher_id: Number(philosopherId),
      },
      select: { id: true },
    });

    // 2) Create chat if missing
    if (!chat) {
      chat = await Prisma.chats.create({
        data: {
          user_id: userId,
          philosopher_id: Number(philosopherId),
        },
        select: { id: true },
      });
    }

    // (optional) you can also store assistant message later after generating it

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          const result = await openai.responses.create({
            model: "gpt-5-mini",
            stream: true,
            input: [
              { role: "system", content: systemInstruction },
              { role: "user", content: String(message) },
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

          // 3) Store user message (now chat.id is guaranteed)
          await Prisma.chatmessages.create({
            data: {
              chat_id: chat.id,
              role: "user",
              content: String(message),
            },
            select: { id: true },
          });

          await Prisma.chatmessages.create({
            data: {
              chat_id: chat.id,
              role: "assistant",
              content: assistantBody,
            },
            select: { id: true },
          });

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
