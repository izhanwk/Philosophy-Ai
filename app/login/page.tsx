"use client";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "../Components/Alert";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [alertInfo, setAlertInfo] = useState<{
    message: string;
    variant?: "success" | "error" | "warning" | "info";
  } | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data: object) => {
    try {
      await axios.post("/api/login", data);
      setAlertInfo(null);
      router.push("/dashboard");
    } catch (error: any) {
      reset();
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const apiMessage = error.response?.data?.message;

        if (status === 400 || status === 401) {
          setAlertInfo({
            variant: "error",
            message: apiMessage || "Invalid email or password.",
          });
          return;
        }
      }
      setAlertInfo({
        variant: "error",
        message: "Unable to login. Please try again.",
      });
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
              Login
            </p>

            {/* Inputs */}
            <div className="space-y-5 sm:space-y-6 md:space-y-8">
              {/* Email */}
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

              {/* Password */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base mb-1 sm:mb-2 block font-semibold text-zinc-200">
                  Password
                </label>

                <input
                  type="password"
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl bg-zinc-900/80 border border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all text-base placeholder:text-zinc-500"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                <span
                  onClick={() => {
                    router.push("/forgot");
                  }}
                  className="text-xs cursor-pointer sm:text-sm text-blue-400 hover:text-blue-300 transition-colors block text-right"
                >
                  Forgot password?
                </span>

                {errors.password && (
                  <p className="text-red-400 text-xs sm:text-sm font-medium mt-1 flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                    {String(errors.password.message)}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl cursor-pointer bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-blue-500/30 active:scale-95"
            >
              Sign In
            </button>

            {/* Sign up */}
            <div className="text-center pt-1 sm:pt-2">
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base">
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>

            {/* Divider */}
            <div className="relative pt-4 sm:pt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700/50" />
              </div>

              <div className="relative flex justify-center text-xs sm:text-sm md:text-base">
                <span className="px-3 sm:px-4 bg-zinc-800/50 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="flex justify-center">
              <button
                onClick={() => {
                  signIn("google");
                }}
                type="button"
                className="py-3 sm:py-4 w-full cursor-pointer px-4 rounded-xl sm:rounded-2xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-700/40 transition-all flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-medium"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
            </div>
          </form>

          <div className="mt-6 sm:mt-8 md:mt-10 text-center">
            <p className="text-xs sm:text-sm text-zinc-500">
              By signing in, you agree to our{" "}
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
