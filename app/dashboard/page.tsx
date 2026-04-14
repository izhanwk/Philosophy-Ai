import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import DashboardBillingSection from "./DashboardBillingSection";
import { hasActiveSubscription } from "@/lib/billing";
import { Prisma } from "@/lib/prisma";
import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import AppLink from "../Components/AppLink";

export const dynamic = "force-dynamic";

async function DashboardPage() {
  const currentUser = await getCurrentUserForPage();

  if (!currentUser) {
    redirect("/");
  }

  const philosophers = await Prisma.philosophers.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      image_url: true,
      description: true,
    },
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_60%),linear-gradient(to_bottom_right,_#18181b,_#09090b)] text-white">
      <Navbar initialAuth={{ authed: true, email: currentUser.email }} />

      {/* Page header */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-12 pb-2">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
            Philosopher AI
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
            Choose a{" "}
            <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              Philosopher
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-base text-zinc-400">
            Select a thinker from history and begin a conversation shaped by
            their ideas, era, and philosophy.
          </p>
        </div>

        <div className="mt-6 h-px w-full bg-gradient-to-r from-amber-400/20 via-white/5 to-transparent" />
      </section>

      {/* Billing section */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-8">
        <DashboardBillingSection
          hasActiveSubscription={hasActiveSubscription(currentUser)}
          currentPeriodEnd={
            currentUser.subscription_current_period_end?.toISOString() ?? null
          }
        />
      </section>

      {/* Philosophers grid */}
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        {philosophers.length === 0 ? (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-10 text-center text-sm text-zinc-400">
            No philosophers found yet.
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {philosophers.length} philosopher
                {philosophers.length !== 1 ? "s" : ""} available
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {philosophers.map((philosopher: any) => (
                <AppLink
                  key={philosopher.id}
                  href={`/chat?philosopherId=${philosopher.id}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40 transition-all duration-300 hover:border-amber-400/30 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-black/40"
                >
                  {/* Top image strip */}
                  <div className="relative h-28 w-full overflow-hidden bg-zinc-800/60">
                    <img
                      src={philosopher.image_url}
                      alt={philosopher.name}
                      className="h-full w-full object-cover object-top opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900/90" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="text-base font-semibold leading-snug text-white group-hover:text-amber-100 transition-colors">
                        {philosopher.name}
                      </h2>
                      <span className="mt-0.5 shrink-0 rounded-full border border-white/10 bg-white/5 p-1.5 text-zinc-400 transition-all group-hover:border-amber-400/30 group-hover:bg-amber-400/10 group-hover:text-amber-300">
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                    <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {philosopher.description}
                    </p>
                  </div>

                  {/* Bottom accent bar on hover */}
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-amber-400/60 to-amber-300/20 transition-all duration-500 group-hover:w-full" />
                </AppLink>
              ))}
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default DashboardPage;
