import { Prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const secret = process.env.JWT_SECRET;
    const refresh = process.env.REFRESH_JWT_SECRET;

    if (!secret || !refresh) {
      return Response.json(
        { error: "Server misconfiguration: missing JWT secrets" },
        { status: 500 }
      );
    }

    if (!email || !password) {
      return Response.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await Prisma.users.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }
    const token = jwt.sign(
      { userId: user.idusers, email: user.email }, // payload
      secret,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { userId: user.idusers, email: user.email }, // payload
      refresh,
      { expiresIn: "45d" }
    );
    console.log("token : ", token);
    console.log("refreshtoken : ", refreshToken);

    return Response.json(
      {
        token: token,
        refresh: refreshToken,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
