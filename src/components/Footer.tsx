"use client";

import { Github, Linkedin, Mail, ArrowUp, Flame } from "lucide-react";
import { GuitarStringDivider } from "./GuitarStringDivider";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#07060a] border-t border-zinc-900 pt-8 pb-12 overflow-hidden">
      <GuitarStringDivider label="OUTRO &amp; CURTAIN CALL" fret={24} />

      <div className="container mx-auto px-6 md:px-12 pt-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Band Brand & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 font-[family-name:var(--font-bebas)] text-2xl tracking-wider text-white">
              <Flame className="w-5 h-5 text-red-500" />
              <span>FERY // RAMADHI</span>
            </div>
            <p className="text-xs font-mono text-zinc-500">
              FULLSTACK DEVELOPER × GUITARIST // CODE IN TUNE
            </p>
          </div>

          {/* Outro Nav Links */}
          <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <a
              href="#home"
              className="hover:text-red-400 transition-colors"
            >
              BERANDA
            </a>
            <a
              href="#about"
              className="hover:text-red-400 transition-colors"
            >
              TENTANG
            </a>
            <a
              href="#skills"
              className="hover:text-red-400 transition-colors"
            >
              SETLIST
            </a>
            <a
              href="#projects"
              className="hover:text-red-400 transition-colors"
            >
              KARYA
            </a>
            <a
              href="#contact"
              className="hover:text-red-400 transition-colors"
            >
              KONTAK
            </a>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/ferydwi-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#121017] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_12px_rgba(255,42,59,0.5)] transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/fery-dwi-575204313"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-[#121017] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_12px_rgba(255,42,59,0.5)] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:ferydwir27@gmail.com"
              className="p-2.5 rounded-lg bg-[#121017] border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-500 hover:shadow-[0_0_12px_rgba(255,42,59,0.5)] transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/80 text-red-400 hover:bg-red-600 hover:text-white transition-all ml-2 cursor-pointer shadow-lg"
              aria-label="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-3">
          <p>© {currentYear} Fery Dwi Ramadhi. All stages and riffs reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-zinc-400">AMPLIFIED WITH NEXT.JS, THREE.JS &amp; GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
