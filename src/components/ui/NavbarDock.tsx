"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Flame, Disc3, Award, Send, Menu, X } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { useScrollStore } from "@/store/useScrollStore";

const NAV_ITEMS = [
  { id: "hero", label: "Opening", icon: Home },
  { id: "about", label: "The Artist", icon: User },
  { id: "skills", label: "Setlist", icon: Flame },
  { id: "projects", label: "Discography", icon: Disc3 },
  { id: "certificates", label: "Backstage Passes", icon: Award },
  { id: "contact", label: "Meet & Greet", icon: Send },
];

export function NavbarDock() {
  const { scrollTo } = useLenis();
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id));

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);
      useScrollStore.getState().setScrollProgress(progress);

      // Determine active section
      const viewMiddle = scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= viewMiddle) {
          const sectionId = NAV_ITEMS[i].id;
          setActiveSection(sectionId);
          useScrollStore.getState().setActiveSection(sectionId);
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
    scrollTo(`#${id}`, { duration: 1.2 });
  };

  return (
    <>
      {/* Separate Top-Left Logo / Brand Mark */}
      <header className="fixed top-5 left-6 z-50 flex items-center gap-3 select-none pointer-events-auto">
        <div className="w-8 h-8 rounded-lg bg-red-600 border border-red-400 flex items-center justify-center font-mono font-black text-white text-xs shadow-[0_0_15px_rgba(255,42,59,0.5)]">
          FR
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-mono font-black text-white tracking-widest uppercase">
            FERY DWI RAMADHI
          </span>
          <span className="text-[9px] font-mono text-red-400 font-bold tracking-wider">
            ROCKSTAR DEV // 2026
          </span>
        </div>
      </header>

      {/* Desktop Vertical Dock (Fixed Left Edge) */}
      <nav
        aria-label="Navigasi Panggung"
        className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center select-none"
      >
        <div className="relative py-4 px-2.5 rounded-full bg-[#110e19]/90 border border-zinc-800 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex flex-col items-center gap-5">
          {/* Vertical Vibrating Guitar String Line */}
          <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-zinc-800 pointer-events-none">
            {/* Glowing active string fill based on scroll */}
            <div
              className="w-full bg-red-500 shadow-[0_0_8px_#ff2a3b] transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? "text-white bg-red-600 shadow-[0_0_20px_rgba(255,42,59,0.8)] scale-110"
                    : "text-zinc-400 hover:text-white bg-[#191522] hover:bg-zinc-800 border border-zinc-800/80"
                }`}
                aria-label={item.label}
                data-cursor-text={item.label}
              >
                <Icon className="w-4 h-4" />

                {/* Floating Tooltip Pill on Hover */}
                <span className="absolute left-12 px-2.5 py-1 rounded bg-black/90 border border-red-500/40 text-[10px] font-mono text-white tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg whitespace-nowrap">
                  {item.label}
                </span>

                {/* Active Indicator Ring */}
                {isActive && !prefersReducedMotion && (
                  <motion.div
                    layoutId="activeDockRing"
                    className="absolute -inset-1 rounded-full border border-red-500 pointer-events-none animate-pulse"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Hamburger Button (Fixed Top-Right) */}
      <div className="lg:hidden fixed top-4 right-5 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-3 rounded-full bg-[#14101e]/90 border border-red-500/50 text-white shadow-xl backdrop-blur-md cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-red-500" />}
        </button>
      </div>

      {/* Mobile Minimalist Bottom Sheet Dock */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="lg:hidden fixed bottom-6 left-4 right-4 z-50 p-3 rounded-2xl bg-[#0f0c18]/95 border-2 border-red-500/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.95)] flex items-center justify-around"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors cursor-pointer ${
                    isActive ? "text-red-400 bg-red-950/60" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-[8px] font-mono font-bold tracking-wider">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
