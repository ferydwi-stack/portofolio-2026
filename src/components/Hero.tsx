"use client";

import { useRef, useEffect } from "react";
import { ArrowRight, ChevronDown, Flame } from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bottomBoxRef = useRef<HTMLDivElement | null>(null);

  const headline = "FERY DWI RAMADHI";

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current || !headlineRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const chars = headlineRef.current.querySelectorAll(".hero-char");

    // GSAP ScrollTrigger timeline: as user scrolls down, headline characters scatter and parallax away!
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1.2,
          pin: false,
        },
      });

      tl.to(chars, {
        x: (i) => (i % 2 === 0 ? -120 - i * 15 : 120 + i * 15),
        y: (i) => -60 - i * 12,
        opacity: 0.15,
        stagger: 0.02,
        ease: "power2.out",
      });

      if (bottomBoxRef.current) {
        tl.to(
          bottomBoxRef.current,
          {
            y: 80,
            opacity: 0,
            ease: "power2.out",
          },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-28 pb-12 px-6 sm:px-12 lg:pl-28 lg:pr-16 select-none"
    >
      {/* Top Banner Tag */}
      <div className="relative z-20 pt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/50 bg-[#110e19]/90 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(255,42,59,0.3)]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <Flame className="w-3.5 h-3.5 text-red-500" />
          <span className="font-bold">LIVE STAGE 2026</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">INDONESIA</span>
        </div>
      </div>

      {/* Massive Full-Bleed Left-Aligned Headline (Overlapping 3D Musician) */}
      <div className="relative z-10 w-full my-auto">
        <h1
          ref={headlineRef}
          className="text-[14vw] sm:text-[13vw] lg:text-[12.5vw] font-black tracking-tighter text-white uppercase font-[family-name:var(--font-bebas)] leading-[0.82] select-none text-glow-crimson -ml-2 sm:-ml-4 drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] max-w-full overflow-visible"
        >
          {headline.split("").map((char, index) => (
            <span
              key={index}
              className={`hero-char inline-block ${
                char === " " ? "w-[4vw]" : ""
              } hover:text-red-500 transition-colors duration-200 cursor-default`}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className="text-xs sm:text-sm font-mono tracking-[0.4em] uppercase text-red-500 mt-3 flex items-center gap-3">
          <span className="w-6 h-0.5 bg-red-500" />
          <span>DEVELOPER BY DAY {"//"} GUITARIST BY NIGHT</span>
        </div>
      </div>

      {/* Subheading & Concert Ticket CTA in Bottom-Right Corner */}
      <div
        ref={bottomBoxRef}
        className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-6 border-t border-zinc-800/80"
      >
        {/* Left Subtext */}
        <div className="max-w-md space-y-2">
          <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
            Menulis baris kode sepresisi metronom studio, membangun arsitektur panggung digital sekuat distorsi amplifier.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span>FREQUENCY: 48kHz</span>
            <span>•</span>
            <span className="text-red-400">DROP-D TUNING</span>
          </div>
        </div>

        {/* Right Corner CTA & Bouncing Pick Scroll Indicator */}
        <div className="flex flex-col sm:items-end gap-5">
          <div className="flex flex-wrap items-center gap-4">
            {/* Ticket CTA */}
            <a
              href="#projects"
              className="relative px-8 py-4 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_0_30px_rgba(255,42,59,0.5)] flex items-center justify-center gap-3 group border-y-2 border-red-400 cursor-pointer"
              style={{
                clipPath:
                  "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)",
              }}
            >
              <span>SEE DISCOGRAPHY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>

            <a
              href="#contact"
              className="relative px-7 py-4 bg-[#14111d] hover:bg-zinc-900 border border-zinc-700 hover:border-red-500 font-mono text-xs uppercase tracking-widest font-bold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              style={{
                clipPath:
                  "polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)",
              }}
            >
              <span>BOOK GIG</span>
              <span className="text-red-500">⚡</span>
            </a>
          </div>

          {/* Bouncing Guitar Pick Scroll Indicator */}
          <div className="flex items-center gap-2.5 font-mono text-[10px] text-zinc-400">
            <span className="tracking-widest uppercase">SCROLL TO ENTER VENUE</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-5 h-6 flex items-center justify-center"
            >
              {/* Guitar Pick Shape */}
              <svg width="18" height="22" viewBox="0 0 24 28" fill="none" className="text-red-500">
                <path
                  d="M12 26C8 20 2 12 2 6C2 2.5 6 1 12 1C18 1 22 2.5 22 6C22 12 16 20 12 26Z"
                  fill="#ff2a3b"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <circle cx="12" cy="8" r="2" fill="#ffffff" />
              </svg>
            </motion.div>
            <ChevronDown className="w-3.5 h-3.5 text-red-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
