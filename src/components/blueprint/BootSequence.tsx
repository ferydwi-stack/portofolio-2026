"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  { text: "[INIT] Loading portfolio kernel v2.0.26...", delay: 0 },
  { text: "[OK] Design system compiled", delay: 300, status: "ok" },
  { text: "[OK] Component tree assembled", delay: 500, status: "ok" },
  { text: "[OK] Project registry loaded (15 entries)", delay: 700, status: "ok" },
  { text: "[OK] Certificate vault verified", delay: 900, status: "ok" },
  { text: "[OK] Skills matrix calibrated", delay: 1050, status: "ok" },
  { text: "[BOOT] Launching Fery Dwi Ramadhi // Fullstack Developer", delay: 1300, status: "boot" },
  { text: "[READY] System online. Welcome.", delay: 1700, status: "ready" },
];

export function BootSequence() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Only show once per session
    const hasBooted = sessionStorage.getItem("portfolio-booted");
    if (hasBooted) {
      setShouldShow(false);
      return;
    }

    // Progressively reveal boot lines
    BOOT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => Math.max(prev, index + 1));
      }, line.delay);
    });

    // Auto-dismiss after all lines shown
    const autoDismiss = setTimeout(() => {
      handleDismiss();
    }, 2500);

    return () => clearTimeout(autoDismiss);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDismiss = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolio-booted", "true");
    }
    setIsDismissed(true);
  }, []);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0A0F1A] flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={handleDismiss}
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 scanline-overlay pointer-events-none" />

          {/* Terminal Window */}
          <div className="w-full max-w-xl px-6 sm:px-8 space-y-1.5 relative z-10">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 pb-3 border-b border-[#1E293B] mb-4">
              <span className="w-3 h-3 rounded-full bg-[#F87171]" />
              <span className="w-3 h-3 rounded-full bg-[#E8A33D]" />
              <span className="w-3 h-3 rounded-full bg-[#34D399]" />
              <span className="ml-3 text-xs font-mono text-[#475569]">
                portfolio-build.sh
              </span>
            </div>

            {/* Boot Lines */}
            {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={`font-mono text-xs sm:text-sm leading-relaxed ${
                  line.status === "ok"
                    ? "text-[#34D399]"
                    : line.status === "boot"
                    ? "text-[#E8A33D]"
                    : line.status === "ready"
                    ? "text-[#4FD1C5] terminal-glow font-bold"
                    : "text-[#64748B]"
                }`}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Cursor */}
            {visibleLines < BOOT_LINES.length && (
              <span className="inline-block w-2 h-4 bg-[#4FD1C5] cursor-blink" />
            )}

            {/* Skip hint */}
            <div className="pt-6 text-center">
              <span className="text-[10px] font-mono text-[#475569] tracking-wider uppercase">
                KLIK UNTUK SKIP &bull; v2.0.26
              </span>
            </div>
          </div>

          {/* Corner Grid Decoration */}
          <div className="absolute top-6 left-6 text-[10px] font-mono text-[#1E293B]">
            ┌─ COMPILE ──────
          </div>
          <div className="absolute bottom-6 right-6 text-[10px] font-mono text-[#1E293B]">
            ──────── BUILD ─┘
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
