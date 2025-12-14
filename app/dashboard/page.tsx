"use client";
import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

function DashboardPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white">
      <Navbar />
      <button
        onClick={async () => {
          const response = await axios.get("/api/token");
          console.log("The response = ", response.data);
        }}
      >
        Click here
      </button>

      <Footer />
    </main>
  );
}

export default DashboardPage;
