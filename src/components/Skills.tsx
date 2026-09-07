"use client";

import { useRef, useEffect } from "react";
import { Flame, Radio } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GuitarStringDivider } from "./GuitarStringDivider";

interface SetlistItem {
  track: string;
  name: string;
  category: string;
  level: number;
  bpm: number;
  featured?: boolean;
}

const setlist: SetlistItem[] = [
  { track: "01", name: "Tailwind CSS", category: "FAST VISUALS", level: 95, bpm: 155, featured: true },
  { track: "02", name: "React.js", category: "REACTIVE UI", level: 90, bpm: 140, featured: true },
  { track: "03", name: "Next.js", category: "FULLSTACK ENGINE", level: 88, bpm: 145, featured: true },
  { track: "04", name: "Node.js", category: "ASYNC RUNTIME", level: 86, bpm: 138, featured: true },
  { track: "05", name: "Express.js", category: "REST APIS", level: 85, bpm: 135 },
  { track: "06", name: "TypeScript", category: "STRICT TYPES", level: 82, bpm: 130 },
  { track: "07", name: "MySQL", category: "RELATIONAL DB", level: 82, bpm: 132 },
  { track: "08", name: "PHP & Laravel", category: "MVC CORE", level: 80, bpm: 125 },
  { track: "09", name: "Flutter & Dart", category: "MOBILE TOURING", level: 78, bpm: 120 },
  { track: "10", name: "PostgreSQL", category: "ACID ENGINE", level: 74, bpm: 118 },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !trackRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          scrub: 1.1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-12 select-none"
    >
      <GuitarStringDivider label="CONCERT SETLIST &bull; HORIZONTAL PINNED TRACK" fret={5} />

      {/* Header Sticky Bar */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>STAGE SOUNDCHECK SETLIST</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Live Tour Setlist
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400">
            Scroll vertikal Anda memutar setlist lagu keahlian secara horizontal.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span>PINNED STAGE</span>
          <span>•</span>
          <span className="text-red-400 font-bold">10 ANTHEMS LOADED</span>
        </div>
      </div>

      {/* Horizontal Scrolling Setlist Track */}
      <div className="relative w-full overflow-visible py-4">
        <div
          ref={trackRef}
          className="flex items-end gap-6 sm:gap-8 will-change-transform"
        >
          {setlist.map((item) => {
            const isMega = item.featured;
            return (
              <div
                key={item.name}
                className={`relative flex-none rounded-3xl p-6 sm:p-8 bg-[#110e19]/95 border-2 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl group cursor-pointer flex flex-col justify-between overflow-hidden ${
                  isMega
                    ? "w-[320px] sm:w-[380px] h-[380px] sm:h-[420px] border-red-500/80 hover:border-red-400 shadow-[0_0_30px_rgba(255,42,59,0.25)]"
                    : "w-[260px] sm:w-[310px] h-[320px] sm:h-[350px] border-zinc-800 hover:border-zinc-600"
                }`}
              >
                {/* Giant Transparent Background Track Number */}
                <div className="absolute right-2 bottom-0 font-[family-name:var(--font-bebas)] text-[120px] sm:text-[140px] font-black text-white/5 pointer-events-none select-none leading-none -mb-4">
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
                  {isMega && (
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md">
                      <Flame className="w-2.5 h-2.5" />
                      HEADLINER
                    </span>
                  )}
                </div>

                {/* Main Song / Skill Title */}
                <div className="relative z-10 my-auto space-y-2">
                  <h3
                    className={`font-black uppercase text-white group-hover:text-red-400 transition-colors font-[family-name:var(--font-bebas)] tracking-wide leading-none ${
                      isMega ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"
                    }`}
                  >
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                    <span>TEMPO: {item.bpm} BPM</span>
                    <span>•</span>
                    <span className="text-red-400 font-bold">GAIN MAX</span>
                  </div>
                </div>

                {/* Level VU Meter Bar */}
                <div className="relative z-10 space-y-2 pt-3 border-t border-zinc-800/80 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider">
                      PROFICIENCY LEVEL
                    </span>
                    <span className="text-red-400 font-bold text-sm">
                      {item.level}%
                    </span>
                  </div>

                  <div className="h-2.5 w-full bg-black/80 rounded-full overflow-hidden p-0.5 border border-zinc-800 flex gap-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 rounded-full shadow-[0_0_10px_rgba(255,42,59,0.5)]"
                      style={{ width: `${item.level}%` }}
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
