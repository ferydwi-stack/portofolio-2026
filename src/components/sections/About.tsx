"use client";

import { useRef } from "react";
import Image from "next/image";
import { Flame, Award } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useAboutTimeline } from "@/animations/useAboutTimeline";
import { useLenis } from "@/hooks/useLenis";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioTextRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useLenis();

  // Connect GSAP timeline
  useAboutTimeline({
    containerRef,
    photoRef,
    bioTextRef,
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full py-28 px-6 sm:px-12 lg:px-24 overflow-hidden select-none"
    >
      {/* Background Section Ambient Watermark */}
      <div className="absolute left-4 top-1/3 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[18vw] font-black text-white/[0.02] pointer-events-none select-none">
        PROFIL
      </div>

      {/* Asymmetric Diagonal Split Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
        {/* Left Bio Column (Asymmetric 55% width with solid stage charcoal backdrop) */}
        <div className="w-full lg:w-[58%] space-y-6 sm:space-y-8 relative z-20 p-5 sm:p-10 rounded-3xl bg-[#0a0a0c]/90 border border-zinc-800/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
              <Flame className="w-4 h-4 text-red-500" />
              <span>{"//"} PROFIL PROFESIONAL &amp; PENDEKATAN REKAYASA</span>
            </div>

            <h2 className="headline-section text-2xl sm:text-5xl lg:text-6xl font-normal uppercase text-white leading-[1.1] tracking-wide">
              {PERSONAL_INFO.tagline}
            </h2>
          </div>

          {/* Staggered Bio Text Paragraphs */}
          <div ref={bioTextRef} className="space-y-3.5 sm:space-y-4 text-sm sm:text-base lg:text-lg text-zinc-300 font-sans leading-relaxed">
            {PERSONAL_INFO.bioParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Action to Certificates */}
          <div className="pt-4 sm:pt-6 border-t border-zinc-800/80">
            <button
              onClick={() => scrollTo("#certificates", { duration: 1.2 })}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#14101e] border border-red-500/50 hover:bg-red-600 hover:text-white text-xs font-mono uppercase tracking-widest font-bold text-red-400 transition-all shadow-lg group cursor-pointer"
              data-cursor-text="SERTIFIKASI"
            >
              <Award className="w-4 h-4" />
              <span>LIHAT SERTIFIKASI &amp; LISENSI RESMI</span>
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Right Photo Column (Rotated -2deg on mobile, -8deg on tablet/desktop) */}
        <div className="w-full lg:w-[38%] flex justify-center lg:justify-end relative">
          <div
            ref={photoRef}
            className="relative p-3.5 sm:p-4 pb-8 sm:pb-10 bg-[#14101d] border-2 border-zinc-700 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-[280px] sm:max-w-sm w-full transform -rotate-2 sm:-rotate-8 hover:rotate-0 transition-transform duration-500 group cursor-pointer"
          >
            {/* Gaffer Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-600/90 border border-zinc-500/50 rounded-xs transform rotate-2 shadow-md opacity-90 z-30" />

            {/* Verification Stamp */}
            <div className="absolute top-6 right-6 z-30 px-3 py-1 bg-red-600 border border-red-400 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xs transform rotate-12 shadow-lg">
              TERVERIFIKASI
            </div>

            {/* Photo Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black border border-zinc-800">
              <Image
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover object-center filter contrast-110 saturate-95 group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-950/20 pointer-events-none" />
            </div>

            {/* Polaroid Bottom Note */}
            <div className="mt-4 px-2 flex items-center justify-between font-mono">
              <div>
                <p className="text-sm font-black text-white tracking-wider">
                  {PERSONAL_INFO.name}
                </p>
                <p className="text-xs text-red-400 font-bold">
                  {PERSONAL_INFO.major} // NPM: {PERSONAL_INFO.npm}
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">INDONESIA // 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
