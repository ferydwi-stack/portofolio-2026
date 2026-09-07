"use client";

import { useRef } from "react";
import { ArrowDownRight, Flame } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useHeroTimeline } from "@/animations/useHeroTimeline";
import { useLenis } from "@/hooks/useLenis";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineCharsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pickIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useLenis();

  // Connect custom GSAP hero timeline
  useHeroTimeline({
    containerRef,
    headlineCharsRef,
    subheadingRef,
    ctaRef,
    pickIndicatorRef,
  });

  const headline = PERSONAL_INFO.name; // "FERY DWI RAMADHI"
  const chars = headline.split("");

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-12 lg:px-24 pt-28 pb-16 select-none"
    >
      {/* Top Meta Line */}
      <div className="relative z-20 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          <span>STAGE SOUNDCHECK LIVE // TOUR 2026</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-500">
          <span>AMPLIFIER: 120W TUBE DISTORTION</span>
          <span>&bull;</span>
          <span>BPM: 145</span>
        </div>
      </div>

      {/* Massive Out-Of-Grid Headline (Left-aligned text-[14vw] overlapping 3D character) */}
      <div className="relative z-10 my-auto py-8 w-full">
        <h1
          className="text-[13vw] sm:text-[14vw] leading-[0.82] font-black uppercase text-white font-[family-name:var(--font-bebas)] tracking-tight whitespace-nowrap overflow-visible select-none drop-shadow-2xl"
          aria-label={headline}
        >
          {chars.map((char, index) => {
            // Characters around index 7-10 ("DWI R") are layered behind or in front
            const isOverlapBehind = index >= 6 && index <= 9;
            return (
              <span
                key={index}
                ref={(el) => {
                  headlineCharsRef.current[index] = el;
                }}
                className={`inline-block transition-colors hover:text-red-500 duration-300 ${
                  char === " " ? "mr-[2.5vw]" : ""
                } ${isOverlapBehind ? "relative -z-0 opacity-80 text-zinc-300" : "relative z-20"}`}
                style={{
                  willChange: "transform, opacity, filter",
                }}
              >
                {char}
              </span>
            );
          })}
        </h1>

        {/* Backdrop Sub-Badge */}
        <div className="mt-4 flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-red-600/90 text-white font-mono text-xs uppercase font-black tracking-widest shadow-[0_0_20px_rgba(255,42,59,0.6)]">
            HEADLINER
          </span>
          <span className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
            {PERSONAL_INFO.role}
          </span>
        </div>
      </div>

      {/* Asymmetric Subheading & CTA (Far Bottom-Right Aligned) */}
      <div className="relative z-20 flex flex-col sm:flex-row items-end justify-between gap-8 pt-8 border-t border-zinc-800/80">
        <div className="max-w-md space-y-2 text-left">
          <p className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
            {"//"} LIVE PERFORMANCE OVERVIEW
          </p>
          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
            Menghidupkan arsitektur fullstack modern dengan ketelitian ritme gitar rock. Performa tinggi, tata panggung visual imersif, dan kode yang tangguh.
          </p>
        </div>

        <div className="flex flex-col items-end gap-5">
          <div ref={subheadingRef} className="text-right">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              AVAILABLE FOR 2026 WORLD TOURS &amp; CONTRACTS
            </span>
            <span className="text-sm font-mono font-bold text-white tracking-wider">
              REMOTE // FULL-TIME // CONTRACT
            </span>
          </div>

          <div ref={ctaRef} className="flex items-center gap-4">
            <button
              onClick={() => scrollTo("#projects", { duration: 1.2 })}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_25px_rgba(255,42,59,0.5)] flex items-center gap-2 group cursor-pointer"
              data-cursor-text="DISC"
            >
              <span>EXPLORE ALBUMS</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("#contact", { duration: 1.4 })}
              className="px-6 py-3.5 rounded-xl bg-[#14101e] border border-zinc-700 hover:border-red-500 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
              data-cursor-text="CHAT"
            >
              STAGE DISPATCH
            </button>
          </div>
        </div>
      </div>

      {/* Custom Guitar Pick Scroll Indicator (Bottom Right) */}
      <div
        ref={pickIndicatorRef}
        onClick={() => scrollTo("#about", { duration: 1.2 })}
        className="absolute bottom-6 right-6 hidden md:flex flex-col items-center gap-1 cursor-pointer group z-30"
        title="Scroll Down to Backstage Bio"
        data-cursor-text="SCROLL"
      >
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest group-hover:text-red-400 transition-colors">
          SCROLL
        </span>
        <svg
          className="w-5 h-6 text-red-500 group-hover:text-red-400 transition-colors filter drop-shadow-[0_0_6px_rgba(255,42,59,0.6)]"
          viewBox="0 0 24 28"
          fill="currentColor"
        >
          <path d="M12 28 C4 20, 0 14, 0 6 C0 2, 4 0, 12 0 C20 0, 24 2, 24 6 C24 14, 20 20, 12 28 Z" />
        </svg>
      </div>
    </section>
  );
}
