"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { User, ChevronDown } from "lucide-react";
import axios from "axios";
import { usePathname } from "next/navigation";

function Navbar() {
  const { status, data } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isAuthed, setisAuthed] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [email, setemail] = useState<string>("");
  const path = usePathname();
  const [jwtCorrect, setJwtCorrect] = useState(false);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    setIsLoggingOut(true);

    try {
      await axios.post("/api/logout").catch(() => {});
      await signOut({ redirect: false });
    } finally {
      setJwtCorrect(false);
      setisAuthed(false);
      router.replace("/");
    }
  };

  useEffect(() => {
    if (typeof data?.user?.email === "string") {
      setemail(data?.user?.email);
    }
  }, [data]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  useEffect(() => {
    const check = async () => {
      try {
        const response = await axios.post("/api/checkToken");
        const myData = response.data;
        setJwtCorrect(true);
        setisAuthed(true);
        setemail(myData.message);
      } catch (err) {
        console.log("error response");
        setJwtCorrect(false);
        setisAuthed(false);
      } finally {
        setAuthCheckComplete(true);
      }
    };

    check();
  }, []); // runs once to verify token

  useEffect(() => {
    if (status === "loading" || !authCheckComplete) {
      return;
    }
    const authed = status === "authenticated" || jwtCorrect;
    if (authed && !isAuthed) {
      setisAuthed(true);
    }

    const publicRoutes = [
      "/",
      "/login",
      "/signup",
      "/signin",
      "/otp",
      "/forgot",
      "/reset",
    ];
    const authPages = ["/login", "/signup", "/signin"];
    if (!path) return;

    const onPublicRoute = publicRoutes.includes(path);
    if (authed && authPages.includes(path)) {
      router.push("/dashboard");
      return;
    }

    if (!authed && !onPublicRoute) {
      router.push("/");
    }
  }, [status, jwtCorrect, path, router, isAuthed, authCheckComplete]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("error occurred");
        const originalRequest = error.config;

        // If access token expired
        if (
          (error.response?.status === 401 || error.response?.status === 403) &&
          !originalRequest._retry
        ) {
          console.log("retrying");
          originalRequest._retry = true;
          console.log("before token");

          try {
            const { data } = await axios.post("/api/refresh");

            if (!data?.token) {
              throw new Error("No token in refresh response");
            }
            console.log("Got new token", data.token);

            // retry failed request with fresh cookie-based token
            return axios(originalRequest);
          } catch (refreshError) {
            console.log("Refresh failed, redirect to login : ", refreshError);
            await axios.post("/api/logout").catch(() => {});
            router.push("/login");
          }
        }

        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [router]);

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
      {/* NAV */}
      <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <h1
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-center sm:text-left cursor-pointer select-none"
          onClick={() => {
            router.push("/");
          }}
        >
          Philosopher AI
        </h1>

        {isAuthed || isLoggingOut ? (
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
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="w-full cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition-colors sm:w-auto sm:px-5"
              onClick={() => {
                router.push("/signup");
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
