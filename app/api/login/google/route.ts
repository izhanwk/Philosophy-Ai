import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { google } from "googleapis";
import { Prisma } from "@/lib/prisma";

/**
 * Handles Google Identity credentials (ID tokens) and returns
 * first-party access + refresh JWTs, creating the user if needed.
 */
export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { message: "Missing Google credential" },
        { status: 400 }
      );
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const accessSecret = process.env.JWT_SECRET;
    const refreshSecret = process.env.REFRESH_JWT_SECRET;

    if (!clientId || !accessSecret || !refreshSecret) {
      return NextResponse.json(
        { message: "Server misconfiguration" },
        { status: 500 }
      );
    }

    // Verify the Google ID token.
    const oauthClient = new google.auth.OAuth2(clientId);
    const ticket = await oauthClient.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        { message: "Invalid Google credential" },
        { status: 401 }
      );
    }

    const email = payload.email;
    const googleId = payload.sub;
    const name = payload.name;
    const emailVerified = payload.email_verified;

    if (!email || !googleId || emailVerified === false) {
      return NextResponse.json(
        { message: "Google account not verified" },
        { status: 401 }
      );
    }

    // Find or create user.
    const existingUser = await Prisma.users.findUnique({
      where: { email },
    });

    const user =
      existingUser ??
      (await Prisma.users.create({
        data: {
          email,
          name,
          google_id: googleId,
          createdAt: new Date(),
        },
      }));

    // If the user existed but google_id was missing, set it.
    if (existingUser && !existingUser.google_id) {
      await Prisma.users.update({
        where: { email },
        data: { google_id: googleId },
      });
    }

    const accessToken = jwt.sign(
      { userId: user.idusers, email: user.email },
      accessSecret,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.idusers, email: user.email },
      refreshSecret,
      { expiresIn: "45d" }
    );

    return NextResponse.json(
      {
        token: accessToken,
        refresh: refreshToken,
        user: { email: user.email, name: user.name },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Google login failed:", err);
    return NextResponse.json(
      { message: "Unable to complete Google sign-in" },
      { status: 500 }
    );
  }
}
