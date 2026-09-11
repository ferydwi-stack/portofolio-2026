"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, User, Cpu, FolderGit2, Award, Send, Menu, X, Volume2, VolumeX } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { playHoverTick, playCyberClick, toggleMuteSound } from "@/lib/sound/cyberSound";

const NAV_ITEMS = [
  { id: "hero", label: "Beranda", icon: Terminal },
  { id: "about", label: "Tentang", icon: User },
  { id: "skills", label: "Keahlian", icon: Cpu },
  { id: "projects", label: "Proyek", icon: FolderGit2 },
  { id: "certificates", label: "Sertifikasi", icon: Award },
  { id: "contact", label: "Kontak", icon: Send },
];

export function BlueprintNavbar() {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewMiddle = scrollY + window.innerHeight * 0.35;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= viewMiddle) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    playCyberClick();
    setIsMobileOpen(false);
    scrollTo(`#${id}`, { duration: 1.1 });
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const muted = toggleMuteSound();
    setIsMuted(muted);
  };

  return (
    <>
      {/* Top Left Compile Header Badge with Audio Toggle */}
      <header className="fixed top-4 left-4 sm:left-8 z-50 flex items-center gap-2 select-none pointer-events-auto">
        <div className="flex items-center gap-3 bg-[#111827]/90 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-[#1E293B] shadow-lg shadow-black/20">
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2.5 cursor-pointer text-left group"
            aria-label="Kembali ke atas"
          >
            {/* Compile Logo Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4FD1C5] to-[#38BDF8] flex items-center justify-center shadow-md shadow-[#4FD1C5]/20">
              <Terminal className="w-4 h-4 text-[#0A0F1A]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] sm:text-xs font-mono font-black text-[#E2E8F0] tracking-wider uppercase">
                FERY DWI RAMADHI
              </span>
              <span className="text-[9px] font-mono text-[#4FD1C5] font-bold tracking-tight">
                v2.0 // FULLSTACK DEVELOPER
              </span>
            </div>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={playHoverTick}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-cyan-950 text-slate-400 hover:text-cyan-300 transition-colors border border-slate-700 cursor-pointer ml-1"
            title={isMuted ? "Aktifkan Efek Suara" : "Bisukan Efek Suara"}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* Floating Center-Bottom Navigation Dock */}
      <nav
        aria-label="Navigasi Utama"
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center select-none"
      >
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#111827]/90 border border-[#1E293B] backdrop-blur-xl shadow-2xl shadow-black/30">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHoverTick}
                className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#0A0F1A] font-bold"
                    : "text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCompileDock"
                    className="absolute inset-0 bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] rounded-full shadow-md shadow-[#4FD1C5]/25 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Hamburger Floating Button */}
      <div className="md:hidden fixed bottom-6 right-5 z-50">
        <button
          onClick={() => {
            playCyberClick();
            setIsMobileOpen(!isMobileOpen);
          }}
          className="p-3.5 rounded-full bg-[#111827] text-[#4FD1C5] border border-[#1E293B] shadow-2xl shadow-black/30 cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X className="w-5 h-5 text-[#E2E8F0]" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="md:hidden fixed bottom-20 left-4 right-4 z-50 p-4 rounded-2xl bg-[#111827]/95 border border-[#1E293B] backdrop-blur-2xl shadow-2xl shadow-black/40 grid grid-cols-3 gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl font-mono text-[11px] transition-colors cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-br from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] font-bold"
                      : "text-[#94A3B8] bg-[#1B232E]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
