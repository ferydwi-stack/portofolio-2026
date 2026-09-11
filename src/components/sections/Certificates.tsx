"use client";

import { useState } from "react";
import Image from "next/image";
import { Award, ShieldCheck, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATES, Certificate } from "@/lib/data/portfolioData";
import { TiltCard } from "@/components/ui/TiltCard";

export function Certificates() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const handleInspectCert = (cert: Certificate) => {
    setSelectedCert(cert);
  };

  return (
    <section
      id="certificates"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Award className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">KREDENSIAL // LISENSI KOMPETENSI</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Sertifikasi &amp; Lisensi Resmi.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Dokumentasi lisensi kompetensi industri, sertifikat penyelesaian modul rekayasa web, dan pencapaian akademik terverifikasi.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/20 font-bold text-cyan-400 shadow-xs">
              {CERTIFICATES.length} SERTIFIKAT TERVERIFIKASI
            </span>
          </div>
        </div>

        {/* 3D Curated Gallery Grid with TiltCards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {CERTIFICATES.map((cert) => {
            return (
              <TiltCard
                key={cert.id}
                tiltMaxAngle={9}
                onClick={() => handleInspectCert(cert)}
                className="h-full cursor-pointer group"
              >
                <div className="h-full p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 transition-colors duration-300 flex flex-col justify-between backdrop-blur-md shadow-lg shadow-black/40">
                  {/* Tech node dot indicator */}
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 font-mono text-[10px] text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      CERT-{(cert.id).toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 font-bold">
                      {cert.year}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                        {cert.type === "external" ? (
                          <ShieldCheck className="w-4 h-4" />
                        ) : (
                          <Award className="w-4 h-4" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 uppercase truncate">
                        {cert.issuer}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white line-clamp-2 mb-1.5 leading-snug group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                    <span className="text-emerald-400 flex items-center gap-1 text-[10px]">
                      <CheckCircle className="w-3 h-3" /> VERIFIED
                    </span>
                    <span className="text-cyan-400 font-bold group-hover:text-cyan-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      LIHAT &rarr;
                    </span>
                  </div>
                </div>
              </TiltCard>
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
              className="relative max-w-4xl w-full bg-[#0E1524] rounded-2xl border border-cyan-500/30 p-6 sm:p-8 cursor-default max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(79,209,197,0.12)]"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                aria-label="Tutup sertifikat"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 font-mono">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-white uppercase">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-cyan-400 font-bold mt-0.5">
                      {selectedCert.issuer} &bull; {selectedCert.year}
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-500 hidden sm:inline-block">
                    [ESC / KLIK DI LUAR UNTUK TUTUP]
                  </span>
                </div>

                <div className="relative w-full h-[52vh] sm:h-[62vh] rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                  <Image
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-contain p-2"
                    priority
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-300 pt-2">
                  <span>{selectedCert.description}</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
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
