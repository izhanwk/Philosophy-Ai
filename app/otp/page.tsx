import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import RouteFallback from "../Components/RouteFallback";
import OtpClient from "./OtpClient";

export default async function Page() {
  const currentUser = await getCurrentUserForPage();

  if (currentUser) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<RouteFallback label="Preparing verification..." />}>
      <OtpClient />
    </Suspense>
  );
}
