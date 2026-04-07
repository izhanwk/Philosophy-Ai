"use client";

import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Sparkles, BookOpen, MessageCircle } from "lucide-react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GoogleLogo from "./Components/Google";
import type { NavbarAuthSnapshot } from "./Components/navbarAuth";

const handleScroll = (id: string): void => {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "smooth" });
};

export default function HomeClient({
  navbarAuth,
}: {
  navbarAuth: NavbarAuthSnapshot;
}) {
  const features = [
    {
      icon: <MessageCircle className="h-5 w-5 text-amber-300" />,
      title: "Deep Conversations",
      desc: "Meaningful dialogues shaped by authentic philosophy.",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-amber-200" />,
      title: "Historical Accuracy",
      desc: "Grounded in primary texts and scholarly sources.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-amber-100" />,
      title: "Interactive Learning",
      desc: "Ask questions and explore timeless perspectives.",
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.06)_0%,_transparent_55%),linear-gradient(to_bottom_right,#18181b,#09090b)] text-white">
      <Navbar initialAuth={navbarAuth} />

      {/* Hero */}
      <div className="flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-center space-y-6 text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/8 px-3 py-1.5 text-xs text-amber-200/90">
              <Sparkles className="h-3.5 w-3.5" />
              Experience living philosophy
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Explore the minds of{" "}
              <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                history's greatest
              </span>{" "}
              thinkers.
            </h1>

            <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
              Engage in deep conversations with AI recreations of Avicenna, Ibn
              Rushd, Imam Ghazali, and more. Learn, debate, and discover new
              perspectives in minutes.
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-gray-100 active:scale-95"
                onClick={() =>
                  signIn("google", { callbackUrl: "/api/auth/bridge" })
                }
              >
                <GoogleLogo />
                Continue with Google
              </button>
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm text-zinc-300 transition hover:bg-white/8 hover:text-white"
                onClick={() => handleScroll("aboutus")}
              >
                Learn more
              </button>
            </div>

            {/* Feature cards */}
            <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/8 bg-white/4 px-4 py-4 text-left shadow-sm backdrop-blur transition hover:border-amber-400/20 hover:bg-white/6"
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative mx-auto flex max-w-sm flex-col items-center">
            <div className="relative h-40 w-40 overflow-hidden rounded-full border border-amber-300/15 bg-amber-300/5 shadow-[0_0_60px_-12px_rgba(251,191,36,0.2)] sm:h-52 sm:w-52 lg:h-56 lg:w-56">
              <Image
                src="/Alghazali.png"
                alt="Al-Ghazali"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* About section */}
        <section
          id="aboutus"
          className="relative mx-auto mt-20 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/8 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.06),_transparent_50%),linear-gradient(145deg,rgba(24,24,27,0.9),rgba(9,9,11,1))] px-6 py-10 shadow-xl sm:px-8 sm:py-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="absolute -left-16 top-6 h-40 w-40 rounded-full bg-amber-400/8 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-amber-300/5 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/8 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200/80">
                About Us
              </div>
              <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                Bringing timeless ideas into{" "}
                <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                  today's conversations.
                </span>
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base md:mx-0">
                We preserve and present the wisdom of ancient philosophers in a
                way that feels accessible, interactive, and engaging for modern
                learners. Our goal is to bridge centuries of thought and make it
                easy to explore, question, and learn.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <BookOpen className="h-4 w-4 text-amber-200" />,
                    title: "Curated sources",
                    desc: "Primary texts distilled with historical context.",
                  },
                  {
                    icon: <Sparkles className="h-4 w-4 text-amber-300" />,
                    title: "Human-tuned",
                    desc: "Content crafted with scholars and educators.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/4 px-4 py-4 text-left"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-amber-300/20 bg-amber-300/10">
                      {item.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-zinc-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex items-center justify-center">
              <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-amber-300/15 bg-amber-300/5 shadow-[0_0_50px_-15px_rgba(251,191,36,0.15)] sm:h-60 sm:w-60 md:h-64 md:w-64">
                <Image
                  src="/Aristotle.png"
                  alt="Aristotle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
