import { readAccessToken } from "@/lib/authCookies";
import { Prisma } from "@/lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = readAccessToken(req);
  const secret = process.env.JWT_SECRET;
  let userIdStr = req.headers.get("x-user-id");

  if (!userIdStr && token && secret) {
    try {
      const payload = jwt.verify(token, secret) as JwtPayload;
      if (payload?.userId !== undefined && payload?.userId !== null) {
        userIdStr = String(payload.userId);
      }
    } catch {
      userIdStr = null;
    }
  }

  if (!userIdStr) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { philosopherId } = await req.json();

  if (!philosopherId) {
    return NextResponse.json(
      { message: "Missing philosopherId" },
      { status: 400 }
    );
  }

  const userId = Number(userIdStr);
  const philosopherIdNumber = Number(philosopherId);

  const chat = await Prisma.chats.findFirst({
    where: {
      user_id: userId,
      philosopher_id: philosopherIdNumber,
    },
    include: {
      messages: {
        orderBy: { created_at: "asc" },
      },
    },
  });

  if (chat?.messages?.length) {
    const assistantMessages = chat.messages.filter(
      (message) => message.role === "assistant"
    );
    console.log("assistant responses:", assistantMessages);
  } else {
    console.log("assistant responses: none");
  }
  return NextResponse.json({ chat }, { status: 200 });
}
