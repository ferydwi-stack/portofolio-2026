"use client";

import { useRef, useMemo } from "react";
import { Radio, Flame, Sparkles } from "lucide-react";
import { SKILLS_SETLIST, Skill } from "@/lib/data/portfolioData";
import { useSkillsTimeline } from "@/animations/useSkillsTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playGuitarChord } from "@/lib/sound/guitarSynth";

import { TechLogo, getTechBrandColor } from "@/components/ui/TechLogos";

// Level to progress bar fill mapping (§5.4)
const LEVEL_TO_BAR_FILL: Record<number, string> = {
  5: "100%", // ●●●●● — headliner
  4: "80%",  // ●●●●○
  3: "60%",  // ●●●○○
  2: "40%",  // ●●○○○
  1: "20%",  // ●○○○○ — opener/support act
};

// Deterministic track duration formatting based on track & level
function getTrackDuration(trackNum: number, bpm: number, level: number): string {
  const baseMinutes = Math.min(5, Math.max(3, level));
  const baseSeconds = ((trackNum * 17 + bpm * 3) % 48) + 10;
  return `0${baseMinutes}:${baseSeconds < 10 ? "0" : ""}${baseSeconds}`;
}

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Connect GSAP horizontal scroll pinning timeline
  useSkillsTimeline({ sectionRef, trackRef });

  // Divide skills into Frontend & Mobile UI and Backend, Database & Systems
  const columns = useMemo(() => {
    return [
      {
        side: "FRONTEND & MOBILE UI",
        subtitle: "Pengembangan Antarmuka Web & Mobile",
        watermark: "FRONTEND",
        tracks: SKILLS_SETLIST.filter((s) => s.group === "frontend"),
      },
      {
        side: "BACKEND, DATABASE & SYSTEMS",
        subtitle: "Arsitektur Server, Microservices & Basis Data",
        watermark: "BACKEND",
        tracks: SKILLS_SETLIST.filter((s) => s.group === "backend"),
      },
    ];
  }, []);

  const handlePlaySongChord = (index: number) => {
    const chords = [82.41, 110.0, 98.0, 123.47, 146.83, 164.81, 130.81, 87.31, 174.61, 73.42];
    playGuitarChord(chords[index % chords.length]);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full flex flex-col justify-center overflow-hidden px-4 sm:px-10 lg:px-20 select-none ${
        prefersReducedMotion ? "py-24" : "min-h-screen"
      }`}
      data-cursor-drag="true"
    >
      {/* Background Section Watermark */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[20vw] font-black text-white/[0.02] pointer-events-none select-none tracking-widest leading-none"
        aria-hidden="true"
      >
        KEAHLIAN
      </div>

      {/* Header Bar */}
      <div className="pt-6 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>KEAHLIAN TEKNOLOGI &amp; STACK PENGEMBANGAN</span>
          </div>
          <h2 className="headline-section text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-wider text-white leading-none">
            Penguasaan Teknologi &amp; Tools
          </h2>
          <p className="text-xs sm:text-sm font-sans text-zinc-400">
            {prefersReducedMotion
              ? "Daftar teknologi dan kerangka kerja yang dikuasai untuk pengembangan aplikasi end-to-end."
              : "Daftar teknologi utama: geser horizontal untuk melihat spesialisasi frontend dan backend."}
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="text-red-400 font-bold bg-red-950/60 px-3 py-1 rounded border border-red-900/60 tracking-wider">
            {SKILLS_SETLIST.length} TEKNOLOGI UTAMA
          </span>
        </div>
      </div>

      {/* Horizontal Pinned Columns */}
      <div className="relative w-full overflow-visible py-4 z-10">
        <div
          ref={trackRef}
          className={`${
            prefersReducedMotion
              ? "flex flex-col gap-8"
              : "flex items-start gap-8 sm:gap-12 will-change-transform"
          }`}
        >
          {columns.map((column, colIdx) => (
            <div
              key={column.side}
              className={`relative rounded-3xl bg-[#0e0b16]/95 border-2 border-zinc-800 p-5 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between ${
                prefersReducedMotion
                  ? "w-full"
                  : "flex-none w-[94vw] sm:w-[600px] lg:w-[680px] xl:w-[720px]"
              }`}
            >
              {/* Giant Faint Side Watermark in Background */}
              <div
                className="absolute right-6 bottom-4 font-[family-name:var(--font-bebas)] text-7xl sm:text-8xl font-normal text-white/[0.03] pointer-events-none select-none leading-none tracking-wider"
                aria-hidden="true"
              >
                {column.watermark}
              </div>

              {/* Sleeve Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-3 mb-2">
                <div>
                  <span className="text-red-500 font-mono text-xs font-bold tracking-widest uppercase">
                    {column.side}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-200 tracking-wide font-sans">
                    {column.subtitle}
                  </h3>
                </div>
                <div className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-400 font-bold">
                  0{colIdx + 1}
                </div>
              </div>

              {/* Track Rows (Compact font size, official online tech logo) */}
              <div className="relative z-10 flex flex-col divide-y divide-zinc-800/50">
                {column.tracks.map((skill: Skill, idxInCol: number) => {
                  const globalIndex = colIdx * 5 + idxInCol;
                  const isHeadliner = skill.level >= 5;
                  const brand = getTechBrandColor(skill.name);

                  return (
                    <div
                      key={skill.name}
                      tabIndex={0}
                      role="button"
                      aria-label={`${skill.name}, Tingkat ${skill.level} dari 5, Kategori ${skill.category}`}
                      onClick={() => handlePlaySongChord(globalIndex)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handlePlaySongChord(globalIndex);
                        }
                      }}
                      className={`group py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-2 sm:gap-3 cursor-pointer focus:outline-none focus:bg-zinc-900 focus:ring-1 focus:ring-red-500 ${
                        isHeadliner
                          ? "bg-red-950/15 hover:bg-zinc-900/80 border-l-2 border-red-500"
                          : "hover:bg-zinc-900/80"
                      }`}
                      data-cursor-text="PLAY"
                    >
                      {/* Left: Track Number + Official Online Tech Logo Badge */}
                      <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
                        <span className="font-mono text-[11px] sm:text-xs font-bold text-zinc-500 group-hover:text-red-400 transition-colors w-4 sm:w-5">
                          {skill.track}
                        </span>

                        {/* Official Online Tech Logo Container */}
                        <div
                          className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl ${brand.bg} border ${brand.border} flex items-center justify-center p-1 sm:p-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                        >
                          <TechLogo name={skill.name} size={18} />
                        </div>
                      </div>

                      {/* Skill Name + Category (Clean, readable text size) */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors tracking-wide font-sans">
                            {skill.name}
                          </span>
                          {isHeadliner && (
                            <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 animate-pulse flex-shrink-0" />
                          )}
                        </div>
                        <span className="font-mono text-[8px] sm:text-[10px] text-zinc-400 uppercase tracking-wider">
                          [{skill.category}]
                        </span>
                      </div>

                      {/* Connecting Leader Line (Dotted hairline) */}
                      <div
                        className="flex-1 mx-2 border-b border-dotted border-zinc-800 group-hover:border-zinc-700 transition-colors hidden md:block min-w-[20px]"
                        aria-hidden="true"
                      />

                      {/* Level Indicator: 5 Dots + Percentage Proficiency */}
                      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 ml-auto md:ml-0">
                        {/* 5 Dots Meter */}
                        <div className="hidden xs:flex items-center gap-1" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <span
                              key={dot}
                              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                                dot <= skill.level
                                  ? "bg-red-500 shadow-[0_0_6px_#ff2a3b]"
                                  : "bg-zinc-700/60"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Proficiency Percentage + Track Duration */}
                        <div className="flex items-center gap-1 sm:gap-1.5 font-mono text-[11px] sm:text-xs">
                          <span className="font-bold text-red-400 bg-red-950/40 px-1.5 sm:px-2 py-0.5 rounded border border-red-900/40 min-w-[34px] sm:min-w-[38px] text-center">
                            {skill.proficiency}%
                          </span>
                          <span className="text-[10px] text-zinc-500 hidden sm:inline-block">
                            [{`0${Math.floor(skill.proficiency / 22)}:${(skill.bpm * 3 % 60).toString().padStart(2, '0')}`}]
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sleeve Footer Note */}
              <div className="relative z-10 pt-3 mt-2 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-red-500" />
                  <span>STANDAR REKAYASA // PRODUCTION-READY</span>
                </div>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  KLIK UNTUK SUARA ↵
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
