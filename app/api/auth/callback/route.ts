import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function getCallbackUrl(req: NextRequest) {
  const configuredUrl = process.env.GOOGLE_CALLBACK_URL;
  if (configuredUrl) {
    return configuredUrl;
  }

  return new URL("/api/auth/callback", req.url).toString();
}

function getSuccessUrl(req: NextRequest) {
  const configuredUrl = process.env.AUTH_SUCCESS_URL;
  if (configuredUrl) {
    return configuredUrl;
  }

  return new URL("/", req.url);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 },
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID_E;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET_E;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Google OAuth is not configured." },
      { status: 500 },
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    getCallbackUrl(req),
  );

  try {
    await oauth2Client.getToken(code);
    return NextResponse.redirect(getSuccessUrl(req));
  } catch (error) {
    console.error("OAuth callback failed", error);
    return NextResponse.json(
      { error: "Failed to exchange code" },
      { status: 500 },
    );
  }
}
