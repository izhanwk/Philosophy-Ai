"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

function page() {
  const philosopherId = useSearchParams().get("philosopherId");
  console.log("id : ", philosopherId);
  return <div>page</div>;
}

export default page;
