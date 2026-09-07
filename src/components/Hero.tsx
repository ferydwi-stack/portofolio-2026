"use client";

import dynamic from "next/dynamic";
import { Github, Linkedin, Mail, ArrowRight, Disc3, Flame, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { AudioWaveVisualizer } from "./AudioWaveVisualizer";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:py-28"
    >
      {/* Concert Spotlight Beam Backgrounds */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[700px] h-[700px] bg-red-600/18 rounded-full blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[600px] h-[600px] bg-amber-500/12 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#08080c] via-transparent to-transparent -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8 relative z-10">
        {/* Main Stage Poster Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl">
          {/* Concert Marquee Tour Banner */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-red-500/50 bg-[#140f1a]/80 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(255,42,59,0.3)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span className="font-bold">LIVE WORLD TOUR 2026</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300">INDONESIA STAGE</span>
          </div>

          {/* Huge Staggered Concert Headline */}
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-red-500 flex items-center justify-center lg:justify-start gap-2">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>{"//"} LEAD DEVELOPER &amp; GUITARIST</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-bebas)] leading-[0.9] text-glow-crimson">
              {headline.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.08 + index * 0.035,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`inline-block ${
                    char === " " ? "w-4 sm:w-6" : ""
                  } hover:text-red-500 hover:scale-105 transition-all duration-150 cursor-default`}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Sub-identity Banner */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <h2 className="text-lg sm:text-2xl font-bold tracking-wider uppercase text-zinc-300 font-mono flex items-center gap-2">
                <span>Fullstack Developer</span>
                <span className="text-red-500 font-black text-xl">⚡</span>
                <span className="text-amber-400">Band Guitarist</span>
              </h2>
            </div>
          </div>

          {/* Lead Bio Description */}
          <p className="max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
            Menulis kode sepresisi ritme metronom, menyusun arsitektur sistem sekuat distorsi panggung. Mengubah kompleksitas masalah menjadi solusi digital yang cepat, tangguh, dan berenergi tinggi.
          </p>

          {/* Interactive Live Audio Waveform Console */}
          <div className="w-full max-w-lg pt-1">
            <AudioWaveVisualizer />
          </div>

          {/* Concert Ticket CTA Section with Barcode */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
            {/* VIP Pass Ticket Button */}
            <a
              href="#projects"
              className="relative w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_30px_rgba(255,42,59,0.5)] flex items-center justify-center gap-3 group border-y-2 border-red-400"
              style={{
                clipPath:
                  "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
              }}
            >
              <div className="flex items-center gap-2">
                <span>EXPLORE DISCOGRAPHY</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </a>

            {/* Concert Booking Stub */}
            <a
              href="#contact"
              className="relative w-full sm:w-auto px-7 py-4 bg-[#14111d] hover:bg-[#1e192c] border border-zinc-700 hover:border-red-500 font-mono text-xs uppercase tracking-widest font-bold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 group shadow-lg"
              style={{
                clipPath:
                  "polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>BOOK THE SHOW</span>
            </a>
          </div>

          {/* Stage Direct Frequencies */}
          <div className="flex items-center gap-4 pt-3">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              CHANNEL FREQUENCIES:
            </span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ferydwi-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#14111d] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,59,0.5)] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/fery-dwi-575204313"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#14111d] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,59,0.5)] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:ferydwir27@gmail.com"
                className="p-2.5 rounded-lg bg-[#14111d] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,59,0.5)] transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Guitar Stage Canvas & Floating Amps */}
        <div className="flex-1 w-full flex justify-center lg:justify-end items-center relative">
          <div className="relative w-full max-w-[520px] h-[420px] sm:h-[520px] lg:h-[620px]">
            {/* Ambient Concert Glow Halo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/35 via-red-950/20 to-amber-500/25 rounded-full blur-[110px] pointer-events-none" />

            {/* Low-Poly 3D Electric Guitar Scene */}
            <ThreeStageGuitar />

            {/* Floating Soundboard Gear Badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-2 right-2 sm:right-6 bg-[#16121f]/95 border-2 border-red-500/50 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 transform rotate-6 hover:rotate-0 transition-transform cursor-pointer"
            >
              <span className="text-red-500 text-xl">🎸</span>
              <div className="text-left font-mono">
                <div className="text-[9px] text-zinc-400 uppercase tracking-widest">
                  GUITAR TUNING
                </div>
                <div className="text-xs font-black text-white">
                  DROP-D / DISTORTION
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="absolute bottom-4 left-2 sm:left-4 bg-[#16121f]/95 border-2 border-amber-500/50 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 transform -rotate-6 hover:rotate-0 transition-transform cursor-pointer"
            >
              <span className="text-amber-400 text-xl">⚡</span>
              <div className="text-left font-mono">
                <div className="text-[9px] text-zinc-400 uppercase tracking-widest">
                  TECH STACK
                </div>
                <div className="text-xs font-black text-white">
                  FULLSTACK ENGINE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
