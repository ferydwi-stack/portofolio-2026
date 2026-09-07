"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BandLogo } from "@/components/ui/BandLogo";
import { playGuitarChord, playStringPluck } from "@/lib/sound/guitarSynth";

interface CurtainIntroProps {
  onComplete?: () => void;
}

export function CurtainIntro({ onComplete }: CurtainIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    // Audio cue: subtle guitar string harmonic pluck
    try {
      playStringPluck(0);
    } catch {
      // Audio autoplay policy fallback
    }

    // Smooth ticker 0% -> 100%
    const progressObj = { val: 0 };
    const progressTween = gsap.to(progressObj, {
      val: 100,
      duration: 1.35,
      ease: "power2.inOut",
      onUpdate: () => {
        const rounded = Math.round(progressObj.val);
        setProgress(rounded);
        if (progressTextRef.current) {
          progressTextRef.current.innerText = `${rounded < 10 ? "0" : ""}${rounded}%`;
        }
      },
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
        onComplete?.();
      },
    });

    // 1. Sleek, subtle entrance
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 10, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power2.out" }
    )
      // 2. Harmonic chord sound near stage split
      .call(() => {
        try {
          playGuitarChord(110.0);
        } catch {
          // Audio fallback
        }
      }, [], "+=0.75")
      // 3. Gentle fade out of center elements
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.02,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
      })
      // 4. Smooth cinematic curtain split
      .to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "<"
      );

    return () => {
      progressTween.kill();
      tl.kill();
    };
  }, [onComplete, prefersReducedMotion]);

  if (isDone || prefersReducedMotion) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9990] flex overflow-hidden pointer-events-none select-none bg-[#070609]"
      aria-hidden="true"
    >
      {/* Left Stage Curtain */}
      <div
        ref={leftCurtainRef}
        className="w-1/2 h-full bg-[#08070b] border-r border-red-950/40 relative shadow-[25px_0_50px_rgba(0,0,0,0.95)]"
      >
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
      </div>

      {/* Right Stage Curtain */}
      <div
        ref={rightCurtainRef}
        className="w-1/2 h-full bg-[#08070b] border-l border-red-950/40 relative shadow-[-25px_0_50px_rgba(0,0,0,0.95)]"
      >
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
      </div>

      {/* Minimalist Centerpiece: Sleek, Balanced & Not Crowded */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
      >
        {/* Subtle Pick Emblem */}
        <div className="mb-4">
          <BandLogo size={46} glow animated />
        </div>

        {/* Clean, Proportionate Name Typography */}
        <h1 className="font-[family-name:var(--font-anton)] text-2xl sm:text-3xl md:text-4xl tracking-[0.14em] uppercase text-white font-normal drop-shadow-[0_2px_12px_rgba(255,42,59,0.35)]">
          FERY DWI RAMADHI
        </h1>

        {/* Refined Identity Subtitle */}
        <div className="flex items-center gap-2 mt-2 mb-7 text-zinc-400 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase">
          <span>FULLSTACK DEVELOPER</span>
          <span className="text-red-500 font-bold">•</span>
          <span>GUITARIST</span>
        </div>

        {/* Ultra-Sleek Guitar String / Audio Calibration Bar */}
        <div className="w-48 sm:w-56 space-y-2">
          <div className="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/80">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 rounded-full transition-all duration-75 shadow-[0_0_8px_rgba(255,42,59,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 tracking-[0.15em] uppercase">
            <span>SOUND & SYSTEM</span>
            <span ref={progressTextRef} className="text-red-400 font-semibold font-mono">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
