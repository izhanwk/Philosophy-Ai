import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import RouteFallback from "../Components/RouteFallback";
import ChatClient from "./ChatClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const currentUser = await getCurrentUserForPage();

  if (!currentUser) {
    redirect("/");
  }

  return (
    <Suspense fallback={<RouteFallback label="Opening the dialogue room..." />}>
      <ChatClient
        navbarAuth={{ authed: true, email: currentUser.email }}
      />
    </Suspense>
  );
}
