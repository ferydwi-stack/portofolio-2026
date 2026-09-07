"use client";

import { ArrowUp, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";
import { EqualizerVisualizer } from "@/components/ui/EqualizerVisualizer";
import { BandLogo } from "@/components/ui/BandLogo";

export function Footer() {
  const { scrollTo } = useLenis();

  const socialLinks = [
    {
      name: "GitHub",
      href: PERSONAL_INFO.contacts.githubUrl,
      icon: Github,
      offset: "-translate-y-1.5",
      color: "hover:text-white",
    },
    {
      name: "LinkedIn",
      href: PERSONAL_INFO.contacts.linkedinUrl,
      icon: Linkedin,
      offset: "translate-y-2",
      color: "hover:text-blue-400",
    },
    {
      name: "WhatsApp",
      href: PERSONAL_INFO.contacts.whatsappUrl,
      icon: MessageSquare,
      offset: "-translate-y-1",
      color: "hover:text-emerald-400",
    },
    {
      name: "Email",
      href: `mailto:${PERSONAL_INFO.contacts.email}`,
      icon: Mail,
      offset: "translate-y-1.5",
      color: "hover:text-red-400",
    },
  ];

  return (
    <footer className="relative w-full py-12 px-6 sm:px-12 lg:px-24 overflow-hidden select-none bg-[#070609]">
      {/* Full-width Equalizer Visualizer Ambience (§4.10c) */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-25 flex justify-center overflow-hidden" aria-hidden="true">
        <EqualizerVisualizer width={340} height={32} opacity={0.35} />
      </div>

      {/* Faint BandLogo watermark in bottom corner (§5.8) */}
      <div className="absolute right-6 -bottom-4 pointer-events-none opacity-[0.06] select-none" aria-hidden="true">
        <BandLogo size={120} />
      </div>

      {/* Top Line */}
      <div className="relative w-full h-4 mb-8 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent animate-pulse" />
        <div className="relative z-10 px-3 py-0.5 rounded-full bg-[#0d0a14] border border-zinc-800 text-[8px] font-mono text-zinc-500 uppercase tracking-widest">
          &bull; PENUTUP &bull;
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 font-mono">
        {/* Brand & Rights */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-black uppercase text-white tracking-widest">
              {PERSONAL_INFO.name}
            </span>
          </div>
          <p className="text-[10px] text-zinc-500">
            &copy; 2026 FERY DWI RAMADHI. SELURUH HAK CIPTA DILINDUNGI &bull; FULLSTACK DEVELOPER
          </p>
        </div>

        {/* Handmade / Sticker Offset Social Icons */}
        <div className="flex items-center gap-4 py-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-[#110e19] border border-zinc-800 transition-all duration-200 text-zinc-400 shadow-md ${social.offset} ${social.color} hover:border-red-500/80 hover:scale-110 cursor-pointer`}
                aria-label={social.name}
                data-cursor-text={social.name.toUpperCase()}
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        {/* Back to Top Button */}
        <div>
          <button
            onClick={() => scrollTo("#hero", { duration: 1.5 })}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-white text-xs tracking-wider transition-colors cursor-pointer"
            data-cursor-text="ATAS"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>
      </div>
    </footer>
  );
}
