"use client";

import { ArrowUp, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";
import { CameraLogo } from "@/components/photobooth/CameraLogo";
import { playShutterSound } from "@/lib/sound/shutterSound";

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
    playShutterSound();
    scrollTo("#hero", { duration: 1.2 });
  };

  return (
    <footer className="relative w-full py-12 sm:py-16 px-5 sm:px-10 lg:px-16 bg-[#181615] text-[#FAF8F5] select-none">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Film Roll Sprocket Line */}
        <div className="flex items-center justify-between pb-6 border-b border-[#2C2926] text-[10px] font-mono text-[#968F84] overflow-hidden">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F5B738]" />
            <span>END OF ROLL // 36 EXPOSURES COMPLETED</span>
          </span>
          <span className="hidden sm:inline">CEKREK RETRO STUDIO &bull; 2026 EDITION</span>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 font-mono">
          {/* Brand & Studio Identity */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <CameraLogo size={36} glow />
            <div className="space-y-0.5">
              <span className="text-xs font-black text-white tracking-wider uppercase">
                {PERSONAL_INFO.name}
              </span>
              <p className="text-[10px] text-[#968F84]">
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
                  className="p-2.5 rounded-xl bg-[#242220] hover:bg-[#F5B738] text-[#FAF8F5] hover:text-[#181615] border border-[#383531] transition-all cursor-pointer shadow-xs"
                  aria-label={social.name}
                  data-cursor-text={social.name.toUpperCase()}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>

          {/* Back to Top Action */}
          <button
            onClick={handleBackToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#242220] hover:bg-[#FAF8F5] text-[#FAF8F5] hover:text-[#181615] border border-[#383531] text-xs font-mono tracking-wider transition-colors cursor-pointer"
            data-cursor-text="ATAS"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#F5B738]" />
          </button>
        </div>

        {/* Bottom Barcode & Copyright Receipt */}
        <div className="pt-6 border-t border-[#2C2926] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-[#7A7568]">
          <p>
            &copy; 2026 FERY DWI RAMADHI. DIRANCANG DENGAN PENUH DEDIKASI.
          </p>
          <div className="flex items-center gap-2 tracking-[2px]">
            <span>||||| ||| |||||| |||| | |||||</span>
            <span>FDR-CEKREK-OK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
