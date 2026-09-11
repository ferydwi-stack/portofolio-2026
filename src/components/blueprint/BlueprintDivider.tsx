"use client";

import { motion } from "framer-motion";

interface BlueprintDividerProps {
  label: string;
}

export function BlueprintDivider({ label }: BlueprintDividerProps) {
  return (
    <div className="relative w-full py-8 sm:py-10 px-5 sm:px-10 lg:px-16 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Left node with animated pulse */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#4FD1C5]" />
            <span className="absolute w-5 h-5 rounded-full border border-cyan-400/40 animate-ping" />
          </div>
          <div className="w-10 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
        </div>

        {/* Left animated SVG circuit trace */}
        <div className="flex-1 relative h-4 overflow-hidden flex items-center">
          <div className="w-full border-t border-dashed border-cyan-500/25" />
          <motion.div
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-xs"
            animate={{ x: ["-100%", "500%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Center label with cyber badge */}
        <div className="shrink-0 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-slate-950/90 shadow-[0_0_20px_rgba(79,209,197,0.1)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300 tracking-[0.18em] uppercase">
            {label}
          </span>
        </div>

        {/* Right animated SVG circuit trace */}
        <div className="flex-1 relative h-4 overflow-hidden flex items-center">
          <div className="w-full border-t border-dashed border-cyan-500/25" />
          <motion.div
            className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent blur-xs"
            animate={{ x: ["500%", "-100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Right node */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-px bg-gradient-to-l from-cyan-400 to-transparent" />
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#4FD1C5]" />
            <span className="absolute w-5 h-5 rounded-full border border-cyan-400/40 animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
}
