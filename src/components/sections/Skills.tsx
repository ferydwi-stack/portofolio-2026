"use client";

import { useState } from "react";
import { Flame, Disc, Zap, Volume2 } from "lucide-react";
import { SKILLS_SETLIST } from "@/lib/data/portfolioData";
import { playGuitarChord, playStompClick } from "@/lib/sound/guitarSynth";

interface PedalTheme {
  pedalType: string;
  bodyColor: string;
  accentColor: string;
  ledColor: string;
  knobs: string[];
}

const PEDAL_THEMES: Record<string, PedalTheme> = {
  "Tailwind CSS": {
    pedalType: "TURBO DISTORTION",
    bodyColor: "from-red-900/90 to-black",
    accentColor: "border-red-500/70",
    ledColor: "bg-red-500 shadow-[0_0_12px_#ff2a3b]",
    knobs: ["SPEED", "TONE", "LEVEL"],
  },
  "React.js": {
    pedalType: "TUBE OVERDRIVE",
    bodyColor: "from-cyan-950/90 to-black",
    accentColor: "border-cyan-500/70",
    ledColor: "bg-cyan-400 shadow-[0_0_12px_#22d3ee]",
    knobs: ["DRIVE", "REACT", "LEVEL"],
  },
  "Next.js": {
    pedalType: "STACK PREAMP",
    bodyColor: "from-amber-950/90 to-black",
    accentColor: "border-amber-500/70",
    ledColor: "bg-amber-400 shadow-[0_0_12px_#fbbf24]",
    knobs: ["SSR GAIN", "OPTIMIZE", "OUTPUT"],
  },
  "Node.js": {
    pedalType: "SUSTAIN FUZZ",
    bodyColor: "from-emerald-950/90 to-black",
    accentColor: "border-emerald-500/70",
    ledColor: "bg-emerald-400 shadow-[0_0_12px_#34d399]",
    knobs: ["SUSTAIN", "EVENT", "VOLUME"],
  },
  "Express.js": {
    pedalType: "TIME DELAY",
    bodyColor: "from-purple-950/90 to-black",
    accentColor: "border-purple-500/70",
    ledColor: "bg-purple-400 shadow-[0_0_12px_#c084fc]",
    knobs: ["ROUTING", "FEEDBACK", "MIX"],
  },
  "TypeScript": {
    pedalType: "STRICT COMPRESSOR",
    bodyColor: "from-blue-950/90 to-black",
    accentColor: "border-blue-500/70",
    ledColor: "bg-blue-400 shadow-[0_0_12px_#60a5fa]",
    knobs: ["TYPES", "ATTACK", "STRICT"],
  },
  "MySQL": {
    pedalType: "PARAMETRIC EQ",
    bodyColor: "from-orange-950/90 to-black",
    accentColor: "border-orange-500/70",
    ledColor: "bg-orange-400 shadow-[0_0_12px_#fb923c]",
    knobs: ["INDEX", "QUERY", "GAIN"],
  },
  "PHP & Laravel": {
    pedalType: "VINTAGE CHORUS",
    bodyColor: "from-rose-950/90 to-black",
    accentColor: "border-rose-500/70",
    ledColor: "bg-rose-400 shadow-[0_0_12px_#fb7185]",
    knobs: ["DEPTH", "MVC", "RATE"],
  },
  "Flutter & Dart": {
    pedalType: "WHAMMY SHIFTER",
    bodyColor: "from-indigo-950/90 to-black",
    accentColor: "border-indigo-500/70",
    ledColor: "bg-indigo-400 shadow-[0_0_12px_#818cf8]",
    knobs: ["PITCH", "DART", "RANGE"],
  },
  "PostgreSQL": {
    pedalType: "BASS PREAMP",
    bodyColor: "from-teal-950/90 to-black",
    accentColor: "border-teal-500/70",
    ledColor: "bg-teal-400 shadow-[0_0_12px_#2dd4bf]",
    knobs: ["ACID", "TRANSACT", "DRIVE"],
  },
};

export function Skills() {
  const [activePedals, setActivePedals] = useState<Record<string, boolean>>({
    "Tailwind CSS": true,
    "React.js": true,
    "Next.js": true,
    "Node.js": true,
    "TypeScript": true,
  });

  const [activePreset, setActivePreset] = useState<"ALL" | "FRONTEND" | "BACKEND" | "MOBILE">("ALL");

  const togglePedal = (name: string, rootFreq: number) => {
    playStompClick();
    const nextState = !activePedals[name];
    setActivePedals((prev) => ({ ...prev, [name]: nextState }));
    if (nextState) {
      playGuitarChord(rootFreq);
    }
  };

  const handleTestAllChords = () => {
    playGuitarChord(82.41);
  };

  const filteredSkills = SKILLS_SETLIST.filter((skill) => {
    if (activePreset === "ALL") return true;
    if (activePreset === "FRONTEND") {
      return ["Tailwind CSS", "React.js", "TypeScript"].includes(skill.name);
    }
    if (activePreset === "BACKEND") {
      return ["Next.js", "Node.js", "Express.js", "MySQL", "PHP & Laravel", "PostgreSQL"].includes(skill.name);
    }
    if (activePreset === "MOBILE") {
      return ["Flutter & Dart"].includes(skill.name);
    }
    return true;
  });

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 px-6 sm:px-12 lg:px-24 overflow-hidden select-none"
    >
      {/* Background Stage Watermark */}
      <div className="absolute left-6 top-1/3 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[16vw] font-black text-white/[0.02] pointer-events-none select-none">
        PEDALBOARD
      </div>

      {/* Header & Master Amp Console */}
      <div className="relative z-10 mb-12 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1.5 rounded-full border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.3)]">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>CUSTOM GUITAR PEDALBOARD &bull; EFFECTS RIG</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-white font-[family-name:var(--font-bebas)] tracking-wider leading-none">
              Stage Soundboard &amp; Stompbox Arsenal
            </h2>
            <p className="max-w-2xl text-sm sm:text-base font-sans text-zinc-300 leading-relaxed">
              Setiap keahlian direkayasa sebagai modul pedal efek gitar panggung. Injak footswitch untuk mengaktifkan modul dan dengarkan harmonisasi frekuensinya.
            </p>
          </div>

          {/* Master Channel Controls */}
          <div className="p-4 rounded-2xl bg-[#110e19]/95 border-2 border-zinc-800 backdrop-blur-xl shadow-2xl flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 pr-4 border-r border-zinc-800">
              <Volume2 className="w-4 h-4 text-red-500" />
              <div className="text-left font-mono">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">STAGE MASTER</span>
                <span className="text-xs font-black text-white">120W TUBE RIG</span>
              </div>
            </div>

            {/* Test Riff Stomp Button */}
            <button
              onClick={handleTestAllChords}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_20px_rgba(255,42,59,0.5)] flex items-center gap-2 cursor-pointer active:scale-95"
              data-cursor-text="SHRED"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>STOMP POWER CHORD</span>
            </button>
          </div>
        </div>

        {/* Channel Preset Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-zinc-800/80 font-mono text-xs">
          <span className="text-zinc-500 text-[10px] uppercase tracking-wider mr-2">CHANNELS:</span>
          {(["ALL", "FRONTEND", "BACKEND", "MOBILE"] as const).map((preset) => (
            <button
              key={preset}
              onClick={() => setActivePreset(preset)}
              className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                activePreset === preset
                  ? "bg-red-600 text-white border-red-500 font-bold shadow-[0_0_15px_rgba(255,42,59,0.4)]"
                  : "bg-[#14101e] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white"
              }`}
            >
              {preset}
            </button>
          ))}
          <span className="ml-auto text-zinc-500 text-[11px] hidden sm:inline">
            CLICK FOOTSWITCH TO TOGGLE EFFECT
          </span>
        </div>
      </div>

      {/* Realistic Pedalboard Chassis Grid */}
      <div className="relative z-10 p-6 sm:p-10 rounded-3xl bg-[#09070d]/90 border-2 border-zinc-800 shadow-[0_30px_70px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        {/* Pedalboard Flight Case Rail Decals */}
        <div className="absolute top-3 left-6 right-6 h-1 bg-zinc-800/60 rounded-full" />
        <div className="absolute bottom-3 left-6 right-6 h-1 bg-zinc-800/60 rounded-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-7">
          {filteredSkills.map((skill, index) => {
            const theme = PEDAL_THEMES[skill.name] || {
              pedalType: "OVERDRIVE",
              bodyColor: "from-zinc-900 to-black",
              accentColor: "border-zinc-700",
              ledColor: "bg-red-500",
              knobs: ["GAIN", "TONE", "LEVEL"],
            };

            const isOn = activePedals[skill.name] ?? true;
            const rootFreq = 82.41 * Math.pow(1.059463, index * 2); // Varied musical chords

            return (
              <div
                key={skill.name}
                className={`relative rounded-2xl bg-gradient-to-b ${theme.bodyColor} border-2 ${
                  isOn ? theme.accentColor : "border-zinc-800 opacity-70"
                } p-5 flex flex-col justify-between h-[390px] shadow-2xl transition-all duration-300 group`}
              >
                {/* Top Jack Sockets (Visual 1/4" audio input/output) */}
                <div className="flex justify-between items-center -mt-7 -mx-1 mb-2">
                  <div className="w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600 shadow-inner flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                  <div className="w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-600 shadow-inner flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                </div>

                {/* Stompbox Head: Jewel LED Light + Pedal Name */}
                <div>
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[9px] font-black tracking-widest text-zinc-400 uppercase">
                      NO. 0{skill.track}
                    </span>
                    {/* Glowing LED Jewel Light */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] text-zinc-500 font-bold">{isOn ? "ACTIVE" : "BYPASS"}</span>
                      <div
                        className={`w-3 h-3 rounded-full border border-white/40 transition-all duration-300 ${
                          isOn ? theme.ledColor : "bg-zinc-800"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 className="text-xl sm:text-2xl font-black uppercase text-white font-[family-name:var(--font-bebas)] tracking-wide group-hover:text-red-400 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-[9px] font-mono font-bold text-red-400 tracking-wider">
                      {theme.pedalType}
                    </p>
                  </div>
                </div>

                {/* Rotary Knobs Section */}
                <div className="py-3 px-2 rounded-xl bg-black/50 border border-zinc-800/80 grid grid-cols-3 gap-2 text-center">
                  {theme.knobs.map((knobLabel, kIdx) => {
                    const knobAngles = [25, 65, 45];
                    const angle = knobAngles[kIdx % knobAngles.length];
                    return (
                      <div key={knobLabel} className="flex flex-col items-center">
                        {/* Chrome Knurled Dial */}
                        <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-600 shadow-lg relative flex items-center justify-center group-hover:rotate-12 transition-transform">
                          {/* Dial Marker Indicator */}
                          <div
                            className="absolute top-1 w-0.5 h-2 bg-white rounded-full"
                            style={{ transform: `rotate(${angle}deg)` }}
                          />
                        </div>
                        <span className="text-[8px] font-mono text-zinc-400 mt-1 uppercase font-bold">
                          {knobLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* VU Meter Proficiency Display */}
                <div className="space-y-1 font-mono">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-zinc-500">GAIN / LEVEL</span>
                    <span className="text-red-400 font-bold">{skill.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-black rounded-full overflow-hidden p-0.5 border border-zinc-800 flex gap-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOn
                          ? "bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500"
                          : "bg-zinc-800"
                      }`}
                      style={{ width: isOn ? `${skill.proficiency}%` : "0%" }}
                    />
                  </div>
                </div>

                {/* Stomp Footswitch Section (Clickable) */}
                <div className="pt-2 border-t border-zinc-800/80 flex flex-col items-center">
                  <button
                    onClick={() => togglePedal(skill.name, rootFreq)}
                    className="w-14 h-14 rounded-full bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-600 border-4 border-zinc-800 shadow-[0_4px_10px_rgba(0,0,0,0.8)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center cursor-pointer group/switch"
                    aria-label={`Stomp pedal ${skill.name}`}
                    data-cursor-text="STOMP"
                  >
                    <div className="w-9 h-9 rounded-full bg-zinc-700 border-2 border-zinc-500 flex items-center justify-center shadow-inner">
                      <Disc className="w-4 h-4 text-zinc-300 animate-spin-slow" />
                    </div>
                  </button>

                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1.5">
                    FOOTSWITCH
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
