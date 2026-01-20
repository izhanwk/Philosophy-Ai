"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import { User, Menu, X, Send } from "lucide-react";

type Philosopher = {
  id: string | number;
  name: string;
  image_url: string;
  description: string;
};

type Message = {
  id: number;
  sender: "user" | string | number;
  text: string;
  time: string;
  createdAt?: string;
};

function ChatClient() {
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const philosopherId = searchParams?.get("philosopherId") ?? "1";
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [showPhilosopherSidebar, setShowPhilosopherSidebar] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(false);
  const [oldestCursor, setOldestCursor] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState<Boolean>(false);
  const input = useRef<HTMLInputElement>(null);
  const shouldScrollToBottomRef = useRef(false);

  const formatTime = (date: Date) => {
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const fetchWithRefresh = async (input: RequestInfo, init?: RequestInit) => {
    const response = await fetch(input, init);
    if (response.status !== 401 && response.status !== 403) {
      return response;
    }

    const refresh = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!refresh.ok) {
      return response;
    }

    return fetch(input, init);
  };

  const fetchMessagesPage = async (cursor?: string | null) => {
    if (!philosopherId) {
      return;
    }

    try {
      const response = await fetchWithRefresh("/api/chat/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ philosopherId, cursor }),
      });

      if (!response.ok) {
        throw new Error("Failed to load chat history");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  const delay = async () => {
    await new Promise((res) => setTimeout(res, 500));
    inputRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    input.current?.focus({ preventScroll: true });

    setGlow(true);
    await new Promise((res) => setTimeout(res, 1000));
    setGlow(false);
  };

  useEffect(() => {
    delay();
    let isActive = true;
    const loadPhilosophers = async () => {
      try {
        const response = await axios.get("/api/philosophers", {
          headers: {
            "Cache-Control": "no-store",
          },
        });

        if (isActive) {
          setPhilosophers(response.data.philosophers ?? []);
        }
      } catch (error) {
        console.error("Failed to load philosophers", error);
        if (isActive) {
          setPhilosophers([]);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadPhilosophers();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container || isLoadingMore) {
      return;
    }

    if (isStreaming) {
      container.scrollTop = container.scrollHeight;
      return;
    }

    if (shouldScrollToBottomRef.current) {
      requestAnimationFrame(() => {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      });
      setTimeout(() => {
        shouldScrollToBottomRef.current = false;
      }, 350);
      return;
    }

    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    if (distanceFromBottom < 120) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [chatMessages, isLoadingMore, isStreaming]);

  const activePhilosopher = useMemo(() => {
    return (
      philosophers.find(
        (philosopher) => String(philosopher.id) === philosopherId,
      ) || philosophers[0]
    );
  }, [philosophers, philosopherId]);

  useEffect(() => {
    delay();
  }, [activePhilosopher]);

  const loadInitialMessages = async () => {
    setIsLoadingMore(false);
    setHasMoreMessages(false);
    setOldestCursor(null);
    setChatMessages([]);

    const data = await fetchMessagesPage();
    if (!data) {
      return;
    }
    const history = data?.messages ?? [];
    const mapped = history.map((entry: any) => ({
      id: entry.id,
      sender: entry.role === "user" ? "user" : philosopherId,
      text: entry.content ?? "",
      time: entry.created_at
        ? formatTime(new Date(entry.created_at))
        : formatTime(new Date()),
      createdAt: entry.created_at ?? null,
    }));
    setChatMessages(mapped);
    setHasMoreMessages(Boolean(data?.hasMore));
    if (mapped.length) {
      setOldestCursor(mapped[0].createdAt ?? null);
    }
    shouldScrollToBottomRef.current = true;
  };

  const loadOlderMessages = async () => {
    if (isLoadingMore || !hasMoreMessages || !oldestCursor) {
      return;
    }

    const container = messagesContainerRef.current;
    const previousScrollHeight = container?.scrollHeight ?? 0;
    const previousScrollTop = container?.scrollTop ?? 0;

    setIsLoadingMore(true);
    const data = await fetchMessagesPage(oldestCursor);
    if (!data) {
      setIsLoadingMore(false);
      return;
    }
    const history = data?.messages ?? [];
    const mapped = history.map((entry: any) => ({
      id: entry.id,
      sender: entry.role === "user" ? "user" : philosopherId,
      text: entry.content ?? "",
      time: entry.created_at
        ? formatTime(new Date(entry.created_at))
        : formatTime(new Date()),
      createdAt: entry.created_at ?? null,
    }));
    setChatMessages((prev) => [...mapped, ...prev]);
    setHasMoreMessages(Boolean(data?.hasMore));
    if (mapped.length) {
      setOldestCursor(mapped[0].createdAt ?? oldestCursor);
    }

    setTimeout(() => {
      if (!container) {
        return;
      }
      const newScrollHeight = container.scrollHeight;
      container.scrollTop =
        newScrollHeight - previousScrollHeight + previousScrollTop;
    }, 0);

    setIsLoadingMore(false);
  };

  useEffect(() => {
    loadInitialMessages();
  }, [philosopherId]);

  const handleSend = async () => {
    const message = draft.trim();
    if (!message || !activePhilosopher || isStreaming) {
      return;
    }

    setDraft("");
    shouldScrollToBottomRef.current = true;
    const now = new Date();
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: message,
      time: formatTime(now),
    };
    const assistantMessageId = userMessage.id + 1;
    const assistantMessage: Message = {
      id: assistantMessageId,
      sender: activePhilosopher.id,
      text: "",
      time: formatTime(now),
    };
    setChatMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsStreaming(true);

    try {
      const response = await fetchWithRefresh("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, philosopherId }),
        credentials: "include",
      });

      if (response.status === 429) {
        const errorText =
          (await response.text()) ||
          "You have reached the 24-hour message limit. Please try again later.";
        setChatMessages((prev) =>
          prev.map((entry) =>
            entry.id === assistantMessageId
              ? { ...entry, text: errorText }
              : entry,
          ),
        );
        return;
      }

      if (!response.ok || !response.body) {
        throw new Error("Failed to stream response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;

        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          setChatMessages((prev) =>
            prev.map((entry) =>
              entry.id === assistantMessageId
                ? { ...entry, text: entry.text + chunk }
                : entry,
            ),
          );
        }
      }
    } catch (error) {
      console.error("Failed to stream chat response", error);
      setChatMessages((prev) =>
        prev.map((entry) =>
          entry.id === assistantMessageId
            ? {
                ...entry,
                text: "Sorry, something went wrong while streaming the reply.",
              }
            : entry,
        ),
      );
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white flex flex-col">
      <Navbar />
      <section className="flex-1">
        <div className="mx-auto w-full max-w-6xl flex flex-col gap-4 px-3 py-4 sm:px-4 sm:py-6 lg:px-8 lg:py-10">
          {/* Mobile Header with Toggle Button */}
          <div className="flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setShowPhilosopherSidebar(!showPhilosopherSidebar)
                }
                className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
                aria-label="Toggle philosopher list"
              >
                {showPhilosopherSidebar ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-amber-200/70">
                  Dialogue Room
                </p>
                <h1 className="text-lg font-semibold text-white">
                  Philosophy Chat
                </h1>
              </div>
            </div>
            {activePhilosopher && (
              <div className="flex items-center gap-2">
                <img
                  src={activePhilosopher.image_url}
                  alt={activePhilosopher.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-white truncate max-w-[100px]">
                  {activePhilosopher.name}
                </span>
              </div>
            )}
          </div>

          {/* Desktop Header */}
          <header className="hidden lg:flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">
              Dialogue Room
            </p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
              Philosophy Chat
            </h1>
            <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
              Explore timeless questions in a modern chat format. Each voice is
              grounded in a different tradition, so the conversation stays rich
              and multi-perspective.
            </p>
          </header>

          {loading && philosophers.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 text-sm text-zinc-300">
              Loading philosophers...
            </div>
          ) : philosophers.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 text-sm text-zinc-300">
              No philosophers found yet.
            </div>
          ) : (
            <div className="relative flex gap-4 lg:gap-6">
              {/* Mobile Sidebar Overlay */}
              <div
                className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ease-out lg:hidden ${
                  showPhilosopherSidebar
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                onClick={() => setShowPhilosopherSidebar(false)}
              />
              <aside
                className={`chat-scrollbar fixed left-0 top-0 z-50 h-full w-[280px] overflow-y-auto rounded-r-3xl border-r border-white/10 bg-black/95 p-4 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden sm:p-5 ${
                  showPhilosopherSidebar ? "translate-x-0" : "-translate-x-full"
                }`}
                aria-hidden={!showPhilosopherSidebar}
              >
                <div
                  className={`mb-4 flex items-center justify-between transition-opacity duration-300 ease-out ${
                    showPhilosopherSidebar ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h2 className="text-lg font-semibold text-white">
                    Philosophers
                  </h2>
                  <button
                    onClick={() => setShowPhilosopherSidebar(false)}
                    className="rounded-lg p-2 hover:bg-white/10"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div
                  className={`flex flex-col gap-3 transition-all duration-300 ease-out ${
                    showPhilosopherSidebar
                      ? "translate-y-0 opacity-100"
                      : "translate-y-2 opacity-0"
                  }`}
                >
                  {philosophers.map((philosopher) => {
                    const isActive = philosopher.id === activePhilosopher?.id;
                    return (
                      <Link
                        key={philosopher.id}
                        href={`/chat?philosopherId=${philosopher.id}`}
                        onClick={() => setShowPhilosopherSidebar(false)}
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
                        <div className="min-w-0 flex-1">
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

              {/* Desktop Sidebar */}
              <aside className="hidden lg:block lg:w-[280px] rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur h-fit">
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
                        <div className="min-w-0 flex-1">
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

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-black/40 backdrop-blur h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] lg:h-[80vh]">
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activePhilosopher?.image_url}
                      alt={activePhilosopher?.name ?? "Philosopher"}
                      className="h-8 w-8 rounded-full object-cover sm:h-10 sm:w-10 lg:h-12 lg:w-12"
                    />
                    <div>
                      <p className="text-xs text-zinc-400 sm:text-sm">
                        Conversing with
                      </p>
                      <p className="text-sm font-semibold text-white sm:text-base lg:text-lg">
                        {activePhilosopher?.name ?? "Philosopher"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span className="hidden sm:inline">Online</span>
                  </div>
                </div>

                {/* Messages Container */}
                <div
                  ref={messagesContainerRef}
                  onScroll={() => {
                    const container = messagesContainerRef.current;
                    if (!container || isLoadingMore || !hasMoreMessages) {
                      return;
                    }
                    if (container.scrollTop <= 80) {
                      loadOlderMessages();
                    }
                  }}
                  className="chat-scrollbar flex-1 min-h-0 space-y-4 px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6 overflow-y-auto"
                >
                  {isLoadingMore ? (
                    <div className="flex items-center justify-center gap-2 text-xs text-amber-200/80">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-300/60 border-t-transparent" />
                      Loading older messages...
                    </div>
                  ) : null}
                  {chatMessages.map((message) => {
                    const isUser = message.sender === "user";
                    const philosopher = philosophers.find(
                      (entry) => String(entry.id) === String(message.sender),
                    );
                    return (
                      <div
                        key={message.id}
                        className={`flex items-end gap-2 sm:gap-3 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isUser && philosopher ? (
                          <img
                            src={philosopher.image_url}
                            alt={philosopher.name}
                            className="h-7 w-7 rounded-full object-cover sm:h-8 sm:w-8 lg:h-10 lg:w-10 shrink-0"
                          />
                        ) : null}
                        <div
                          className={`max-w-[85%] rounded-2xl px-3 py-2.5 text-sm shadow-lg sm:max-w-[75%] lg:max-w-[70%] ${
                            isUser
                              ? "bg-amber-300/90 text-zinc-950"
                              : "bg-white/10 text-zinc-100"
                          }`}
                        >
                          <p className="wrap-break-word">{message.text}</p>
                          {!message.text && isStreaming ? (
                            <div className="flex items-center gap-2">
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-300/60 border-t-transparent" />
                              <span className="text-xs text-amber-200/70">
                                Thinking
                              </span>
                            </div>
                          ) : null}
                          <span
                            className={`mt-1.5 block text-[10px] sm:text-xs ${
                              isUser ? "text-zinc-700" : "text-zinc-400"
                            }`}
                          >
                            {message.time}
                          </span>
                        </div>
                        {isUser ? (
                          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white sm:h-8 sm:w-8 lg:h-10 lg:w-10 shrink-0">
                            <User size={14} className="sm:h-4 sm:w-4" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                {/* Input Area */}
                <div
                  ref={inputRef}
                  className="border-t border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4"
                >
                  <div
                    className={`flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 sm:flex-row sm:items-center sm:px-4 sm:py-3 transition-all duration-150 ${
                      glow ? "glow-effect" : ""
                    }`}
                  >
                    <div className="flex flex-1 items-center gap-2 sm:gap-3">
                      <input
                        ref={input}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && !event.shiftKey) {
                            event.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder="Write a message..."
                        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-400"
                      />
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-2">
                      <button
                        onClick={handleSend}
                        disabled={!draft.trim() || isStreaming}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-300/20 text-amber-100 px-4 py-2 text-sm font-medium transition hover:bg-amber-300/30 disabled:opacity-50 disabled:cursor-not-allowed sm:hidden"
                      >
                        <Send size={16} />
                        Send
                      </button>
                      <button
                        aria-label="Send message"
                        onClick={handleSend}
                        disabled={!draft.trim() || isStreaming}
                        className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-100 transition hover:border-amber-200/40 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />

      <style jsx>{`
        @media (max-width: 640px) {
          .glow-effect {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
          }
        }
      `}</style>
    </main>
  );
}

export default ChatClient;
