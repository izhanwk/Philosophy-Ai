import { getCurrentUserForPage } from "@/lib/currentUser";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import RouteFallback from "../Components/RouteFallback";
import ResetClient from "./ResetClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const currentUser = await getCurrentUserForPage();

  if (currentUser) {
    redirect("/dashboard");
  }

  return (
    <Suspense fallback={<RouteFallback label="Loading password reset..." />}>
      <ResetClient />
    </Suspense>
  );
}
