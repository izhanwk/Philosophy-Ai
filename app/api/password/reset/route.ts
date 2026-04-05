import { Prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const FIVE_MINUTES_MS = 5 * 60 * 1000;

export async function POST(req: Request) {
  try {
    const { email, otp, password } = await req.json();
    const normalizedEmail = (email ?? "").toLowerCase().trim();
    const trimmedOtp = (otp ?? "").toString().trim();
    const newPassword = (password ?? "").toString();

    if (!normalizedEmail || !trimmedOtp || !newPassword) {
      return Response.json(
        { error: "Email, OTP, and new password are required." },
        { status: 400 }
      );
    }

    await Prisma.otptries.create({
      data: {
        email: normalizedEmail,
        created_at: new Date(),
        password_purpose: true,
      },
    });

    const recentRows = await Prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count 
    FROM otptries 
    WHERE email = ${normalizedEmail} AND password_purpose = TRUE 
    AND created_at >= DATE_SUB(NOW(), INTERVAL 6 HOUR)
  `;

    const recentCount = Number(recentRows?.[0]?.count ?? 0);

    if (recentCount > 10) {
      return Response.json(
        { error: "Too many OTP requests. Please try again later." },
        { status: 429 }
      );
    }
    const cutoff = new Date(Date.now() - FIVE_MINUTES_MS);

    const foundOtp = await Prisma.otps.findFirst({
      where: {
        email: normalizedEmail,
        otp: trimmedOtp,
        created_at: { gte: cutoff },
      },
      orderBy: { created_at: "desc" },
    });

    if (!foundOtp) {
      return Response.json(
        { error: "Invalid or expired OTP." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Prisma.users.update({
      where: { email: normalizedEmail },
      data: { password: hashedPassword },
    });

    await Prisma.otps.deleteMany({
      where: { email: normalizedEmail },
    });

    return Response.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error("Password reset failed:", err);
    return Response.json(
      { error: "Unable to reset password." },
      { status: 500 }
    );
  }
}
