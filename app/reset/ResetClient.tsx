"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "../Components/Alert";
import type { NavbarAuthSnapshot } from "../Components/navbarAuth";

type AlertInfo = {
  message: string;
  variant?: "success" | "error" | "warning" | "info";
};

export default function ResetPasswordPage({
  navbarAuth,
}: {
  navbarAuth: NavbarAuthSnapshot;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [alertInfo, setAlertInfo] = useState<AlertInfo | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const guardFromUrl = searchParams.get("guard");
    const guardFromSession =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resetGuard")
        : null;

    if (
      !guardFromUrl ||
      !guardFromSession ||
      guardFromUrl !== guardFromSession
    ) {
      router.push("/login");
      return;
    }

    const storedEmail =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resetEmail")
        : null;

    if (!storedEmail) {
      router.push("/login");
      return;
    }

    setEmail(storedEmail);
  }, [router, searchParams]);

  const handleChange = (index: number, value: string): void => {
    const numericValue = value.replace(/[^0-9]/g, "");

    if (!numericValue) {
      const newOtp = [...otpValues];
      newOtp[index] = "";
      setOtpValues(newOtp);
      return;
    }

    const lastDigit = numericValue.slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = lastDigit;
    setOtpValues(newOtp);

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otpValues];

      if (otpValues[index]) {
        newOtp[index] = "";
        setOtpValues(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = "";
        setOtpValues(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      const newOtp = [...otpValues];
      newOtp[index] = "";
      setOtpValues(newOtp);
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if (!/^[0-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 6);

    if (pastedData.length > 0) {
      const newOtp = [...otpValues];
      pastedData.split("").forEach((char, index) => {
        if (index < 6) {
          newOtp[index] = char;
        }
      });
      setOtpValues(newOtp);

      const nextEmptyIndex = newOtp.findIndex((val) => !val);
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
    }
  };

  const onSubmit = async (): Promise<void> => {
    if (isSubmitting || !email) return;

    const otp = otpValues.join("");
    if (otp.length !== 6) {
      setAlertInfo({
        variant: "error",
        message: "Please enter the 6-digit OTP.",
      });
      return;
    }

    if (!password || password.length < 6) {
      setAlertInfo({
        variant: "error",
        message: "Password must be at least 6 characters.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setAlertInfo({
        variant: "error",
        message: "Passwords do not match.",
      });
      return;
    }

    setIsSubmitting(true);
    setAlertInfo(null);

    try {
      await axios.post("/api/password/reset", {
        email,
        otp,
        password,
      });
      setAlertInfo({
        variant: "success",
        message: "Password updated. Redirecting to login...",
      });
      sessionStorage.removeItem("resetGuard");
      sessionStorage.removeItem("resetEmail");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err: any) {
      if (err.response.status === 429) {
        setAlertInfo({
          variant: "error",
          message: "Too many tries. Try again later",
        });
        return;
      }
      const apiMessage =
        err?.response?.data?.error || "Invalid or expired OTP.";
      setAlertInfo({ variant: "error", message: apiMessage });
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_60%),linear-gradient(to_bottom_right,_#18181b,_#09090b)] text-white flex flex-col">
      <Navbar initialAuth={navbarAuth} />

      {alertInfo && (
        <div className="mx-auto mt-4 w-full max-w-5xl px-4 sm:px-6">
          <Alert
            variant={alertInfo.variant ?? "info"}
            message={alertInfo.message}
          />
        </div>
      )}

      <section className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-1 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200/60">
              Account Recovery
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
              Finish the{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                reset
              </span>
            </h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
              Enter the six-digit code sent to your email and choose a fresh
              password for your account.
            </p>
          </div>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-amber-400/20 via-white/5 to-transparent" />

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.14),_transparent_35%),linear-gradient(145deg,rgba(24,24,27,0.96),rgba(9,9,11,1))] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/70">
                  Verification
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Enter the code
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-white">{email}</span>
                </p>
              </div>

              <div
                className="flex justify-between gap-2 sm:gap-3"
                onPaste={handlePaste}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otpValues[index]}
                    ref={(el: HTMLInputElement | null) => {
                      inputRefs.current[index] = el;
                    }}
                    inputMode="numeric"
                    className="h-12 w-10 rounded-2xl border border-zinc-700/80 bg-zinc-950/75 text-center text-lg text-white outline-none transition focus:border-amber-400/50 focus:ring-2 focus:ring-amber-300/15 sm:h-14 sm:w-12 sm:text-xl"
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    autoComplete="one-time-code"
                  />
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <label className="text-sm font-semibold text-zinc-200">
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-700/80 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-300/15 sm:px-5 sm:py-4 sm:text-base"
                  placeholder="Create a new password"
                />
              </div>

              <div className="mt-4 space-y-3">
                <label className="text-sm font-semibold text-zinc-200">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-700/80 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-500 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-300/15 sm:px-5 sm:py-4 sm:text-base"
                  placeholder="Re-enter your new password"
                />
              </div>

              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className="mt-6 w-full rounded-2xl bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:opacity-50 sm:py-4 sm:text-base"
              >
                {isSubmitting ? "Updating..." : "Update password"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="mx-auto mt-4 block text-sm font-medium text-amber-300 transition-colors hover:text-amber-200"
              >
                Back to login
              </button>
            </div>

            <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200/70">
                Final Step
              </p>
              <div className="mt-5 space-y-3">
                {[
                  "Paste the OTP directly into the code boxes if you received it on desktop.",
                  "Pick a password with at least six characters.",
                  "Once updated, you will be redirected back to login.",
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
