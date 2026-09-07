"use client";

import { InteractiveGuitarString } from "./InteractiveGuitarString";

interface DiagonalDividerProps {
  direction?: "tilt-left" | "tilt-right";
  label?: string;
  fretNumber?: number;
}

export function DiagonalDivider({
  direction = "tilt-right",
  label = "STAGE BOUNDARY",
  fretNumber = 3,
}: DiagonalDividerProps) {
  const isRight = direction === "tilt-right";

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
        <div className="relative z-10 px-4 py-1 rounded-full bg-[#0a080f] border border-red-500/50 flex items-center gap-2 shadow-lg mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-widest">
            FRET {fretNumber} {"//"} {label}
          </span>
        </div>

        {/* Interactive Vibrating Guitar String */}
        <div className="relative z-20 w-full px-6 sm:px-12 lg:px-24">
          <InteractiveGuitarString stringIndex={fretNumber} gauge={2.5} label="PLUCK" />
        </div>
      </div>
    </div>
  );
}
