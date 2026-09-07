"use client";

import dynamic from "next/dynamic";
import { Github, Linkedin, Mail, ArrowRight, Disc3 } from "lucide-react";
import { motion } from "framer-motion";

// Lazy-load 3D stage guitar with zero SSR overhead
const ThreeStageGuitar = dynamic(() => import("./ThreeStageGuitar"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-48 rounded-full border border-red-500/20 flex items-center justify-center animate-pulse">
        <Disc3 className="w-16 h-16 text-red-500/40 animate-spin-slow" />
      </div>
    </div>
  ),
});

export function Hero() {
  const headline = "FERY DWI RAMADHI";

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 lg:py-24"
    >
      {/* Concert Spotlight Beam Backgrounds */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[700px] bg-red-600/15 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[600px] bg-amber-500/10 rounded-full blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-red-950/20 via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7 max-w-2xl">
          {/* Live Stage Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-red-500/40 bg-red-950/30 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-sm shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold">ON STAGE</span>
            <span className="text-zinc-600">|</span>
            <span>AVAILABLE FOR NEW PROJECTS & RIFFS</span>
          </div>

          {/* Headline with Staggered Character Reveal */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
              {"//"} LEAD DEVELOPER &amp; GUITARIST
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-bebas)] leading-none">
              {headline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.03,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`inline-block ${
                    char === " " ? "w-4" : ""
                  } hover:text-red-500 transition-colors cursor-default`}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Dual Identity Subheading */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-zinc-200 font-mono">
                Fullstack Developer{" "}
                <span className="text-red-500 font-black text-glow-crimson">
                  ×
                </span>{" "}
                Guitarist
              </h2>
            </div>

            {/* Looping Equalizer / Soundwave Bar */}
            <div className="flex items-center justify-center lg:justify-start gap-1.5 pt-3 h-7">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mr-2">
                AUDIO MASTER:
              </span>
              <span className="w-1 bg-red-500 rounded-full eq-bar-1" />
              <span className="w-1 bg-red-400 rounded-full eq-bar-2" />
              <span className="w-1 bg-amber-400 rounded-full eq-bar-3" />
              <span className="w-1 bg-red-500 rounded-full eq-bar-4" />
              <span className="w-1 bg-amber-300 rounded-full eq-bar-5" />
              <span className="w-1 bg-red-600 rounded-full eq-bar-2" />
              <span className="w-1 bg-red-400 rounded-full eq-bar-1" />
              <span className="w-1 bg-amber-500 rounded-full eq-bar-3" />
            </div>
          </div>

          {/* Bio Lead Text */}
          <p className="max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            Menulis kode sepresisi tempo metronom, membangun arsitektur aplikasi
            sekuat distorsi amplifier panggung. Mengubah masalah kompleks
            menjadi pengalaman digital yang powerful, elegan, dan berenergi.
          </p>

          {/* Concert Ticket CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            {/* Ticket 1: See Projects */}
            <a
              href="#projects"
              className="relative w-full sm:w-auto px-7 py-3.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_25px_rgba(255,42,59,0.45)] flex items-center justify-center gap-3 group border border-red-400/80"
              style={{
                clipPath:
                  "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)",
              }}
            >
              <span>DISCOGRAPHY / PROYEK</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            {/* Ticket 2: Book / Contact */}
            <a
              href="#contact"
              className="relative w-full sm:w-auto px-7 py-3.5 bg-[#121017] hover:bg-[#1c1824] border border-zinc-700 hover:border-red-500/60 font-mono text-xs uppercase tracking-widest font-bold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 group"
              style={{
                clipPath:
                  "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)",
              }}
            >
              <span>BOOK THE GIG</span>
              <span className="text-red-500 text-xs">⚡</span>
            </a>
          </div>

          {/* Stage Social Channels */}
          <div className="flex items-center gap-5 pt-3">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              FREQUENCY:
            </span>
            <a
              href="https://github.com/ferydwi-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_12px_rgba(255,42,59,0.5)] transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/fery-dwi-575204313"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_12px_rgba(255,42,59,0.5)] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:ferydwir27@gmail.com"
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_12px_rgba(255,42,59,0.5)] transition-all"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* 3D Guitar Stage Canvas */}
        <div className="flex-1 w-full flex justify-center lg:justify-end items-center relative">
          <div className="relative w-full max-w-[480px] h-[380px] sm:h-[480px] lg:h-[550px]">
            {/* Ambient Concert Glow Halo behind guitar */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/30 via-red-950/20 to-amber-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Low-Poly 3D Electric Guitar Scene */}
            <ThreeStageGuitar />

            {/* Live Concert Badges */}
            <div className="absolute -top-3 right-2 sm:right-6 bg-[#16121f]/95 border border-red-500/40 px-3.5 py-2 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-2 transform rotate-6 hover:rotate-0 transition-transform">
              <span className="text-red-500 text-base">🎸</span>
              <div className="text-left">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  TONE RIG
                </div>
                <div className="text-xs font-bold font-mono text-white">
                  DROP-D / DISTORTION
                </div>
              </div>
            </div>

            <div className="absolute -bottom-2 left-2 sm:left-4 bg-[#16121f]/95 border border-amber-500/40 px-3.5 py-2 rounded-lg shadow-2xl backdrop-blur-md flex items-center gap-2 transform -rotate-6 hover:rotate-0 transition-transform">
              <span className="text-amber-400 text-base">⚡</span>
              <div className="text-left">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">
                  ENGINE
                </div>
                <div className="text-xs font-bold font-mono text-white">
                  FULLSTACK TECH
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
