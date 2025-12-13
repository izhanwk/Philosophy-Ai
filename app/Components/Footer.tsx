import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      {/* FOOTER */}
      <footer className="py-4 sm:py-6 text-center border-t border-white/10">
        <p className="text-white/40 text-xs sm:text-sm">
          © {currentYear} Philosopher AI. All rights reserved.
        </p>
        <div className="mt-2 flex justify-center gap-4 text-white/30 text-[10px] sm:text-xs">
          <a href="#" className="hover:text-white/60 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white/60 transition-colors">
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
