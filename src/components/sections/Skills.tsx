"use client";

import { useRef, useMemo } from "react";
import { Radio, Flame, Sparkles } from "lucide-react";
import { SKILLS_SETLIST, Skill } from "@/lib/data/portfolioData";
import { useSkillsTimeline } from "@/animations/useSkillsTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playGuitarChord } from "@/lib/sound/guitarSynth";

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

  // Divide setlist into Side A and Side B album vinyl sleeves (5 tracks each)
  const columns = useMemo(() => {
    const half = Math.ceil(SKILLS_SETLIST.length / 2);
    return [
      {
        side: "SIDE A",
        subtitle: "LEAD FRONTEND & INTERACTIVE REPERTOIRE",
        watermark: "SIDE A",
        tracks: SKILLS_SETLIST.slice(0, half),
      },
      {
        side: "SIDE B",
        subtitle: "HEAVY BACKEND & MOBILE ARCHITECTURE",
        watermark: "SIDE B",
        tracks: SKILLS_SETLIST.slice(half),
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
      {/* Background Stage Watermark Decal */}
      <div
        className="absolute left-6 top-1/2 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[22vw] font-black text-white/[0.02] pointer-events-none select-none tracking-widest leading-none"
        aria-hidden="true"
      >
        TRACKLIST
      </div>

      {/* Header Bar */}
      <div className="pt-6 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>OFFICIAL CONCERT TOUR TRACKLIST</span>
          </div>
          <h2 className="headline-section text-4xl sm:text-6xl lg:text-7xl font-normal uppercase tracking-wider text-white leading-none">
            Live Tour Setlist
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400">
            {prefersReducedMotion
              ? "Repertoar album keahlian teknis (format tracklist cover vinyl)."
              : "Tracklist album panggung: geser horizontal untuk membalik Side A ke Side B."}
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="text-red-400 font-bold bg-red-950/60 px-3 py-1 rounded border border-red-900/60 tracking-wider">
            {SKILLS_SETLIST.length} TRACKS RECORDED
          </span>
        </div>
      </div>

      {/* Horizontal Pinned Tracklist Columns (§5.4) */}
      <div className="relative w-full overflow-visible py-4 z-10">
        <div
          ref={trackRef}
          className={`${
            prefersReducedMotion
              ? "flex flex-col gap-10"
              : "flex items-start gap-8 sm:gap-14 will-change-transform"
          }`}
        >
          {columns.map((column, colIdx) => (
            <div
              key={column.side}
              className={`relative rounded-3xl bg-[#0e0b16]/90 border-2 border-zinc-800/80 p-6 sm:p-10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between ${
                prefersReducedMotion
                  ? "w-full"
                  : "flex-none w-[92vw] sm:w-[580px] lg:w-[680px]"
              }`}
            >
              {/* Giant Faint Side Watermark in Background */}
              <div
                className="absolute right-6 bottom-4 font-[family-name:var(--font-bebas)] text-8xl sm:text-9xl font-normal text-white/[0.03] pointer-events-none select-none leading-none tracking-wider"
                aria-hidden="true"
              >
                {column.watermark}
              </div>

              {/* Sleeve Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-zinc-800 pb-4 mb-2">
                <div>
                  <span className="text-red-500 font-mono text-xs font-black tracking-widest">
                    {column.side}
                  </span>
                  <h3 className="headline-section text-xl sm:text-2xl text-zinc-200 uppercase tracking-wide">
                    {column.subtitle}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-400">
                  {colIdx === 0 ? "A" : "B"}
                </div>
              </div>

              {/* Track Rows (1 Skill = 1 Horizontal Row, §5.4) */}
              <div className="relative z-10 flex flex-col divide-y divide-zinc-800/50">
                {column.tracks.map((skill: Skill, idxInCol: number) => {
                  const globalIndex = colIdx * 5 + idxInCol;
                  const isHeadliner = skill.level >= 5;
                  const duration = getTrackDuration(globalIndex + 1, skill.bpm, skill.level);

                  return (
                    <div
                      key={skill.name}
                      tabIndex={0}
                      role="button"
                      aria-label={`Track 0${globalIndex + 1}: ${skill.name}, Level ${skill.level} of 5, Category ${skill.category}`}
                      onClick={() => handlePlaySongChord(globalIndex)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handlePlaySongChord(globalIndex);
                        }
                      }}
                      className={`group py-3.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer focus:outline-none focus:bg-red-950/40 focus:ring-1 focus:ring-red-500 ${
                        isHeadliner
                          ? "bg-red-950/20 hover:bg-red-950/40 border-l-2 border-red-500"
                          : "hover:bg-zinc-900/60"
                      }`}
                      data-cursor-text="PLAY"
                    >
                      {/* Left: Track Number + Headliner Icon */}
                      <div className="flex items-center gap-2 flex-shrink-0 min-w-[42px]">
                        <span className="font-mono text-xs sm:text-sm font-bold text-red-500">
                          {skill.track}
                        </span>
                        {isHeadliner && (
                          <Flame className="w-3.5 h-3.5 text-red-400 animate-pulse flex-shrink-0" />
                        )}
                      </div>

                      {/* Track Title (Uniform Font Size clamp(1.8rem, 3.2vw, 3rem) as §5.4 specifies) */}
                      <div className="flex items-baseline gap-2 flex-shrink-0">
                        <span className="headline-section text-xl sm:text-2xl lg:text-[1.75rem] uppercase text-white group-hover:text-red-400 transition-colors tracking-wide leading-none">
                          {skill.name}
                        </span>
                        <span className="hidden sm:inline-block font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                          [{skill.category}]
                        </span>
                      </div>

                      {/* Connecting Leader Line (Hairline Tracklist Dot Fill) */}
                      <div
                        className="flex-1 mx-2 border-b border-dotted border-zinc-800 group-hover:border-red-500/40 transition-colors min-w-[16px]"
                        aria-hidden="true"
                      />

                      {/* Level Indicator: 5 Signal Meter Dots + Progress Bar (§5.4) */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {/* 5 Dots Meter */}
                        <div className="flex items-center gap-1" aria-hidden="true">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <span
                              key={dot}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                dot <= skill.level
                                  ? "bg-red-500 shadow-[0_0_6px_#ff2a3b]"
                                  : "bg-zinc-700/60"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Miniature Progress Bar */}
                        <div
                          className="hidden md:block w-16 sm:w-20 h-1.5 rounded-full bg-zinc-800/80 overflow-hidden"
                          aria-hidden="true"
                        >
                          <div
                            className="h-full bg-red-500 rounded-full transition-all duration-300 group-hover:bg-red-400"
                            style={{ width: LEVEL_TO_BAR_FILL[skill.level] || "60%" }}
                          />
                        </div>

                        {/* Song Duration / Timecode Mono Label (§5.4) */}
                        <span className="font-mono text-[11px] text-zinc-400 group-hover:text-red-300 transition-colors">
                          [{duration}]
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sleeve Footer Note */}
              <div className="relative z-10 pt-4 mt-2 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-red-500" />
                  <span>MASTER STEREO // 44.1 kHz</span>
                </div>
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  CLICK ROW TO PLAY CHORD ↵
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
