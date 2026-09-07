"use client";

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
    <div className="relative w-full py-8 overflow-hidden select-none pointer-events-none" aria-hidden="true">
      {/* Vibrating Guitar String Core */}
      <div className="relative w-full h-8 flex items-center justify-center">
        {/* Slanted subtle backdrop polygon */}
        <div
          className={`absolute inset-0 bg-red-950/20 border-y border-red-900/30 backdrop-blur-xs ${
            isRight ? "-skew-y-1" : "skew-y-1"
          }`}
        />

        {/* Tension Steel Guitar String */}
        <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-red-500/80 to-transparent shadow-[0_0_8px_rgba(255,42,59,0.7)]" />

        {/* Fret marker badge */}
        <div className="relative z-10 px-4 py-1 rounded-full bg-[#0a080f] border border-red-500/50 flex items-center gap-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-[9px] font-mono font-black text-red-400 uppercase tracking-widest">
            FRET {fretNumber} {"//"} {label}
          </span>
        </div>
      </div>
    </div>
  );
}
