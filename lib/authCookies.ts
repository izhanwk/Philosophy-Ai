import { NextRequest, NextResponse } from "next/server";

const isProd = process.env.NODE_ENV === "production";
const baseOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};

export function setAuthCookies(
  res: NextResponse,
  accessToken: string,
  refreshToken?: string,
) {
  res.cookies.set("accessToken", accessToken, {
    ...baseOptions,
    maxAge: 60 * 5, // 5 minutes
  });

  if (refreshToken) {
    res.cookies.set("refreshToken", refreshToken, {
      ...baseOptions,
      maxAge: 60 * 60 * 24 * 45, // 45 days
    });
  }
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.set("accessToken", "", { ...baseOptions, maxAge: 0 });
  res.cookies.set("refreshToken", "", { ...baseOptions, maxAge: 0 });
}

export function readAccessToken(req: NextRequest) {
  return req.cookies.get("accessToken")?.value;
}

export function readRefreshToken(req: NextRequest) {
  return req.cookies.get("refreshToken")?.value;
}
