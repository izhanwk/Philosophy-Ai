"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "../Components/Alert";
import { useSearchParams } from "next/navigation";

type ForgotForm = {
  email: string;
};

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const guardFromUrl = searchParams.get("guard");
    const guardFromSession =
      typeof window !== "undefined" ? sessionStorage.getItem("OTPGuard") : null;

    if (
      !guardFromUrl ||
      !guardFromSession ||
      guardFromUrl !== guardFromSession
    ) {
      router.push("/login");
      return;
    }
  }, [router, searchParams]);

  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    variant?: "success" | "error" | "warning" | "info";
  } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>();

  const onSubmit = async (data: ForgotForm) => {
    try {
      setAlertInfo(null);
      setIsSending(true);
      await axios.post("/api/password/request", {
        email: data.email,
      });
      const guard = crypto.randomUUID();
      sessionStorage.setItem("resetGuard", guard);
      sessionStorage.setItem("resetEmail", data.email.toLowerCase().trim());
      router.push(`/reset?guard=${guard}`);
    } catch (err: any) {
      const status = err?.response?.status;
      if (status === 404) {
        setAlertInfo({
          variant: "error",
          message: "We couldn't find an account with that email.",
        });
        return;
      }
      if (status === 429) {
        setAlertInfo({
          variant: "error",
          message: "Too many otp requests. Try again later",
        });
      }
      const apiMessage =
        err?.response?.data?.error || "Failed to send reset code. Try again.";
      setAlertInfo({ variant: "error", message: apiMessage });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_60%),linear-gradient(to_bottom_right,_#18181b,_#09090b)] text-white flex flex-col">
      <Navbar />

      {alertInfo && (
        <div className="mx-auto mt-4 w-full max-w-5xl px-4 sm:px-6">
          <Alert
            variant={alertInfo.variant ?? "error"}
            message={alertInfo.message}
          />
        </div>
      )}

      <section className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col gap-1 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
              Account Recovery
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Reset your{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                password
              </span>
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              Enter the email tied to your Philosopher AI account and we&apos;ll
              send a 6-digit reset code.
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-amber-400/20 via-white/5 to-transparent" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.14),_transparent_35%),linear-gradient(145deg,rgba(24,24,27,0.96),rgba(9,9,11,1))] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
                  Secure Access
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Send reset code
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  We&apos;ll send a one-time code to your inbox so you can set a
                  new password without exposing the old one.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-zinc-200">
                    Email
                  </label>

                  <input
                    type="email"
                    className="w-full rounded-2xl border border-zinc-700/80 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-300/15 sm:px-5 sm:py-4 sm:text-base"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /[^@\s]+@[^@\s]+\.[^@\s]+/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />

                  {errors.email && (
                    <p className="flex items-center gap-2 text-xs font-medium text-red-400 sm:text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                      {String(errors.email.message)}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:opacity-50 sm:py-4 sm:text-base"
                >
                  {isSending ? "Sending code..." : "Send reset code"}
                </button>

                <div className="text-center text-sm text-zinc-400">
                  Remembered it?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-amber-300 transition-colors hover:text-amber-200"
                  >
                    Back to login
                  </a>
                </div>
              </form>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">
                What Happens
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "We verify the email against your existing account.",
                  "A 6-digit code is sent so the reset stays time-limited.",
                  "You will set the new password on the next screen.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm leading-6 text-zinc-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
