import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function getCallbackUrl(req: NextRequest) {
  return (
    process.env.GOOGLE_CALLBACK_URL ??
    new URL("/api/auth/callback", req.url).toString()
  );
}

export async function GET(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID_E!,
    process.env.GOOGLE_CLIENT_SECRET_E!,
    getCallbackUrl(req),
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
  return NextResponse.json({ url });
}
