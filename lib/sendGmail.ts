const { RESEND_API_KEY, RESEND_FROM } = process.env;

type SendArgs = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
};

/**
 * Sends an email via Resend. Throws on failure.
 */
export async function sendGmail({ to, subject, html, text }: SendArgs) {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!RESEND_FROM) {
    throw new Error("RESEND_FROM is not configured.");
  }

  const payload = {
    from: RESEND_FROM,
    to: [to],
    subject,
    html,
    text,
  };

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Failed to send email: ${res.status} ${errorBody}`);
  }

  return res.json();
}
