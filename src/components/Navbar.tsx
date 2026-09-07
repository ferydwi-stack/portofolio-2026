"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Flame,
  User,
  Sliders,
  Disc3,
  Ticket,
  Send,
  Radio,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "home", label: "BERANDA", code: "01", icon: Flame },
  { id: "about", label: "TENTANG", code: "02", icon: User },
  { id: "skills", label: "SETLIST", code: "03", icon: Sliders },
  { id: "projects", label: "DISCOGRAPHY", code: "04", icon: Disc3 },
  { id: "certificates", label: "BACKSTAGE PASS", code: "05", icon: Ticket },
  { id: "contact", label: "BOOK GIG", code: "06", icon: Send },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top-Left Corner Brand Mark (Independent from Navbar) */}
      <div className="fixed top-6 left-6 sm:left-10 z-50 flex items-center gap-3 select-none">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleScrollTo("home");
          }}
          className="group flex items-center gap-2.5 p-2 rounded-xl bg-[#09080e]/90 border border-zinc-800/80 backdrop-blur-md hover:border-red-500 shadow-xl transition-all"
        >
          <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-[0_0_12px_#ff2a3b] group-hover:rotate-12 transition-transform">
            <Flame className="w-4 h-4" />
          </div>
          <div className="font-[family-name:var(--font-bebas)] tracking-wider text-lg leading-none pr-1">
            <span className="text-white group-hover:text-red-400 transition-colors">
              FERY <span className="text-red-500">{"//"}</span> RAMADHI
            </span>
          </div>
          <span className="text-[9px] font-mono uppercase bg-red-950/80 border border-red-800 text-red-300 px-1.5 py-0.5 rounded hidden sm:inline-block">
            LIVE RIG
          </span>
        </a>
      </div>

      {/* Desktop Vertical Dock (Left Screen Edge, Vertically Centered) */}
      <nav
        aria-label="Stage Navigation Dock"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center"
      >
        <div className="relative bg-[#0b0a12]/92 backdrop-blur-xl border border-zinc-800/90 rounded-full p-2.5 shadow-[0_0_30px_rgba(0,0,0,0.8)] flex flex-col items-center gap-4">
          {/* Vertical Guitar String Line running behind markers */}
          <div className="absolute top-4 bottom-4 w-[2px] bg-gradient-to-b from-red-600 via-amber-400 to-red-600 opacity-40 pointer-events-none" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => handleScrollTo(item.id)}
                  aria-label={item.label}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-red-600 text-white shadow-[0_0_18px_#ff2a3b] scale-110"
                      : "bg-[#14111d] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:scale-105"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>

                {/* Tooltip popping out to the right */}
                <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#120f1a] border border-red-500/50 rounded-lg shadow-xl pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap z-50">
                  <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <span className="text-red-400 font-bold">{item.code}.</span>
                    <span className="text-white font-bold tracking-wider uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fret Status Indicator */}
        <div className="mt-3 text-[9px] font-mono text-zinc-500 uppercase tracking-widest rotate-90 origin-left translate-x-4">
          FRET DOCK
        </div>
      </nav>

      {/* Mobile Hamburger Dock Button (Top-Right) */}
      <div className="fixed top-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-xl bg-[#0e0c15]/95 border border-zinc-800 text-zinc-200 hover:text-red-500 shadow-xl backdrop-blur-md cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Stage Pass Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-[#090812]/98 border-l-2 border-red-950 backdrop-blur-2xl p-6 shadow-2xl z-50 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-2 font-[family-name:var(--font-bebas)] text-2xl text-white">
                  <Flame className="w-5 h-5 text-red-500" />
                  <span>FERY {"//"} RAMADHI</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="text-[10px] font-mono text-red-400 uppercase tracking-widest flex items-center gap-2">
                <Radio className="w-3 h-3 animate-pulse" />
                STAGE SETLIST DOCK
              </div>

              <nav className="flex flex-col gap-2 font-mono">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className="p-3 rounded-xl bg-[#14111d] hover:bg-red-950/40 border border-zinc-800/80 flex items-center justify-between text-left text-xs uppercase tracking-wider text-zinc-300 hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-red-500 font-bold">{item.code}.</span>
                      <span>{item.label}</span>
                    </span>
                    <span className="text-zinc-600 text-[10px]">GO ↵</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-800">
              <button
                onClick={() => handleScrollTo("contact")}
                className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-black uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,42,59,0.5)]"
              >
                BOOK THE SHOW ⚡
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
