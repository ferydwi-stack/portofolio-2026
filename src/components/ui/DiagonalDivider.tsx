"use client";

import { InteractiveGuitarString } from "./InteractiveGuitarString";
import { TechLogo } from "./TechLogos";

interface DiagonalDividerProps {
  direction?: "tilt-left" | "tilt-right";
  label?: string;
  fretNumber?: number;
  showTechMarquee?: boolean;
}

const RUNNING_TECH_LIST = [
  "React.js & Next.js",
  "TypeScript",
  "Tailwind",
  "GSAP",
  "Three.js",
  "Node.js",
  "PHP & Laravel",
  "Go (Golang)",
  "MySQL",
  "PostgreSQL",
  "Supabase",
  "PythonAnywhere",
  "Railway",
  "Flutter & Dart",
  "Firebase",
  "Git & GitHub",
  "Vercel",
  "Postman",
  "Android Studio",
  "VS Code",
  "Figma",
];

export function DiagonalDivider({
  direction = "tilt-right",
  label = "STAGE BOUNDARY",
  fretNumber = 3,
  showTechMarquee,
}: DiagonalDividerProps) {
  const isRight = direction === "tilt-right";
  const isSkillsDivider = showTechMarquee ?? (fretNumber === 5 || label.includes("KEAHLIAN"));

  return (
    <div className="relative w-full py-6 overflow-hidden select-none" aria-hidden="true">
      <div className="relative w-full flex flex-col items-center justify-center">
        {/* Slanted solid backdrop polygon ensuring stage separation */}
        <div
          className={`absolute inset-0 bg-[#0a0a0c] border-y border-red-950/60 shadow-[0_10px_30px_rgba(0,0,0,0.95)] ${
            isRight ? "-skew-y-1" : "skew-y-1"
          }`}
        />

        {/* Fret marker badge */}
        <div className="relative z-10 px-4 py-1 rounded-full bg-[#0a080f] border border-red-500/50 flex items-center gap-2 shadow-lg mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-widest">
            FRET {fretNumber} {"//"} {label}
          </span>
        </div>

        {/* Interactive Vibrating Guitar String */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-24">
          <InteractiveGuitarString stringIndex={fretNumber} gauge={2.5} label="PLUCK" />
        </div>

        {/* Running Tech & Tools Logos Marquee inside Fret Keahlian Bar */}
        {isSkillsDivider && (
          <div className="relative z-20 w-full mt-2 overflow-hidden py-1 border-y border-zinc-800/40 bg-black/40 backdrop-blur-xs">
            <div className="animate-tech-marquee flex items-center gap-6">
              {[...RUNNING_TECH_LIST, ...RUNNING_TECH_LIST].map((techName, idx) => (
                <div
                  key={`${techName}-${idx}`}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#120f1a]/80 border border-zinc-800/80 hover:border-red-500/50 transition-all flex-shrink-0 shadow-xs group/item"
                >
                  <TechLogo name={techName} size={15} />
                  <span className="text-[10px] font-mono font-bold text-zinc-300 group-hover/item:text-red-400 transition-colors whitespace-nowrap">
                    {techName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
