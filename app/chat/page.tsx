"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function page() {
  const philosopherId = useSearchParams().get("philosopherId");
  console.log("id : ", philosopherId);
  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white flex flex-col">
      <Navbar />
      <Footer />
    </main>
  );
}

export default page;
