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

    // Audio cue
    try {
      playStringPluck(0);
    } catch {
      // Autoplay fallback
    }

    // Smooth ticker 0% -> 100%
    const progressObj = { val: 0 };
    const progressTween = gsap.to(progressObj, {
      val: 100,
      duration: 1.6,
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

    // 1. Dynamic Entrance
    tl.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.94, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
      // 2. Harmonic chord sound right before reveal
      .call(() => {
        try {
          playGuitarChord(110.0);
        } catch {
          // Audio fallback
        }
      }, [], "+=0.85")
      // 3. Centerpiece smooth dissolution
      .to(contentRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 0.35,
        delay: 0.15,
        ease: "power2.in",
      })
      // 4. Heavy stage curtains sliding open
      .to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 0.95,
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
      {/* ======================================================== */}
      {/* 1. STAGE CURTAINS (Brushed Carbon Panels with Laser Seam)*/}
      {/* ======================================================== */}
      {/* Left Stage Curtain Panel */}
      <div
        ref={leftCurtainRef}
        className="w-1/2 h-full bg-[#09080e] border-r border-red-900/40 relative shadow-[30px_0_70px_rgba(0,0,0,0.98)]"
      >
        {/* Subtle stage texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(225,29,46,0.12),transparent_70%)]" />
        <div className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-red-500/80 to-transparent shadow-[0_0_12px_#ff2a3b]" />
      </div>

      {/* Right Stage Curtain Panel */}
      <div
        ref={rightCurtainRef}
        className="w-1/2 h-full bg-[#09080e] border-l border-red-900/40 relative shadow-[-30px_0_70px_rgba(0,0,0,0.98)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,rgba(225,29,46,0.12),transparent_70%)]" />
        <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-red-500/80 to-transparent shadow-[0_0_12px_#ff2a3b]" />
      </div>

      {/* ======================================================== */}
      {/* 2. RICH STAGE AMBIENCE & SPOTLIGHT RAYS                  */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {/* Top-left spotlight beam */}
        <div className="absolute -top-32 -left-32 w-96 h-[120vh] bg-gradient-to-b from-red-600/15 via-red-900/5 to-transparent rotate-[35deg] blur-3xl pointer-events-none" />
        {/* Top-right spotlight beam */}
        <div className="absolute -top-32 -right-32 w-96 h-[120vh] bg-gradient-to-b from-red-600/15 via-red-900/5 to-transparent -rotate-[35deg] blur-3xl pointer-events-none" />
        {/* Center ambient red aura */}
        <div className="absolute inset-0 m-auto w-[650px] h-[450px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      </div>

      {/* ======================================================== */}
      {/* 3. CENTERPIECE CONSOLE (Rich, Lively, Luxury & Balanced) */}
      {/* ======================================================== */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center pointer-events-none max-w-xl mx-auto"
      >
        {/* Glowing FDR Pick with Expanding Soundwave Ring */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Sonic Pulse Rings */}
          <div className="absolute -inset-4 rounded-full border border-red-500/30 animate-ping" />
          <div className="absolute -inset-8 rounded-full border border-red-500/15 animate-pulse" />
          <div className="relative">
            <BandLogo size={56} glow animated />
          </div>
        </div>

        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/40 bg-red-950/60 backdrop-blur-md text-red-400 font-mono text-[10px] uppercase tracking-[0.22em] shadow-[0_0_15px_rgba(255,42,59,0.3)] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>STAGE CALIBRATION // RIG 2026</span>
        </div>

        {/* Dynamic Name Typography with Animated Chrome Shimmer */}
        <h1 className="font-[family-name:var(--font-anton)] text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-[0.08em] text-white leading-tight drop-shadow-[0_4px_24px_rgba(225,29,46,0.4)]">
          <span className="title-animated-shimmer">FERY DWI</span>{" "}
          <span className="title-ramadhi-glow">RAMADHI</span>
        </h1>

        {/* Identity Role Subtitle */}
        <div className="flex items-center gap-2 mt-2 mb-6 font-mono text-[11px] sm:text-xs text-zinc-300 tracking-[0.25em] uppercase">
          <span>FULLSTACK DEVELOPER</span>
          <span className="text-red-500 font-bold">•</span>
          <span>ROCK GUITARIST</span>
        </div>

        {/* Active 14-Bar Audio Equalizer Visualizer */}
        <div className="flex items-end justify-center gap-1.5 h-8 w-48 sm:w-56 mb-4 px-2 py-1 rounded-lg bg-black/40 border border-zinc-800/80">
          {[
            "eq-bar-1",
            "eq-bar-3",
            "eq-bar-5",
            "eq-bar-2",
            "eq-bar-4",
            "eq-bar-1",
            "eq-bar-3",
            "eq-bar-5",
            "eq-bar-2",
            "eq-bar-4",
            "eq-bar-3",
            "eq-bar-1",
            "eq-bar-4",
            "eq-bar-2",
          ].map((cls, i) => (
            <span
              key={i}
              className={`w-1 rounded-full bg-gradient-to-t from-red-600 via-rose-500 to-amber-300 ${cls}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>

        {/* Precision Laser Soundstage Tuning Bar */}
        <div className="w-full max-w-xs space-y-2">
          {/* Subtle Vibrating Tension Wire */}
          <div className="relative w-full h-[2px] bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              ref={progressLineRef}
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 rounded-full transition-all duration-75 shadow-[0_0_12px_rgba(255,42,59,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status readout & percentage */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 tracking-[0.18em] uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>SOUNDSTAGE READY</span>
            </span>
            <span ref={progressTextRef} className="text-red-400 font-bold font-mono text-xs">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
