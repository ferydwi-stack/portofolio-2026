"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface CurtainIntroProps {
  onComplete?: () => void;
}

export function CurtainIntro({ onComplete }: CurtainIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });

    // 1. Initial quick text flicker & glow
    tl.to(marqueeRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(marqueeRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.4,
        delay: 0.4,
        ease: "power2.in",
      })
      // 2. Split stage curtains open outwards
      .to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "-=0.2"
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 1.1,
          ease: "power4.inOut",
        },
        "<"
      );

    return () => {
      tl.kill();
    };
  }, [onComplete, prefersReducedMotion]);

  if (isDone || prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] flex overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Left Stage Curtain Panel */}
      <div
        ref={leftCurtainRef}
        className="w-1/2 h-full bg-[#070609] border-r border-red-900/60 shadow-[20px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-end pr-8"
      >
        <div className="text-right font-mono text-zinc-700 text-xs tracking-widest uppercase">
          STAGE LEFT // 2026
        </div>
      </div>

      {/* Right Stage Curtain Panel */}
      <div
        ref={rightCurtainRef}
        className="w-1/2 h-full bg-[#070609] border-l border-red-900/60 shadow-[-20px_0_50px_rgba(0,0,0,0.9)] flex items-center justify-start pl-8"
      >
        <div className="text-left font-mono text-zinc-700 text-xs tracking-widest uppercase">
          STAGE RIGHT // SOUNDCHECK
        </div>
      </div>

      {/* Center Stage Marquee Sign */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 scale-95 pointer-events-none"
      >
        <div className="px-6 py-2 rounded-full border border-red-500/80 bg-red-950/80 text-red-400 font-mono text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(255,42,59,0.5)] mb-3">
          &bull; LIVE AMP STAGE LOADED &bull;
        </div>
        <h1 className="text-5xl sm:text-7xl font-black uppercase text-white font-[family-name:var(--font-anton)] tracking-wider">
          FERY DWI RAMADHI
        </h1>
        <p className="font-mono text-xs text-zinc-400 tracking-widest mt-2">
          FULLSTACK ARCHITECTURE &bull; GUITAR DISTORTION
        </p>
      </div>
    </div>
  );
}
