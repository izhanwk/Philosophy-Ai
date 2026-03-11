import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const session = await auth();
  const accessToken = (await cookies()).get("accessToken")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  let hasCustomToken = false;
  if (accessToken && jwtSecret) {
    try {
      jwt.verify(accessToken, jwtSecret);
      hasCustomToken = true;
    } catch {
      hasCustomToken = false;
    }
  }

  if (session?.user?.email || hasCustomToken) {
    redirect("/dashboard");
  }

  return <HomeClient />;
}
