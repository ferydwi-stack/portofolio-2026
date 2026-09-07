"use client";

import { useRef } from "react";
import { ArrowDownRight, Flame, Zap } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useHeroTimeline } from "@/animations/useHeroTimeline";
import { useLenis } from "@/hooks/useLenis";
import { InteractiveGuitarString } from "@/components/ui/InteractiveGuitarString";
import { playGuitarChord } from "@/lib/sound/guitarSynth";

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

  const headline = PERSONAL_INFO.name;
  const chars = headline.split("");

  const handleHeroStrum = () => {
    playGuitarChord(82.41);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-12 lg:px-24 pt-28 pb-12 select-none"
    >
      {/* Top Meta Line */}
      <div className="relative z-20 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2 text-red-500 font-bold">
          <Flame className="w-4 h-4 text-red-500 animate-pulse" />
          <span>PORTOFOLIO PENGEMBANG WEB // TAHUN 2026</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-zinc-400">
          <button
            onClick={handleHeroStrum}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-950/80 border border-red-800 text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm text-xs font-mono"
            data-cursor-text="SUARA"
          >
            <Zap className="w-3 h-3" />
            <span>AKORD GITAR</span>
          </button>
          <span>&bull;</span>
          <span>REKAYASA WEB MODERN</span>
        </div>
      </div>

      {/* Massive Out-Of-Grid Headline (Left-aligned text-[clamp(3.5rem,14vw,13rem)] overlapping 3D character) */}
      <div className="relative z-10 my-auto py-8 w-full pl-2 sm:pl-4 lg:pl-10">
        {/* Stage Shadow & Contrast Gradient behind Headline */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none -z-10 rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none -z-10" />

        <h1
          className="headline-hero text-[clamp(3rem,11vw,9.5rem)] leading-[0.9] font-normal uppercase text-white tracking-wider whitespace-nowrap overflow-visible select-none drop-shadow-2xl"
          aria-label={headline}
        >
          {chars.map((char, index) => {
            // Exactly 2 middle letters ("D" and "W") overlap behind the 3D character
            const isOverlapBehind = index === 5 || index === 6;
            return (
              <span
                key={index}
                ref={(el) => {
                  headlineCharsRef.current[index] = el;
                }}
                className={`inline-block transition-colors hover:text-red-500 duration-300 ${
                  char === " " ? "mr-[2vw]" : ""
                } ${
                  isOverlapBehind
                    ? "relative z-0 opacity-80 text-zinc-300"
                    : "relative z-20 text-[#f5f5f0] drop-shadow-md"
                }`}
              >
                {char}
              </span>
            );
          })}
        </h1>

        {/* Backdrop Sub-Badge */}
        <div className="mt-4 flex items-center gap-3">
          <span className="px-3 py-1 rounded bg-red-600/90 text-white font-mono text-xs uppercase font-black tracking-widest shadow-[0_0_20px_rgba(255,42,59,0.6)]">
            FULLSTACK DEVELOPER
          </span>
          <span className="text-xs sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
            {PERSONAL_INFO.role}
          </span>
        </div>
      </div>

      {/* Interactive 6-String Guitar Fretboard Bar */}
      <div className="relative z-20 my-4 p-3 rounded-2xl bg-[#100d17]/80 border border-zinc-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1 px-1">
          <span>FITUR INTERAKTIF: ARAHKAN KURSOR PADA SENAR UNTUK MEMETIK NADA</span>
          <span className="text-red-400 font-bold">NADA SENAR: E A D G B E</span>
        </div>
        <div className="space-y-0.5">
          {["E2 (82Hz)", "A2 (110Hz)", "D3 (147Hz)", "G3 (196Hz)", "B3 (247Hz)", "E4 (330Hz)"].map((label, idx) => (
            <InteractiveGuitarString
              key={idx}
              stringIndex={idx}
              label={label}
              gauge={3.2 - idx * 0.4}
            />
          ))}
        </div>
      </div>

      {/* Asymmetric Subheading & CTA (Far Bottom-Right Aligned) */}
      <div className="relative z-20 flex flex-col sm:flex-row items-end justify-between gap-8 pt-6 border-t border-zinc-800/80">
        <div className="max-w-md space-y-2 text-left">
          <p className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
            {"//"} RINGKASAN PROFESIONAL
          </p>
          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
            Mengembangkan aplikasi web modern dan sistem perangkat lunak yang berkinerja tinggi, responsif, serta berarsitektur kokoh dan terstruktur rapi.
          </p>
        </div>

        <div className="flex flex-col items-end gap-5">
          <div ref={subheadingRef} className="text-right">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              TERSEDIA UNTUK PEKERJAAN KONTRAK &amp; FULL-TIME
            </span>
            <span className="text-sm font-mono font-bold text-white tracking-wider">
              REMOTE // HYBRID // FULL-TIME
            </span>
          </div>

          <div ref={ctaRef} className="flex items-center gap-4">
            <button
              onClick={() => {
                handleHeroStrum();
                scrollTo("#projects", { duration: 1.2 });
              }}
              className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_25px_rgba(255,42,59,0.5)] flex items-center gap-2 group cursor-pointer active:scale-95"
              data-cursor-text="PROYEK"
            >
              <span>LIHAT PORTOFOLIO PROYEK</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("#contact", { duration: 1.4 })}
              className="px-6 py-3.5 rounded-xl bg-[#14101e] border border-zinc-700 hover:border-red-500 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
              data-cursor-text="KONTAK"
            >
              HUBUNGI SAYA
            </button>
          </div>
        </div>
      </div>

      {/* Custom Guitar Pick Scroll Indicator (Bottom Right) */}
      <div
        ref={pickIndicatorRef}
        onClick={() => scrollTo("#about", { duration: 1.2 })}
        className="absolute bottom-4 right-4 hidden md:flex flex-col items-center gap-1 cursor-pointer group z-30"
        title="Gulir ke Bawah ke Bagian Profil"
        data-cursor-text="GULIR"
      >
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest group-hover:text-red-400 transition-colors">
          Gulir ke bawah
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
