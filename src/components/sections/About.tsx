"use client";

import { useState } from "react";
import Image from "next/image";
import { ShieldCheck, Award } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";

export function About() {
  const [activeTab, setActiveTab] = useState<"story" | "specs" | "stats">("story");
  const { scrollTo } = useLenis();

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 blueprint-grid select-none"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#4FD1C5]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1E293B]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B232E] border border-[#334155] text-xs font-mono text-[#4FD1C5]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">PROFIL PROFESIONAL // TENTANG SAYA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#E2E8F0] tracking-tight uppercase">
              Mengenal Lebih Dekat.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
              Memadukan ketelitian arsitektur rekayasa perangkat lunak dengan keindahan antarmuka web modern yang responsif, terstruktur, dan berpusat pada pengguna.
            </p>
          </div>

          <div className="text-xs font-mono text-[#64748B] flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-[#1B232E] border border-[#334155] font-bold text-[#4FD1C5] shadow-xs">
              DOSSIER // 2026
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-12 items-start">
          {/* Left Column: Dossier Portrait Card */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            {/* Dark Dossier Portrait Card */}
            <div className="relative w-full max-w-[340px] p-4 pb-12 compile-card rounded-xl transition-transform duration-500 hover:scale-[1.01]">
              {/* Classified Stamp */}
              <div className="absolute top-6 right-6 z-20 px-2.5 py-1 rounded bg-[#4FD1C5] text-[#0A0F1A] text-[9px] font-mono font-black uppercase tracking-wider shadow-md rotate-12 border border-[#38BDF8]">
                VERIFIED DEV
              </div>

              {/* Top accent line */}
              <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#4FD1C5]/50 to-transparent" />

              {/* Photo */}
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#1B232E] border border-[#334155]">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  sizes="340px"
                  className="object-cover object-center filter contrast-105 brightness-95"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A]/30 to-transparent pointer-events-none" />
              </div>

              {/* Bottom Caption */}
              <div className="pt-4 text-center space-y-0.5">
                <p className="font-mono text-lg font-black text-[#E2E8F0] uppercase tracking-wide">
                  {PERSONAL_INFO.name}
                </p>
                <p className="font-mono text-[10px] text-[#4FD1C5] font-bold uppercase tracking-wider">
                  {PERSONAL_INFO.major} &bull; FULLSTACK
                </p>
                <span className="block text-[9px] font-mono text-[#475569] pt-1">
                  INDONESIA // KELAS INDUSTRI 2026
                </span>
              </div>
            </div>

            {/* Commit Message Card (replaces sticky note) */}
            <div className="relative w-full max-w-[340px] p-5 compile-card rounded-xl">
              {/* Git commit style header */}
              <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B] text-[10px] font-mono text-[#475569]">
                <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
                <span>commit: personal-vision</span>
              </div>
              <p className="font-mono text-sm text-[#94A3B8] leading-relaxed pt-3 italic">
                &ldquo;Kode yang hebat bukan hanya yang berjalan tanpa galat, melainkan yang memberi rasa nyaman bagi siapa pun yang berinteraksi dengannya.&rdquo;
              </p>
              <span className="block text-right font-mono text-[9px] font-bold text-[#4FD1C5]/60 uppercase pt-2">
                &mdash; Catatan Harian Fery
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Dossier Tabs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabs Bar */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#1B232E] border border-[#334155] w-fit font-mono text-xs">
              <button
                onClick={() => setActiveTab("story")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "story"
                    ? "bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] shadow-xs"
                    : "text-[#64748B] hover:text-[#E2E8F0]"
                }`}
              >
                BIOGRAFI &amp; VISI
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "specs"
                    ? "bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] shadow-xs"
                    : "text-[#64748B] hover:text-[#E2E8F0]"
                }`}
              >
                STANDAR TEKNIS
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "stats"
                    ? "bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] shadow-xs"
                    : "text-[#64748B] hover:text-[#E2E8F0]"
                }`}
              >
                PENCAPAIAN &amp; METRIK
              </button>
            </div>

            {/* Tab 1: Story & Bio */}
            {activeTab === "story" && (
              <div className="p-6 sm:p-8 rounded-2xl compile-card space-y-5 animate-fadeInUp">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#E2E8F0] tracking-tight">
                  {PERSONAL_INFO.tagline}
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  {PERSONAL_INFO.bioParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Technical Specs */}
            {activeTab === "specs" && (
              <div className="p-6 sm:p-8 rounded-2xl compile-card space-y-5 animate-fadeInUp">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#E2E8F0] tracking-tight">
                  Spesifikasi &amp; Standar Kerja
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B] space-y-1">
                    <span className="text-[#475569] uppercase">Bahasa Pemrograman Utama</span>
                    <p className="font-bold text-[#E2E8F0] text-sm">TypeScript, Modern JavaScript (ES6+), PHP, Golang</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B] space-y-1">
                    <span className="text-[#475569] uppercase">Arsitektur &amp; Framework</span>
                    <p className="font-bold text-[#E2E8F0] text-sm">Next.js (App Router), React, Tailwind CSS, Laravel</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B] space-y-1">
                    <span className="text-[#475569] uppercase">Basis Data &amp; Cloud</span>
                    <p className="font-bold text-[#E2E8F0] text-sm">PostgreSQL, MySQL, Supabase, Vercel, Railway</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B] space-y-1">
                    <span className="text-[#475569] uppercase">Interaktivitas &amp; Motion</span>
                    <p className="font-bold text-[#E2E8F0] text-sm">GSAP Motion, Framer Motion, Three.js (WebGL)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Stats */}
            {activeTab === "stats" && (
              <div className="p-6 sm:p-8 rounded-2xl compile-card space-y-5 animate-fadeInUp">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#E2E8F0] tracking-tight">
                  Pencapaian &amp; Rekam Jejak
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B]">
                    <span className="text-3xl sm:text-4xl font-black text-[#4FD1C5] font-mono">3+</span>
                    <span className="block text-xs font-mono text-[#64748B] uppercase mt-1">Tahun Rekayasa</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B]">
                    <span className="text-3xl sm:text-4xl font-black text-[#E8A33D] font-mono">15+</span>
                    <span className="block text-xs font-mono text-[#64748B] uppercase mt-1">Proyek Tuntas</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0A0F1A]/60 border border-[#1E293B] col-span-2 sm:col-span-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#34D399] font-mono">100%</span>
                    <span className="block text-xs font-mono text-[#64748B] uppercase mt-1">Komitmen Hasil</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Quick Jump Link */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => scrollTo("#certificates", { duration: 1.2 })}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#94A3B8] hover:text-[#4FD1C5] transition-colors cursor-pointer group"
              >
                <Award className="w-4 h-4 text-[#E8A33D]" />
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
