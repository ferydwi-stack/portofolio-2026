"use client";

import { ArrowDown, Code2, Sparkles, FolderGit2, Mail, ExternalLink, Github, Linkedin } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";
import { PhotoStrip4Cut } from "@/components/photobooth/PhotoStrip4Cut";

export function Hero() {
  const { scrollTo } = useLenis();

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-14 overflow-hidden paper-grain select-none"
    >
      {/* Top Professional Status Strip */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E5DFC8] text-xs font-mono gap-2 sm:gap-0">
        <div className="flex items-center gap-2 text-[#1C1A18] font-bold">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34A853]"></span>
          </span>
          <span className="tracking-wider">STATUS: TERSEDIA UNTUK PEKERJAAN &amp; KOLABORASI</span>
        </div>

        <div className="flex items-center gap-4 text-[#7A7568] text-[11px]">
          <span className="hidden md:inline">INFORMATIKA &bull; WEB &amp; MOBILE &bull; INDONESIA</span>
          <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E5DFC8] text-[#1C1A18] font-bold shadow-xs">
            TAHUN 2026
          </span>
        </div>
      </div>

      {/* Main Hero Showcase */}
      <div className="max-w-7xl mx-auto w-full my-auto py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Developer Bio & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          {/* Professional Role Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5DFC8] text-xs font-mono text-[#1C1A18] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E24332]" />
            <span className="font-bold tracking-wide">FULLSTACK DEVELOPER &bull; SOFTWARE ENGINEER</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#1C1A18] tracking-tight leading-[1.06] uppercase">
              Membangun Solusi Web Modern &amp; <br />
              <span className="text-[#E24332]">Berkinerja Tinggi.</span>
            </h1>
            <p className="font-mono text-sm sm:text-base font-bold text-[#7A7568] tracking-wider uppercase pt-1">
              {PERSONAL_INFO.name} &mdash; Mahasiswa Informatika &amp; Web Developer
            </p>
          </div>

          <p className="text-base sm:text-lg text-[#5A554E] leading-relaxed max-w-xl">
            Selamat datang di portofolio saya. Saya merancang dan mengembangkan aplikasi web serta mobile dengan arsitektur kode yang tangguh, antarmuka responsif, dan performa tinggi yang siap untuk skala produksi.
          </p>

          {/* Professional Highlights in Photobooth Card Aesthetic */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-xl pt-1">
            <div className="p-3.5 rounded-xl bg-white border border-[#E5DFC8] polaroid-card-shadow text-center">
              <span className="block font-mono text-xl sm:text-2xl font-black text-[#1C1A18]">10+</span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#7A7568] uppercase font-bold pt-0.5">
                Proyek Selesai
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E5DFC8] polaroid-card-shadow text-center">
              <span className="block font-mono text-xl sm:text-2xl font-black text-[#E24332]">Fullstack</span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#7A7568] uppercase font-bold pt-0.5">
                Next.js &bull; Node &bull; DB
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#E5DFC8] polaroid-card-shadow text-center">
              <span className="block font-mono text-xl sm:text-2xl font-black text-[#F5B738]">4+</span>
              <span className="block text-[10px] sm:text-xs font-mono text-[#7A7568] uppercase font-bold pt-0.5">
                Sertifikasi Resmi
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => scrollTo("#projects", { duration: 1.2 })}
              className="px-6 py-3.5 rounded-xl bg-[#1C1A18] hover:bg-[#33302B] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md flex items-center gap-2 transform active:scale-95"
              data-cursor-text="PROYEK"
            >
              <FolderGit2 className="w-4 h-4 text-[#F5B738]" />
              <span>JELAJAHI PORTOFOLIO PROYEK</span>
            </button>

            <button
              onClick={() => scrollTo("#contact", { duration: 1.2 })}
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1C1A18] border border-[#E5DFC8] font-mono text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-xs flex items-center gap-2"
              data-cursor-text="KONTAK"
            >
              <Mail className="w-4 h-4 text-[#E24332]" />
              <span>HUBUNGI SAYA</span>
            </button>

            {/* Social quick pills */}
            <div className="flex items-center gap-2 pl-1">
              <a
                href={PERSONAL_INFO.contacts.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1C1A18] border border-[#E5DFC8] transition-colors shadow-xs"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.contacts.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white hover:bg-[#F3EFE6] text-[#1C1A18] border border-[#E5DFC8] transition-colors shadow-xs"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Iconic 4-Cut Strip Showcase (Creative Developer Identity) */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative">
            {/* Background Scrapbook Glow / Accent Board */}
            <div className="absolute -inset-6 bg-[#F3EFE6] rounded-3xl border border-[#E5DFC8] -rotate-2 -z-10 shadow-xs" />
            
            {/* The Signature 4-Cut Photobooth Strip */}
            <PhotoStrip4Cut theme="classic-white" />
          </div>
        </div>
      </div>

      {/* Bottom Scroll Cue */}
      <div
        className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4 border-t border-[#E5DFC8] text-xs font-mono text-[#7A7568] cursor-pointer"
        onClick={() => scrollTo("#about", { duration: 1.0 })}
      >
        <span className="flex items-center gap-2 uppercase tracking-widest text-[11px]">
          <Code2 className="w-3.5 h-3.5 text-[#E24332]" />
          GULIR KE BAWAH UNTUK MELIHAT PROFIL &amp; KEAHLIAN
        </span>
        <div className="flex items-center gap-1 font-bold text-[#1C1A18]">
          <span>GULIR</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
