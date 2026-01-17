import { readAccessToken } from "@/lib/authCookies";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const token = readAccessToken(req);
  const secret = process.env.JWT_SECRET;
  let userId: string | number | null = null;

  if (token && secret) {
    try {
      const payload = jwt.verify(token, secret) as jwt.JwtPayload | string;
      if (typeof payload === "object" && payload !== null) {
        userId = (payload as jwt.JwtPayload).userId ?? null;
      }
    } catch (error) {
      console.warn("Invalid access token:", error);
    }
  }

  const { message } = await req.json();
  console.log({ token, userId, message });
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const fake = `You said: ${message}\n\nAI: `;
      controller.enqueue(encoder.encode(fake));

      const tokens = ["This ", "is ", "a ", "streamed ", "response ", "?."];
      for (const t of tokens) {
        await new Promise((r) => setTimeout(r, 150));
        controller.enqueue(encoder.encode(t));
      }
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
