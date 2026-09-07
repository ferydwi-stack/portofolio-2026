"use client";

import { useRef } from "react";
import Image from "next/image";
import { Github, ExternalLink, Disc3, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { GuitarStringDivider } from "./GuitarStringDivider";

const projects = [
  {
    title: "Portfolio Profile",
    catalogNo: "LP-001 // STUDIO RELEASE",
    year: "2026",
    description:
      "Portofolio panggung digital rockstar yang menampilkan arsitektur kode modern, visualisasi 3D Three.js, dan interaktivitas tingkat tinggi untuk audiens web.",
    image: "/portofolio.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js", "GSAP"],
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile",
    rpm: "33 ⅓ RPM",
    side: "SIDE A - LEAD TRACK",
  },
  {
    title: "Sistem Kasir Warung",
    catalogNo: "EP-002 // COMMERCIAL MASTER",
    year: "2025",
    description:
      "Sistem Point of Sale (POS) kokoh untuk operasional retail kelontong, dilengkapi manajemen inventaris barang, rekonsiliasi kasir kas riil, dan pelaporan rugi-laba.",
    image: "/kasir.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "PHP"],
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung",
    rpm: "45 RPM",
    side: "SIDE A - BUSINESS GROOVE",
  },
  {
    title: "Aplikasi Presensi Guru",
    catalogNo: "SG-003 // LIVE TOUR SINGLE",
    year: "2025",
    description:
      "Aplikasi mobile lintas platform bagi instansi pendidikan untuk mencatat absensi pendidik secara akurat berbasis radius GPS dan validasi wajah.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Geolocation"],
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden",
    rpm: "45 RPM",
    side: "SIDE B - MOBILE ANTHEM",
  },
  {
    title: "SahabatBK",
    catalogNo: "EP-004 // ACOUSTIC SUPPORT",
    year: "2024",
    description:
      "Platform bimbingan konseling digital untuk mendampingi siswa mengatasi kendala akademik maupun psikososial melalui konseling privat dan materi panduan.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Cross-Platform"],
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin",
    rpm: "33 ⅓ RPM",
    side: "SIDE B - SUPPORT RIFF",
  },
];

export function Projects() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -420 : 420;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <GuitarStringDivider label="DISCOGRAPHY &amp; ALBUM SHOWCASE" fret={7} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>RECORD CRATE // MASTER DISCS</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
              Koleksi Proyek Album
            </h2>
            <p className="max-w-xl text-zinc-400 text-sm sm:text-base font-sans">
              Geser dan jelajahi karya digital layaknya memilih piringan hitam di peti album konser tour.
            </p>
          </div>

          {/* Crate Horizontal Navigation Controls */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-xl bg-[#14111d] border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-white transition-all shadow-lg cursor-pointer"
              aria-label="Geser ke kiri"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-zinc-500 uppercase tracking-widest">CRATE 1 / 1</span>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-xl bg-[#14111d] border border-zinc-800 hover:border-red-500 text-zinc-300 hover:text-white transition-all shadow-lg cursor-pointer"
              aria-label="Geser ke kanan"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Vinyl Crates Track */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-8 pt-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="flex-none w-[340px] sm:w-[420px] snap-center group bg-[#110f17] border-2 border-zinc-800/90 hover:border-red-500 p-6 rounded-3xl shadow-[0_0_35px_rgba(0,0,0,0.8)] relative transition-all duration-300 flex flex-col justify-between"
            >
              {/* Top Catalog & RPM */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-800 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-zinc-400 font-bold">{project.catalogNo}</span>
                </div>
                <span className="text-red-400 font-bold bg-red-950/60 px-2 py-0.5 rounded border border-red-900/60">
                  {project.rpm}
                </span>
              </div>

              {/* Vinyl Sleeve with Pull-out Record Animation */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-black mb-6 border border-zinc-800 shadow-2xl">
                {/* 3D Vinyl Record sliding out on hover */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-[#0a0a0c] border-[6px] border-zinc-900 shadow-[0_0_30px_rgba(0,0,0,0.9)] z-0 transform translate-x-8 group-hover:translate-x-24 transition-transform duration-500 ease-out flex items-center justify-center pointer-events-none">
                  {/* Concentric Grooves */}
                  <div className="w-40 h-40 rounded-full border border-zinc-800 flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full border border-zinc-800/70 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 border-4 border-zinc-900 flex items-center justify-center text-center">
                        <span className="text-[7px] font-mono font-black text-white uppercase tracking-tighter">
                          RELEASE 0{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Album Sleeve Artwork */}
                <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden border border-zinc-700/60 shadow-xl group-hover:shadow-[0_0_30px_rgba(255,42,59,0.35)] transition-all">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-red-500/50 text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Disc3 className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
                    <span>{project.side}</span>
                  </div>
                </div>
              </div>

              {/* Album Notes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono">
                  <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-zinc-500">{project.year}</span>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-mono font-bold text-red-300 bg-red-950/40 border border-red-900/50 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 mt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-red-600 border border-zinc-700 hover:border-red-500 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-white transition-all shadow-md group/btn"
                  >
                    <Github className="w-4 h-4 text-red-400 group-hover/btn:text-white transition-colors" />
                    <span>SOURCE CODE</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <span>STUDIO REPO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
