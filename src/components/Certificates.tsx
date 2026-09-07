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
  rotationClass: string;
}

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<CertItem | null>(null);

  const matkulCertificates: CertItem[] = [
    {
      title: "Sertifikasi Web Junior",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan uji kompetensi Web Programmer Junior.",
      image: "/juniorweb.png",
      type: "academic",
      rotationClass: "-rotate-1",
    },
    {
      title: "Kecerdasan Buatan",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Kecerdasan Buatan.",
      image: "/kecerdasanbuatan.png",
      type: "academic",
      rotationClass: "rotate-1",
    },
    {
      title: "Matematika Diskrit",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Matematika Diskrit.",
      image: "/matematikadiskrit.png",
      type: "academic",
      rotationClass: "-rotate-2",
    },
    {
      title: "Pemrograman Mobile 1",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Pemrograman Mobile 1.",
      image: "/mobile1.png",
      type: "academic",
      rotationClass: "rotate-2",
    },
    {
      title: "Organisasi Komputer",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Organisasi Komputer (Orkom).",
      image: "/orkom.png",
      type: "academic",
      rotationClass: "-rotate-1",
    },
    {
      title: "Sistem Operasi",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Sistem Operasi.",
      image: "/sistemoperasi.png",
      type: "academic",
      rotationClass: "rotate-1.5",
    },
    {
      title: "Sistem Paralel",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Sistem Paralel.",
      image: "/sistemparalel.png",
      type: "academic",
      rotationClass: "-rotate-1.5",
    },
    {
      title: "Keamanan Informasi",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Keamanan Informasi.",
      image: "/keamananinformasi.png",
      type: "academic",
      rotationClass: "rotate-1",
    },
    {
      title: "Kalkulus",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Kalkulus.",
      image: "/kalkulus.png",
      type: "academic",
      rotationClass: "-rotate-2",
    },
    {
      title: "Grafika Komputer",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Grafika Komputer.",
      image: "/grafikakomputer.png",
      type: "academic",
      rotationClass: "rotate-2",
    },
    {
      title: "Basic Programmer 1",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kompetensi dasar Programmer 1.",
      image: "/programmer1.png",
      type: "academic",
      rotationClass: "-rotate-1.5",
    },
    {
      title: "Basic Programmer 2",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kompetensi lanjutan Programmer 2.",
      image: "/programmer2.png",
      type: "academic",
      rotationClass: "rotate-1",
    },
    {
      title: "Metodologi Penelitian Ilmu Komputer",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Metodologi Penelitian (MPIK).",
      image: "/mpik.png",
      type: "academic",
      rotationClass: "-rotate-2",
    },
  ];

  const externalCertificates: CertItem[] = [
    {
      title: "Data Science",
      issuer: "Dicoding Indonesia",
      year: "2025",
      description: "Sertifikasi kompetensi pengolahan dan pemodelan data terapan.",
      image: "/datascience_dicoding.png",
      type: "external",
      rotationClass: "-rotate-1",
    },
    {
      title: "AI Digitalent",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi kompetensi Artificial Intelligence Digital Talent Scholarship.",
      image: "/aidigitalent.png",
      type: "external",
      rotationClass: "rotate-2",
    },
    {
      title: "Micro Skill Digitalent",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi pelatihan spesialisasi Micro Skill dari Kementerian Komdigi.",
      image: "/microskildigitalent.png",
      type: "external",
      rotationClass: "-rotate-1.5",
    },
    {
      title: "Junior Web Developer",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Standar sertifikasi industri Junior Web Developer resmi Komdigi.",
      image: "/juniorwebdigitalent.png",
      type: "external",
      rotationClass: "rotate-1.5",
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
    <section id="certificates" className="py-24 relative overflow-hidden">
      <GuitarStringDivider label="BACKSTAGE PASS &amp; TOUR CREDENTIALS" fret={9} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Ticket className="w-3.5 h-3.5" />
            <span>OFFICIAL LAMINATES &amp; MERCH STICKERS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Backstage Pass &amp; Sertifikat
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-sans">
            Kumpulan bukti verifikasi kelulusan uji kompetensi akademik dan industri resmi yang disajikan seperti dinding koleksi pass panggung tur konser.
          </p>
        </div>

        {/* Academic Laminates Wall */}
        <div className="mb-20">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-8 font-mono text-xs">
            <h3 className="font-bold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              <span>{"//"} ACADEMIC PASSES ({matkulCertificates.length} VERIFIED)</span>
            </h3>
            <span className="text-zinc-500">KLIK KARTU UNTUK MEMBUKA FOTO</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matkulCertificates.map((cert) => (
              <motion.div
                key={cert.title}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                onClick={() => setSelectedCert(cert)}
                className={`group bg-[#13111a] border-2 border-zinc-800 hover:border-red-500 p-5 rounded-2xl shadow-xl cursor-pointer relative overflow-hidden transition-all duration-300 transform ${cert.rotationClass}`}
              >
                {/* Lanyard Clip Hole */}
                <div className="w-8 h-2 bg-black border border-zinc-700 rounded-full mx-auto mb-4" />

                <div className="flex items-center justify-between mb-3 font-mono">
                  <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded border border-red-900/60">
                    {cert.year}
                  </span>
                </div>

                <h4 className="text-base font-bold font-mono text-white group-hover:text-red-400 transition-colors line-clamp-2 mb-2">
                  {cert.title}
                </h4>

                <p className="text-xs text-zinc-400 font-sans line-clamp-2 mb-4">
                  {cert.description}
                </p>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between font-mono text-[10px]">
                  <span className="text-zinc-500 uppercase">{cert.issuer}</span>
                  <span className="text-red-400 group-hover:underline flex items-center gap-1 font-bold">
                    INSPECT ↵
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* National & Industry Honors Wall */}
        <div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-8 font-mono text-xs">
            <h3 className="font-bold uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{"//"} NATIONAL &amp; INDUSTRY HONORS</span>
            </h3>
            <span className="text-zinc-500">KOMDIGI &amp; DICODING ACCREDITED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {externalCertificates.map((cert) => (
              <motion.div
                key={cert.title}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                onClick={() => setSelectedCert(cert)}
                className={`group bg-[#161220] border-2 border-red-950/70 hover:border-red-500 p-6 rounded-2xl shadow-xl cursor-pointer relative overflow-hidden transition-all duration-300 transform ${cert.rotationClass}`}
              >
                {/* Hologram Stamp */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-0.5 rounded bg-red-950 border border-red-700/80 text-[9px] font-mono text-red-300 shadow-md">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  VERIFIED
                </div>

                <div className="w-10 h-10 rounded-xl bg-red-950 border border-red-700 flex items-center justify-center text-red-400 mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>

                <h4 className="text-lg font-bold font-mono text-white group-hover:text-red-400 transition-colors mb-2">
                  {cert.title}
                </h4>

                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                  <span>{cert.issuer}</span>
                  <span className="text-red-400 font-bold">{cert.year}</span>
                </div>

                <p className="text-xs text-zinc-400 font-sans line-clamp-3 mb-5">
                  {cert.description}
                </p>

                <div className="text-xs font-mono text-red-400 flex items-center gap-1 font-bold">
                  <span>VIEW CERTIFICATE</span>
                  <span>→</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible Fullscreen Modal Popup */}
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
