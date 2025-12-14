import { NextResponse, NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.slice(7).trim();

  if (!token || token === "undefined" || token === "null") {
    console.log("err 1");
    return NextResponse.json({ message: "Token failed" }, { status: 403 });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("err 2");
    return NextResponse.json({ message: "Token failed" }, { status: 403 });
  }

  try {
    console.log("my token : ", token);
    jwt.verify(token, secret) as JwtPayload;
    return NextResponse.next();
  } catch (err) {
    console.log("err 3", err);
    console.log(
      `here was the token ${token} and this was our secret ${secret}`
    );
    // fall through to next-auth session check
  }

  const nextAuthSecret = process.env.NEXTAUTH_SECRET;
  if (!nextAuthSecret) {
    console.log("err 4");
    return NextResponse.json({ message: "Token failed" }, { status: 403 });
  }

  const session = await getToken({ req, secret: nextAuthSecret });
  if (session) {
    return NextResponse.next();
  }
  console.log("err 5");
  return NextResponse.json({ message: "Token failed" }, { status: 403 });
}

export const config = {
  matcher: ["/api/token"],
  runtime: "nodejs",
};
