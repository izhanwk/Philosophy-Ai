"use client";

type SameSite = "Lax" | "Strict" | "None";

type CookieOptions = {
  days?: number;
  path?: string;
  sameSite?: SameSite;
  secure?: boolean;
};

const isBrowser = typeof document !== "undefined";

const getSecureFlag = (secure?: boolean) => {
  if (typeof secure === "boolean") return secure;
  if (typeof window === "undefined") return false;
  return window.location.protocol === "https:";
};

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  if (!isBrowser) return;

  const { days = 7, path = "/", sameSite = "Lax", secure } = options;

  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();

  const cookieParts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `path=${path}`,
    `expires=${expires}`,
    `sameSite=${sameSite}`,
  ];

  if (getSecureFlag(secure)) {
    cookieParts.push("secure");
  }
  document.cookie = cookieParts.join("; ");
}

export function getCookie(name: string): string | null {
  if (!isBrowser) return null;

  const escaped = encodeURIComponent(name).replace(/[-.+*]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));

  return match ? decodeURIComponent(match[1]) : null;
}

export function removeCookie(name: string, path = "/") {
  if (!isBrowser) return;

  document.cookie = `${encodeURIComponent(
    name
  )}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
}
