"use client";

import { useState } from "react";
import { Sliders, Volume2, Flame, Radio } from "lucide-react";
import { GuitarStringDivider } from "./GuitarStringDivider";

interface SkillTrack {
  track: string;
  name: string;
  category: "frontend" | "backend";
  role: string;
  level: number;
  bpm: number;
  freq: string;
}

export function Skills() {
  const [activeChannel, setActiveChannel] = useState<"frontend" | "backend">("frontend");
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [masterVolume, setMasterVolume] = useState<number>(10);

  const tracks: SkillTrack[] = [
    // Channel A: Frontend
    { track: "01", name: "React.js", category: "frontend", role: "Component Architecture", level: 90, bpm: 140, freq: "2.4kHz" },
    { track: "02", name: "Next.js", category: "frontend", role: "Fullstack App Router", level: 88, bpm: 145, freq: "5.0kHz" },
    { track: "03", name: "TypeScript", category: "frontend", role: "Static Type Safety", level: 82, bpm: 130, freq: "1.2kHz" },
    { track: "04", name: "Tailwind CSS", category: "frontend", role: "Responsive Styling", level: 95, bpm: 155, freq: "8.0kHz" },
    { track: "05", name: "Flutter & Dart", category: "frontend", role: "Mobile Application", level: 78, bpm: 125, freq: "3.2kHz" },

    // Channel B: Backend
    { track: "06", name: "Node.js", category: "backend", role: "Event Runtime & Async", level: 86, bpm: 138, freq: "250Hz" },
    { track: "07", name: "PHP & Laravel", category: "backend", role: "Enterprise MVC Engine", level: 80, bpm: 128, freq: "400Hz" },
    { track: "08", name: "Express.js", category: "backend", role: "RESTful Endpoints", level: 85, bpm: 136, freq: "800Hz" },
    { track: "09", name: "MySQL", category: "backend", role: "Relational Queries", level: 82, bpm: 132, freq: "100Hz" },
    { track: "10", name: "PostgreSQL", category: "backend", role: "ACID Database Systems", level: 74, bpm: 120, freq: "60Hz" },
  ];

  const currentTracks = tracks.filter((t) => t.category === activeChannel);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <GuitarStringDivider label="STUDIO AMP PROCESSOR &amp; SETLIST" fret={5} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Sliders className="w-3.5 h-3.5" />
            <span>SOUNDCHECK &amp; EQUALIZER CHANNELS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Stage Amplifier &amp; Setlist
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-sans">
            Setiap instrumen kode diatur dengan akurasi panggung — layaknya menyetel equalizer kepala amplifier tabung untuk mencapai artikulasi suara paling bertenaga.
          </p>
        </div>

        {/* Studio Amplifier Head Enclosure */}
        <div className="max-w-5xl mx-auto bg-[#0e0c15] border-4 border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Gold Piping & Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/70" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/70" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/70" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/70" />

          {/* Amp Faceplate Top Control Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b-2 border-zinc-800 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border-2 border-red-600/80 flex items-center justify-center text-red-400 shadow-[0_0_15px_#ff2a3b]">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-bebas)] text-white tracking-widest uppercase">
                  CUSTOM 100W TUBE HEAD
                </h3>
                <p className="text-[10px] font-mono text-zinc-500 tracking-wider">
                  ALL-VALVE MASTER PROCESSOR // HIGH GAIN
                </p>
              </div>
            </div>

            {/* Channel Toggle Switches */}
            <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-xl border border-zinc-800 font-mono text-xs">
              <button
                onClick={() => setActiveChannel("frontend")}
                className={`px-4 py-2 rounded-lg font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  activeChannel === "frontend"
                    ? "bg-red-600 text-white shadow-[0_0_15px_#ff2a3b]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>CH A: FRONTEND LEAD</span>
              </button>

              <button
                onClick={() => setActiveChannel("backend")}
                className={`px-4 py-2 rounded-lg font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  activeChannel === "backend"
                    ? "bg-amber-500 text-black shadow-[0_0_15px_#f59e0b]"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>CH B: BACKEND RHYTHM</span>
              </button>
            </div>
          </div>

          {/* Rotary Control Knobs Simulation Bar */}
          <div className="mb-10 p-4 rounded-2xl bg-[#09080e] border border-zinc-800/80 flex flex-wrap items-center justify-around gap-4 font-mono text-[10px]">
            {[
              { label: "GAIN", val: "10.0", rot: 135, color: "text-red-500" },
              { label: "BASS", val: "8.5", rot: 90, color: "text-amber-500" },
              { label: "MIDDLE", val: "7.0", rot: 45, color: "text-zinc-300" },
              { label: "TREBLE", val: "9.0", rot: 110, color: "text-zinc-300" },
              { label: "PRESENCE", val: "9.5", rot: 125, color: "text-red-400" },
              { label: "MASTER", val: `${masterVolume}.0`, rot: masterVolume * 14, color: "text-red-500" },
            ].map((knob) => (
              <div
                key={knob.label}
                onClick={() => knob.label === "MASTER" && setMasterVolume((v) => (v >= 10 ? 1 : v + 1))}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                title={knob.label === "MASTER" ? "Klik untuk memutar volume master" : undefined}
              >
                <span className="text-zinc-400 group-hover:text-white transition-colors">
                  {knob.label}
                </span>
                {/* Visual Rotary Knob */}
                <div className="relative w-12 h-12 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center shadow-lg group-hover:border-red-500 transition-colors">
                  {/* Indicator Line */}
                  <div
                    className="absolute top-1.5 w-1 h-3 bg-red-500 rounded-full transition-transform duration-300"
                    style={{ transform: `rotate(${knob.rot}deg)`, transformOrigin: "50% 20px" }}
                  />
                  <div className="w-4 h-4 rounded-full bg-black border border-zinc-600" />
                </div>
                <span className={`font-bold ${knob.color}`}>{knob.val}</span>
              </div>
            ))}
          </div>

          {/* Setlist Track Channels for Active Channel */}
          <div className="space-y-4">
            {currentTracks.map((item) => {
              const isHovered = hoveredTrack === item.name;
              return (
                <div
                  key={item.name}
                  onMouseEnter={() => setHoveredTrack(item.name)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  className={`p-5 rounded-2xl transition-all duration-300 border ${
                    isHovered
                      ? "bg-[#1c1628] border-red-500/80 shadow-[0_0_25px_rgba(255,42,59,0.25)] scale-[1.01]"
                      : "bg-[#13101b] border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded bg-red-950/70 border border-red-800/70 text-red-400 text-xs font-black">
                        TRK {item.track}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-black text-white tracking-wide">
                            {item.name}
                          </h4>
                          <span className="text-[10px] text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded">
                            {item.freq}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans">{item.role}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-zinc-500">{item.bpm} BPM</span>
                      <span className="font-bold text-red-400 text-sm bg-black/40 px-3 py-1 rounded-md border border-zinc-800">
                        {item.level}% PROFICIENT
                      </span>
                    </div>
                  </div>

                  {/* Multi-Segment LED VU Meter */}
                  <div className="h-3 w-full bg-black/70 rounded-full overflow-hidden p-0.5 border border-zinc-800 flex gap-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(255,42,59,0.5)]"
                      style={{ width: `${item.level}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
