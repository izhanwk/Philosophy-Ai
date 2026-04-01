import { Prisma } from "@/lib/prisma";
import { verifyLemonSignature } from "@/lib/lemonsqueezy";
import { NextRequest, NextResponse } from "next/server";

type LemonWebhookPayload = {
  meta?: {
    event_name?: string;
    custom_data?: {
      app_user_id?: string;
    };
  };
  data?: {
    id?: string;
    attributes?: {
      customer_id?: number | string | null;
      status?: string | null;
      variant_id?: number | string | null;
      renews_at?: string | null;
      ends_at?: string | null;
      cancelled?: boolean | null;
      user_email?: string | null;
    };
  };
};

async function findUserForSubscriptionEvent(payload: LemonWebhookPayload) {
  const subscriptionId = payload.data?.id ?? null;
  const customerId =
    payload.data?.attributes?.customer_id !== undefined &&
    payload.data?.attributes?.customer_id !== null
      ? String(payload.data.attributes.customer_id)
      : null;
  const appUserId = payload.meta?.custom_data?.app_user_id ?? null;
  const email = payload.data?.attributes?.user_email ?? null;

  if (subscriptionId) {
    const existingBySubscription = await Prisma.users.findFirst({
      where: { lemon_subscription_id: String(subscriptionId) },
      select: { idusers: true },
    });
    if (existingBySubscription) {
      return existingBySubscription;
    }
  }

  if (customerId) {
    const existingByCustomer = await Prisma.users.findFirst({
      where: { lemon_customer_id: customerId },
      select: { idusers: true },
    });
    if (existingByCustomer) {
      return existingByCustomer;
    }
  }

  if (appUserId) {
    const existingByAppUser = await Prisma.users.findUnique({
      where: { idusers: Number(appUserId) },
      select: { idusers: true },
    });
    if (existingByAppUser) {
      return existingByAppUser;
    }
  }

  if (email) {
    return Prisma.users.findUnique({
      where: { email },
      select: { idusers: true },
    });
  }

  return null;
}

async function syncSubscription(payload: LemonWebhookPayload) {
  const user = await findUserForSubscriptionEvent(payload);

  if (!user) {
    return;
  }

  const attributes = payload.data?.attributes;
  const subscriptionId = payload.data?.id ? String(payload.data.id) : null;
  const customerId =
    attributes?.customer_id !== undefined && attributes?.customer_id !== null
      ? String(attributes.customer_id)
      : null;
  const periodEnd =
    attributes?.renews_at ?? attributes?.ends_at ?? null;

  await Prisma.users.update({
    where: { idusers: user.idusers },
    data: {
      lemon_customer_id: customerId,
      lemon_subscription_id: subscriptionId,
      subscription_status: attributes?.status ?? null,
      subscription_price_id:
        attributes?.variant_id !== undefined && attributes?.variant_id !== null
          ? String(attributes.variant_id)
          : null,
      subscription_current_period_end: periodEnd ? new Date(periodEnd) : null,
    },
  });
}

async function clearSubscription(payload: LemonWebhookPayload) {
  const subscriptionId = payload.data?.id ? String(payload.data.id) : null;
  const customerId =
    payload.data?.attributes?.customer_id !== undefined &&
    payload.data?.attributes?.customer_id !== null
      ? String(payload.data.attributes.customer_id)
      : null;
  const periodEnd =
    payload.data?.attributes?.ends_at ??
    payload.data?.attributes?.renews_at ??
    null;

  await Prisma.users.updateMany({
    where: {
      OR: [
        ...(subscriptionId ? [{ lemon_subscription_id: subscriptionId }] : []),
        ...(customerId ? [{ lemon_customer_id: customerId }] : []),
      ],
    },
    data: {
      subscription_status: payload.data?.attributes?.status ?? "expired",
      subscription_current_period_end: periodEnd ? new Date(periodEnd) : null,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-signature");

    if (!signature) {
      return new NextResponse("Missing signature", { status: 400 });
    }

    if (!verifyLemonSignature(rawBody, signature)) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    const payload = JSON.parse(rawBody) as LemonWebhookPayload;
    const eventName = payload.meta?.event_name ?? "";

    switch (eventName) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed":
      case "subscription_unpaused":
      case "subscription_payment_success":
      case "subscription_payment_recovered":
        await syncSubscription(payload);
        break;
      case "subscription_cancelled":
      case "subscription_expired":
      case "subscription_paused":
      case "subscription_payment_failed":
        await clearSubscription(payload);
        break;
      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Lemon Squeezy webhook error:", error);
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
