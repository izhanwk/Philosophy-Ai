import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { Prisma } from "@/lib/prisma";
import { setAuthCookies } from "@/lib/authCookies";

export const runtime = "nodejs";

function redirectTo(req: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, req.url));
}

export async function GET(req: NextRequest) {
  console.log("start");
  const nextAuthSecret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  const accessSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_JWT_SECRET;

  if (!nextAuthSecret || !accessSecret || !refreshSecret) {
    console.log("Missing auth secrets for Google login bridge");
    return redirectTo(req, "/login?error=auth_config");
  }

  console.log("our secret : ", nextAuthSecret);
  const session = await getToken({ req, secret: nextAuthSecret });
  const sessionEmail =
    typeof session?.email === "string" ? session.email : null;
  const sessionSub = typeof session?.sub === "string" ? session.email : null;
  console.log("session email is : ", sessionEmail);
  if (!sessionEmail && !sessionSub) {
    console.log("no session");
    return redirectTo(req, "/login?error=missing_session");
  }

  const user = sessionEmail
    ? await Prisma.users.findUnique({
        where: { email: sessionEmail },
      })
    : await Prisma.users.findFirst({
        where: { google_id: sessionSub },
      });

  if (!user) {
    console.log("Google bridge could not find user for session email");
    return redirectTo(req, "/login?error=missing_user");
  }

  console.log("user exist here in this");
  const accessToken = jwt.sign(
    { userId: user.idusers, email: user.email },
    accessSecret,
    { expiresIn: "5m" },
  );
  const refreshToken = jwt.sign(
    { userId: user.idusers, email: user.email },
    refreshSecret,
    { expiresIn: "45d" },
  );

  const response = redirectTo(req, "/dashboard");
  setAuthCookies(response, accessToken, refreshToken);
  console.log("cookies has been set");
  return response;
}
