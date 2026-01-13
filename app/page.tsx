"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import GoogleLogo from "./Components/Google";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Sparkles, BookOpen, MessageCircle } from "lucide-react";

const handleScroll = (id: string): void => {
  const element = document.getElementById(id) as HTMLElement | null;
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export default function HomePage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const features = [
    {
      icon: <MessageCircle className="h-6 w-6 text-sky-200" />,
      title: "Deep Conversations",
      desc: "Meaningful dialogues with AI philosophers.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-amber-200" />,
      title: "Historical Accuracy",
      desc: "Grounded in authentic writings and ideas.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-emerald-200" />,
      title: "Interactive Learning",
      desc: "Ask questions and explore perspectives.",
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white">
      <Navbar />

      {/* HERO */}
      <div className="flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              <Sparkles className="h-4 w-4" />
              Experience living philosophy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Explore the minds of history&apos;s greatest thinkers.
            </h1>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl">
              Engage in deep conversations with AI recreations of Avicenna, Ibn
              Rushd, Imam Ghazali, and more. Learn, debate, and discover new
              perspectives in minutes.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black shadow-md transition hover:bg-gray-200"
                onClick={() => {
                  signIn("google", { callbackUrl: "/dashboard" });
                }}
              >
                <GoogleLogo />
                Continue with Google
              </button>
              <button
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 text-sm text-white transition hover:bg-white/10"
                onClick={() => {
                  handleScroll("aboutus");
                }}
              >
                Learn more
              </button>
            </div>

            <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              {features.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left shadow-sm backdrop-blur transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <h3 className="text-sm sm:text-base font-semibold">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs sm:text-sm text-white/60">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex max-w-sm flex-col items-center">
            <div className="relative h-40 w-40 sm:h-52 sm:w-52 lg:h-56 lg:w-56 overflow-hidden rounded-full border border-white/15 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] bg-white/5 backdrop-blur">
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

        {/* ABOUT US */}
        <section
          id="aboutus"
          className="relative mx-auto mt-20 w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/5 via-white/0 to-white/5 px-5 py-10 shadow-lg backdrop-blur sm:px-8 sm:py-12"
        >
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-16 top-6 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
          </div>

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/70">
                About Us
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                Bringing timeless ideas into today&apos;s conversations.
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto md:mx-0">
                We preserve and present the wisdom of ancient philosophers in a
                way that feels accessible, interactive, and engaging for modern
                learners. Our goal is to bridge centuries of thought and make it
                easy to explore, question, and learn.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: <BookOpen className="h-5 w-5 text-amber-200" />,
                    title: "Curated sources",
                    desc: "Primary texts distilled with historical context.",
                  },

                  {
                    icon: <Sparkles className="h-5 w-5 text-emerald-200" />,
                    title: "Human-tuned",
                    desc: "Content crafted with scholars and educators.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-left shadow-sm backdrop-blur"
                  >
                    <div className="mt-0.5">{item.icon}</div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto flex items-center justify-center">
              <div className="relative h-52 w-52 sm:h-60 sm:w-60 md:h-64 md:w-64 overflow-hidden rounded-2xl border border-white/15 bg-white/5 shadow-[0_15px_50px_-20px_rgba(0,0,0,0.5)] backdrop-blur">
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
