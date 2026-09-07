"use client";

import { Github, Linkedin, Mail, ArrowUp, Flame, Radio } from "lucide-react";
import { GuitarStringDivider } from "./GuitarStringDivider";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050408] border-t-2 border-zinc-900 pt-8 pb-14 overflow-hidden">
      <GuitarStringDivider label="CURTAIN CALL &amp; ENCORE" fret={24} />

      <div className="container mx-auto px-6 md:px-12 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          {/* Band Brand & Tagline */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 font-[family-name:var(--font-bebas)] text-3xl tracking-wider text-white">
              <Flame className="w-6 h-6 text-red-500 animate-pulse" />
              <span>FERY // RAMADHI</span>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              FULLSTACK DEVELOPER × GUITARIST // AMPLIFIED CODE &amp; HEAVY RIFFS
            </p>
          </div>

          {/* Outro Quick Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <a href="#home" className="hover:text-red-400 transition-colors">
              BERANDA
            </a>
            <a href="#about" className="hover:text-red-400 transition-colors">
              TENTANG
            </a>
            <a href="#skills" className="hover:text-red-400 transition-colors">
              SETLIST
            </a>
            <a href="#projects" className="hover:text-red-400 transition-colors">
              KARYA
            </a>
            <a href="#certificates" className="hover:text-red-400 transition-colors">
              PASS
            </a>
            <a href="#contact" className="hover:text-red-400 transition-colors">
              KONTAK
            </a>
          </div>

          {/* Social Channels & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ferydwi-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#120f1a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,59,0.5)] transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/fery-dwi-575204313"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#120f1a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,59,0.5)] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:ferydwir27@gmail.com"
              className="p-3 rounded-xl bg-[#120f1a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,42,59,0.5)] transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-all ml-2 cursor-pointer shadow-[0_0_15px_rgba(255,42,59,0.5)]"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Amplifier Vacuum Tube Telemetry */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-3">
          <p>© {currentYear} Fery Dwi Ramadhi. Built for high performance and loud stages.</p>
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-zinc-400 font-bold">STAGE MONITOR: 100% OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
