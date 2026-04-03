import { Suspense } from "react";
import RouteFallback from "../Components/RouteFallback";
import ChatClient from "./ChatClient";

export default function Page() {
  return (
    <Suspense fallback={<RouteFallback label="Opening the dialogue room..." />}>
      <ChatClient />
    </Suspense>
  );
}
