import React from "react";
import Link from "next/link";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

async function DashboardPage() {
  const session = await auth();
  const accessToken = (await cookies()).get("accessToken")?.value;
  const jwtSecret = process.env.JWT_SECRET;

  let hasCustomToken = false;
  if (accessToken && jwtSecret) {
    try {
      jwt.verify(accessToken, jwtSecret);
      hasCustomToken = true;
    } catch {
      hasCustomToken = false;
    }
  }

  if (!session?.user?.email && !hasCustomToken) {
    redirect("/");
  }

  const philosophers = await Prisma.philosophers.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      image_url: true,
      description: true,
    },
  });

  return (
    <main className="min-h-screen bg-linear-to-br from-zinc-900 to-black text-white">
      <Navbar />
      <section className="mx-auto w-full max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Choose a philosopher
        </h1>
        <p className="mt-2 text-sm text-zinc-300">
          Click a philosopher to start a conversation.
        </p>

        {philosophers.length === 0 ? (
          <div className="mt-10 rounded-lg border border-zinc-800 bg-zinc-900/60 p-6 text-sm text-zinc-300">
            No philosophers found yet.
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {philosophers.map((philosopher: any) => (
              <Link
                key={philosopher.id}
                href={`/chat?philosopherId=${philosopher.id}`}
                className="group rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 transition hover:border-zinc-600 hover:bg-zinc-900"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={philosopher.image_url}
                    alt={philosopher.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <h2 className="text-lg font-medium text-white group-hover:text-zinc-100">
                      {philosopher.name}
                    </h2>
                    <p className="mt-1 line-clamp-3 text-sm text-zinc-300">
                      {philosopher.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default DashboardPage;
