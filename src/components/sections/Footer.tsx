"use client";

import { ArrowUp, Github, Linkedin, Mail, MessageSquare, Terminal, Code2 } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";

export function Footer() {
  const { scrollTo } = useLenis();

  const socialLinks = [
    {
      name: "GitHub",
      href: PERSONAL_INFO.contacts.githubUrl,
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: PERSONAL_INFO.contacts.linkedinUrl,
      icon: Linkedin,
    },
    {
      name: "WhatsApp",
      href: PERSONAL_INFO.contacts.whatsappUrl,
      icon: MessageSquare,
    },
    {
      name: "Email",
      href: `mailto:${PERSONAL_INFO.contacts.email}`,
      icon: Mail,
    },
  ];

  const handleBackToTop = () => {
    scrollTo("#hero", { duration: 1.2 });
  };

  return (
    <footer className="relative w-full py-12 sm:py-16 px-5 sm:px-10 lg:px-16 bg-[#070B12] text-slate-300 select-none border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Status Telemetry Line */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 text-[10px] font-mono text-slate-400 overflow-hidden">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">BUILD COMPLETE // ALL MODULES COMPILED</span>
          </span>
          <span className="hidden sm:inline text-cyan-400 font-bold">
            COMPILE ARCHITECTURE &bull; v2.0.26
          </span>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 font-mono">
          {/* Brand & Studio Identity */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(79,209,197,0.2)]">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <span className="text-xs font-black text-white tracking-wider uppercase">
                {PERSONAL_INFO.name}
              </span>
              <p className="text-[10px] text-slate-400">
                FULLSTACK DEVELOPER &bull; INDONESIA
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-cyan-950 hover:text-cyan-300 text-slate-400 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer shadow-xs"
                  aria-label={social.name}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Back to Top Action */}
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 border border-slate-800 hover:border-cyan-400 text-xs font-mono tracking-wider transition-all cursor-pointer"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Hash & Copyright Receipt */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <p>
            &copy; 2026 {PERSONAL_INFO.name}. ENGINEERED WITH PRECISION.
          </p>
          <div className="flex items-center gap-2 text-cyan-500/70">
            <Terminal className="w-3 h-3" />
            <span>sha256:fdr-compile-2026-v2-ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
