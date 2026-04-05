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

function getNextAuthSecret() {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
}

async function findUserByEmail(email: string | null | undefined) {
  if (!email) {
    return null;
  }

  return Prisma.users.findUnique({
    where: { email },
    select: appUserSelect,
  });
}

async function findUserById(userId: number | string | null | undefined) {
  if (userId === null || userId === undefined) {
    return null;
  }

  const numericId = Number(userId);
  if (!Number.isFinite(numericId)) {
    return null;
  }

  return Prisma.users.findUnique({
    where: { idusers: numericId },
    select: appUserSelect,
  });
}

async function findUserFromNextAuthToken(req: NextRequest) {
  const secret = getNextAuthSecret();
  if (!secret) {
    return null;
  }

  const token = await getToken({
    req,
    secret,
    secureCookie: process.env.NODE_ENV === "production",
  });

  return findUserByEmail(typeof token?.email === "string" ? token.email : null);
}

export async function getCurrentUserFromRequest(
  req: NextRequest,
): Promise<AppUser | null> {
  try {
    const session = await auth();
    const userFromSession = await findUserByEmail(session?.user?.email);
    if (userFromSession) {
      return userFromSession;
    }
  } catch (error) {
    console.error("Current user lookup failed via auth()", error);
  }

  try {
    const userFromHeader = await findUserById(req.headers.get("x-user-id"));
    if (userFromHeader) {
      return userFromHeader;
    }
  } catch (error) {
    console.error("Current user lookup failed via x-user-id header", error);
  }

  try {
    const payload = decodeAccessToken(readAccessToken(req));
    const userFromAccessToken = await findUserById(payload?.userId);
    if (userFromAccessToken) {
      return userFromAccessToken;
    }
  } catch (error) {
    console.error("Current user lookup failed via custom access token", error);
  }

  try {
    return await findUserFromNextAuthToken(req);
  } catch (error) {
    console.error("Current user lookup failed via NextAuth token", error);
    return null;
  }
}

export async function getCurrentUserForPage(): Promise<AppUser | null> {
  try {
    const session = await auth();
    const userFromSession = await findUserByEmail(session?.user?.email);
    if (userFromSession) {
      return userFromSession;
    }
  } catch (error) {
    console.error("Page user lookup failed via auth()", error);
  }

  try {
    const payload = decodeAccessToken((await cookies()).get("accessToken")?.value);
    return await findUserById(payload?.userId);
  } catch (error) {
    console.error("Page user lookup failed via access token", error);
    return null;
  }
}
