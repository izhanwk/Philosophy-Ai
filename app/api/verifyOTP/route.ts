import { NextRequest } from "next/server";
import { Prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const otp = body.otp;
  const data = body.data;

  if (!otp || !data.email) {
    return Response.json({ message: "Bad request" }, { status: 400 });
  }

  await Prisma.otptries.create({
    data: {
      email: data.email,
      created_at: new Date(),
      password_purpose: false,
    },
  });

  const recentRows = await Prisma.$queryRaw<{ count: bigint }[]>`
    SELECT COUNT(*) as count
    FROM otptries
    WHERE email = ${data.email}
      AND created_at >= DATE_SUB(NOW(), INTERVAL 6 HOUR)
  `;

  const recentCount = Number(recentRows?.[0]?.count ?? 0);
  if (recentCount > 10) {
    return Response.json(
      { error: "Too many OTP requests. Please try again later." },
      { status: 429 },
    );
  }

  const checkOTP = await Prisma.otps.findFirst({
    where: { email: data.email, otp },
  });

  if (!checkOTP) {
    return Response.json(
      { message: "Invalid or expired OTP" },
      { status: 404 },
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await Prisma.otps.deleteMany({ where: { email: data.email } });

  const existingUser = await Prisma.users.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return Response.json(
      { message: "Email already registered. Please login instead." },
      { status: 409 },
    );
  }

  try {
    await Prisma.users.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    return Response.json({ message: "Success" }, { status: 200 });
  } catch (error: any) {
    console.error("Registration verification failed", error);

    if (error.code === "P2002") {
      return Response.json(
        { message: "This email is already in use." },
        { status: 409 },
      );
    }

    return Response.json(
      { message: "Server error during registration." },
      { status: 500 },
    );
  }
}
