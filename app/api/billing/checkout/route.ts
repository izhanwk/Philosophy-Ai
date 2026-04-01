import { getCurrentUserFromRequest } from "@/lib/currentUser";
import {
  getLemonSqueezyStoreId,
  getLemonSqueezyVariantId,
  isLemonSqueezyTestMode,
  lemonFetch,
} from "@/lib/lemonsqueezy";
import { NextRequest, NextResponse } from "next/server";

type LemonCheckoutResponse = {
  data?: {
    attributes?: {
      url?: string;
    };
  };
};

function getOrigin(req: NextRequest) {
  return req.headers.get("origin") ?? new URL(req.url).origin;
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const origin = getOrigin(req);
    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_data: {
            email: user.email,
            name: user.name ?? undefined,
            custom: {
              app_user_id: String(user.idusers),
            },
          },
          checkout_options: {
            embed: false,
            media: true,
            logo: true,
            desc: true,
            subscription_preview: true,
            dark: true,
            button_color: "#fcd34d",
          },
          product_options: {
            enabled_variants: [Number(getLemonSqueezyVariantId())],
            redirect_url: `${origin}/dashboard?billing=success`,
            receipt_link_url: `${origin}/dashboard`,
            receipt_button_text: "Back to Philosophy AI",
          },
          expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          test_mode: isLemonSqueezyTestMode(),
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: String(getLemonSqueezyStoreId()),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(getLemonSqueezyVariantId()),
            },
          },
        },
      },
    };

    const data = await lemonFetch<LemonCheckoutResponse>("/checkouts", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const url = data.data?.attributes?.url;
    if (!url) {
      throw new Error("Checkout URL missing from Lemon Squeezy response");
    }

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Lemon Squeezy checkout error:", error);
    return NextResponse.json(
      { message: "Unable to start secure checkout." },
      { status: 500 },
    );
  }
}
