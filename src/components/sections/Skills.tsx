"use client";

import { useRef } from "react";
import { Radio, Flame } from "lucide-react";
import { SKILLS_SETLIST } from "@/lib/data/portfolioData";
import { useSkillsTimeline } from "@/animations/useSkillsTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playGuitarChord } from "@/lib/sound/guitarSynth";

const LEVEL_TO_SIZE: Record<number, string> = {
  5: "clamp(4rem, 9vw, 11rem)", // headliner
  4: "clamp(3rem, 7vw, 8rem)",
  3: "clamp(2.2rem, 5.5vw, 6rem)",
  2: "clamp(1.6rem, 4vw, 4.5rem)",
  1: "clamp(1.2rem, 3vw, 3rem)", // opener/support act
};

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Connect GSAP horizontal scroll pinning timeline
  useSkillsTimeline({ sectionRef, trackRef });

  const handlePlaySongChord = (index: number) => {
    const chords = [82.41, 110.0, 98.0, 123.47, 146.83, 164.81, 130.81, 87.31, 174.61, 73.42];
    playGuitarChord(chords[index % chords.length]);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-24 select-none ${
        prefersReducedMotion ? "py-24" : "min-h-screen"
      }`}
      data-cursor-drag="true"
    >
      {/* Background Stage Watermark Decal */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 font-[family-name:var(--font-anton)] text-[20vw] font-black text-white/[0.02] pointer-events-none select-none">
        SETLIST
      </div>

      {/* Header Bar */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>OFFICIAL CONCERT TOUR SETLIST</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-anton)] leading-none">
            Live Tour Setlist
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400">
            {prefersReducedMotion
              ? "Urutan lagu dan repertoar keahlian teknis (Headliner hingga Opener)."
              : "Scroll vertikal menggeser kertas setlist panggung dari lagu pertama hingga encore."}
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="text-red-400 font-bold bg-red-950/60 px-3 py-1 rounded border border-red-900/60">
            {SKILLS_SETLIST.length} ANTHEMS IN REPERTOIRE
          </span>
        </div>
      </div>

      {/* Horizontal Pinned Setlist Track (NOT badges, NOT pills) */}
      <div className="relative w-full overflow-visible py-6 z-10">
        <div
          ref={trackRef}
          className={`${
            prefersReducedMotion
              ? "flex flex-col gap-8"
              : "flex items-center gap-12 sm:gap-20 will-change-transform"
          }`}
        >
          {SKILLS_SETLIST.map((skill, index) => {
            const isHeadliner = skill.level >= 5;
            const isMidTier = skill.level === 4;

            return (
              <div
                key={skill.name}
                tabIndex={0}
                role="button"
                aria-label={`Track 0${index + 1}: ${skill.name}, Category ${skill.category}, Level ${skill.level} of 5`}
                onClick={() => handlePlaySongChord(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePlaySongChord(index);
                  }
                }}
                className={`relative group cursor-pointer transition-all duration-300 flex flex-col justify-between focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 ${
                  prefersReducedMotion
                    ? "w-full py-8 border-b border-zinc-800"
                    : "flex-none min-w-[340px] sm:min-w-[480px] lg:min-w-[580px] h-[460px] sm:h-[520px] p-8 sm:p-12 rounded-3xl bg-[#0c0914]/90 border-2 border-zinc-800/80 hover:border-red-500/80 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                }`}
                data-cursor-text="PLAY"
              >
                {/* Giant Transparent Track Number in Background */}
                <div className="absolute right-4 bottom-2 font-[family-name:var(--font-anton)] text-[16vw] sm:text-[14vw] font-black text-white/[0.04] group-hover:text-red-500/[0.08] transition-colors pointer-events-none select-none leading-none">
                  #{skill.track}
                </div>

                {/* Top Setlist Track Annotation */}
                <div className="relative z-10 flex items-center justify-between font-mono text-xs border-b border-zinc-800/80 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-red-500 font-black text-sm">
                      TRACK 0{index + 1}
                    </span>
                    <span className="text-zinc-500 font-bold tracking-wider">
                      {skill.category}
                    </span>
                  </div>

                  {isHeadliner && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-widest shadow-[0_0_15px_rgba(255,42,59,0.5)]">
                      <Flame className="w-3 h-3" />
                      <span>HEADLINER ENCORE</span>
                    </div>
                  )}
                </div>

                {/* Main Song Name: Huge Concert Typography with explicit level-to-size mapping */}
                <div className="relative z-10 my-auto py-6">
                  <h3
                    style={{ fontSize: LEVEL_TO_SIZE[skill.level] || LEVEL_TO_SIZE[3] }}
                    className={`uppercase font-[family-name:var(--font-anton)] tracking-tight leading-[0.88] transition-colors group-hover:text-red-400 ${
                      isHeadliner
                        ? "font-black text-white text-glow-crimson"
                        : isMidTier
                        ? "font-black text-zinc-200"
                        : "font-bold text-zinc-400"
                    }`}
                  >
                    {skill.name}
                  </h3>

                  {/* Stylized Red Marker Pen Underline for Headliners */}
                  {isHeadliner && (
                    <div className="mt-2 w-48 sm:w-64 h-2.5">
                      <svg viewBox="0 0 240 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-red-600">
                        <path
                          d="M 4 8 Q 60 2 120 7 T 236 4"
                          stroke="currentColor"
                          strokeWidth="5"
                          strokeLinecap="round"
                          opacity="0.9"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Bottom Setlist Production Notes */}
                <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-400">
                  <div className="flex items-center gap-4">
                    <span>TEMPO: {skill.bpm} BPM</span>
                    <span>&bull;</span>
                    <span className="text-red-400 font-bold">LEVEL {skill.level}/5</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 group-hover:text-white transition-colors">
                    CLICK TO HEAR CHORD ↵
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
