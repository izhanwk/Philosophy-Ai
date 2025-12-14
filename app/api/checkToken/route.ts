import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { readAccessToken } from "@/lib/authCookies";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const bearerToken =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : null;
  const token = bearerToken || readAccessToken(req);
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.json({ message: "Token missing" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return NextResponse.json({ message: decoded.email }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 404 });
  }
}
