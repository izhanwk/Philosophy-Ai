"use client";
import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Alert } from "../Components/Alert";
import { signIn } from "next-auth/react";

export default function LoginClient() {
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
          setAlertInfo({ variant: "error", message: apiMessage || "Invalid email or password." });
          return;
        }
      }
      setAlertInfo({ variant: "error", message: "Unable to login. Please try again." });
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_55%),linear-gradient(to_bottom_right,#18181b,#09090b)] text-white">
      <Navbar />

      {alertInfo && (
        <div className="mx-auto w-full max-w-md px-4 pt-4 sm:max-w-lg">
          <Alert variant={alertInfo.variant ?? "error"} message={alertInfo.message} />
        </div>
      )}

      <div className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-md sm:max-w-lg">
          <div className="mb-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/60">Welcome back</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Sign in to your account</h1>
            <p className="mt-1.5 text-sm text-zinc-500">Continue your philosophical journey</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-zinc-800/80 bg-zinc-900/50 p-6 shadow-xl backdrop-blur-md sm:p-8 space-y-5"
          >
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-zinc-300">Email</label>
              <input
                type="email"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm placeholder:text-zinc-600 transition-all focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/15"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /[^@\s]+@[^@\s]+\.[^@\s]+/, message: "Please enter a valid email" },
                })}
              />
              {errors.email && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                  <span className="h-1 w-1 rounded-full bg-red-400" />
                  {String(errors.email.message)}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-300">Password</label>
                <span
                  onClick={() => {
                    const guard = crypto.randomUUID();
                    sessionStorage.setItem("OTPGuard", guard);
                    router.push(`/forgot?guard=${guard}`);
                  }}
                  className="cursor-pointer text-xs text-amber-300/80 transition hover:text-amber-300"
                >
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm placeholder:text-zinc-600 transition-all focus:border-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/15"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              {errors.password && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-red-400">
                  <span className="h-1 w-1 rounded-full bg-red-400" />
                  {String(errors.password.message)}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-amber-300 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 active:scale-95"
            >
              Sign In
            </button>

            <p className="text-center text-sm text-zinc-500">
              Don't have an account?{" "}
              <Link href="/signup" className="font-semibold text-amber-300 transition hover:text-amber-200">
                Sign up
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-zinc-900/50 px-3 text-xs text-zinc-600">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/api/auth/bridge" })}
              className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm font-medium transition hover:bg-zinc-800 hover:border-zinc-700"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-zinc-600">
            By signing in, you agree to our{" "}
            <Link href="#" className="text-zinc-500 transition hover:text-zinc-300">Terms</Link>{" "}
            and{" "}
            <Link href="#" className="text-zinc-500 transition hover:text-zinc-300">Privacy Policy</Link>
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
