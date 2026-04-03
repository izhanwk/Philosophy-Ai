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
  try {
    const session = await auth();
    if (session?.user?.email) {
      const user = await Prisma.users.findUnique({
        where: { email: session.user.email },
        select: appUserSelect,
      });
      if (user) {
        console.log("[auth] currentUser: resolved from auth()", {
          email: session.user.email,
        });
        return user;
      }
      console.warn(
        "[auth] currentUser: auth() email not found in users table",
        {
          email: session.user.email,
        },
      );
    } else {
      console.warn("[auth] currentUser: auth() did not expose session email");
    }
  } catch (error) {
    console.error("[auth] currentUser: auth() lookup failed", error);
  }

  try {
    const headerUserId = req.headers.get("x-user-id");
    if (headerUserId) {
      const user = await Prisma.users.findUnique({
        where: { idusers: Number(headerUserId) },
        select: appUserSelect,
      });
      if (user) {
        console.log("[auth] currentUser: resolved from x-user-id header", {
          userId: headerUserId,
        });
        return user;
      }
      console.warn("[auth] currentUser: x-user-id header not found in db", {
        userId: headerUserId,
      });
    } else {
      console.warn("[auth] currentUser: no x-user-id header present");
    }
  } catch (error) {
    console.error("[auth] currentUser: x-user-id lookup failed", error);
  }

  try {
    const accessToken = readAccessToken(req);
    const accessPayload = decodeAccessToken(accessToken);
    if (accessPayload?.userId !== undefined && accessPayload?.userId !== null) {
      const user = await Prisma.users.findUnique({
        where: { idusers: Number(accessPayload.userId) },
        select: appUserSelect,
      });
      if (user) {
        console.log("[auth] currentUser: resolved from custom accessToken", {
          userId: accessPayload.userId,
        });
        return user;
      }
      console.warn("[auth] currentUser: accessToken user missing in db", {
        userId: accessPayload.userId,
      });
    } else {
      console.warn("[auth] currentUser: custom accessToken missing or invalid");
    }
  } catch (error) {
    console.error(
      "[auth] currentUser: custom accessToken lookup failed",
      error,
    );
  }

  try {
    const nextAuthSecret =
      process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
    if (!nextAuthSecret) {
      console.warn("[auth] currentUser: no AUTH_SECRET/NEXTAUTH_SECRET set");
      return null;
    }

    const token = await getToken({
      req,
      secret: nextAuthSecret,
      secureCookie: process.env.NODE_ENV === "production",
    });

    if (!token?.email) {
      console.warn("[auth] currentUser: getToken() returned no email");
      return null;
    }

    const user = await Prisma.users.findUnique({
      where: { email: token.email },
      select: appUserSelect,
    });

    if (user) {
      console.log("[auth] currentUser: resolved from getToken()", {
        email: token.email,
      });
      return user;
    }

    console.warn("[auth] currentUser: getToken() email not found in db", {
      email: token.email,
    });
    return null;
  } catch (error) {
    console.error("[auth] currentUser: getToken() lookup failed", error);
    return null;
  }
}

export async function getCurrentUserForPage(): Promise<AppUser | null> {
  try {
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
  } catch (error) {
    console.error("[auth] currentUserForPage: auth() lookup failed", error);
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
