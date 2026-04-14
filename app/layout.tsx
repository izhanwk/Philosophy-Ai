import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { RouteTransitionProvider } from "./Components/RouteTransitionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl: string = "https://philosophy-ai-1bpi.vercel.app";

const imageUrl: string =
  "https://philosophy-ai-1bpi.vercel.app/opengraph-image";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Philosopher AI",
  description:
    "Speak with history's greatest philosophers through a modern AI chat experience.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Philosopher AI",
    description: "Explore the minds of history's greatest thinkers.",
    url: siteUrl,
    siteName: "Philosopher AI",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Philosopher AI social preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Philosopher AI",
    description: "Explore the minds of history's greatest thinkers.",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Philosopher AI social preview",
      },
    ],
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
        <SessionProvider>
          <RouteTransitionProvider>{children}</RouteTransitionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
