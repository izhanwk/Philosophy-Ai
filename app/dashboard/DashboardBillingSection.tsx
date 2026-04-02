"use client";

import { useState } from "react";
import BillingCard from "../Components/BillingCard";
import { X, Sparkles } from "lucide-react";

type DashboardBillingSectionProps = {
  hasActiveSubscription: boolean;
  currentPeriodEnd: string | null;
};

export default function DashboardBillingSection({
  hasActiveSubscription,
  currentPeriodEnd,
}: DashboardBillingSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-amber-400/15 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_50%),linear-gradient(145deg,rgba(24,24,27,0.95),rgba(9,9,11,1))] shadow-lg shadow-black/30">
        <div className="flex flex-col gap-5 px-6 py-5 sm:px-7 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: text */}
          <div className="flex items-start gap-4">
            <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/10 text-amber-300">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-200/60">
                {hasActiveSubscription ? "Pro Membership" : "Philosophy Pro"}
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {hasActiveSubscription
                  ? "Your Pro membership is active"
                  : "Unlock more daily conversations"}
              </h2>
              <p className="mt-1 text-sm text-zinc-400">
                {hasActiveSubscription
                  ? "View renewal details or manage your subscription anytime."
                  : "Upgrade to Pro and get higher daily message limits."}
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 active:scale-95"
          >
            {hasActiveSubscription ? "Open Pro details" : "Get Pro"}
          </button>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Dialog */}
          <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] ring-1 ring-white/10 shadow-2xl shadow-black/60">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
              aria-label="Close billing popup"
            >
              <X size={16} />
            </button>

            <BillingCard
              hasActiveSubscription={hasActiveSubscription}
              currentPeriodEnd={currentPeriodEnd}
            />
          </div>
        </div>
      )}
    </>
  );
}
