"use client";

import { useEffect, useState } from "react";
import { useScrollStore } from "@/store/useScrollStore";

export function ScrollProgressLaser() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    return useScrollStore.subscribe((state) => {
      setProgress(state.scrollProgress || 0);
    });
  }, []);

  const percentage = Math.min(100, Math.max(0, Math.round(progress * 100)));

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none select-none h-[3px] bg-slate-900/50 backdrop-blur-xs"
      aria-hidden="true"
    >
      {/* Progress Laser Bar */}
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_#4FD1C5] relative transition-[width] duration-75 ease-out"
        style={{ width: `${percentage}%` }}
      >
        {/* Leading Laser Spark Head */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#FFFFFF,0_0_20px_#4FD1C5]" />
      </div>

      {/* Floating Mini Telemetry Chip (Top Right Corner) */}
      <div className="fixed top-3 right-4 z-50 hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-md backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>BUFFER: {percentage}% COMPILED</span>
      </div>
    </div>
  );
}
