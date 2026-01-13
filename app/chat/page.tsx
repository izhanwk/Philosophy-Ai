import React from "react";
import Link from "next/link";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Prisma } from "@/lib/prisma";

type ChatPageProps = {
  searchParams?: Promise<{
    philosopherId?: string;
  }>;
};

async function ChatPage({ searchParams }: ChatPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const philosophers = await Prisma.philosophers.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      image_url: true,
      description: true,
    },
  });

  const activePhilosopher =
    philosophers.find(
      (philosopher) =>
        String(philosopher.id) === resolvedSearchParams?.philosopherId
    ) || philosophers[0];

  const messages = activePhilosopher
    ? [
        {
          id: 1,
          sender: "user",
          text: "I have been thinking about what makes a good life. Where should I begin?",
          time: "08:31",
        },
        {
          id: 2,
          sender: activePhilosopher.id,
          text: "Begin with habits. A good life is built from repeated actions that align with reason and virtue.",
          time: "08:32",
        },
        {
          id: 3,
          sender: "user",
          text: "So virtue comes first, not happiness?",
          time: "08:33",
        },
        {
          id: 4,
          sender: activePhilosopher.id,
          text: "Happiness is the harmony of the soul. Knowledge and character refine it together.",
          time: "08:34",
        },
        {
          id: 5,
          sender: activePhilosopher.id,
          text: "Be cautious. Certainty is earned through doubt, reflection, and spiritual practice.",
          time: "08:35",
        },
      ]
    : [];

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white flex flex-col">
      <Navbar />
      <section className="flex-1">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">
              Dialogue Room
            </p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">
              Philosophy Chat
            </h1>
            <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
              Explore timeless questions in a modern chat format. Each voice is
              grounded in a different tradition, so the conversation stays rich
              and multi-perspective.
            </p>
          </header>

          {philosophers.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 text-sm text-zinc-300">
              No philosophers found yet.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">
                    Philosophers
                  </h2>
                  <span className="text-xs text-zinc-400">
                    {philosophers.length} online
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {philosophers.map((philosopher) => {
                    const isActive = philosopher.id === activePhilosopher?.id;
                    return (
                      <Link
                        key={philosopher.id}
                        href={`/chat?philosopherId=${philosopher.id}`}
                        className={`flex items-center gap-3 rounded-2xl border px-3 py-2 transition ${
                          isActive
                            ? "border-amber-300/50 bg-amber-300/10"
                            : "border-white/10 bg-white/5 hover:border-white/30"
                        }`}
                      >
                        <img
                          src={philosopher.image_url}
                          alt={philosopher.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">
                            {philosopher.name}
                          </p>
                          <p className="truncate text-xs text-zinc-400">
                            {philosopher.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </aside>

              <div className="flex flex-col rounded-3xl border border-white/10 bg-black/40 backdrop-blur">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activePhilosopher?.image_url}
                      alt={activePhilosopher?.name ?? "Philosopher"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm text-zinc-400">Conversing with</p>
                      <p className="text-base font-semibold text-white">
                        {activePhilosopher?.name ?? "Philosopher"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Online
                  </div>
                </div>

                <div className="flex-1 space-y-5 px-6 py-6">
                  {messages.map((message) => {
                    const isUser = message.sender === "user";
                    const philosopher = philosophers.find(
                      (entry) => String(entry.id) === String(message.sender)
                    );
                    return (
                      <div
                        key={message.id}
                        className={`flex items-end gap-3 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isUser && philosopher ? (
                          <img
                            src={philosopher.image_url}
                            alt={philosopher.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : null}
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-lg ${
                            isUser
                              ? "bg-amber-300/90 text-zinc-950"
                              : "bg-white/10 text-zinc-100"
                          }`}
                        >
                          <p>{message.text}</p>
                          <span
                            className={`mt-2 block text-xs ${
                              isUser ? "text-zinc-700" : "text-zinc-400"
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                        {isUser ? (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white">
                            You
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-white/10 px-6 py-4">
                  <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center">
                    <div className="flex flex-1 items-center gap-3">
                      <span className="text-xs text-zinc-400">
                        Write a message...
                      </span>
                    </div>
                    <button
                      aria-label="Send message"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-100 transition hover:border-amber-200/40 hover:bg-white/10"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-4 w-4"
                      >
                        <path
                          d="M3.5 11.5L20.5 4.5L13.5 21.5L11.5 13.5L3.5 11.5Z"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ChatPage;
