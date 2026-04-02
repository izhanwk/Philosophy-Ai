import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-white/8 py-6 sm:py-8 text-center">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-xs text-zinc-600 sm:text-sm">
          © {currentYear}{" "}
          <span className="text-zinc-500">Philosopher AI</span>. All rights reserved.
        </p>
        <div className="mt-2.5 flex justify-center gap-5 text-[11px] sm:text-xs">
          <a href="#" className="text-zinc-600 transition-colors hover:text-amber-300/80">
            Privacy Policy
          </a>
          <a href="#" className="text-zinc-600 transition-colors hover:text-amber-300/80">
            Terms of Service
          </a>
          <a href="#" className="text-zinc-600 transition-colors hover:text-amber-300/80">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
