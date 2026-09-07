"use client";

import { useEffect, useState } from "react";
import { Lottie } from "lottie-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EqualizerVisualizerProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  opacity?: number;
}

export function EqualizerVisualizer({
  className = "",
  width = 240,
  height = 40,
  opacity = 0.7,
}: EqualizerVisualizerProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (prefersReducedMotion) {
    return (
      <div
        className={`flex items-center gap-1 opacity-40 ${className}`}
        style={{ width, height }}
        aria-hidden="true"
      >
        <div className="w-2 h-3/4 rounded-full bg-[#e11d2e]" />
        <div className="w-2 h-1/2 rounded-full bg-[#8b3ff2]" />
        <div className="w-2 h-full rounded-full bg-[#17e0c9]" />
        <div className="w-2 h-2/3 rounded-full bg-[#e11d2e]" />
        <div className="w-2 h-1/3 rounded-full bg-[#8b3ff2]" />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden mix-blend-screen pointer-events-none select-none ${className}`}
      style={{ width, height, opacity }}
      aria-hidden="true"
    >
      {isMounted ? (
        <Lottie
          src="/assets/lottie/equalizer.json"
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      ) : (
        <div className="flex items-end justify-center gap-1.5 w-full h-full pb-1">
          <div className="w-2 rounded-t bg-[#e11d2e] eq-bar-1 h-3/4 shadow-[0_0_8px_#e11d2e]" />
          <div className="w-2 rounded-t bg-[#8b3ff2] eq-bar-2 h-1/2 shadow-[0_0_8px_#8b3ff2]" />
          <div className="w-2 rounded-t bg-[#17e0c9] eq-bar-3 h-full shadow-[0_0_8px_#17e0c9]" />
          <div className="w-2 rounded-t bg-[#e11d2e] eq-bar-4 h-2/3 shadow-[0_0_8px_#e11d2e]" />
          <div className="w-2 rounded-t bg-[#8b3ff2] eq-bar-5 h-1/3 shadow-[0_0_8px_#8b3ff2]" />
          <div className="w-2 rounded-t bg-[#17e0c9] eq-bar-1 h-4/5 shadow-[0_0_8px_#17e0c9]" />
        </div>
      )}
    </div>
  );
}
