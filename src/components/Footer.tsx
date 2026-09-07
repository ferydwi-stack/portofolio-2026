"use client";

import { Github, Linkedin, Mail, ArrowUp, Flame, Radio } from "lucide-react";
import { GuitarStringDivider } from "./GuitarStringDivider";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050408] border-t-2 border-zinc-900 pt-8 pb-14 pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-12 overflow-hidden select-none">
      <GuitarStringDivider label="CURTAIN CALL &bull; FRET 24" fret={24} />

      <div className="pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-zinc-900">
          {/* Band Brand & Subtext */}
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 font-[family-name:var(--font-bebas)] text-3xl tracking-wider text-white">
              <Flame className="w-6 h-6 text-red-500 animate-pulse" />
              <span>FERY {"//"} RAMADHI</span>
            </div>
            <p className="text-xs font-mono text-zinc-400">
              FULLSTACK DEVELOPER × GUITARIST // AMPLIFIED CODE &amp; HEAVY RIFFS
            </p>
          </div>

          {/* Social Icons Dispersed with Vertical Asymmetric Offsets */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ferydwi-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#120f1a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(255,42,59,0.5)] transition-all transform -translate-y-2 hover:translate-y-0"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/fery-dwi-575204313"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-[#120f1a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(255,42,59,0.5)] transition-all transform translate-y-2 hover:translate-y-0"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:ferydwir27@gmail.com"
              className="p-3.5 rounded-2xl bg-[#120f1a] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(255,42,59,0.5)] transition-all transform -translate-y-1 hover:translate-y-0"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white transition-all ml-2 cursor-pointer shadow-[0_0_20px_rgba(255,42,59,0.5)] transform translate-y-1 hover:translate-y-0"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-3">
          <p>© {currentYear} Fery Dwi Ramadhi. All stage riffs &amp; code amplified.</p>
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-red-500 animate-pulse" />
            <span className="text-zinc-400 font-bold">100% LIVE VENUE OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
