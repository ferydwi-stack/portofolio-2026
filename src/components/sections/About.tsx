"use client";

import { useRef } from "react";
import Image from "next/image";
import { Flame, Award, Cpu } from "lucide-react";
import { PERSONAL_INFO, TECH_RIGS } from "@/lib/data/portfolioData";
import { useAboutTimeline } from "@/animations/useAboutTimeline";
import { useLenis } from "@/hooks/useLenis";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bioTextRef = useRef<HTMLDivElement>(null);
  const rigsRef = useRef<HTMLDivElement>(null);

  const { scrollTo } = useLenis();

  // Connect GSAP timeline
  useAboutTimeline({
    containerRef,
    photoRef,
    bioTextRef,
    rigsRef,
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full py-28 px-6 sm:px-12 lg:px-24 overflow-hidden select-none"
    >
      {/* Background Section Ambient Watermark */}
      <div className="absolute left-4 top-1/3 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[18vw] font-black text-white/[0.02] pointer-events-none select-none">
        BACKSTAGE
      </div>

      {/* Asymmetric Diagonal Split Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
        {/* Left Bio Column (Asymmetric 55% width) */}
        <div className="w-full lg:w-[58%] space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
              <Flame className="w-4 h-4 text-red-500" />
              <span>{"//"} FRONTMAN DOSSIER &amp; PHILOSOPHY</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white font-[family-name:var(--font-bebas)] leading-[0.92] tracking-wide">
              {PERSONAL_INFO.tagline}
            </h2>
          </div>

          {/* Staggered Bio Text Paragraphs */}
          <div ref={bioTextRef} className="space-y-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed">
            {PERSONAL_INFO.bioParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Tech Rigs / Studio Gear Arsenal */}
          <div className="pt-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold border-b border-zinc-800 pb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-red-500" />
                <span>{"//"} STUDIO ARSENAL &amp; TECH RIGS</span>
              </div>
              <span className="text-zinc-500 text-[10px]">ALL CHANNELS ACTIVE</span>
            </div>

            <div ref={rigsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TECH_RIGS.map((rig) => (
                <div
                  key={rig.category}
                  className="p-4 rounded-xl bg-[#110e19]/90 border border-zinc-800 hover:border-red-500/70 transition-all backdrop-blur-md group"
                >
                  <div className="mb-2">
                    <h3 className="text-xs font-bold font-mono uppercase text-white group-hover:text-red-400 transition-colors">
                      {rig.category}
                    </h3>
                    <p className="text-[10px] font-mono text-zinc-500">{rig.role}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                    {rig.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded border border-zinc-800 group-hover:border-zinc-700"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action to Certificates */}
          <div className="pt-2">
            <button
              onClick={() => scrollTo("#certificates", { duration: 1.2 })}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#14101e] border border-red-500/50 hover:bg-red-600 hover:text-white text-xs font-mono uppercase tracking-widest font-bold text-red-400 transition-all shadow-lg group cursor-pointer"
              data-cursor-text="CREDS"
            >
              <Award className="w-4 h-4" />
              <span>LIHAT BACKSTAGE PASS &amp; SERTIFIKAT RESMI</span>
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </button>
          </div>
        </div>

        {/* Right Photo Column (Rotated -8deg polaroid overlapping viewport edge) */}
        <div className="w-full lg:w-[38%] flex justify-center lg:justify-end relative">
          <div
            ref={photoRef}
            className="relative p-4 pb-10 bg-[#14101d] border-2 border-zinc-700 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-w-sm w-full transform -rotate-8 hover:rotate-0 transition-transform duration-500 group cursor-pointer"
          >
            {/* Gaffer Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-600/90 border border-zinc-500/50 rounded-xs transform rotate-2 shadow-md opacity-90 z-30" />

            {/* VIP Pass Stamp */}
            <div className="absolute top-6 right-6 z-30 px-3 py-1 bg-red-600 border border-red-400 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xs transform rotate-12 shadow-lg">
              ALL ACCESS PASS
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
                  DEVELOPER &amp; LEAD GUITARIST
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">STAGE READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
