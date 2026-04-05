import { sendGmail } from "../../../../lib/sendGmail";
import { Prisma } from "@/lib/prisma";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

const resetEmailTemplate = (otp: string) => `
<html>
<head>
  <style>
    .container {
      max-width: 420px;
      margin: auto;
      padding: 30px;
      font-family: Arial, sans-serif;
      border-radius: 14px;
      background: #ffffff;
      border: 1px solid #e5e5e5;
      box-shadow: 0 5px 18px rgba(0,0,0,0.07);
    }
    h1 {
      text-align: center;
      font-size: 24px;
      color: #333;
    }
    .otp-box {
      text-align: center;
      font-size: 38px;
      letter-spacing: 8px;
      font-weight: bold;
      background: #f4f6ff;
      color: #1d4ed8;
      padding: 18px;
      border-radius: 12px;
      margin: 20px 0;
      border: 1px solid #d0d7ff;
    }
    p {
      text-align: center;
      font-size: 15px;
      color: #666;
    }
    .footer {
      text-align: center;
      margin-top: 25px;
      font-size: 13px;
      color: #888;
    }
  </style>
</head>
<body style="background:#f6f7fb; padding:30px;">
  <div class="container">
    <h1>Password Reset Code</h1>
    <p>Use the OTP below to reset your password.</p>
    
    <div class="otp-box">${otp}</div>

    <p>This code expires in <b>5 minutes</b>.</p>

    <div class="footer">
      If you did not request this, please ignore this email.
    </div>
  </div>
</body>
</html>
`;

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    const normalizedEmail = (email ?? "").toLowerCase().trim();
    if (!normalizedEmail) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await Prisma.users.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return Response.json(
        { error: "No account found with that email." },
        { status: 404 }
      );
    }

    const recentRows = await Prisma.$queryRaw<{ count: bigint }[]>`
         SELECT COUNT(*) AS count
    FROM otphistory
    WHERE email = ${normalizedEmail}
      AND password_purpose = TRUE
      AND created_at >= DATE_SUB(NOW(), INTERVAL 6 HOUR);
        `;

    const recentCount = Number(recentRows?.[0]?.count ?? 0);
    const attemptNumber = recentCount + 1;
    if (attemptNumber > 10) {
      return Response.json(
        { error: "Too many OTP requests. Please try again later." },
        { status: 429 }
      );
    }
    const cutoff = new Date(Date.now() - FIVE_MINUTES_MS);
    await Prisma.otps.deleteMany({
      where: {
        email: normalizedEmail,
        created_at: { lt: cutoff },
      },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Prisma.otps.create({
      data: {
        email: normalizedEmail,
        otp,
        created_at: new Date(),
        password_purpose: true,
      },
    });

    await sendGmail({
      to: normalizedEmail,
      subject: "Reset your PhilosophyAI password",
      html: resetEmailTemplate(otp),
      text: `Your PhilosophyAI password reset code is ${otp}. It expires in 5 minutes.`,
    });

    return Response.json({ message: "Reset code sent" }, { status: 200 });
  } catch (err) {
    console.error("Password reset request failed:", err);
    return Response.json(
      { error: "Failed to send reset code" },
      { status: 500 }
    );
  }
}
