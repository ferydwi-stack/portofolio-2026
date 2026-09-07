"use client";

import Image from "next/image";

export function WebGLFallback() {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-screen h-screen overflow-hidden bg-[#0a0a0c] flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Ambient concert stage lighting gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(225,29,46,0.18)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.12)_0%,transparent_60%)]" />

      {/* Static 2D Silhouette Poster Fallback */}
      <div className="relative w-[320px] sm:w-[420px] h-[480px] sm:h-[620px] opacity-80 animate-fade-in filter drop-shadow-[0_0_35px_rgba(255,42,59,0.3)]">
        <Image
          src="/images/guitarist-silhouette.svg"
          alt=""
          fill
          sizes="420px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
