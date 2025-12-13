"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

function DashboardPage() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    setToken(stored);
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white">
      <Navbar />
      <button
        onClick={async () => {
          const authToken = localStorage.getItem("token");
          console.log("auth token : ", authToken);

          const response = await axios.get("/api/token", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

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
