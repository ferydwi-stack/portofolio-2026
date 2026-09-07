"use client";

import Image from "next/image";
import { Github, ExternalLink, Disc3, Radio } from "lucide-react";
import { motion } from "framer-motion";
import { GuitarStringDivider } from "./GuitarStringDivider";

const projects = [
  {
    title: "Portfolio Profile",
    edition: "Studio LP // 2026",
    description:
      "Portofolio pribadi panggung digital yang menampilkan identitas, keahlian arsitektur kode, serta rekam jejak proyek pengembangan web modern.",
    image: "/portofolio.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js"],
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile",
  },
  {
    title: "Sistem Kasir Warung",
    edition: "Commercial EP // 2025",
    description:
      "Sistem Point of Sale (POS) tangguh yang dirancang khusus untuk operasional toko kelontong, dilengkapi manajemen inventaris, rekonsiliasi kas, dan pelaporan penjualan.",
    image: "/kasir.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "PHP"],
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung",
  },
  {
    title: "Aplikasi Presensi Guru",
    edition: "Mobile Tour Single // 2025",
    description:
      "Aplikasi mobile lintas platform untuk institusi pendidikan dalam melacak absensi pendidik secara akurat dengan geolokasi presisi dan verifikasi wajah.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Geolocation"],
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden",
  },
  {
    title: "SahabatBK",
    edition: "Acoustic Support App // 2024",
    description:
      "Aplikasi mobile bimbingan konseling digital untuk membantu siswa mengatasi kendala akademik maupun personal lewat sesi konseling terstruktur dan materi edukasi.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase", "State Management"],
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 relative">
      <GuitarStringDivider label="DISCOGRAPHY &amp; ALBUM RELEASES" fret={7} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/40 px-3 py-1 rounded border border-red-900/50">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>ORIGINAL TRACKS &amp; PRODUCTION MASTER</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Koleksi Proyek Unggulan
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-sans">
            Setiap karya digital diproduksi dengan standar performa tinggi — layaknya album musik yang dipoles cermat dari pre-production hingga mastering final.
          </p>
        </div>

        {/* Vinyl Album Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="group bg-[#121017] rounded-2xl border border-zinc-800 hover:border-red-500/70 p-6 sm:p-7 shadow-2xl relative overflow-hidden transition-all duration-300"
            >
              {/* Top Bar: Release Info & Vinyl Icon */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800/80 font-mono text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-red-500 font-bold">RELEASE 0{idx + 1}</span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-400">{project.edition}</span>
                </div>
                <Disc3 className="w-4 h-4 text-red-500 group-hover:animate-spin-slow transition-transform" />
              </div>

              {/* Album Cover with Peek-out Vinyl Disc */}
              <div className="relative h-64 sm:h-72 w-full rounded-xl overflow-hidden bg-black mb-6">
                {/* Vinyl Record sliding out on hover */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-zinc-950 border-4 border-zinc-800 shadow-2xl z-0 transform translate-x-12 group-hover:translate-x-24 transition-transform duration-500 ease-out flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-full bg-red-600 border-4 border-zinc-900 flex items-center justify-center text-center">
                    <span className="text-[8px] font-mono font-bold text-white uppercase tracking-tighter">
                      45 RPM
                    </span>
                  </div>
                </div>

                {/* Main Album Sleeve Artwork */}
                <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-zinc-700/60 shadow-xl group-hover:shadow-[0_0_25px_rgba(255,42,59,0.3)] transition-all">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  {/* Album Corner Badge */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-red-500/40 text-[10px] font-mono text-red-400 uppercase tracking-wider">
                    MASTER TRACK
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-mono text-white group-hover:text-red-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[11px] font-mono font-medium text-red-300 bg-red-950/40 border border-red-900/50 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Console Action Buttons */}
                <div className="pt-5 flex items-center justify-between border-t border-zinc-800/80">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-red-500/60 rounded-lg text-xs font-mono font-bold uppercase tracking-wider text-zinc-200 hover:text-white transition-all shadow-sm group/btn"
                  >
                    <Github className="w-4 h-4 text-red-400 group-hover/btn:scale-110 transition-transform" />
                    <span>SOURCE REPO</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <span>DETAILS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Footnote */}
        <div className="mt-14 text-center">
          <a
            href="https://github.com/ferydwi-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#110f17] border border-zinc-800 hover:border-red-500 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-all shadow-lg group"
          >
            <span>EXPLORE FULL CATALOG ON GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
