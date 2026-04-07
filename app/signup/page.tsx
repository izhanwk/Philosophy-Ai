import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import SignupClient from "./SignupClient";
import { guestNavbarAuth } from "../Components/navbarAuth";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  const currentUser = await getCurrentUserForPage();

  if (currentUser) {
    redirect("/dashboard");
  }

  return <SignupClient navbarAuth={guestNavbarAuth} />;
}
