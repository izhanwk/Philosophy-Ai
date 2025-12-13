import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;
  const cookieToken = req.cookies.get("token")?.value;
  const token = bearerToken || cookieToken;

  if (!token || token === "undefined" || token === "null") {
    return NextResponse.json({ message: "Token failed" }, { status: 403 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "Token failed" }, { status: 403 });
  }

  try {
    jwt.verify(token, secret) as JwtPayload;
    return NextResponse.next();
  } catch {
    // fall through to next-auth session check
  }

  const nextAuthSecret = process.env.NEXTAUTH_SECRET;
  if (!nextAuthSecret) {
    return NextResponse.json({ message: "Token failed" }, { status: 403 });
  }

  const session = await getToken({ req, secret: nextAuthSecret });
  if (session) {
    return NextResponse.next();
  }

  return NextResponse.json({ message: "Token failed" }, { status: 403 });
}

export const config = {
  matcher: ["/api/token"],
  runtime: "nodejs",
};
