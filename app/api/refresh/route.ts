import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  clearAuthCookies,
  readRefreshToken,
  setAuthCookies,
} from "@/lib/authCookies";

export async function POST(req: NextRequest) {
  const refreshFromCookie = readRefreshToken(req);
  const refresh = refreshFromCookie;

  if (!refresh) {
    const res = NextResponse.json(
      { message: "Refresh token missing" },
      { status: 400 }
    );
    clearAuthCookies(res);
    return res;
  }

  const refreshSecret = process.env.REFRESH_JWT_SECRET;
  const accessSecret = process.env.JWT_SECRET;

  if (!refreshSecret || !accessSecret) {
    return NextResponse.json(
      { message: "Server misconfiguration: missing secrets" },
      { status: 500 }
    );
  }

  try {
    const decoded = jwt.verify(refresh, refreshSecret) as JwtPayload;

    const id = decoded.userId;
    const email = decoded.email;

    if (!id || !email) {
      const res = NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      );
      clearAuthCookies(res);
      return res;
    }

    const newAccessToken = jwt.sign({ userId: id, email }, accessSecret, {
      expiresIn: "5m",
    });

    const res = NextResponse.json({ token: newAccessToken }, { status: 200 });
    setAuthCookies(res, newAccessToken, refresh);
    return res;
  } catch (err) {
    const res = NextResponse.json(
      { message: "Expired or invalid refresh token" },
      { status: 403 }
    );
    clearAuthCookies(res);
    return res;
  }
}
