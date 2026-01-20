import { Suspense } from "react";
import ForgotClient from "./ForgotClient";

export default function Page() {
  return (
    <Suspense>
      <ForgotClient />
    </Suspense>
  );
}
