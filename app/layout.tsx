import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://philosophy-ai-1bpi.vercel.app"),
  title: "Philosopher AI",
  description:
    "Speak with history's greatest philosophers through a modern AI chat experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Philosopher AI",
    description: "Explore the minds of history's greatest thinkers.",
    url: "/",
    siteName: "Philosopher AI",
    images: [
      {
        url: "/Preview.png",
        width: 1200,
        height: 630,
        alt: "PhilosophyAI preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philosopher AI",
    description: "Explore the minds of history's greatest thinkers.",
    images: ["/Preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
