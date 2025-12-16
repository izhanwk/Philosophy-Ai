import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";
import { readAccessToken } from "@/lib/authCookies";

export async function middleware(req: NextRequest) {
  const tokenFromCookie = readAccessToken(req);
  const token = tokenFromCookie;

  const jwtSecret = process.env.JWT_SECRET;
  if (token && token !== "undefined" && token !== "null" && jwtSecret) {
    try {
      jwt.verify(token, jwtSecret) as JwtPayload;
      return NextResponse.next();
    } catch {
      // fall through to next-auth session check
    }
  }

  const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  if (nextAuthSecret) {
    const session = await getToken({ req, secret: nextAuthSecret });
    if (session) {
      return NextResponse.next();
    }
  }

  return NextResponse.json({ message: "Token failed" }, { status: 403 });
}

export const config = {
  matcher: ["/api/token"],
  runtime: "nodejs",
};
