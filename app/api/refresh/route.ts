import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const refreshToken = body.refreshToken;
  let refresh = refreshToken;

  // Fallback: accept body refreshToken if provided (legacy clients)
  if (!refresh) {
    try {
      const body = await req.json();
      refresh = body.refreshToken;
    } catch {
      // ignore body parse errors
    }
  }

  if (!refresh) {
    return NextResponse.json(
      { message: "Refresh token missing" },
      { status: 400 }
    );
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
      return NextResponse.json(
        { message: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const newAccessToken = jwt.sign({ userId: id, email }, accessSecret, {
      expiresIn: "5m",
    });

    return NextResponse.json({ token: newAccessToken }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Expired or invalid refresh token" },
      { status: 403 }
    );
  }
}
