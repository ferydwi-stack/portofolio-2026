"use client";

import { useState } from "react";
import { Award, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Certificates() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const matkulCertificates = [
    {
      title: "Sertifikasi Web Junior",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan untuk kompetensi Web Programmer Junior.",
      type: "certificate",
      image: "/juniorweb.png"
    },
    {
      title: "Kecerdasan Buatan",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Kecerdasan Buatan.",
      type: "certificate",
      image: "/kecerdasanbuatan.png"
    },
    {
      title: "Matematika Diskrit",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Matematika Diskrit.",
      type: "certificate",
      image: "/matematikadiskrit.png"
    },
    {
      title: "Pemrograman Mobile 1",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Pemrograman Mobile 1.",
      type: "certificate",
      image: "/mobile1.png"
    },
    {
      title: "Organisasi Komputer",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Organisasi Komputer (Orkom).",
      type: "certificate",
      image: "/orkom.png"
    },
    {
      title: "Sistem Operasi",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Sistem Operasi.",
      type: "certificate",
      image: "/sistemoperasi.png"
    },
    {
      title: "Sistem Paralel",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Sistem Paralel.",
      type: "certificate",
      image: "/sistemparalel.png"
    },
    {
      title: "Keamanan Informasi",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Keamanan Informasi.",
      type: "certificate",
      image: "/keamananinformasi.png"
    },
    {
      title: "Kalkulus",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kelulusan mata kuliah Kalkulus.",
      type: "certificate",
      image: "/kalkulus.png"
    },
    {
      title: "Grafika Komputer",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi kelulusan mata kuliah Grafika Komputer.",
      type: "certificate",
      image: "/grafikakomputer.png"
    },
    {
      title: "Basic Programmer ",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kompetensi dasar Programmer 1.",
      type: "certificate",
      image: "/programmer1.png"
    },
    {
      title: "Basic Programmer ",
      issuer: "Universitas",
      year: "2024",
      description: "Sertifikasi kompetensi lanjutan Programmer 2.",
      type: "certificate",
      image: "/programmer2.png"
    },
    {
      title: "Metodelogi Penelitian Ilmu Komputer (MPIK)",
      issuer: "Universitas",
      year: "2025",
      description: "Sertifikasi Manajemen Proyek Industri Kreatif.",
      type: "certificate",
      image: "/mpik.png"
    }
  ];

  const otherCertificates = [
    {
      title: "Data Science",
      issuer: "Dicoding",
      year: "2025",
      description: "Sertifikasi dicoding Data Science.",
      type: "certificate",
      image: "/datascience_dicoding.png"
    },
    {
      title: "AI Digitalent",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi AI Digitalent.",
      type: "certificate",
      image: "/aidigitalent.png"
    },
    {
      title: "Micro Skill Digitalent",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi Microsoft.",
      type: "certificate",
      image: "/microskildigitalent.png"
    },
    {
      title: "Junior Web Developer",
      issuer: "KOMDIGI",
      year: "2025",
      description: "Sertifikasi Junior Web Developer.",
      type: "certificate",
      image: "/juniorwebdigitalent.png"
    },
    
  ];

  return (
    <section id="certificates" className="py-24 bg-white dark:bg-[#09090b]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white inline-flex flex-col items-center">
            Sertifikasi Mata Kuliah
            <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full" />
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Kumpulan sertifikat kelulusan uji kompetensi pada mata kuliah selama perkuliahan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {matkulCertificates.map((item, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(item.image)}
              className="group bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:shadow-lg shadow-sm flex flex-col h-full cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  {item.type === 'certificate' ? <Award className="w-6 h-6" /> : <Star className="w-6 h-6" />}
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              
              <div className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 mt-auto">
                Lihat gambar <span className="text-lg leading-none">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white inline-flex flex-col items-center">
            Sertifikat Lainnya
            <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full" />
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Penghargaan, sertifikat pelatihan, dan pencapaian tambahan di luar perkuliahan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {otherCertificates.map((item, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(item.image)}
              className="group bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all hover:shadow-lg shadow-sm flex flex-col h-full cursor-pointer relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                {item.type === 'certificate' ? <Award className="w-7 h-7" /> : <Star className="w-7 h-7" />}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              
              <div className="flex items-center justify-between mt-1 mb-4">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.issuer}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                  {item.year}
                </span>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mt-auto">
                {item.description}
              </p>

              <div className="mt-6 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Lihat gambar <span className="text-lg leading-none">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl cursor-default flex items-center justify-center p-2 md:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Added a max-height and object-contain to ensure the image scales properly */}
              <img 
                src={selectedImage} 
                alt="Detail Sertifikat" 
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
