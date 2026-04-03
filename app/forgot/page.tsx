import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import RouteFallback from "../Components/RouteFallback";
import ForgotClient from "./ForgotClient";

export default async function Page() {
  const currentUser = await getCurrentUserForPage();

  if (currentUser) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<RouteFallback label="Opening account recovery..." />}>
      <ForgotClient />
    </Suspense>
  );
}
