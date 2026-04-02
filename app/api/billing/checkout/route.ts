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
      console.warn("[billing] checkout: unauthorized request", {
        origin: req.headers.get("origin"),
        host: req.headers.get("host"),
        cookiePresent: Boolean(req.headers.get("cookie")),
      });
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const origin = getOrigin(req);
    const variantId = Number(getLemonSqueezyVariantId());
    const storeId = String(getLemonSqueezyStoreId());
    const testMode = isLemonSqueezyTestMode();
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
            button_color: "#fcd34d",
          },
          product_options: {
            enabled_variants: [variantId],
            redirect_url: `${origin}/dashboard?billing=success`,
            receipt_link_url: `${origin}/dashboard`,
            receipt_button_text: "Back to Philosopher AI",
          },
          expires_at: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
          test_mode: testMode,
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: storeId,
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(variantId),
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

    console.info("[billing] Lemon checkout created", {
      url,
      storeId,
      variantId,
      testMode,
      userId: user.idusers,
    });

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Lemon Squeezy checkout error:", error);
    return NextResponse.json(
      { message: "Unable to start secure checkout." },
      { status: 500 },
    );
  }
}
