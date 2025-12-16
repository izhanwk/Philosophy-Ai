"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GoogleLogo from "./Components/Google";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const handleScroll = (id: string): void => {
  const element = document.getElementById(id) as HTMLElement | null;
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white">
      <Navbar />
      {/* HERO */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <section className="w-full max-w-6xl text-center flex flex-col items-center">
          {/* PROFILE IMAGE */}
          <div className="mb-6 sm:mb-8">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
              <Image
                src="/Alghazali.png"
                alt="Al-Ghazali"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* TEXT */}
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Explore the Minds of{" "}
            <span className="block sm:inline">
              History's Greatest Philosophers
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed max-w-xl sm:max-w-2xl">
            Engage in deep conversations with AI-powered recreations of thinkers
            like Avicenna, Ibn Rushd, Imam Ghazali and many more.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 w-full max-w-sm">
            <a
              className="px-6 flex items-center cursor-pointer py-2 text-xs sm:text-sm rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors shadow-md"
              onClick={() => {
                handleScroll("aboutus");
              }}
            >
              About us
            </a>
            <button
              className="flex cursor-pointer items-center px-6 py-2 text-xs sm:text-sm rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
              onClick={() => {
                signIn("google", { callbackUrl: "/dashboard" });
              }}
            >
              <GoogleLogo />
              <p className="px-2">Continue with Google</p>
            </button>
          </div>

          {/* FEATURES GRID */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
            {[
              {
                icon: "🧠",
                title: "Deep Conversations",
                desc: "Meaningful dialogues with AI philosophers",
              },
              {
                icon: "📚",
                title: "Historical Accuracy",
                desc: "Based on authentic writings and ideas",
              },
              {
                icon: "💭",
                title: "Interactive Learning",
                desc: "Ask questions and explore perspectives",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-xl mb-2">{item.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT US */}
        <section
          id="aboutus"
          className="mt-24 w-full max-w-6xl px-2 sm:px-4 flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10"
        >
          {/* IMAGE PLACEHOLDER */}
          <div className="relative max-md:hidden sm:w-52 sm:h-52 md:w-64 md:h-64 shrink-0 rounded-xl">
            <Image
              src="/Aristotle.png"
              alt="Aristotle"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>

          <div className="text-center md:text-left max-w-xl">
            <p className="font-semibold text-white text-lg mb-2">About Us</p>
            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-relaxed">
              We are dedicated to preserving and presenting the wisdom of
              ancient philosophers in a way that feels accessible, interactive,
              and engaging for modern learners. Our goal is to bridge centuries
              of thought and bring timeless ideas into today’s conversations.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
