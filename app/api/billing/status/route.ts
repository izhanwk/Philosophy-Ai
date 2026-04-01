import {
  FREE_DAILY_LIMIT,
  PRO_DAILY_LIMIT,
  PRO_MONTHLY_PRICE_USD,
  getBillingPlanLabel,
  getDailyMessageLimit,
  hasActiveSubscription,
} from "@/lib/billing";
import { getCurrentUserFromRequest } from "@/lib/currentUser";
import { Prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await getCurrentUserFromRequest(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const limitWindowMs = 24 * 60 * 60 * 1000;
  const limitCutoff = new Date(Date.now() - limitWindowMs);
  const usedMessagesLast24Hours = await Prisma.chatmessages.count({
    where: {
      role: "user",
      created_at: { gte: limitCutoff },
      chat: { user_id: user.idusers },
    },
  });

  const dailyLimit = getDailyMessageLimit(user);

  return NextResponse.json(
    {
      plan: getBillingPlanLabel(user),
      hasActiveSubscription: hasActiveSubscription(user),
      dailyLimit,
      usedMessagesLast24Hours,
      remainingMessages: Math.max(dailyLimit - usedMessagesLast24Hours, 0),
      freeDailyLimit: FREE_DAILY_LIMIT,
      proDailyLimit: PRO_DAILY_LIMIT,
      proMonthlyPriceUsd: PRO_MONTHLY_PRICE_USD,
      currentPeriodEnd: user.subscription_current_period_end?.toISOString() ?? null,
    },
    { status: 200 },
  );
}
