import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID_E!,
    process.env.GOOGLE_CLIENT_SECRET_E!,
    "http://localhost:3000/api/auth/callback"
  );

  try {
    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    // Store tokens however you want (DB, cookies, etc.)
    console.log("OAuth Tokens:", tokens);

    // Redirect after login
    return NextResponse.redirect("http://localhost:3000/auth/success");
  } catch (err) {
    console.error("OAuth Error:", err);
    return NextResponse.json(
      { error: "Failed to exchange code" },
      { status: 500 }
    );
  }
}
