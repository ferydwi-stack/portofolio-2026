"use client";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-[99999] px-4 py-2 bg-red-600 text-white font-mono text-xs uppercase tracking-widest font-black rounded-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  );
}
