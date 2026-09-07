"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Radio } from "lucide-react";

export function StageCurtainIntro() {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    // Soundcheck progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsOpen(true), 400);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="stage-curtain"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
        >
          {/* Top & Bottom Curtain Panels splitting away */}
          <motion.div
            exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
            className="absolute top-0 inset-x-0 h-1/2 bg-[#08070d] border-b-2 border-red-600/40 shadow-2xl flex items-end justify-center pb-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,42,59,0.15)_0%,transparent_70%)]" />
          </motion.div>

          <motion.div
            exit={{ y: "100%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } }}
            className="absolute bottom-0 inset-x-0 h-1/2 bg-[#08070d] border-t-2 border-red-600/40 shadow-2xl flex items-start justify-center pt-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,42,59,0.15)_0%,transparent_70%)]" />
          </motion.div>

          {/* Soundcheck Console Display */}
          <motion.div
            exit={{ scale: 0.85, opacity: 0, transition: { duration: 0.4 } }}
            className="relative z-20 max-w-md w-full bg-[#110e19] border border-red-500/50 p-6 rounded-2xl shadow-[0_0_50px_rgba(255,42,59,0.35)] text-center space-y-5"
          >
            <div className="flex items-center justify-between text-xs font-mono text-red-400 border-b border-zinc-800 pb-3">
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 animate-pulse" />
                SYSTEM SOUNDCHECK
              </span>
              <span className="font-bold">48kHz // 24-BIT</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-white font-[family-name:var(--font-bebas)] tracking-wider">
                FERY DWI RAMADHI
              </h2>
              <p className="text-xs font-mono text-zinc-400 tracking-widest uppercase">
                TUNING GUITAR &amp; INITIALIZING RIG...
              </p>
            </div>

            {/* VU Meter Bars */}
            <div className="grid grid-cols-12 gap-1.5 h-6 bg-black/60 p-1.5 rounded-lg border border-zinc-800">
              {Array.from({ length: 12 }).map((_, i) => {
                const active = progress >= (i + 1) * 8;
                const isRed = i >= 9;
                const isAmber = i >= 6 && i < 9;
                return (
                  <div
                    key={i}
                    className={`rounded-xs transition-all duration-150 ${
                      active
                        ? isRed
                          ? "bg-red-500 shadow-[0_0_8px_#ff2a3b]"
                          : isAmber
                          ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]"
                          : "bg-emerald-500 shadow-[0_0_8px_#10b981]"
                        : "bg-zinc-800"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-red-500" />
                OUTPUT GAIN: +6dB
              </span>
              <span className="text-red-400 font-bold">{progress}% READY</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
