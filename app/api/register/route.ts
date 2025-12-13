import { sendGmail } from "../../../lib/sendGmail";
import { Prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    console.log("Reg api");
    const { email } = await req.json();
    const normalizedEmail = email ?? "";
    if (!normalizedEmail) {
      return Response.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("here is normalized email : ", normalizedEmail);
    const existingUser = await Prisma.users.findUnique({
      where: { email: normalizedEmail },
    });
    console.log("Here is existing user : ", existingUser);
    if (existingUser) {
      console.log("Email already exist");
      return Response.json(
        { error: "An account with this email already exists. Please log in." },
        { status: 409 }
      );
    }
    console.log("User not exist and email is : ", normalizedEmail);
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const recentRows = await Prisma.$queryRaw<{ count: bigint }[]>`
  SELECT COUNT(*) AS count
  FROM otphistory
  WHERE email = ${normalizedEmail} AND password_purpose = FALSE
  AND created_at >= DATE_SUB(NOW(), INTERVAL 6 HOUR)
`;

    const recentCount = Number(recentRows?.[0]?.count ?? 0);
    const attemptNumber = recentCount + 1; // include this request
    console.log("Recent Count (including this attempt): ", attemptNumber);
    if (attemptNumber > 10) {
      return Response.json(
        { error: "Too many OTP requests. Please try again later." },
        { status: 429 }
      );
    }

    const otp = generateOTP();
    const storeOTP = await Prisma.otps.create({
      data: {
        email: normalizedEmail,
        otp,
        created_at: new Date(),
      },
    });
    function otpEmailTemplate(otp: string) {
      return `
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
      <h1>🔐 Verification Code</h1>
      <p>Use the OTP below to verify your login.</p>
      
      <div class="otp-box">${otp}</div>

      <p>This code expires in <b>5 minutes</b>.</p>

      <div class="footer">
        If you didn’t request this, please ignore this email.
      </div>
    </div>
  </body>
  </html>
  `;
    }
    console.log(generateOTP());
    try {
      await sendGmail({
        to: normalizedEmail,
        subject: "PhilosophyAi OTP verification",
        html: otpEmailTemplate(otp),
        text: "Get your OTP",
      });

      return Response.json({ message: normalizedEmail }, { status: 200 });
    } catch (error) {
      console.error("Email sending failed → user not stored:", error);

      return Response.json({ error: "Email not sent" }, { status: 500 });
    }
  } catch (err) {
    return new Response(JSON.stringify(err), { status: 500 });
  }
}
