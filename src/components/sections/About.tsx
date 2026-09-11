"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award, Terminal, Code2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";
import { TiltCard } from "@/components/ui/TiltCard";
import { InteractiveTerminal } from "@/components/blueprint/InteractiveTerminal";

export function About() {
  const [activeTab, setActiveTab] = useState<"story" | "specs" | "stats">("story");
  const { scrollTo } = useLenis();

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">PROFIL PROFESIONAL // TENTANG SAYA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Mengenal Lebih Dekat.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Memadukan ketelitian arsitektur rekayasa perangkat lunak dengan keindahan antarmuka web modern yang responsif, terstruktur, dan berpusat pada pengguna.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/20 font-bold text-cyan-400 shadow-xs">
              DOSSIER // 2026
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-12 items-start">
          {/* Left Column: Dossier Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            {/* 3D Tactile Dossier Portrait Card */}
            <TiltCard tiltMaxAngle={10} className="w-full max-w-[350px]">
              <div className="relative w-full p-4 pb-10 bg-slate-900/70 border border-cyan-500/30 rounded-2xl backdrop-blur-md shadow-2xl shadow-black/50">
                {/* Classified Stamp */}
                <div className="absolute top-6 right-6 z-20 px-2.5 py-1 rounded bg-cyan-400 text-slate-950 text-[9px] font-mono font-black uppercase tracking-wider shadow-md rotate-12 border border-cyan-300">
                  VERIFIED DEV
                </div>

                {/* Corner Cyber Brackets */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/40 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/40 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/40 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/40 pointer-events-none" />

                {/* Photo */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <Image
                    src={PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    fill
                    sizes="350px"
                    className="object-cover object-center filter contrast-105 brightness-95"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom Caption */}
                <div className="pt-4 text-center space-y-1">
                  <p className="font-mono text-lg font-black text-white uppercase tracking-wide">
                    {PERSONAL_INFO.name}
                  </p>
                  <p className="font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-wider">
                    {PERSONAL_INFO.major} &bull; FULLSTACK
                  </p>
                  <span className="block text-[9px] font-mono text-slate-400 pt-1">
                    INDONESIA // KELAS INDUSTRI 2026
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Commit Message Card with 3D Tilt */}
            <TiltCard tiltMaxAngle={8} className="w-full max-w-[350px]">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md shadow-lg">
                {/* Git commit style header */}
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800/80 text-[10px] font-mono text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-slate-300">commit: personal-vision</span>
                </div>
                <p className="font-mono text-sm text-slate-300 leading-relaxed pt-3 italic">
                  &ldquo;Kode yang hebat bukan hanya yang berjalan tanpa galat, melainkan yang memberi rasa nyaman bagi siapa pun yang berinteraksi dengannya.&rdquo;
                </p>
                <span className="block text-right font-mono text-[10px] font-bold text-cyan-400 uppercase pt-2">
                  &mdash; Catatan Harian Fery
                </span>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Dossier Tabs & CLI Terminal */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 w-fit font-mono text-xs">
              <button
                onClick={() => setActiveTab("story")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "story"
                    ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                BIOGRAFI &amp; VISI
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "specs"
                    ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                STANDAR TEKNIS
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "stats"
                    ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                PENCAPAIAN &amp; METRIK
              </button>
            </div>

            {/* Tab Contents with AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeTab === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md space-y-5 shadow-xl"
                >
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    {PERSONAL_INFO.tagline}
                  </h3>
                  <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                    {PERSONAL_INFO.bioParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "specs" && (
                <motion.div
                  key="specs"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md space-y-5 shadow-xl"
                >
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    Spesifikasi &amp; Standar Kerja
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 hover:border-cyan-500/30 transition-colors">
                      <span className="text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" /> Bahasa Pemrograman Utama
                      </span>
                      <p className="font-bold text-white text-sm">TypeScript, Modern JavaScript (ES6+), PHP, Golang</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 hover:border-cyan-500/30 transition-colors">
                      <span className="text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" /> Arsitektur &amp; Framework
                      </span>
                      <p className="font-bold text-white text-sm">Next.js (App Router), React, Tailwind CSS, Laravel</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 hover:border-cyan-500/30 transition-colors">
                      <span className="text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Basis Data &amp; Cloud
                      </span>
                      <p className="font-bold text-white text-sm">PostgreSQL, MySQL, Supabase, Vercel, Railway</p>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 hover:border-cyan-500/30 transition-colors">
                      <span className="text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Interaktivitas &amp; Motion
                      </span>
                      <p className="font-bold text-white text-sm">GSAP Motion, Framer Motion, Three.js (WebGL)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "stats" && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-md space-y-5 shadow-xl"
                >
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                    Pencapaian &amp; Rekam Jejak
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/30 transition-colors">
                      <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">3+</span>
                      <span className="block text-xs font-mono text-slate-400 uppercase mt-1">Tahun Rekayasa</span>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-amber-500/30 transition-colors">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">15+</span>
                      <span className="block text-xs font-mono text-slate-400 uppercase mt-1">Proyek Tuntas</span>
                    </div>
                    <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 col-span-2 sm:col-span-1 hover:border-emerald-500/30 transition-colors">
                      <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">100%</span>
                      <span className="block text-xs font-mono text-slate-400 uppercase mt-1">Komitmen Hasil</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Interactive Blueprint Terminal CLI */}
            <div className="pt-2">
              <InteractiveTerminal />
            </div>

            {/* Bottom Quick Jump Link */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => scrollTo("#certificates", { duration: 1.2 })}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer group"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>LIHAT DOKUMEN &amp; LISENSI RESMI</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
