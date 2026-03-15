"use client";

type ThemeLoaderProps = {
  label?: string;
};

export default function ThemeLoader({
  label = "Preparing your next conversation...",
}: ThemeLoaderProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/72 backdrop-blur-md">
      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute h-24 w-24 rounded-full border border-amber-200/15 bg-amber-200/5" />
          <div className="absolute h-24 w-24 animate-ping rounded-full border border-amber-300/30" />
          <div className="absolute h-16 w-16 rounded-full border border-amber-200/35" />
          <div className="absolute h-16 w-16 animate-spin rounded-full border-2 border-transparent border-t-amber-300 border-r-amber-100/70" />
          <div className="h-3 w-3 rounded-full bg-amber-200 shadow-[0_0_24px_rgba(252,211,77,0.9)]" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/80">
            Philosopher AI
          </p>
          <p className="text-sm text-zinc-200">{label}</p>
        </div>
      </div>
    </div>
  );
}
