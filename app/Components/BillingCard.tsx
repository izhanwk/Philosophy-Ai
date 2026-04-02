"use client";

import {
  FREE_DAILY_LIMIT,
  PRO_DAILY_LIMIT,
  PRO_MONTHLY_PRICE_USD,
} from "@/lib/billing";
import { Check, CreditCard, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

type BillingCardProps = {
  hasActiveSubscription: boolean;
  currentPeriodEnd: string | null;
};

function formatRenewal(dateString: string | null) {
  if (!dateString) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export default function BillingCard({
  hasActiveSubscription,
  currentPeriodEnd,
}: BillingCardProps) {
  const searchParams = useSearchParams();
  const [loadingAction, setLoadingAction] = useState<
    "checkout" | "portal" | null
  >(null);
  const renewalDate = useMemo(
    () => formatRenewal(currentPeriodEnd),
    [currentPeriodEnd],
  );

  const billingState = searchParams?.get("billing");

  const openBillingUrl = async (
    endpoint: string,
    action: "checkout" | "portal",
  ) => {
    try {
      setLoadingAction(action);
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok || !data?.url) {
        throw new Error(data?.message || "Request failed");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error("Billing action failed", error);
      alert("Unable to open billing right now. Please try again.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <section
      id="billing"
      className="mt-8 overflow-hidden rounded-[28px] border border-amber-200/15 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_35%),linear-gradient(135deg,rgba(24,24,27,0.96),rgba(9,9,11,1))] text-white shadow-2xl shadow-black/30"
    >
      <div className="grid gap-8 px-6 py-7 lg:grid-cols-[1.25fr_0.9fr] lg:px-8 lg:py-8">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70">
            Membership
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {hasActiveSubscription
                ? "Philosophy Pro is active"
                : "Upgrade to Philosophy Pro"}
            </h2>
            <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-100">
              ${PRO_MONTHLY_PRICE_USD}/month
            </span>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:text-base">
            Move from {FREE_DAILY_LIMIT} to {PRO_DAILY_LIMIT} messages every 24
            hours. Secure card payments are handled by Lemon Squeezy, with Visa
            and Mastercard supported.
          </p>

          {billingState === "success" ? (
            <div className="mt-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">
              Payment received. Your subscription should unlock automatically as
              soon as Lemon Squeezy confirms it.
            </div>
          ) : null}

          {billingState === "cancelled" ? (
            <div className="mt-4 rounded-2xl border border-zinc-700 bg-white/5 px-4 py-3 text-sm text-zinc-300">
              Checkout was cancelled. Your current plan stays active until you
              upgrade.
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {hasActiveSubscription ? (
              <button
                onClick={() => openBillingUrl("/api/billing/portal", "portal")}
                disabled={loadingAction !== null}
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingAction === "portal"
                  ? "Opening billing..."
                  : "Manage subscription"}
              </button>
            ) : (
              <button
                onClick={() =>
                  openBillingUrl("/api/billing/checkout", "checkout")
                }
                disabled={loadingAction !== null}
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingAction === "checkout"
                  ? "Opening secure checkout..."
                  : "Upgrade now"}
              </button>
            )}

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
              <CreditCard size={16} />
              Visa / Mastercard
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
              <ShieldCheck size={16} />
              Secure by Lemon Squeezy
            </div>
          </div>

          {hasActiveSubscription && renewalDate ? (
            <p className="mt-4 text-sm text-zinc-300">
              Your higher limit stays active through {renewalDate}, subject to
              Lemon Squeezy billing status.
            </p>
          ) : null}
        </div>

        <div className="rounded-[26px] border border-white/10 bg-black/30 p-5 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">
            What Changes
          </p>
          <div className="mt-4 space-y-3">
            {[
              `${PRO_DAILY_LIMIT} messages in each rolling 24-hour window`,
              "Same chat experience, higher daily cap",
              "Manage billing in Lemon Squeezy's secure customer portal",
              "Card details never pass through this app's servers",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3"
              >
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-300/15 text-amber-200">
                  <Check size={14} />
                </span>
                <p className="text-sm leading-6 text-zinc-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
