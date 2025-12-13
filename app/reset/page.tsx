"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "../Components/Alert";

type AlertInfo = {
  message: string;
  variant?: "success" | "error" | "warning" | "info";
};

export default function ResetPasswordPage() {
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
    const storedEmail =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resetEmail")
        : null;

    if (
      !guardFromUrl ||
      !guardFromSession ||
      guardFromUrl !== guardFromSession
    ) {
      router.push("/login");
      return;
    }

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
    e: React.KeyboardEvent<HTMLInputElement>
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
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white flex flex-col">
      <Navbar />

      {alertInfo && (
        <div className="px-4 sm:px-6 md:px-8 mt-4">
          <Alert
            variant={alertInfo.variant ?? "info"}
            message={alertInfo.message}
          />
        </div>
      )}

      <div className="flex flex-1 items-center justify-center px-3 py-6 sm:py-10 md:py-14">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
          <div className="bg-zinc-800/50 w-full border border-zinc-700 p-8 sm:p-10 rounded-xl backdrop-blur-md">
            <h2 className="text-center text-xl sm:text-2xl font-bold">
              Enter the code
            </h2>
            <p className="text-center text-sm text-zinc-400 mb-4">
              We sent a 6-digit code to{" "}
              <span className="font-semibold">{email}</span>
            </p>

            <div className="flex justify-between gap-2" onPaste={handlePaste}>
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
                  className="w-10 h-12 text-center text-xl rounded-lg bg-zinc-900 border border-zinc-700 focus:border-blue-500 focus:outline-none transition"
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
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-sm sm:text-base placeholder:text-zinc-500"
                placeholder="Create a new password"
              />
            </div>

            <div className="mt-3 space-y-3">
              <label className="text-sm font-semibold text-zinc-200">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-sm sm:text-base placeholder:text-zinc-500"
                placeholder="Re-enter your new password"
              />
            </div>

            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full mt-6 py-3 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-40 transition"
            >
              {isSubmitting ? "Updating..." : "Update password"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/login")}
              className="block mx-auto mt-4 text-blue-400 hover:text-blue-300 text-sm"
            >
              Back to login
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
