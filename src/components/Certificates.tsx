"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Award, ShieldCheck, X, Sparkles, Ticket } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GuitarStringDivider } from "./GuitarStringDivider";

interface CertItem {
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
  type: "academic" | "external";
  rotation: number;
  offsetY: number;
}

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const certificates: CertItem[] = [
    {
      title: "Sertifikasi Web Junior",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan uji kompetensi Web Programmer Junior.",
      image: "/juniorweb.png",
      type: "academic",
      rotation: -6,
      offsetY: 8,
    },
    {
      title: "Kecerdasan Buatan",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Kecerdasan Buatan.",
      image: "/kecerdasanbuatan.png",
      type: "academic",
      rotation: 5,
      offsetY: -12,
    },
    {
      title: "Data Science",
      issuer: "Dicoding Indonesia",
      year: "2025",
      description: "Sertifikasi kompetensi pengolahan dan pemodelan data terapan.",
      image: "/datascience_dicoding.png",
      type: "external",
      rotation: -7,
      offsetY: 16,
    },
    {
      title: "AI Digitalent",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi kompetensi Artificial Intelligence Digital Talent Scholarship.",
      image: "/aidigitalent.png",
      type: "external",
      rotation: 6,
      offsetY: -6,
    },
    {
      title: "Matematika Diskrit",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Matematika Diskrit.",
      image: "/matematikadiskrit.png",
      type: "academic",
      rotation: -5,
      offsetY: 10,
    },
    {
      title: "Pemrograman Mobile 1",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Pemrograman Mobile 1.",
      image: "/mobile1.png",
      type: "academic",
      rotation: 7,
      offsetY: -14,
    },
    {
      title: "Organisasi Komputer",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Organisasi Komputer (Orkom).",
      image: "/orkom.png",
      type: "academic",
      rotation: -4,
      offsetY: 6,
    },
    {
      title: "Sistem Operasi",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Sistem Operasi.",
      image: "/sistemoperasi.png",
      type: "academic",
      rotation: 5,
      offsetY: -8,
    },
    {
      title: "Sistem Paralel",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Sistem Paralel.",
      image: "/sistemparalel.png",
      type: "academic",
      rotation: -8,
      offsetY: 14,
    },
    {
      title: "Keamanan Informasi",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Keamanan Informasi.",
      image: "/keamananinformasi.png",
      type: "academic",
      rotation: 4,
      offsetY: -10,
    },
    {
      title: "Kalkulus",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Kalkulus.",
      image: "/kalkulus.png",
      type: "academic",
      rotation: -6,
      offsetY: 12,
    },
    {
      title: "Grafika Komputer",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Grafika Komputer.",
      image: "/grafikakomputer.png",
      type: "academic",
      rotation: 8,
      offsetY: -4,
    },
    {
      title: "Basic Programmer 1",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kompetensi dasar Programmer 1.",
      image: "/programmer1.png",
      type: "academic",
      rotation: -5,
      offsetY: 16,
    },
    {
      title: "Basic Programmer 2",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kompetensi lanjutan Programmer 2.",
      image: "/programmer2.png",
      type: "academic",
      rotation: 6,
      offsetY: -12,
    },
    {
      title: "Metodologi Penelitian Ilmu Komputer",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Metodologi Penelitian (MPIK).",
      image: "/mpik.png",
      type: "academic",
      rotation: -7,
      offsetY: 8,
    },
    {
      title: "Micro Skill Digitalent",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi pelatihan spesialisasi Micro Skill dari Kementerian Komdigi.",
      image: "/microskildigitalent.png",
      type: "external",
      rotation: 5,
      offsetY: -10,
    },
    {
      title: "Junior Web Developer",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Standar sertifikasi industri Junior Web Developer resmi Komdigi.",
      image: "/juniorwebdigitalent.png",
      type: "external",
      rotation: -6,
      offsetY: 14,
    },
  ];

  // Handle Escape key to close modal
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
      id="certificates"
      className="relative min-h-screen py-24 pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-12 select-none overflow-hidden"
    >
      <GuitarStringDivider label="BACKSTAGE PASS &bull; CHAOTIC WALL COLLAGE" fret={9} />

      <div className="pt-8">
        {/* Section Header */}
        <div className="mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Ticket className="w-3.5 h-3.5" />
            <span>BACKSTAGE LAMINATES WALL</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Sticker Wall &amp; Credentials
          </h2>
          <p className="max-w-xl text-zinc-400 text-sm sm:text-base font-sans">
            Kolase laminates pass tur dan stiker resmi yang ditempel acak di dinding ruang ganti panggung. Arahkan kursor untuk mengangkat pass.
          </p>
        </div>

        {/* Chaotic Wall Collage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 pt-4 pb-12">
          {certificates.map((cert) => (
            <motion.div
              key={cert.title}
              style={{
                rotate: cert.rotation,
                y: cert.offsetY,
              }}
              whileHover={{
                scale: 1.12,
                rotate: 0,
                y: 0,
                zIndex: 40,
                boxShadow: "0 25px 50px rgba(255, 42, 59, 0.35)",
                transition: { type: "spring", stiffness: 350, damping: 20 },
              }}
              onClick={() => setSelectedCert(cert)}
              className={`p-5 rounded-2xl bg-[#13101b]/95 border-2 transition-colors cursor-pointer relative overflow-hidden backdrop-blur-md shadow-2xl flex flex-col justify-between ${
                cert.type === "external"
                  ? "border-red-500/70 hover:border-red-400"
                  : "border-zinc-800 hover:border-red-500"
              }`}
            >
              {/* Lanyard Clip Hole */}
              <div className="w-8 h-2 bg-black border border-zinc-700 rounded-full mx-auto mb-3" />

              {/* Holographic Verification Stamp */}
              {cert.type === "external" && (
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-red-950/80 border border-red-700/80 text-[8px] font-mono text-red-300">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  VERIFIED
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

                <h4 className="text-base font-black font-mono text-white line-clamp-2 mb-2 leading-tight">
                  {cert.title}
                </h4>

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
          ))}
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
