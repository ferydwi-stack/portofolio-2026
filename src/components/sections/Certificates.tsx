"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ShieldCheck, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATES, Certificate } from "@/lib/data/portfolioData";
import { playShutterSound } from "@/lib/sound/shutterSound";

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleInspectCert = (cert: Certificate) => {
    playShutterSound();
    setSelectedCert(cert);
  };

  return (
    <section
      id="certificates"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 paper-grain select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5DFC8]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFC8] text-xs font-mono text-[#E24332]">
              <Award className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">KREDENSIAL // LISENSI KOMPETENSI</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#1C1A18] tracking-tight uppercase">
              Sertifikasi &amp; Lisensi Resmi.
            </h2>
            <p className="text-sm sm:text-base text-[#5A554E] max-w-2xl leading-relaxed">
              Dokumentasi lisensi kompetensi industri, sertifikat penyelesaian modul rekayasa web, dan pencapaian akademik terverifikasi.
            </p>
          </div>

          <div className="text-xs font-mono text-[#7A7568] flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5DFC8] font-bold text-[#1C1A18] shadow-xs">
              {CERTIFICATES.length} SERTIFIKAT TERVERIFIKASI
            </span>
          </div>
        </div>

        {/* Curated Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {CERTIFICATES.map((cert) => {
            return (
              <div
                key={cert.id}
                onClick={() => handleInspectCert(cert)}
                className="group relative p-4 rounded-xl bg-white border border-[#E5DFC8] hover:border-[#F5B738] polaroid-card-shadow transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                data-cursor-text="INSPECT"
              >
                {/* Washi Clip on top */}
                <div className="w-14 h-4 washi-tape rounded-xs mx-auto -mt-2 mb-3 opacity-80 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3 font-mono">
                    <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#E5DFC8] flex items-center justify-center text-[#E24332]">
                      {cert.type === "external" ? (
                        <ShieldCheck className="w-4 h-4" />
                      ) : (
                        <Award className="w-4 h-4" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-[#1C1A18] bg-[#F3EFE6] px-2 py-0.5 rounded border border-[#E5DFC8]">
                      {cert.year}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1C1A18] line-clamp-2 mb-1 leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs text-[#7A7568] line-clamp-2 mb-3">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE7D8] flex items-center justify-between font-mono text-[10px]">
                  <span className="text-[#968F84] uppercase truncate max-w-[120px]">
                    {cert.issuer}
                  </span>
                  <span className="text-[#E24332] font-bold group-hover:underline">
                    LIHAT &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Certificate Full View Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl border border-[#E5DFC8] polaroid-card-shadow p-6 sm:p-8 cursor-default max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] hover:bg-[#1C1A18] hover:text-white border border-[#E5DFC8] text-[#1C1A18] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE7D8] font-mono">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-[#1C1A18] uppercase">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-[#E24332] font-bold">
                      {selectedCert.issuer} &bull; {selectedCert.year}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#968F84] hidden sm:inline-block">
                    [ESC / KLIK DI LUAR UNTUK TUTUP]
                  </span>
                </div>

                <div className="relative w-full h-[52vh] sm:h-[62vh] rounded-xl overflow-hidden bg-[#ECE7D8] flex items-center justify-center border border-[#DDD6C4]">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-contain p-2"
                    priority
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[#5A554E] pt-2">
                  <span>{selectedCert.description}</span>
                  <span className="text-[#2C6E64] font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> KREDENSIAL RESMI TERVERIFIKASI
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
