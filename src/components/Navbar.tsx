"use client";

import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Beranda", href: "#home", code: "01" },
  { name: "Tentang", href: "#about", code: "02" },
  { name: "Setlist", href: "#skills", code: "03" },
  { name: "Karya", href: "#projects", code: "04" },
  { name: "Pass", href: "#certificates", code: "05" },
  { name: "Kontak", href: "#contact", code: "06" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#09080e]/90 backdrop-blur-md border-b border-red-950/40 shadow-xl shadow-black/50 py-3"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Band Wordmark Logo */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="group flex items-center gap-2.5 text-2xl font-bold tracking-widest uppercase transition-transform font-[family-name:var(--font-bebas)]"
        >
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-black font-black group-hover:rotate-12 transition-transform shadow-[0_0_15px_#ff2a3b]">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-white group-hover:text-red-500 transition-colors tracking-wider">
            FERY <span className="text-red-500">{"//"}</span> RAMADHI
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-red-950/70 border border-red-800/60 text-red-300 rounded tracking-widest hidden sm:inline-block">
            LIVE RIG
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative py-2"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-xs uppercase font-mono tracking-widest text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="text-red-500 text-[10px]">{link.code}.</span>
                  {link.name}
                </a>

                {/* Guitar String Underline Vibration */}
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="guitar-string-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-600 via-amber-400 to-red-600 shadow-[0_0_8px_#ff3b3b]"
                    initial={{ scaleY: 1 }}
                    animate={{
                      scaleY: [1, 4, 0.5, 3, 1],
                      transition: { repeat: Infinity, duration: 0.35 }
                    }}
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Book Gig Concert Ticket Button */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="relative px-5 py-2 text-xs font-mono font-bold tracking-widest uppercase text-white bg-red-600 hover:bg-red-500 transition-all rounded-xs shadow-[0_0_15px_rgba(255,42,59,0.4)] flex items-center gap-2 group border-y border-red-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            BOOK THE SHOW
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-200 hover:text-red-500 p-2 rounded-lg bg-zinc-900 border border-zinc-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Concert Pass Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0c0a12]/98 border-b border-red-950/60 backdrop-blur-xl px-6 py-6 shadow-2xl"
          >
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
              {"//"} STAGE SETLIST SECTIONS
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="py-3 px-3 rounded-lg text-sm font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-red-950/30 flex items-center justify-between border-b border-zinc-900 last:border-0"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-red-500 text-xs font-bold">{link.code}.</span>
                    {link.name}
                  </span>
                  <span className="text-zinc-600 text-xs">READY ↵</span>
                </a>
              ))}
            </nav>
            <div className="pt-4 mt-2">
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold tracking-widest uppercase rounded flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,42,59,0.5)]"
              >
                BOOK THE SHOW ⚡
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
