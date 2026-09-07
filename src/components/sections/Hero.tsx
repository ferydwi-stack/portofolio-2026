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
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pickIndicatorRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useLenis();

  // Connect custom GSAP hero timeline with stable headlineRef
  useHeroTimeline({
    containerRef,
    headlineRef,
    subheadingRef,
    ctaRef,
    pickIndicatorRef,
  });

  const handleHeroStrum = () => {
    playGuitarChord(82.41);
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-12 lg:px-24 pt-24 sm:pt-28 pb-8 sm:pb-12 select-none"
    >
      {/* Top Meta Line */}
      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400 border-b border-zinc-800/80 pb-3 sm:pb-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 text-red-500 font-bold text-[11px] sm:text-xs">
          <Flame className="w-4 h-4 text-red-500 animate-pulse flex-shrink-0" />
          <span>PORTOFOLIO PENGEMBANG WEB // TAHUN 2026</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-zinc-400 text-[10px] sm:text-xs">
          <button
            onClick={handleHeroStrum}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-red-950/80 border border-red-800 text-red-400 hover:bg-red-600 hover:text-white transition-all cursor-pointer shadow-sm font-mono"
            data-cursor-text="SUARA"
          >
            <Zap className="w-3 h-3" />
            <span>AKORD GITAR</span>
          </button>
          <span className="hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline">REKAYASA WEB MODERN</span>
        </div>
      </div>

      {/* Responsive Headline (Left-aligned, wrapping cleanly on mobile and tablets) */}
      <div className="relative z-10 my-auto py-6 sm:py-8 w-full pl-1 sm:pl-4 lg:pl-10">
        {/* Stage Shadow & Contrast Gradient behind Headline */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none -z-10 rounded-3xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none -z-10" />

        <h1
          ref={headlineRef}
          className="headline-hero text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.95] font-normal uppercase tracking-wider select-none drop-shadow-2xl flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 gap-y-1"
          aria-label={PERSONAL_INFO.name}
        >
          <span className="text-[#f5f5f0] drop-shadow-md">FERY</span>
          <span className="text-[#f5f5f0] drop-shadow-md">DWI</span>
          <span className="text-red-500 hover:text-white transition-colors duration-300 drop-shadow-md">RAMADHI</span>
        </h1>

        {/* Backdrop Sub-Badge */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="px-2.5 sm:px-3 py-1 rounded bg-red-600/90 text-white font-mono text-[10px] sm:text-xs uppercase font-black tracking-widest shadow-[0_0_20px_rgba(255,42,59,0.6)]">
            FULLSTACK DEVELOPER
          </span>
          <span className="text-[11px] sm:text-sm font-mono text-zinc-400 uppercase tracking-widest">
            {PERSONAL_INFO.role}
          </span>
        </div>
      </div>

      {/* Interactive 6-String Guitar Fretboard Bar */}
      <div className="relative z-20 my-2 sm:my-4 p-2.5 sm:p-3 rounded-2xl bg-[#100d17]/80 border border-zinc-800/80 backdrop-blur-md">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500 mb-1 px-1">
          <span>FITUR INTERAKTIF: SENTUH / ARAHKAN KURSOR PADA SENAR UNTUK MEMETIK</span>
          <span className="text-red-400 font-bold hidden sm:inline">NADA SENAR: E A D G B E</span>
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

      {/* Asymmetric Subheading & CTA */}
      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-zinc-800/80">
        <div className="max-w-md space-y-1.5 text-left">
          <p className="text-[10px] sm:text-xs font-mono text-red-400 font-bold uppercase tracking-wider">
            {"//"} RINGKASAN PROFESIONAL
          </p>
          <p className="text-xs sm:text-base text-zinc-300 font-sans leading-relaxed">
            Mengembangkan aplikasi web modern dan sistem perangkat lunak yang berkinerja tinggi, responsif, serta berarsitektur kokoh dan terstruktur rapi.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-3 sm:gap-5 w-full sm:w-auto">
          <div ref={subheadingRef} className="text-left sm:text-right w-full sm:w-auto">
            <span className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-widest block">
              TERSEDIA UNTUK PEKERJAAN KONTRAK &amp; FULL-TIME
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-white tracking-wider">
              REMOTE // HYBRID // FULL-TIME
            </span>
          </div>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => {
                handleHeroStrum();
                scrollTo("#projects", { duration: 1.2 });
              }}
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_25px_rgba(255,42,59,0.5)] flex items-center justify-center gap-2 group cursor-pointer active:scale-95"
              data-cursor-text="PROYEK"
            >
              <span>LIHAT PORTOFOLIO PROYEK</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("#contact", { duration: 1.4 })}
              className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#14101e] border border-zinc-700 hover:border-red-500 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all cursor-pointer text-center"
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
