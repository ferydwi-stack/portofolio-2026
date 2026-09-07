"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { BandLogo } from "@/components/ui/BandLogo";
import { EqualizerVisualizer } from "@/components/ui/EqualizerVisualizer";
import { playGuitarChord, playStringPluck } from "@/lib/sound/guitarSynth";
import { Radio, Terminal, Cpu, Sparkles, Volume2 } from "lucide-react";

interface CurtainIntroProps {
  onComplete?: () => void;
}

export function CurtainIntro({ onComplete }: CurtainIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const stringsRef = useRef<HTMLDivElement>(null);

  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    // Sound effect on intro start
    try {
      playStringPluck(0);
    } catch {
      // Audio context might be restricted before user gesture
    }

    // Number ticker 0% -> 100%
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

    // 1. Strings Vibration Sequence & Content Reveal
    tl.fromTo(
      contentRef.current,
      { opacity: 0, scale: 0.92, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    )
      // 2. Heavy Guitar Chord Trigger near 100%
      .call(() => {
        try {
          playGuitarChord(110.0);
        } catch {
          // Ignore audio restriction
        }
      }, [], "+=0.8")
      // 3. Shockwave Flash & Exit Zoom
      .to(contentRef.current, {
        scale: 1.08,
        opacity: 0,
        filter: "blur(12px)",
        duration: 0.45,
        delay: 0.2,
        ease: "power2.in",
      })
      // 4. Split Stage Blast Doors (Hydraulic Curtain Opening)
      .to(
        leftCurtainRef.current,
        {
          xPercent: -100,
          duration: 1.0,
          ease: "power4.inOut",
        },
        "-=0.25"
      )
      .to(
        rightCurtainRef.current,
        {
          xPercent: 100,
          duration: 1.0,
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
      className="fixed inset-0 z-[9990] flex overflow-hidden pointer-events-none select-none bg-[#050507]"
      aria-hidden="true"
    >
      {/* Ambient Stage Spotlights */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vh] bg-red-600/15 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vh] bg-violet-600/10 blur-[100px] rounded-full" />
      </div>

      {/* Left Stage Curtain (Brushed Carbon & Heavy Metal Door) */}
      <div
        ref={leftCurtainRef}
        className="relative w-1/2 h-full bg-gradient-to-r from-[#07060a] via-[#0b0a10] to-[#0d0a14] border-r border-red-500/40 shadow-[25px_0_60px_rgba(0,0,0,0.98)] flex flex-col justify-between p-6 sm:p-10 z-20"
      >
        {/* Subtle Cyber Fret Wire Lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-80" />

        <div className="relative z-10 flex items-center gap-2 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
          <Terminal className="w-3.5 h-3.5 text-red-500" />
          <span>FDR_KERNEL // v4.2026</span>
        </div>

        <div className="relative z-10 text-right pr-4 sm:pr-8">
          <span className="font-[family-name:var(--font-bebas)] text-6xl sm:text-8xl text-white/[0.03] leading-none block">
            STAGE
          </span>
          <span className="font-mono text-[11px] text-zinc-500 tracking-widest block mt-1">
            01 // LEFT CHANNEL
          </span>
        </div>

        <div className="relative z-10 font-mono text-[9px] text-zinc-600 tracking-widest">
          SYS_STATUS: OPTIMIZED
        </div>
      </div>

      {/* Right Stage Curtain (Brushed Carbon & Heavy Metal Door) */}
      <div
        ref={rightCurtainRef}
        className="relative w-1/2 h-full bg-gradient-to-l from-[#07060a] via-[#0b0a10] to-[#0d0a14] border-l border-red-500/40 shadow-[-25px_0_60px_rgba(0,0,0,0.98)] flex flex-col justify-between p-6 sm:p-10 z-20"
      >
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-80" />

        <div className="relative z-10 flex items-center justify-end gap-2 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
          <Cpu className="w-3.5 h-3.5 text-red-500" />
          <span>FULLSTACK // IT &amp; GUITAR RIG</span>
        </div>

        <div className="relative z-10 text-left pl-4 sm:pl-8">
          <span className="font-[family-name:var(--font-bebas)] text-6xl sm:text-8xl text-white/[0.03] leading-none block">
            MASTER
          </span>
          <span className="font-mono text-[11px] text-zinc-500 tracking-widest block mt-1">
            02 // RIGHT CHANNEL
          </span>
        </div>

        <div className="relative z-10 text-right font-mono text-[9px] text-zinc-600 tracking-widest">
          AUDIO_DAC: 96kHz / 24-BIT
        </div>
      </div>

      {/* Center Stage Presentation Screen (High Voltage Rock & Cyber Architecture) */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-8 text-center pointer-events-none"
      >
        {/* Animated Vacuum Tube & Guitar Pick Emblem */}
        <div className="relative mb-6">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-6 rounded-full bg-red-600/25 blur-xl animate-pulse" />
          
          <div className="relative p-3 rounded-2xl bg-[#110e19]/90 border border-red-500/60 shadow-[0_0_40px_rgba(225,29,46,0.5)] backdrop-blur-md">
            <BandLogo size={90} glow animated />
          </div>

          {/* Electric Audio Sparkles */}
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-bounce" />
          <Volume2 className="absolute -bottom-1 -left-2 w-4 h-4 text-red-400 animate-pulse" />
        </div>

        {/* High-Tech Status Pill with 1/4" Jack Waveform */}
        <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-red-500/70 bg-gradient-to-r from-red-950/90 via-black to-red-950/90 text-red-400 font-mono text-[11px] uppercase tracking-widest shadow-[0_0_25px_rgba(255,42,59,0.4)] mb-4 backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span className="font-bold">INITIALIZING GUITAR RIG &amp; IT STACK</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
        </div>

        {/* Grand Headline with Metallic Foil Reflection & Neon Backlight */}
        <div className="relative my-2">
          <h1 className="headline-hero text-5xl sm:text-7xl lg:text-8xl font-normal uppercase tracking-wider bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(225,29,46,0.65)] leading-none">
            FERY DWI RAMADHI
          </h1>

          {/* Glowing Backlight Underline */}
          <div className="h-[2px] w-3/4 mx-auto mt-2 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ff2a3b]" />
        </div>

        {/* Dual Role Badges: IT Engineer x Lead Guitarist */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-3 mb-6 font-mono text-xs">
          <span className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            FULLSTACK WEB DEVELOPER
          </span>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            INFORMATIKA SPECIALIST
          </span>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 shadow-sm flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            ROCK GUITARIST RIG
          </span>
        </div>

        {/* 6 Electric Guitar Strings Tension Wire Graphic */}
        <div ref={stringsRef} className="w-full max-w-md my-4 space-y-[3px]">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_6px_#ff2a3b] animate-guitar-string" />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent animate-guitar-string" style={{ animationDelay: "0.05s" }} />
          <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-red-400/90 to-transparent shadow-[0_0_8px_#ff2a3b] animate-guitar-string" style={{ animationDelay: "0.1s" }} />
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-zinc-400 to-transparent animate-guitar-string" style={{ animationDelay: "0.15s" }} />
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent shadow-[0_0_8px_#f59e0b] animate-guitar-string" style={{ animationDelay: "0.07s" }} />
          <div className="h-[2.5px] w-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent animate-guitar-string" style={{ animationDelay: "0.12s" }} />
        </div>

        {/* Fretboard Progress Bar with Inlay Markers (Fret 3, 5, 7, 9, 12) */}
        <div className="w-full max-w-md space-y-2 mt-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
              CALIBRATING SOUNDSTAGE
            </span>
            <span ref={progressTextRef} className="text-red-400 font-bold tracking-wider font-mono">
              {progress < 10 ? `0${progress}` : progress}%
            </span>
          </div>

          <div className="relative w-full h-3.5 bg-[#120f1a] rounded-full p-[2px] border border-zinc-800 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Fret Markers in Progress Track */}
            <div className="absolute inset-0 flex justify-between px-6 pointer-events-none z-10 items-center">
              {[1, 2, 3, 4, 5].map((fret) => (
                <span
                  key={fret}
                  className="w-1 h-1 rounded-full bg-zinc-600/70"
                  title={`Fret ${fret * 2}`}
                />
              ))}
            </div>

            {/* Glowing Neon Fill Bar */}
            <div
              ref={progressBarRef}
              className="h-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-red-400 shadow-[0_0_15px_rgba(255,42,59,0.8)] transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Audio Tube Equalizer */}
        <div className="mt-5 opacity-70">
          <EqualizerVisualizer width={240} height={26} opacity={0.8} />
        </div>
      </div>
    </div>
  );
}
