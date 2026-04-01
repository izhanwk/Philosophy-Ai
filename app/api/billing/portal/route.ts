import { getCurrentUserFromRequest } from "@/lib/currentUser";
import { lemonFetch } from "@/lib/lemonsqueezy";
import { NextRequest, NextResponse } from "next/server";

type LemonSubscriptionResponse = {
  data?: {
    attributes?: {
      urls?: {
        customer_portal?: string;
        update_payment_method?: string;
      };
    };
  };
};

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!user.lemon_subscription_id) {
      return NextResponse.json(
        { message: "No active billing profile found." },
        { status: 400 },
      );
    }

    const data = await lemonFetch<LemonSubscriptionResponse>(
      `/subscriptions/${user.lemon_subscription_id}`,
    );

    const url =
      data.data?.attributes?.urls?.customer_portal ??
      data.data?.attributes?.urls?.update_payment_method;

    if (!url) {
      throw new Error("Customer portal URL missing from Lemon Squeezy response");
    }

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Lemon Squeezy portal error:", error);
    return NextResponse.json(
      { message: "Unable to open billing portal." },
      { status: 500 },
    );
  }
}
