import { auth } from "@/auth";
import { readAccessToken } from "@/lib/authCookies";
import { Prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { getToken } from "next-auth/jwt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

type AppUser = {
  idusers: number;
  email: string;
  name: string | null;
  lemon_customer_id: string | null;
  lemon_subscription_id: string | null;
  subscription_status: string | null;
  subscription_price_id: string | null;
  subscription_current_period_end: Date | null;
};

const appUserSelect = {
  idusers: true,
  email: true,
  name: true,
  lemon_customer_id: true,
  lemon_subscription_id: true,
  subscription_status: true,
  subscription_price_id: true,
  subscription_current_period_end: true,
} as const;

function decodeAccessToken(token: string | null | undefined) {
  const secret = process.env.JWT_SECRET;
  if (!token || !secret) {
    return null;
  }

  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch {
    return null;
  }
}

export async function getCurrentUserFromRequest(
  req: NextRequest,
): Promise<AppUser | null> {
  const headerUserId = req.headers.get("x-user-id");
  if (headerUserId) {
    const user = await Prisma.users.findUnique({
      where: { idusers: Number(headerUserId) },
      select: appUserSelect,
    });
    if (user) {
      return user;
    }
  }

  const accessPayload = decodeAccessToken(readAccessToken(req));
  if (accessPayload?.userId !== undefined && accessPayload?.userId !== null) {
    const user = await Prisma.users.findUnique({
      where: { idusers: Number(accessPayload.userId) },
      select: appUserSelect,
    });
    if (user) {
      return user;
    }
  }

  const nextAuthSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
  if (!nextAuthSecret) {
    return null;
  }

  const token = await getToken({ req, secret: nextAuthSecret });
  if (!token?.email) {
    return null;
  }

  return Prisma.users.findUnique({
    where: { email: token.email },
    select: appUserSelect,
  });
}

export async function getCurrentUserForPage(): Promise<AppUser | null> {
  const session = await auth();
  if (session?.user?.email) {
    const user = await Prisma.users.findUnique({
      where: { email: session.user.email },
      select: appUserSelect,
    });
    if (user) {
      return user;
    }
  }

  const accessToken = (await cookies()).get("accessToken")?.value;
  const accessPayload = decodeAccessToken(accessToken);
  if (accessPayload?.userId !== undefined && accessPayload?.userId !== null) {
    const user = await Prisma.users.findUnique({
      where: { idusers: Number(accessPayload.userId) },
      select: appUserSelect,
    });
    if (user) {
      return user;
    }
  }

  return null;
}
