import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import LoginClient from "./LoginClient";
import { guestNavbarAuth } from "../Components/navbarAuth";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const currentUser = await getCurrentUserForPage();

  if (currentUser) {
    redirect("/dashboard");
  }

  return <LoginClient navbarAuth={guestNavbarAuth} />;
}
