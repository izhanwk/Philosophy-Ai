"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { User, ChevronDown } from "lucide-react";
import axios from "axios";
import ThemeLoader from "./ThemeLoader";

const PUBLIC_ROUTES = new Set([
  "/",
  "/login",
  "/signup",
  "/signin",
  "/otp",
  "/forgot",
  "/reset",
]);

const AUTH_PAGES = new Set(["/login", "/signup", "/signin"]);

type CustomAuthState = {
  checked: boolean;
  authed: boolean;
  email: string;
};

function Navbar() {
  const { status, data } = useSession();
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [customAuth, setCustomAuth] = useState<CustomAuthState>({
    checked: false,
    authed: false,
    email: "",
  });

  const sessionEmail =
    typeof data?.user?.email === "string" ? data.user.email : "";
  const isSessionAuthed = status === "authenticated";
  const isCheckingAuth =
    status === "loading" || (!isSessionAuthed && !customAuth.checked);
  const isAuthed = isSessionAuthed || customAuth.authed || isLoggingOut;
  const email = sessionEmail || customAuth.email;
  const showLoader = isCheckingAuth || isNavigating || isLoggingOut;

  const navigateTo = (href: string) => {
    if (href === path) {
      return;
    }

    setOpen(false);
    setIsNavigating(true);
    router.push(href);
  };

  const checkTokenWithRefresh = async () => {
    try {
      return await axios.post("/api/checkToken");
    } catch (error: any) {
      const status = error?.response?.status;
      if (status !== 401 && status !== 403) {
        throw error;
      }

      const refreshResponse = await axios.post("/api/refresh");
      if (refreshResponse.status !== 200) {
        throw error;
      }

      return axios.post("/api/checkToken");
    }
  };

  const handleLogout = async () => {
    setOpen(false);
    setIsLoggingOut(true);

    try {
      await axios.post("/api/logout").catch(() => {});
      await signOut({ redirect: false });
    } finally {
      setCustomAuth({ checked: true, authed: false, email: "" });
      console.log("send2");
      router.replace("/");
    }
  };

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (isSessionAuthed) {
      setCustomAuth((current) =>
        current.checked || current.authed || current.email
          ? { checked: true, authed: false, email: "" }
          : current,
      );
      return;
    }

    let cancelled = false;

    const checkToken = async () => {
      try {
        const response = await checkTokenWithRefresh();
        if (!cancelled) {
          setCustomAuth({
            checked: true,
            authed: true,
            email:
              typeof response.data?.message === "string"
                ? response.data.message
                : "",
          });
        }
      } catch {
        if (!cancelled) {
          setCustomAuth({ checked: true, authed: false, email: "" });
        }
      }
    };

    checkToken();

    return () => {
      cancelled = true;
    };
  }, [isSessionAuthed, status]);

  useEffect(() => {
    if (!path || status === "loading" || isLoggingOut) {
      return;
    }

    setIsNavigating(false);

    if (!isSessionAuthed && !customAuth.checked) {
      return;
    }

    if (isAuthed && AUTH_PAGES.has(path)) {
      setIsNavigating(true);
      console.log("towards dashboard");
      router.replace("/dashboard");
      return;
    }

    if (!isAuthed && !PUBLIC_ROUTES.has(path)) {
      setIsNavigating(true);
      console.log("send1");
      router.replace("/");
    }
  }, [
    customAuth.checked,
    isAuthed,
    isLoggingOut,
    isSessionAuthed,
    path,
    router,
    status,
  ]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div>
      {showLoader ? (
        <ThemeLoader
          label={
            isLoggingOut
              ? "Closing the dialogue..."
              : isCheckingAuth
                ? "Checking your access..."
                : "Opening the next page..."
          }
        />
      ) : null}

      {/* NAV */}
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <h1
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-center sm:text-left cursor-pointer select-none"
          onClick={() => {
            navigateTo("/");
          }}
        >
          Philosopher AI
        </h1>

        {isAuthed ? (
          <div className="relative w-full sm:w-auto" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition sm:w-auto"
              disabled={isLoggingOut}
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                <User className="h-5 w-5" />
              </span>
              <div className="flex flex-col text-left">
                <span className="font-semibold">{email}</span>
                <span className="text-xs text-white/70">Logged in</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 opacity-70 transition-transform ${
                  open ? "-rotate-180" : ""
                }`}
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border border-white/10 bg-neutral-900/95 shadow-lg backdrop-blur">
                <button
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            <button
              className="w-full cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition-colors sm:w-auto sm:px-5"
              onClick={() => {
                navigateTo("/login");
              }}
            >
              Login
            </button>
            <button
              className="w-full cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition-colors sm:w-auto sm:px-5"
              onClick={() => {
                navigateTo("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
