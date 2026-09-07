"use client";

import { useState } from "react";
import { playStringPluck } from "@/lib/sound/guitarSynth";

interface GuitarStringProps {
  stringIndex?: number;
  label?: string;
  gauge?: number; // String thickness
}

export function InteractiveGuitarString({
  stringIndex = 0,
  label,
  gauge = 2,
}: GuitarStringProps) {
  const [isVibrating, setIsVibrating] = useState(false);

  const handlePluck = () => {
    setIsVibrating(true);
    playStringPluck(stringIndex);
    setTimeout(() => {
      setIsVibrating(false);
    }, 600);
  };

  return (
    <div
      onMouseEnter={handlePluck}
      onTouchStart={handlePluck}
      className="relative w-full py-3 cursor-pointer group flex items-center select-none"
      title="Pluck guitar string"
    >
      {/* String Tension Line */}
      <div
        className={`w-full transition-all duration-75 ${
          isVibrating
            ? "animate-string-vibrate bg-red-400 shadow-[0_0_12px_#ff2a3b]"
            : "bg-zinc-700/80 group-hover:bg-red-500/80 group-hover:shadow-[0_0_8px_rgba(255,42,59,0.6)]"
        }`}
        style={{ height: `${gauge}px` }}
      />

      {/* String Ball End / Label Indicator */}
      {label && (
        <div className="absolute right-4 px-2 py-0.5 rounded bg-black/80 border border-zinc-800 text-[8px] font-mono text-zinc-400 group-hover:text-red-400 group-hover:border-red-500/50 transition-colors pointer-events-none">
          {label}
        </div>
      )}
    </div>
  );
}
