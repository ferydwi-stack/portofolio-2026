"use client";

import { useState } from "react";
import { Disc3, Sliders, Volume2 } from "lucide-react";
import { GuitarStringDivider } from "./GuitarStringDivider";

interface SkillItem {
  track: string;
  name: string;
  tag: string;
  level: number;
  bpm: number;
}

export function Skills() {
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  const setOne: SkillItem[] = [
    { track: "01", name: "React.js", tag: "UI Component Master", level: 90, bpm: 135 },
    { track: "02", name: "Next.js", tag: "Fullstack App Engine", level: 88, bpm: 140 },
    { track: "03", name: "TypeScript", tag: "Strict Type Safety", level: 82, bpm: 128 },
    { track: "04", name: "Tailwind CSS", tag: "Fast Visual Styling", level: 95, bpm: 150 },
    { track: "05", name: "Flutter & Dart", tag: "Cross-Platform Mobile", level: 78, bpm: 120 },
  ];

  const setTwo: SkillItem[] = [
    { track: "06", name: "Node.js", tag: "Event-Driven Runtime", level: 86, bpm: 138 },
    { track: "07", name: "PHP & Laravel", tag: "Robust Web Framework", level: 80, bpm: 125 },
    { track: "08", name: "Express.js", tag: "High-Speed REST APIs", level: 85, bpm: 134 },
    { track: "09", name: "MySQL", tag: "Relational Database", level: 82, bpm: 130 },
    { track: "10", name: "PostgreSQL", tag: "Advanced SQL Engine", level: 74, bpm: 118 },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <GuitarStringDivider label="CONCERT SETLIST & TECH SPECTRUM" fret={5} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/40 px-3 py-1 rounded border border-red-900/50">
            <Sliders className="w-3.5 h-3.5" />
            <span>SOUNDCHECK &amp; MASTER CHANNELS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Live Performance Setlist
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-sans">
            Setiap instrumen teknologi dikuasai layaknya partitur lagu panggung — seimbang antara kecepatan eksekusi, kestabilan nada, dan ketelitian detail.
          </p>
        </div>

        {/* Setlist Boards (Dual Track Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* SET 1 */}
          <div className="bg-[#110f17] border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Header Tape */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-800 flex items-center justify-center text-red-400">
                  <Disc3 className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono uppercase text-white tracking-wide">
                    SET 01: FRONTEND ANTHEMS
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase">
                    Client-Side Interaction &amp; Rendering
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/70 border border-red-800/80 px-2 py-1 rounded">
                GAIN 9.5
              </span>
            </div>

            {/* Set 1 Tracks */}
            <div className="space-y-4">
              {setOne.map((item) => {
                const isHovered = activeTrack === item.name;
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setActiveTrack(item.name)}
                    onMouseLeave={() => setActiveTrack(null)}
                    className={`p-4 rounded-xl transition-all duration-300 border ${
                      isHovered
                        ? "bg-[#1d1726] border-red-500/70 shadow-[0_0_20px_rgba(255,42,59,0.2)]"
                        : "bg-[#14121b] border-zinc-800/80 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-red-500 tracking-wider">
                          TRK {item.track}
                        </span>
                        <div>
                          <span className="text-sm font-bold text-white tracking-wide block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-zinc-400 block font-sans">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-red-400">
                          {item.level}%
                        </span>
                        <span className="text-[10px] text-zinc-500 block">
                          {item.bpm} BPM
                        </span>
                      </div>
                    </div>

                    {/* LED VU-Meter Level Bar */}
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 flex gap-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 rounded-full transition-all duration-700"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SET 2 */}
          <div className="bg-[#110f17] border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            {/* Header Tape */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-400">
                  <Volume2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-mono uppercase text-white tracking-wide">
                    SET 02: BACKEND GROOVES
                  </h3>
                  <p className="text-[11px] font-mono text-zinc-500 uppercase">
                    Server Logic, Databases &amp; Services
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2 py-1 rounded">
                GAIN 9.0
              </span>
            </div>

            {/* Set 2 Tracks */}
            <div className="space-y-4">
              {setTwo.map((item) => {
                const isHovered = activeTrack === item.name;
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setActiveTrack(item.name)}
                    onMouseLeave={() => setActiveTrack(null)}
                    className={`p-4 rounded-xl transition-all duration-300 border ${
                      isHovered
                        ? "bg-[#1d1726] border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                        : "bg-[#14121b] border-zinc-800/80 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2 font-mono">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-amber-400 tracking-wider">
                          TRK {item.track}
                        </span>
                        <div>
                          <span className="text-sm font-bold text-white tracking-wide block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-zinc-400 block font-sans">
                            {item.tag}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-amber-400">
                          {item.level}%
                        </span>
                        <span className="text-[10px] text-zinc-500 block">
                          {item.bpm} BPM
                        </span>
                      </div>
                    </div>

                    {/* LED VU-Meter Level Bar */}
                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden p-0.5 flex gap-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 rounded-full transition-all duration-700"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
