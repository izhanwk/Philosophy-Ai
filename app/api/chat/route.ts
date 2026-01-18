import { readAccessToken } from "@/lib/authCookies";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Prisma } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const wrapSystem = (
  philosopherName: string,
  stylePrompt: string,
  userName: string
) => {
  return `
You are ${philosopherName}. You speak in first person as the philosopher himself.

Stay fully in character.
Do not mention being an AI, roleplay, or simulation.

Always address the person as "${userName}" when replying.

Keep replies short, casual, and human.
No long explanations. No formal tone.

If modern topics are asked, interpret them through your philosophy.

${stylePrompt}
`.trim();
};

export async function POST(req: NextRequest) {
  let userIdStr = req.headers.get("x-user-id");

  if (!userIdStr) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(userIdStr);
  const { message, philosopherId } = await req.json();

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
    String(userName)
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

  // 3) Store user message (now chat.id is guaranteed)
  await Prisma.chatmessages.create({
    data: {
      chat_id: chat.id,
      role: "user",
      content: String(message),
    },
    select: { id: true },
  });

  // (optional) you can also store assistant message later after generating it

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      const result = await ai.models.generateContentStream({
        model: "gemini-2.5-flash-lite-preview-09-2025",
        contents: [{ role: "user", parts: [{ text: message }] }],
        config: {
          systemInstruction,
          temperature: 0.9,
        },
      });

      let assistantBody = "";
      for await (const chunk of result) {
        const text =
          typeof (chunk as any).text === "function"
            ? (chunk as any).text()
            : (chunk as any).text;

        if (text) {
          assistantBody += text;
          controller.enqueue(encoder.encode(text));
        }
      }

      await Prisma.chatmessages.create({
        data: {
          chat_id: chat.id,
          role: "assistant",
          content: assistantBody,
        },
        select: { id: true },
      });
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
