"use client";

import { motion } from "framer-motion";

interface GuitarStringDividerProps {
  label?: string;
  fret?: number;
}

export function GuitarStringDivider({ label, fret }: GuitarStringDividerProps) {
  return (
    <div className="relative w-full py-8 flex items-center justify-center overflow-hidden select-none group">
      {/* Bass string background glow */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent blur-xs pointer-events-none" />

      {/* Main Guitar String */}
      <motion.div
        className="w-full h-[2px] bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-500 to-transparent cursor-pointer relative"
        whileHover={{
          scaleY: [1, 5, 0.5, 3, 0.8, 1.5, 1],
          transition: { duration: 0.8, ease: "easeOut" }
        }}
      >
        {/* Wound string texture effect */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,59,59,0.3)_2px,rgba(255,59,59,0.3)_4px)] opacity-50" />
      </motion.div>

      {/* Center Inlay / Fret Marker */}
      {label ? (
        <div className="absolute px-4 py-1 bg-[#09090d] border border-red-500/30 rounded-full flex items-center gap-2 shadow-lg shadow-red-950/40 text-xs font-mono uppercase tracking-widest text-zinc-400 group-hover:text-red-400 group-hover:border-red-500/60 transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          {label}
          {fret && <span className="text-zinc-600">| FRET {fret}</span>}
        </div>
      ) : (
        <div className="absolute w-3 h-3 rounded-full bg-zinc-400 dark:bg-zinc-600 border-2 border-red-500/50 group-hover:bg-red-500 group-hover:shadow-[0_0_12px_#ff3b3b] transition-all" />
      )}
    </div>
  );
}
