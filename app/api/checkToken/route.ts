import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { readAccessToken } from "@/lib/authCookies";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;
  const token = bearerToken || readAccessToken(req);

  const jwtSecret = process.env.JWT_SECRET;
  if (token && jwtSecret) {
    try {
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      if (decoded?.email) {
        return NextResponse.json(
          { message: decoded.email },
          { status: 200 }
        );
      }
    } catch {
      // fall back to NextAuth token check below
    }
  }

  const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (nextAuthSecret) {
    const session = await getToken({ req, secret: nextAuthSecret });
    if (session?.email) {
      return NextResponse.json({ message: session.email }, { status: 200 });
    }
  }

  return NextResponse.json({ message: "Token missing" }, { status: 401 });
}
