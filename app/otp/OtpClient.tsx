"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { Alert } from "../Components/Alert";
import { useRouter, useSearchParams } from "next/navigation";

// type OTPFormData = {
//   otp: string[];
// };

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

export default function OTPVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registrationData, setRegistrationData] =
    useState<RegistrationData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("Register");
    if (stored) {
      try {
        setRegistrationData(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse stored signup data", err);
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
  const [otpValues, setOtpValues] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const guardFromUrl = searchParams.get("guard");
    const guardFromSession =
      typeof window !== "undefined"
        ? sessionStorage.getItem("otpAccessGuard")
        : null;

    if (
      !guardFromUrl ||
      !guardFromSession ||
      guardFromUrl !== guardFromSession
    ) {
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
      if (completeOtp.length === 6) {
        onSubmit(completeOtp);
      }
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

    if (e.key === "Tab" && !e.shiftKey && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
      return;
    }

    if (e.key === "Tab" && e.shiftKey && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const completeOtp = otpValues.join("");
      if (completeOtp.length === 6) {
        onSubmit(completeOtp);
      }
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

      if (pastedData.length === 6) {
        setTimeout(() => onSubmit(pastedData), 100);
      }
    }
  };

  const onSubmit = async (otpValue: string): Promise<void> => {
    if (isVerifying) return;

    setIsVerifying(true);
    setError("");
    setSuccess("");

    try {
      if (otpValue.length !== 6) {
        setError("Please enter a complete 6-digit OTP");
        setIsVerifying(false);
        return;
      }
      if (!registrationData) {
        setError("Signup data missing. Please sign up again.");
        router.replace("/signup");
        setIsVerifying(false);
        return;
      }
      const response = await axios.post("/api/verifyOTP", {
        otp: otpValue,
        data: registrationData,
      });
      seterrorBox(false);
      setSuccess("OTP verified successfully! Redirecting...");
      router.push("/login");
    } catch (err: any) {
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      if (err.response.status === 429) {
        setmessage("Too many tries. Try again later");
        seterrorBox(true);
        return;
      }

      seterrorBox(true);
      setmessage("Invalid or expired OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async (): Promise<void> => {
    if (!registrationData) {
      setError("Signup data missing. Please sign up again.");
      router.replace("/signup");
      return;
    }
    try {
      setError("");
      setSuccess("Resending OTP...");
      setIsResending(true);
      await axios.post("/api/register", {
        name: registrationData.name,
        email: registrationData.email,
        password: registrationData.password,
      });
      setSuccess("OTP has been resent!");
      setOtpValues(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      if (err.response.status === 429) {
        seterrorBox(true);
        setmessage("Too many OTP requests. Please try again later.");
      }
      if (err.response.status === 409) {
        seterrorBox(true);
        setmessage("Email already registered. Please login instead.");
      }
      setError("Failed to resend OTP");
    } finally {
      setIsResending(false);
      setSuccess("");
    }
  };

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white flex flex-col">
      <Navbar />
      {errorBox && (
        <Alert variant="error" title="OTP not verified" message={message} />
      )}
      <div className="flex flex-1 items-center justify-center px-3 py-4 sm:py-6 md:py-12">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const completeOtp = otpValues.join("");
              if (completeOtp.length === 6) {
                onSubmit(completeOtp);
              }
            }}
            className="bg-zinc-800/50 w-full border border-zinc-700 p-12 rounded-xl backdrop-blur-md"
          >
            <h2 className="text-center text-xl font-bold">
              Verify Your Account
            </h2>
            <p className="text-center text-sm text-zinc-400 mb-4">
              Enter the 6-digit code sent to your email
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
                  autoComplete="off"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-400 bg-red-900/30 border border-red-700 mt-3 p-2 rounded text-center text-sm">
                {error}
              </p>
            )}

            {success && (
              <p className="text-green-400 bg-green-900/30 border border-green-700 mt-3 p-2 rounded text-center text-sm">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={isVerifying || isResending}
              className="w-full mt-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-40 transition"
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isVerifying || isResending}
              className="block mx-auto mt-4 text-blue-400 hover:text-blue-300 text-sm"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          </form>

          <p className="text-center text-xs text-zinc-500 mt-4">
            Didn't receive it? Check spam folder
          </p>

          <p className="text-center text-xs mt-3 text-zinc-400">
            Need to change email?{" "}
            <a href="/register" className="text-blue-400 hover:text-blue-300">
              Go back
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
