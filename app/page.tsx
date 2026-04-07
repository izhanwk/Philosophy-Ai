import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";
import { guestNavbarAuth } from "./Components/navbarAuth";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const currentUser = await getCurrentUserForPage();

  if (currentUser) {
    redirect("/dashboard");
  }

  return <HomeClient navbarAuth={guestNavbarAuth} />;
}
