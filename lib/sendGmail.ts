import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID_E,
  GOOGLE_CLIENT_SECRET_E,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_REDIRECT_URI,
  GMAIL_SENDER,
} = process.env;

const REQUIRED_SCOPE = "https://www.googleapis.com/auth/gmail.send";

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID_E,
  GOOGLE_CLIENT_SECRET_E,
  GOOGLE_REDIRECT_URI ?? "http://localhost:3000/api/auth/callback"
);

if (!GOOGLE_REFRESH_TOKEN) {
  throw new Error(
    "Missing GOOGLE_REFRESH_TOKEN. Re-consent with gmail.send scope."
  );
}

oAuth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
  scope: REQUIRED_SCOPE,
});

function b64url(str: string) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

type SendArgs = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

/**
 * Sends an email via Gmail API. Throws on failure.
 */
export async function sendGmail({ to, subject, html, text }: SendArgs) {
  if (!GMAIL_SENDER) {
    throw new Error("GMAIL_SENDER is not configured.");
  }

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const body = html ?? text ?? "";
  const mimeType = html ? "text/html" : "text/plain";

  const msg =
    `From: ${GMAIL_SENDER}\r\n` +
    `To: ${to}\r\n` +
    `Subject: ${subject}\r\n` +
    `MIME-Version: 1.0\r\n` +
    `Content-Type: ${mimeType}; charset=UTF-8\r\n\r\n` +
    body;

  const raw = b64url(msg);

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });
    return res.data;
  } catch (err: any) {
    if (err?.code === 403) {
      throw new Error(
        "Insufficient Gmail scopes. Revoke app access and re-consent with gmail.send."
      );
    }
    throw new Error(err?.message ?? "Failed to send email");
  }
}
