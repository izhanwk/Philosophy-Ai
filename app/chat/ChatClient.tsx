"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { clientApi, requestWithRefresh } from "@/lib/clientApi";
import { User, Menu, X, Send, ArrowLeft, ArrowUpRight } from "lucide-react";

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

type BillingStatus = {
  plan: string;
  hasActiveSubscription: boolean;
  dailyLimit: number;
  usedMessagesLast24Hours: number;
  remainingMessages: number;
  proMonthlyPriceUsd: number;
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
  const [billingStatus, setBillingStatus] = useState<BillingStatus | null>(null);
  const [billingLoading, setBillingLoading] = useState<"checkout" | "portal" | null>(
    null,
  );
  const [limitNotice, setLimitNotice] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const shouldScrollToBottomRef = useRef(false);
  const shouldSnapToBottomRef = useRef(false);
  const loadOlderStateRef = useRef<{
    container: HTMLDivElement | null;
    previousScrollHeight: number;
    previousScrollTop: number;
  } | null>(null);

  const formatTime = (date: Date) => {
    const pad = (value: number) => String(value).padStart(2, "0");
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  //scrolling
  const scrollMessagesToBottom = (behavior: ScrollBehavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }
    container.scrollTo({ top: container.scrollHeight, behavior });
  };

  // const isNearBottom = (container: HTMLDivElement) => {
  //   const distanceFromBottom =
  //     container.scrollHeight - container.scrollTop - container.clientHeight;

  //   return distanceFromBottom < 120;
  // };

  const streamWithRefresh = async (input: RequestInfo, init?: RequestInit) => {
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
      const response = await requestWithRefresh<{
        hasMore?: boolean;
        messages?: Array<{
          content?: string | null;
          created_at?: string | null;
          id: number;
          role: string;
        }>;
      }>({
        url: "/api/chat/history",
        method: "POST",
        data: { philosopherId, cursor },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to load chat history", error);
    }
  };

  const loadBillingStatus = async () => {
    try {
      const response = await requestWithRefresh<BillingStatus>({
        url: "/api/billing/status",
        method: "GET",
      });
      setBillingStatus(response.data);
    } catch (error) {
      console.error("Failed to load billing status", error);
    }
  };

  const openBilling = async (endpoint: "/api/billing/checkout" | "/api/billing/portal") => {
    const action = endpoint.includes("portal") ? "portal" : "checkout";

    try {
      setBillingLoading(action);
      const response = await requestWithRefresh<{ message?: string; url?: string }>({
        url: endpoint,
        method: "POST",
      });
      if (!response.data?.url) {
        throw new Error(response.data?.message || "Billing request failed");
      }

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Failed to open billing flow", error);
      setLimitNotice("Billing is temporarily unavailable. Please try again.");
    } finally {
      setBillingLoading(null);
    }
  };

  const delay = async () => {
    input.current?.focus({ preventScroll: true });
    input.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setGlow(true);
    await new Promise((res) => setTimeout(res, 1000));
    setGlow(false);
  };

  useEffect(() => {
    delay();
    let isActive = true;
    const loadPhilosophers = async () => {
      try {
        const response = await clientApi.get("/api/philosophers", {
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
    loadBillingStatus();

    return () => {
      isActive = false;
    };
  }, []);

  useLayoutEffect(() => {
    if (!shouldSnapToBottomRef.current) {
      return;
    }

    shouldSnapToBottomRef.current = false;
    const animationId = requestAnimationFrame(() => {
      scrollMessagesToBottom(isStreaming ? "smooth" : "auto");
    });

    const animationTimeOut = setTimeout(() => {
      shouldSnapToBottomRef.current = true;
    }, 500);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(animationTimeOut);
    };
  }, [chatMessages, isStreaming]);

  const activePhilosopher = useMemo(() => {
    return (
      philosophers.find(
        (philosopher) => String(philosopher.id) === philosopherId,
      ) || philosophers[0]
    );
  }, [philosophers, philosopherId]);

  const philosophersById = useMemo(() => {
    return new Map(
      philosophers.map((philosopher) => [String(philosopher.id), philosopher]),
    );
  }, [philosophers]);

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
    shouldSnapToBottomRef.current = true;
    setChatMessages(mapped);
    setHasMoreMessages(Boolean(data?.hasMore));
    if (mapped.length) {
      setOldestCursor(mapped[0].createdAt ?? null);
    }
    shouldScrollToBottomRef.current = false;
  };

  const loadOlderMessages = async () => {
    if (isLoadingMore || !hasMoreMessages || !oldestCursor) {
      return;
    }

    const container = messagesContainerRef.current;
    loadOlderStateRef.current = {
      container,
      previousScrollHeight: container?.scrollHeight ?? 0,
      previousScrollTop: container?.scrollTop ?? 0,
    };

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

    setIsLoadingMore(false);
  };

  useEffect(() => {
    const loadOlderState = loadOlderStateRef.current;
    if (!loadOlderState?.container) {
      return;
    }

    const { container, previousScrollHeight, previousScrollTop } =
      loadOlderState;
    const newScrollHeight = container.scrollHeight;
    const target = newScrollHeight - previousScrollHeight + previousScrollTop;

    container.scrollTo({
      top: target,
      behavior: "smooth",
    });
    loadOlderStateRef.current = null;
  }, [chatMessages]);

  useEffect(() => {
    loadInitialMessages();
  }, [philosopherId]);

  const handleSend = async () => {
    const message = draft.trim();
    if (!message || !activePhilosopher || isStreaming) {
      return;
    }

    setDraft("");
    setLimitNotice(null);
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
    setBillingStatus((prev) =>
      prev
        ? {
            ...prev,
            usedMessagesLast24Hours: prev.usedMessagesLast24Hours + 1,
            remainingMessages: Math.max(prev.remainingMessages - 1, 0),
          }
        : prev,
    );
    shouldSnapToBottomRef.current = true;
    setIsStreaming(true);

    try {
      const response = await streamWithRefresh("/api/chat", {
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
        await loadBillingStatus();
        setLimitNotice(errorText);
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
          shouldSnapToBottomRef.current = true;
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
      shouldSnapToBottomRef.current = false;
      setIsStreaming(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.05)_0%,_transparent_60%),linear-gradient(to_bottom_right,_#18181b,_#09090b)] text-white flex flex-col">
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-amber-200/70">
                  Dialogue Room
                </p>
                <h1 className="text-2xl font-semibold text-white sm:text-3xl lg:text-4xl">
                  Philosophy{" "}
                  <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                    Chat
                  </span>
                </h1>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-200 transition hover:border-amber-400/30 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to dashboard
              </Link>
            </div>
            <p className="max-w-2xl text-sm text-zinc-300 sm:text-base">
              Explore timeless questions in a modern chat format. Each voice is
              grounded in a different tradition, so the conversation stays rich
              and multi-perspective.
            </p>
            <div className="h-px w-full bg-gradient-to-r from-amber-400/20 via-white/5 to-transparent" />
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
                className={`chat-scrollbar fixed left-0 top-0 z-50 h-full w-[280px] overflow-y-auto rounded-r-3xl border-r border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.12),_transparent_35%),linear-gradient(180deg,rgba(9,9,11,0.98),rgba(24,24,27,0.98))] p-4 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden sm:p-5 ${
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
              <aside className="hidden h-fit rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.08),_transparent_40%),rgba(255,255,255,0.03)] p-5 backdrop-blur lg:block lg:w-[300px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/60">
                      Thinkers
                    </p>
                    <h2 className="mt-2 text-lg font-semibold text-white">
                      Philosophers
                    </h2>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-400">
                    {philosophers.length} voices
                  </span>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  {philosophers.map((philosopher) => {
                    const isActive = philosopher.id === activePhilosopher?.id;
                    return (
                      <Link
                        key={philosopher.id}
                        href={`/chat?philosopherId=${philosopher.id}`}
                        className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
                          isActive
                            ? "border-amber-300/50 bg-amber-300/10"
                            : "border-white/10 bg-white/5 hover:border-amber-400/20 hover:bg-white/8"
                        }`}
                      >
                        <img
                          src={philosopher.image_url}
                          alt={philosopher.name}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {philosopher.name}
                          </p>
                          <p className="truncate text-xs text-zinc-400">
                            {philosopher.description}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-black/20 p-1.5 text-zinc-500 transition group-hover:border-amber-400/30 group-hover:text-amber-300">
                          <ArrowUpRight size={12} />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </aside>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.08),_transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(0,0,0,0.22))] backdrop-blur h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)] lg:h-[80vh]">
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 sm:px-4 lg:px-6 lg:py-4">
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
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] text-emerald-300 sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    <span className="hidden sm:inline">
                      {billingStatus
                        ? `${billingStatus.remainingMessages}/${billingStatus.dailyLimit} left`
                        : "Online"}
                    </span>
                  </div>
                </div>

                {/* Messages Container */}
                <div
                  key={philosopherId}
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
                    const philosopher = philosophersById.get(
                      String(message.sender),
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
                                Thinking...
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
                <div className="border-t border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                  {billingStatus ? (
                    <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-white">
                          {billingStatus.plan}
                        </p>
                        <p className="text-xs text-zinc-400 sm:text-sm">
                          {billingStatus.usedMessagesLast24Hours} of {billingStatus.dailyLimit} messages used in the last 24 hours
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          openBilling(
                            billingStatus.hasActiveSubscription
                              ? "/api/billing/portal"
                              : "/api/billing/checkout",
                          )
                        }
                        disabled={billingLoading !== null}
                        className="inline-flex items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold text-amber-100 transition hover:bg-amber-300/20 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {billingLoading === "checkout"
                          ? "Opening checkout..."
                          : billingLoading === "portal"
                            ? "Opening billing..."
                            : billingStatus.hasActiveSubscription
                              ? "Manage plan"
                              : `Upgrade to ${billingStatus.dailyLimit === 100 ? "Pro" : "100/day"} for $${billingStatus.proMonthlyPriceUsd}/mo`}
                      </button>
                    </div>
                  ) : null}

                  {limitNotice ? (
                    <div className="mb-3 flex flex-col gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-50 sm:flex-row sm:items-center sm:justify-between">
                      <p>{limitNotice}</p>
                      {billingStatus && !billingStatus.hasActiveSubscription ? (
                        <button
                          onClick={() => openBilling("/api/billing/checkout")}
                          disabled={billingLoading !== null}
                          className="inline-flex items-center justify-center rounded-full bg-amber-300 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {billingLoading === "checkout"
                            ? "Opening secure checkout..."
                            : "Unlock 100 messages/day"}
                        </button>
                      ) : null}
                    </div>
                  ) : null}

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
