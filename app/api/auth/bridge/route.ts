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
  const nextAuthSecret = process.env.AUTH_SECRET;
  const accessSecret = process.env.JWT_SECRET;
  const refreshSecret = process.env.REFRESH_JWT_SECRET;

  if (!nextAuthSecret || !accessSecret || !refreshSecret) {
    return redirectTo(req, "/login?error=auth_config");
  }

  const session = await getToken({
    req,
    secret: nextAuthSecret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const sessionEmail =
    typeof session?.email === "string" ? session.email : null;
  const sessionSub = typeof session?.sub === "string" ? session.email : null;

  if (!sessionEmail && !sessionSub) {
    return redirectTo(req, "/login?error=missing_session");
  }

  const user =
    sessionEmail &&
    (await Prisma.users.findUnique({
      where: { email: sessionEmail },
    }));

  if (!user) {
    return redirectTo(req, "/login");
  }

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
  return response;
}
