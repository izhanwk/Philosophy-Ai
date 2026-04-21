"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

type FooterModalKey = "privacy" | "terms" | "contact";

const footerModalContent: Record<
  FooterModalKey,
  {
    title: string;
    body: React.ReactNode;
  }
> = {
  privacy: {
    title: "Privacy Policy",
    body: (
      <>
        <p>
          Philosopher AI only asks for the information needed to provide your
          account, authentication, billing, and chat experience.
        </p>
        <p>
          We use your information to keep the service secure, improve product
          quality, process subscriptions, and respond to support requests. We do
          not sell your personal information.
        </p>
        <p>
          Chat activity may be processed to generate responses and maintain your
          conversation history. Avoid sharing sensitive personal information in
          chats.
        </p>
      </>
    ),
  },
  terms: {
    title: "Terms of Service",
    body: (
      <>
        <p>
          By using Philosopher AI, you agree to use the service lawfully and
          responsibly. You are responsible for activity that occurs through your
          account.
        </p>
        <p>
          The app provides AI-generated philosophical conversations for learning
          and reflection. Responses may be incomplete or inaccurate and should
          not be treated as professional advice.
        </p>
        <p>
          We may update features, limits, pricing, or these terms as the service
          evolves. Continued use of the app means you accept the current terms.
        </p>
      </>
    ),
  },
  contact: {
    title: "Contact",
    body: (
      <>
        <p>
          For product questions, account help, billing support, or feedback,
          contact the Philosopher AI team.
        </p>
        <p>
          Email:{" "}
          <a
            href="mailto:hello@izhan.dev"
            className="font-medium text-amber-200 transition hover:text-amber-100"
          >
            hello@izhan.dev
          </a>
        </p>
        <p>
          Please include the email address connected to your account when asking
          for account or billing help.
        </p>
      </>
    ),
  },
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<FooterModalKey | null>(null);
  const modalContent = activeModal ? footerModalContent[activeModal] : null;

  return (
    <>
      <footer className="mt-auto border-t border-white/8 py-6 text-center sm:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <p className="text-xs text-zinc-600 sm:text-sm">
            © {currentYear}{" "}
            <span className="text-zinc-500">Philosopher AI</span>. All rights
            reserved.
          </p>
          <div className="mt-2.5 flex justify-center gap-5 text-[11px] sm:text-xs">
            <button
              type="button"
              onClick={() => setActiveModal("privacy")}
              className="text-zinc-600 transition-colors hover:text-amber-300/80 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("terms")}
              className="text-zinc-600 transition-colors hover:text-amber-300/80 cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("contact")}
              className="text-zinc-600 transition-colors hover:text-amber-300/80 cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="footer-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
            aria-label="Close popup"
          />

          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl shadow-black/60">
            <div className="border-b border-white/10 px-6 py-5">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="absolute cursor-pointer right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-zinc-900/80 text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                aria-label="Close popup"
              >
                <X size={16} />
              </button>
              <p className="text-xs uppercase tracking-[0.28em] text-amber-200/60">
                Philosopher AI
              </p>
              <h2
                id="footer-modal-title"
                className="mt-2 pr-10 text-xl font-semibold tracking-tight text-white"
              >
                {modalContent.title}
              </h2>
            </div>
            <div className="space-y-4 px-6 py-5 text-left text-sm leading-6 text-zinc-400">
              {modalContent.body}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
