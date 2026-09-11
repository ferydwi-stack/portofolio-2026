"use client";

import dynamic from "next/dynamic";
import { Gamepad2, Trophy, Sparkles, Cpu, Zap } from "lucide-react";

const CyberFlightGame = dynamic(
  () => import("@/components/game/CyberFlightGame").then((mod) => mod.CyberFlightGame),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] sm:h-[600px] rounded-3xl bg-slate-950/50 border border-slate-800 flex flex-col items-center justify-center font-mono">
        <span className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-3" />
        <span className="text-xs text-cyan-400/70 tracking-widest animate-pulse">
          MEMUAT MODUL ENGINE 3D WEBGL...
        </span>
      </div>
    ),
  }
);

export function Arcade() {
  return (
    <section
      id="arcade"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">
                LABORATORIUM GRAFIS // MINI-GAME 3D INTERAKTIF
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Laboratorium &amp; Game 3D.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Demonstrasi kemampuan grafis 3D WebGL real-time: Kendalikan pesawat drone sibernetik Anda, kumpulkan token data kompilasi, dan raih skor tertinggi!
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/20 font-bold text-cyan-400 shadow-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              60 FPS HARDWARE ACCELERATED
            </span>
          </div>
        </div>

        {/* The 3D Arcade Game Canvas */}
        <div>
          <CyberFlightGame />
        </div>

        {/* Technical Showcase Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/90 font-mono space-y-2 backdrop-blur-md">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" />
              <span>01 // WebGL 3D Engine</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dibangun dengan Three.js &amp; React Three Fiber, mengoptimalkan pipeline grafis GPU shader tanpa membebani thread antarmuka utama.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/90 font-mono space-y-2 backdrop-blur-md">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <Zap className="w-4 h-4" />
              <span>02 // Web Audio Synthesizer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seluruh efek suara dihasilkan secara prosedural melalui osilator Web Audio API, tanpa mengunduh file MP3/WAV eksternal (0 ms latensi).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/90 font-mono space-y-2 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
              <Trophy className="w-4 h-4" />
              <span>03 // Responsive Controls</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mendukung kontrol ganda: pergerakan kursor mouse yang mulus dengan inersia aerodinamis, sentuhan layar pada perangkat mobile, serta keyboard W-A-S-D.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
