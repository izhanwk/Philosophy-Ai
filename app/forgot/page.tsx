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
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white flex flex-col">
      <Navbar />

      {alertInfo && (
        <div className="px-4 sm:px-6 md:px-8 mt-4">
          <Alert
            variant={alertInfo.variant ?? "error"}
            message={alertInfo.message}
          />
        </div>
      )}

      <div className="flex flex-1 items-center justify-center px-4 py-6 sm:py-8 md:py-16">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full bg-zinc-800/50 backdrop-blur-md border border-zinc-700/40 p-5 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 sm:space-y-8 md:space-y-10"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center tracking-wide">
              Reset your password
            </p>
            <p className="text-center text-sm text-zinc-400">
              Enter your account email and we’ll send a 6-digit code.
            </p>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base mb-1 sm:mb-2 block font-semibold text-zinc-200">
                Email
              </label>

              <input
                type="email"
                className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-sm sm:text-base placeholder:text-zinc-500"
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
                <p className="text-red-400 text-xs sm:text-sm font-medium mt-1 flex items-center gap-1.5 sm:gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-blue-500/30 active:scale-95 disabled:opacity-50"
            >
              {isSending ? "Sending code..." : "Send reset code"}
            </button>

            <div className="text-center pt-1 sm:pt-2">
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base">
                Remembered it?{" "}
                <a
                  href="/login"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Back to login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
