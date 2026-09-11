"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, Award } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";

export function About() {
  const [activeTab, setActiveTab] = useState<"story" | "specs" | "stats">("story");
  const { scrollTo } = useLenis();

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 paper-grain select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5DFC8]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFC8] text-xs font-mono text-[#E24332]">
              <Award className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">PROFIL PROFESIONAL // TENTANG SAYA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#1C1A18] tracking-tight uppercase">
              Mengenal Lebih Dekat.
            </h2>
            <p className="text-sm sm:text-base text-[#5A554E] max-w-2xl leading-relaxed">
              Memadukan ketelitian arsitektur rekayasa perangkat lunak dengan keindahan antarmuka web modern yang responsif, terstruktur, dan berpusat pada pengguna.
            </p>
          </div>

          <div className="text-xs font-mono text-[#7A7568] flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5DFC8] font-bold text-[#1C1A18] shadow-xs">
              BIODATA REKAYASA // 2026
            </span>
          </div>
        </div>

        {/* Scrapbook Desk Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-12 items-start">
          {/* Left Column: Polaroid Portrait & Sticky Note */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            {/* The Polaroid Portrait */}
            <div className="relative w-full max-w-[340px] p-4 pb-12 bg-white rounded-xl polaroid-card-shadow border border-[#E5DFC8] rotate-[-1.5deg] hover:rotate-0 transition-transform duration-500">
              {/* Masking Washi Tape */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-2 z-20 pointer-events-none" />

              {/* Verified Stamp */}
              <div className="absolute top-6 right-6 z-20 px-2.5 py-1 rounded bg-[#E24332] text-white text-[9px] font-mono font-black uppercase tracking-wider shadow-md rotate-12 border border-[#F68A7E]">
                VERIFIED DEV
              </div>

              {/* Photo */}
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-[#ECE7D8] border border-[#DDD6C4] photo-gloss">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  sizes="340px"
                  className="object-cover object-center filter contrast-105"
                  priority
                />
              </div>

              {/* Bottom Handwritten Caption */}
              <div className="pt-4 text-center space-y-0.5">
                <p className="font-handwriting text-2xl text-[#1C1A18] leading-tight">
                  {PERSONAL_INFO.name}
                </p>
                <p className="font-mono text-[10px] text-[#E24332] font-bold uppercase tracking-wider">
                  {PERSONAL_INFO.major} &bull; FULLSTACK
                </p>
                <span className="block text-[9px] font-mono text-[#968F84] pt-1">
                  INDONESIA // KELAS INDUSTRI 2026
                </span>
              </div>
            </div>

            {/* Handwritten Scrapbook Sticky Note */}
            <div className="relative w-full max-w-[340px] p-5 bg-[#FFF9E6] rounded-xl border border-[#F0E4B8] shadow-sm rotate-[1.5deg]">
              <div className="absolute -top-3 left-6 w-14 h-5 washi-tape-rose -rotate-3 z-10 pointer-events-none" />
              <p className="font-handwriting text-xl text-[#3D3520] leading-relaxed">
                &ldquo;Kode yang hebat bukan hanya yang berjalan tanpa galat, melainkan yang memberi rasa nyaman bagi siapa pun yang berinteraksi dengannya.&rdquo;
              </p>
              <span className="block text-right font-mono text-[9px] font-bold text-[#8C7B38] uppercase pt-2">
                &mdash; Catatan Harian Fery
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Dossier Tabs & Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Dossier Tabs Bar */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#F3EFE6] border border-[#E5DFC8] w-fit font-mono text-xs">
              <button
                onClick={() => setActiveTab("story")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "story"
                    ? "bg-white text-[#1C1A18] shadow-xs"
                    : "text-[#7A7568] hover:text-[#1C1A18]"
                }`}
              >
                BIOGRAFI &amp; VISI
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "specs"
                    ? "bg-white text-[#1C1A18] shadow-xs"
                    : "text-[#7A7568] hover:text-[#1C1A18]"
                }`}
              >
                STANDAR TEKNIS
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-4 py-2 rounded-lg transition-all cursor-pointer font-bold ${
                  activeTab === "stats"
                    ? "bg-white text-[#1C1A18] shadow-xs"
                    : "text-[#7A7568] hover:text-[#1C1A18]"
                }`}
              >
                PENCAPAIAN &amp; METRIK
              </button>
            </div>

            {/* Tab 1: Story & Bio */}
            {activeTab === "story" && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DFC8] polaroid-card-shadow space-y-5 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#1C1A18] tracking-tight">
                  {PERSONAL_INFO.tagline}
                </h3>
                <div className="space-y-4 text-sm sm:text-base text-[#5A554E] leading-relaxed">
                  {PERSONAL_INFO.bioParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Studio Specs */}
            {activeTab === "specs" && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DFC8] polaroid-card-shadow space-y-5 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#1C1A18] tracking-tight">
                  Spesifikasi &amp; Standar Kerja
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] space-y-1">
                    <span className="text-[#968F84] uppercase">Bahasa Pemrograman Utama</span>
                    <p className="font-bold text-[#1C1A18] text-sm">TypeScript, Modern JavaScript (ES6+), PHP, Golang</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] space-y-1">
                    <span className="text-[#968F84] uppercase">Arsitektur &amp; Framework</span>
                    <p className="font-bold text-[#1C1A18] text-sm">Next.js (App Router), React, Tailwind CSS, Laravel</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] space-y-1">
                    <span className="text-[#968F84] uppercase">Basis Data &amp; Cloud</span>
                    <p className="font-bold text-[#1C1A18] text-sm">PostgreSQL, MySQL, Supabase, Vercel, Railway</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] space-y-1">
                    <span className="text-[#968F84] uppercase">Interaktivitas &amp; Motion</span>
                    <p className="font-bold text-[#1C1A18] text-sm">GSAP Motion, Framer Motion, Three.js (WebGL)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Stats */}
            {activeTab === "stats" && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DFC8] polaroid-card-shadow space-y-5 animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#1C1A18] tracking-tight">
                  Pencapaian &amp; Rekam Jejak
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8]">
                    <span className="text-3xl sm:text-4xl font-black text-[#E24332] font-mono">3+</span>
                    <span className="block text-xs font-mono text-[#7A7568] uppercase mt-1">Tahun Rekayasa</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8]">
                    <span className="text-3xl sm:text-4xl font-black text-[#F5B738] font-mono">15+</span>
                    <span className="block text-xs font-mono text-[#7A7568] uppercase mt-1">Proyek Tuntas</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] col-span-2 sm:col-span-1">
                    <span className="text-3xl sm:text-4xl font-black text-[#7FA99B] font-mono">100%</span>
                    <span className="block text-xs font-mono text-[#7A7568] uppercase mt-1">Komitmen Hasil</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Quick Jump Link */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => scrollTo("#certificates", { duration: 1.2 })}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1C1A18] hover:text-[#E24332] transition-colors cursor-pointer group"
              >
                <Award className="w-4 h-4 text-[#F5B738]" />
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
