"use client";

import { useRef } from "react";
import { Flame, Radio } from "lucide-react";
import { SKILLS_SETLIST } from "@/lib/data/portfolioData";
import { useSkillsTimeline } from "@/animations/useSkillsTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Connect custom GSAP horizontal pin timeline
  useSkillsTimeline({ sectionRef, trackRef });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-24 select-none ${
        prefersReducedMotion ? "py-24" : "min-h-screen"
      }`}
      data-cursor-drag="true"
    >
      {/* Header Sticky Bar */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>STAGE SOUNDCHECK SETLIST</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Live Tour Setlist
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400">
            {prefersReducedMotion
              ? "Daftar instrumen teknologi dan keahlian teknis."
              : "Scroll vertikal menggeser urutan setlist lagu teknis secara horizontal."}
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="text-red-400 font-bold bg-red-950/60 px-3 py-1 rounded border border-red-900/60">
            {SKILLS_SETLIST.length} TRACKS LOADED
          </span>
        </div>
      </div>

      {/* Setlist Track: Horizontal on desktop, vertical fallback on reduced-motion */}
      <div className="relative w-full overflow-visible py-4 z-10">
        <div
          ref={trackRef}
          className={`${
            prefersReducedMotion
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              : "flex items-end gap-6 sm:gap-8 will-change-transform"
          }`}
        >
          {SKILLS_SETLIST.map((item) => {
            // Non-uniform sizes: mapped from level 1-5
            const isHeadliner = item.level >= 5;
            const isMedium = item.level === 4;

            return (
              <div
                key={item.name}
                className={`relative rounded-3xl bg-[#110e19]/95 border-2 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl group cursor-pointer flex flex-col justify-between overflow-hidden ${
                  prefersReducedMotion ? "w-full min-h-[300px] p-6" : "flex-none"
                } ${
                  isHeadliner
                    ? "w-[330px] sm:w-[390px] h-[390px] sm:h-[430px] p-7 sm:p-9 border-red-500/80 hover:border-red-400 shadow-[0_0_35px_rgba(255,42,59,0.3)]"
                    : isMedium
                    ? "w-[280px] sm:w-[330px] h-[340px] sm:h-[370px] p-6 sm:p-7 border-zinc-700/80 hover:border-red-500/60"
                    : "w-[250px] sm:w-[290px] h-[310px] sm:h-[340px] p-5 sm:p-6 border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {/* Giant Transparent Background Track Number */}
                <div className="absolute right-2 bottom-0 font-[family-name:var(--font-bebas)] text-[110px] sm:text-[140px] font-black text-white/5 pointer-events-none select-none leading-none -mb-4">
                  {item.track}
                </div>

                {/* Top Setlist Meta */}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-black text-sm">
                      #{item.track}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-bold tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  {isHeadliner && (
                    <span className="px-2.5 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Flame className="w-2.5 h-2.5" />
                      HEADLINER
                    </span>
                  )}
                </div>

                {/* Main Song / Skill Title */}
                <div className="relative z-10 my-auto space-y-2">
                  <h3
                    className={`font-black uppercase text-white group-hover:text-red-400 transition-colors font-[family-name:var(--font-bebas)] tracking-wide leading-none ${
                      isHeadliner
                        ? "text-4xl sm:text-5xl"
                        : isMedium
                        ? "text-3xl sm:text-4xl"
                        : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span>TEMPO: {item.bpm} BPM</span>
                    <span>&bull;</span>
                    <span className="text-red-400 font-bold">LEVEL {item.level}/5</span>
                  </div>
                </div>

                {/* Level VU Meter Bar */}
                <div className="relative z-10 space-y-2 pt-3 border-t border-zinc-800/80 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                      PROFICIENCY
                    </span>
                    <span className="text-red-400 font-bold text-sm">
                      {item.proficiency}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-black/80 rounded-full overflow-hidden p-0.5 border border-zinc-800 flex gap-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 rounded-full shadow-[0_0_10px_rgba(255,42,59,0.5)] transition-all duration-500"
                      style={{ width: `${item.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
