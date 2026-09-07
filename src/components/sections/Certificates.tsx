"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Award, ShieldCheck, X, Sparkles, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATES, Certificate } from "@/lib/data/portfolioData";
import { useCertificatesTimeline } from "@/animations/useCertificatesTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playStringPluck, playStompClick } from "@/lib/sound/guitarSynth";

// Deterministic pseudo-random numbers based on index (avoids SSR hydration mismatches)
function getSeededRandom(seed: number) {
  const x = Math.sin(seed + 42) * 10000;
  return x - Math.floor(x);
}

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Connect GSAP staggered entrance timeline
  useCertificatesTimeline({ sectionRef, wallRef });

  // Precompute stable rotation & offset for each certificate
  const cardTransforms = useMemo(() => {
    return CERTIFICATES.map((_, i) => {
      const rot = (getSeededRandom(i * 3 + 1) - 0.5) * 16; // -8deg to +8deg
      const offsetY = (getSeededRandom(i * 5 + 2) - 0.5) * 24; // -12px to +12px
      const offsetX = (getSeededRandom(i * 7 + 3) - 0.5) * 16; // -8px to +8px
      return { rotation: Math.round(rot), offsetY: Math.round(offsetY), offsetX: Math.round(offsetX) };
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSelectedCert(null);
    }
  }, []);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCert, handleKeyDown]);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="relative min-h-screen py-28 px-6 sm:px-12 lg:px-24 overflow-hidden select-none"
    >
      {/* Background Section Ambient Watermark */}
      <div className="absolute right-4 top-1/4 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[16vw] font-black text-white/[0.02] pointer-events-none select-none">
        PASSES
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="mb-14 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Ticket className="w-3.5 h-3.5" />
            <span>BACKSTAGE PASSES &amp; LAMINATES WALL</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Sticker Wall &amp; Credentials
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans leading-relaxed">
            Kolase laminates pass tur dan stiker sertifikasi resmi yang ditempel acak di dinding ruang backstage panggung. Arahkan kursor untuk mengangkat pass.
          </p>
        </div>

        {/* Chaotic Wall Collage Grid */}
        <div
          ref={wallRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7 pt-4 pb-12"
        >
          {CERTIFICATES.map((cert, index) => {
            const transform = cardTransforms[index] || { rotation: 0, offsetY: 0, offsetX: 0 };
            const isHovered = hoveredIndex === index;

            // Simple repulsive nudge on neighbors
            let neighborOffsetX = 0;
            let neighborOffsetY = 0;
            if (hoveredIndex !== null && !isHovered && !prefersReducedMotion) {
              const diff = index - hoveredIndex;
              if (Math.abs(diff) === 1) {
                neighborOffsetX = diff > 0 ? 8 : -8;
                neighborOffsetY = 6;
              }
            }

            return (
              <motion.div
                key={cert.id}
                onHoverStart={() => {
                  setHoveredIndex(index);
                  playStringPluck(index % 6);
                }}
                onHoverEnd={() => setHoveredIndex(null)}
                style={{
                  rotate: prefersReducedMotion ? 0 : transform.rotation,
                  y: prefersReducedMotion ? 0 : transform.offsetY + neighborOffsetY,
                  x: prefersReducedMotion ? 0 : transform.offsetX + neighborOffsetX,
                }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.08,
                        rotate: 0,
                        y: -8,
                        zIndex: 40,
                        boxShadow: "0 25px 50px rgba(255, 42, 59, 0.4)",
                        transition: { type: "spring", stiffness: 350, damping: 22 },
                      }
                }
                onClick={() => {
                  playStompClick();
                  setSelectedCert(cert);
                }}
                className={`p-5 rounded-2xl bg-[#13101b]/95 border-2 transition-colors cursor-pointer relative overflow-hidden backdrop-blur-md shadow-2xl flex flex-col justify-between ${
                  cert.type === "external"
                    ? "border-red-500/70 hover:border-red-400"
                    : "border-zinc-800 hover:border-red-500"
                }`}
                data-cursor-text="INSPECT"
              >
                {/* Lanyard Clip Punch Hole */}
                <div className="w-8 h-2 bg-black border border-zinc-700 rounded-full mx-auto mb-3" />

                {/* Holographic Verification Badge */}
                {cert.type === "external" && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/90 border border-red-700/80 text-[8px] font-mono text-red-300">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    OFFICIAL
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3 font-mono">
                    <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/80 flex items-center justify-center text-red-400">
                      {cert.type === "external" ? (
                        <ShieldCheck className="w-4 h-4" />
                      ) : (
                        <Award className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-base font-black font-mono text-white line-clamp-2 mb-2 leading-tight">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-3">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-500 uppercase">{cert.issuer}</span>
                  <span className="text-red-400 font-bold flex items-center gap-1">
                    INSPECT ↵
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Accessible Fullscreen Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
            aria-label={`Detail sertifikat ${selectedCert.title}`}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCert(null);
              }}
              className="absolute top-6 right-6 p-3 bg-zinc-900/90 hover:bg-red-600 text-white rounded-full border border-zinc-700 hover:border-red-500 transition-all shadow-2xl z-50 cursor-pointer"
              aria-label="Tutup sertifikat"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-[#121017] border-2 border-zinc-700 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800 font-mono">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {selectedCert.title}
                  </h3>
                  <p className="text-xs text-red-400">
                    {selectedCert.issuer} {"//"} {selectedCert.year}
                  </p>
                </div>
                <span className="text-xs text-zinc-500 hidden sm:inline-block">
                  [ESC] UNTUK MENUTUP
                </span>
              </div>

              <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain"
                  priority
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>{selectedCert.description}</span>
                <span className="text-red-400 font-bold">VERIFIED AUTHENTIC</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
