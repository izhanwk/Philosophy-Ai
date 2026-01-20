import { Suspense } from "react";
import OtpClient from "./OtpClient";

export default function Page() {
  return (
    <Suspense>
      <OtpClient />
    </Suspense>
  );
}
