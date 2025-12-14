import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/authCookies";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" }, { status: 200 });
  clearAuthCookies(res);
  return res;
}
