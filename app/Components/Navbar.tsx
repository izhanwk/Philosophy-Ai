"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { User, ChevronDown, LogOut } from "lucide-react";
import axios from "axios";
import ThemeLoader from "./ThemeLoader";
import BrandLogo from "./BrandLogo";
import type { NavbarAuthSnapshot } from "./navbarAuth";

function Navbar({ initialAuth }: { initialAuth: NavbarAuthSnapshot }) {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [authState, setAuthState] = useState(initialAuth);

  useEffect(() => {
    setAuthState(initialAuth);
  }, [initialAuth]);

  const isAuthed = authState.authed || isLoggingOut;
  const email = authState.email;
  const showLoader = isNavigating || isLoggingOut;
  const brandHref = isAuthed ? "/dashboard" : "/";

  const navigateTo = (href: string) => {
    if (href === path) return;
    setOpen(false);
    setIsNavigating(true);
    router.push(href);
  };

  const handleLogout = async () => {
    setOpen(false);
    setIsLoggingOut(true);
    try {
      await axios.post("/api/logout").catch(() => {});
      await signOut({ redirect: false });
    } finally {
      setAuthState({ authed: false, email: "" });
      router.replace("/");
    }
  };

  useEffect(() => {
    if (!path || isLoggingOut) return;
    setIsNavigating(false);
  }, [isLoggingOut, path]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div>
      {showLoader && (
        <ThemeLoader
          label={
            isLoggingOut
              ? "Closing the dialogue..."
              : "Opening the next page..."
          }
        />
      )}

      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <h1
          className="cursor-pointer select-none"
          onClick={() => navigateTo(brandHref)}
        >
          <BrandLogo />
        </h1>

        {isAuthed ? (
          <div className="relative w-full sm:w-auto" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm transition hover:bg-white/8 hover:border-white/20 sm:w-auto"
              disabled={isLoggingOut}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-amber-200">
                <User className="h-4 w-4" />
              </span>
              <div className="flex flex-col text-left">
                <span className="max-w-[140px] truncate text-xs font-semibold text-white">
                  {email}
                </span>
                <span className="text-[10px] text-zinc-500">Logged in</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-zinc-500 transition-transform ${open ? "-rotate-180" : ""}`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-white/10 bg-zinc-900/95 shadow-xl backdrop-blur-md">
                <button
                  className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm text-zinc-300 transition hover:bg-white/8 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <LogOut size={14} className="text-zinc-500" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-2">
            <button
              className="w-full cursor-pointer rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/8 hover:text-white sm:w-auto sm:px-5"
              onClick={() => navigateTo("/login")}
            >
              Login
            </button>
            <button
              className="w-full cursor-pointer rounded-xl bg-amber-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 active:scale-95 sm:w-auto sm:px-5"
              onClick={() => navigateTo("/signup")}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>
    </div>
  );
}

export default Navbar;
