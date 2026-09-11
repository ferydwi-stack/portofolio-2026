"use client";

import dynamic from "next/dynamic";
import { ArrowDown, Code2, Sparkles, FolderGit2, Mail, Github, Linkedin } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";

// Dynamic import Three.js component (no SSR)
const WireframeAssemblyCanvas = dynamic(
  () => import("@/components/blueprint/WireframeAssembly").then((mod) => mod.WireframeAssemblyCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[420px] mx-auto rounded-2xl border border-[#4FD1C5]/10 flex items-center justify-center">
        <span className="text-xs font-mono text-[#4FD1C5]/30 animate-pulse">LOADING 3D...</span>
      </div>
    ),
  }
);

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-14 overflow-hidden blueprint-grid select-none"
    >
      {/* Ambient Glow Effects */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#4FD1C5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-[#E8A33D]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Status Strip */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#1E293B] text-xs font-mono gap-2 sm:gap-0 relative z-10">
        <div className="flex items-center gap-2 text-[#E2E8F0] font-bold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]"></span>
          </span>
          <span className="tracking-wider">STATUS: TERSEDIA UNTUK PEKERJAAN &amp; KOLABORASI</span>
        </div>

        <div className="flex items-center gap-4 text-[#64748B] text-[11px]">
          <span className="hidden md:inline">INFORMATIKA &bull; WEB &amp; MOBILE &bull; INDONESIA</span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#1B232E] border border-[#334155] text-[#4FD1C5] font-bold shadow-xs">
            BUILD 2026
          </span>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center relative z-10">
        {/* Left Developer Bio & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Professional Role Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B232E] border border-[#334155] text-xs font-mono text-[#E2E8F0] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4FD1C5]" />
            <span className="font-bold tracking-wide">FULLSTACK DEVELOPER &bull; SOFTWARE ENGINEER</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#E2E8F0] tracking-tight leading-[1.06] uppercase">
              Membangun Solusi Web Modern &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8]">Berkinerja Tinggi.</span>
            </h1>
            <p className="font-mono text-sm sm:text-base font-bold text-[#64748B] tracking-wider uppercase pt-1">
              {PERSONAL_INFO.name} &mdash; Mahasiswa Informatika &amp; Web Developer
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
            Selamat datang di portofolio saya. Saya merancang dan mengembangkan aplikasi web serta mobile dengan arsitektur kode yang tangguh, antarmuka responsif, dan performa tinggi yang siap untuk skala produksi.
          </p>

          {/* Stats Cards — Compile Card Glassmorphism */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xl pt-1">
            <div className="p-3.5 rounded-xl compile-card text-center">
              <span className="block font-mono text-xl sm:text-2xl font-black text-[#E2E8F0]">10+</span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#64748B] uppercase font-bold pt-0.5">
                Proyek Selesai
              </span>
            </div>

            <div className="p-3.5 rounded-xl compile-card text-center">
              <span className="block font-mono text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8]">Fullstack</span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#64748B] uppercase font-bold pt-0.5">
                Next.js &bull; Node &bull; DB
              </span>
            </div>

            <div className="p-3.5 rounded-xl compile-card text-center">
              <span className="block font-mono text-xl sm:text-2xl font-black text-[#E8A33D]">4+</span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#64748B] uppercase font-bold pt-0.5">
                Sertifikasi Resmi
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("#projects", { duration: 1.2 })}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#4FD1C5] text-[#0A0F1A] font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-lg shadow-[#4FD1C5]/20 flex items-center gap-2 transform active:scale-95"
            >
              <FolderGit2 className="w-4 h-4" />
              <span>JELAJAHI PORTOFOLIO PROYEK</span>
            </button>

            <button
              onClick={() => scrollTo("#contact", { duration: 1.2 })}
              className="px-6 py-3.5 rounded-xl bg-[#1B232E] hover:bg-[#232D3B] text-[#E2E8F0] border border-[#334155] font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-xs flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#E8A33D]" />
              <span>HUBUNGI SAYA</span>
            </button>

            {/* Social quick pills */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href={PERSONAL_INFO.contacts.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#1B232E] hover:bg-[#232D3B] text-[#94A3B8] hover:text-[#4FD1C5] border border-[#334155] transition-colors shadow-xs"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.contacts.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-[#1B232E] hover:bg-[#232D3B] text-[#94A3B8] hover:text-[#4FD1C5] border border-[#334155] transition-colors shadow-xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right — 3D Wireframe Assembly */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <WireframeAssemblyCanvas />
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#1E293B] text-xs font-mono text-[#64748B] cursor-pointer relative z-10"
        onClick={() => scrollTo("#about", { duration: 1.0 })}
      >
        <span className="flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <Code2 className="w-3.5 h-3.5 text-[#4FD1C5]" />
          GULIR KE BAWAH UNTUK MELIHAT PROFIL &amp; KEAHLIAN
        </span>
        <div className="flex items-center gap-1 font-bold text-[#E2E8F0]">
          <span>GULIR</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
