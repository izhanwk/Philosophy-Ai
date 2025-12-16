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
  const [email, setemail] = useState<string>("");
  const path = usePathname();
  // const isAuthed = status === "authenticated";

  // const email = data?.user?.email ?? "Signed in";
  const [jwtCorrect, setJwtCorrect] = useState(false);

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
      }
    };

    check();
  }, []); // runs once to verify token

  useEffect(() => {
    const authed = status === "authenticated" || jwtCorrect === true;
    if (!authed) return;

    setisAuthed(true);

    const authPages = ["/login", "/signup", "/signin"];
    if (authPages.includes(path)) {
      router.push("/dashboard");
    }
  }, [status, jwtCorrect, path, router]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log("error occurred");
        const originalRequest = error.config;

        // If access token expired
        if (error.response?.status === 403 && !originalRequest._retry) {
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

  useEffect(() => {
    const publicRoutes = [
      "/",
      "/login",
      "/signup",
      "/otp",
      "/forgot",
      "/reset",
    ];
    if (publicRoutes.includes(window.location.pathname)) return;

    console.log("status:", status, "jwt:", jwtCorrect);

    if (status === "authenticated" || jwtCorrect) {
      router.push("/dashboard");
    } else if (status === "unauthenticated" && !jwtCorrect) {
      router.push("/");
    }
  }, [status, jwtCorrect, router]);

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
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide text-center sm:text-left cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Philosopher AI
        </h1>

        {isAuthed ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
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
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-white/10"
                  onClick={() => {
                    setisAuthed(false);
                    setJwtCorrect(false);
                    axios.post("/api/logout").catch(() => {});
                    signOut({ callbackUrl: "/" });
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3 sm:gap-4">
            <button
              className="cursor-pointer px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
              onClick={() => {
                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="cursor-pointer px-4 sm:px-6 py-2 text-xs sm:text-sm rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
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
