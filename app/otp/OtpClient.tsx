"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { Alert } from "../Components/Alert";
import { useRouter, useSearchParams } from "next/navigation";

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

export default function OTPVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("Register");
    if (stored) {
      try {
        setRegistrationData(JSON.parse(stored));
      } catch (err) {
        setRegistrationData(null);
      }
    }
  }, []);

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [message, setmessage] = useState<string>("");
  const [errorBox, seterrorBox] = useState<boolean>(false);
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const guardFromUrl = searchParams.get("guard");
    const guardFromSession =
      typeof window !== "undefined" ? sessionStorage.getItem("otpAccessGuard") : null;
    if (!guardFromUrl || !guardFromSession || guardFromUrl !== guardFromSession) {
      router.push("/signup");
      return;
    }
    setIsAuthorized(true);
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
    } else {
      const completeOtp = newOtp.join("");
      if (completeOtp.length === 6) onSubmit(completeOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
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
    if (e.key === "ArrowLeft" && index > 0) { e.preventDefault(); inputRefs.current[index - 1]?.focus(); return; }
    if (e.key === "ArrowRight" && index < 5) { e.preventDefault(); inputRefs.current[index + 1]?.focus(); return; }
    if (e.key === "Tab" && !e.shiftKey && index < 5) { e.preventDefault(); inputRefs.current[index + 1]?.focus(); return; }
    if (e.key === "Tab" && e.shiftKey && index > 0) { e.preventDefault(); inputRefs.current[index - 1]?.focus(); return; }
    if (e.key === "Enter") {
      e.preventDefault();
      const completeOtp = otpValues.join("");
      if (completeOtp.length === 6) onSubmit(completeOtp);
      return;
    }
    if (!/^[0-9]$/.test(e.key) && !e.metaKey && !e.ctrlKey) e.preventDefault();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6);
    if (pastedData.length > 0) {
      const newOtp = [...otpValues];
      pastedData.split("").forEach((char, index) => { if (index < 6) newOtp[index] = char; });
      setOtpValues(newOtp);
      const nextEmptyIndex = newOtp.findIndex((val) => !val);
      inputRefs.current[nextEmptyIndex === -1 ? 5 : nextEmptyIndex]?.focus();
      if (pastedData.length === 6) setTimeout(() => onSubmit(pastedData), 100);
    }
  };

  const onSubmit = async (otpValue: string): Promise<void> => {
    if (isVerifying) return;
    setIsVerifying(true);
    setError("");
    setSuccess("");
    try {
      if (otpValue.length !== 6) { setError("Please enter a complete 6-digit code"); setIsVerifying(false); return; }
      if (!registrationData) { setError("Signup data missing. Please sign up again."); router.replace("/signup"); setIsVerifying(false); return; }
      await axios.post("/api/verifyOTP", { otp: otpValue, data: registrationData });
      seterrorBox(false);
      setSuccess("Verified! Redirecting to login...");
      router.push("/login");
    } catch (err: any) {
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      if (err.response.status === 429) { setmessage("Too many tries. Try again later"); seterrorBox(true); return; }
      seterrorBox(true);
      setmessage("Invalid or expired code");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async (): Promise<void> => {
    if (!registrationData) { setError("Signup data missing. Please sign up again."); router.replace("/signup"); return; }
    try {
      setError("");
      setSuccess("Resending code...");
      setIsResending(true);
      await axios.post("/api/register", {
        name: registrationData.name,
        email: registrationData.email,
        password: registrationData.password,
      });
      setSuccess("A new code has been sent!");
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      if (err.response.status === 429) { seterrorBox(true); setmessage("Too many OTP requests. Please try again later."); }
      if (err.response.status === 409) { seterrorBox(true); setmessage("Email already registered. Please login instead."); }
    } finally {
      setIsResending(false);
      setSuccess("");
    }
  };

  if (!isAuthorized) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_55%),linear-gradient(to_bottom_right,#18181b,#09090b)] text-white">
      <Navbar />

      {errorBox && <div className="mx-auto w-full max-w-sm px-4 pt-4"><Alert variant="error" title="Verification failed" message={message} /></div>}

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-sm sm:max-w-md">

          {/* Header */}
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Verification</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Check your email</h1>
            <p className="mt-1.5 text-sm text-zinc-500">
              Enter the 6-digit code we sent to your inbox
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const completeOtp = otpValues.join("");
              if (completeOtp.length === 6) onSubmit(completeOtp);
            }}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-md sm:p-8 space-y-6"
          >
            {/* OTP Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={otpValues[index]}
                  ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el; }}
                  inputMode="numeric"
                  className="h-12 w-10 rounded-xl border border-zinc-800 bg-zinc-900/70 text-center text-xl font-semibold text-white transition focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/15 sm:h-14 sm:w-12"
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onFocus={(e) => e.target.select()}
                  autoComplete="off"
                />
              ))}
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-center text-sm text-red-400">
                {error}
              </p>
            )}
            {success && (
              <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-center text-sm text-emerald-400">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying || isResending}
              className="w-full rounded-xl bg-amber-300 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 active:scale-95 disabled:opacity-50"
            >
              {isVerifying ? "Verifying..." : "Verify Code"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isVerifying || isResending}
              className="mx-auto block text-sm text-amber-300/80 transition hover:text-amber-300 disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend code"}
            </button>
          </form>

          <div className="mt-4 space-y-1 text-center">
            <p className="text-xs text-zinc-600">Didn't receive it? Check your spam folder.</p>
            <p className="text-xs text-zinc-600">
              Wrong email?{" "}
              <a href="/signup" className="text-amber-300/80 transition hover:text-amber-300">Go back</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
