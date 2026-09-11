"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Code2, Sparkles, FolderGit2, Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";
import { TiltCard } from "@/components/ui/TiltCard";
import { playHoverTick, playCyberClick } from "@/lib/sound/cyberSound";

// Dynamic import Three.js CompileExplosionCore (no SSR)
const CompileExplosionCore = dynamic(
  () => import("@/components/blueprint/CompileExplosionCore").then((mod) => mod.CompileExplosionCore),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[440px] mx-auto rounded-3xl border border-cyan-500/20 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-md">
        <span className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-3" />
        <span className="text-xs font-mono text-cyan-400/60 tracking-widest animate-pulse">
          INITIALIZING 3D COMPILE CORE...
        </span>
      </div>
    ),
  }
);

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-12 overflow-hidden select-none"
    >
      {/* Ambient Backlight Highlights */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Status Strip */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono gap-2 sm:gap-0 relative z-10">
        <div className="flex items-center gap-2 text-white font-bold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="tracking-wider">STATUS: TERSEDIA UNTUK PEKERJAAN &amp; KOLABORASI</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="hidden md:inline">INFORMATIKA &bull; WEB &amp; MOBILE &bull; INDONESIA</span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 font-bold shadow-xs">
            BUILD 2026 // v2.0
          </span>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        {/* Left Developer Bio & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Professional Role Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold tracking-wide">FULLSTACK DEVELOPER &bull; SOFTWARE ENGINEER</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.06] uppercase">
              Membangun Solusi Web Modern &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-sky-400 drop-shadow-[0_0_35px_rgba(79,209,197,0.3)]">
                Berkinerja Tinggi.
              </span>
            </h1>
            <p className="font-mono text-sm sm:text-base font-bold text-slate-400 tracking-wider uppercase pt-1">
              {PERSONAL_INFO.name} &mdash; Mahasiswa Informatika &amp; Web Developer
            </p>
          </div>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
            Selamat datang di portofolio saya. Saya merancang dan mengembangkan aplikasi web serta mobile dengan arsitektur kode yang tangguh, antarmuka responsif, dan performa tinggi yang siap untuk skala produksi.
          </p>

          {/* Stats Cards — 3D Tactile TiltCards */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xl pt-1">
            <TiltCard tiltMaxAngle={12} className="h-full">
              <div
                onMouseEnter={playHoverTick}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 text-center backdrop-blur-md shadow-md hover:border-cyan-500/40 transition-colors"
              >
                <span className="block font-mono text-2xl sm:text-3xl font-black text-white">10+</span>
                <span className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase font-bold pt-0.5">
                  Proyek Selesai
                </span>
              </div>
            </TiltCard>

            <TiltCard tiltMaxAngle={12} className="h-full">
              <div
                onMouseEnter={playHoverTick}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 text-center backdrop-blur-md shadow-md hover:border-cyan-500/40 transition-colors"
              >
                <span className="block font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">Fullstack</span>
                <span className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase font-bold pt-0.5">
                  Next.js &bull; Node &bull; DB
                </span>
              </div>
            </TiltCard>

            <TiltCard tiltMaxAngle={12} className="h-full">
              <div
                onMouseEnter={playHoverTick}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 text-center backdrop-blur-md shadow-md hover:border-amber-500/40 transition-colors"
              >
                <span className="block font-mono text-2xl sm:text-3xl font-black text-amber-400">4+</span>
                <span className="block text-[10px] sm:text-xs font-mono text-slate-400 uppercase font-bold pt-0.5">
                  Sertifikasi Resmi
                </span>
              </div>
            </TiltCard>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                playCyberClick();
                scrollTo("#projects", { duration: 1.2 });
              }}
              onMouseEnter={playHoverTick}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-[0_0_25px_rgba(79,209,197,0.35)] hover:shadow-[0_0_35px_rgba(79,209,197,0.5)] flex items-center gap-2 transform active:scale-95"
            >
              <FolderGit2 className="w-4 h-4 text-slate-950" />
              <span>JELAJAHI PORTOFOLIO PROYEK</span>
            </button>

            <button
              onClick={() => {
                playCyberClick();
                scrollTo("#contact", { duration: 1.2 });
              }}
              onMouseEnter={playHoverTick}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>HUBUNGI SAYA</span>
            </button>

            {/* Social quick pills */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href={PERSONAL_INFO.contacts.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverTick}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 transition-colors shadow-xs"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.contacts.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverTick}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 transition-colors shadow-xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right — 3D Compile Explosion Core */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center"
        >
          <CompileExplosionCore />
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono text-slate-400 cursor-pointer relative z-10"
        onClick={() => scrollTo("#about", { duration: 1.0 })}
      >
        <span className="flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          GULIR KE BAWAH UNTUK MELIHAT PROFIL &amp; KEAHLIAN
        </span>
        <div className="flex items-center gap-1 font-bold text-white">
          <span>GULIR</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
        </div>
      </div>
    </section>
  );
}
