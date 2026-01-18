import { readAccessToken } from "@/lib/authCookies";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";
import { Prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // const token = readAccessToken(req);
  // const secret = process.env.JWT_SECRET;

  let userIdStr = req.headers.get("x-user-id");

  // if (!userIdStr && token && secret) {
  //   try {
  //     const payload = jwt.verify(token, secret) as JwtPayload;
  //     if (payload?.userId !== undefined && payload?.userId !== null) {
  //       userIdStr = String(payload.userId);
  //     }
  //   } catch {
  //     userIdStr = null;
  //   }
  // }

  if (!userIdStr) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(userIdStr);
  const { message, philosopherId } = await req.json();

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
      const prefix = `You said: ${message}\n\nAI: `;
      controller.enqueue(encoder.encode(prefix));

      const tokens = ["This ", "is ", "a ", "streamed ", "response ", "?."];
      let assistantText = `You said: ${message}\n\nAI: `;

      for (const t of tokens) {
        await new Promise((r) => setTimeout(r, 150));
        assistantText += t;
        controller.enqueue(encoder.encode(t));
      }
      await Prisma.chatmessages.create({
        data: {
          chat_id: chat.id,
          role: "assistant",
          content: assistantText,
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
