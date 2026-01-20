import { Suspense } from "react";
import ResetClient from "./ResetClient";

export default function Page() {
  return (
    <Suspense>
      <ResetClient />
    </Suspense>
  );
}
