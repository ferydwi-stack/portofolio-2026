"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, User, Layers, Film, Award, Send, Menu, X } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { CameraLogo } from "@/components/photobooth/CameraLogo";
import { playShutterSound } from "@/lib/sound/shutterSound";

const NAV_ITEMS = [
  { id: "hero", label: "Beranda", icon: Camera },
  { id: "about", label: "Tentang", icon: User },
  { id: "skills", label: "Keahlian", icon: Layers },
  { id: "projects", label: "Proyek", icon: Film },
  { id: "certificates", label: "Sertifikasi", icon: Award },
  { id: "contact", label: "Kontak", icon: Send },
];

export function RetroNavbar() {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
    setIsMobileOpen(false);
    playShutterSound();
    scrollTo(`#${id}`, { duration: 1.1 });
  };

  return (
    <>
      {/* Top Left Professional Header Badge */}
      <header className="fixed top-4 left-4 sm:left-8 z-50 flex items-center gap-3 select-none pointer-events-auto bg-[#FFFFFF]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#E5DFC8] photostrip-shadow">
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 cursor-pointer text-left group"
          aria-label="Kembali ke atas"
        >
          <CameraLogo size={30} glow />
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-mono font-black text-[#1C1A18] tracking-wider uppercase">
              FERY DWI RAMADHI
            </span>
            <span className="text-[9px] font-mono text-[#E24332] font-bold tracking-tight">
              FULLSTACK DEVELOPER &bull; 2026
            </span>
          </div>
        </button>
      </header>

      {/* Floating Center-Bottom Navigation Dock (Modern Photobooth Bar) */}
      <nav
        aria-label="Navigasi Photobooth"
        className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-50 items-center select-none"
      >
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#181615]/90 border border-[#383531] backdrop-blur-xl shadow-2xl">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full flex items-center gap-2 text-xs font-mono font-medium transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "text-[#181615] font-bold"
                    : "text-[#FAF8F5]/70 hover:text-white hover:bg-white/10"
                }`}
                data-cursor-text={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeRetroDock"
                    className="absolute inset-0 bg-[#F5B738] rounded-full shadow-md -z-10"
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
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3.5 rounded-full bg-[#181615] text-[#F5B738] border border-[#383531] shadow-2xl cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="md:hidden fixed bottom-20 left-4 right-4 z-50 p-4 rounded-2xl bg-[#181615]/95 border border-[#383531] backdrop-blur-2xl shadow-2xl grid grid-cols-3 gap-2"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl font-mono text-[11px] transition-colors ${
                    isActive
                      ? "bg-[#F5B738] text-[#181615] font-bold"
                      : "text-[#FAF8F5]/80 bg-[#252320]"
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
