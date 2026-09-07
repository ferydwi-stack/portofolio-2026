"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Github, ExternalLink, Disc3, Radio } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GuitarStringDivider } from "./GuitarStringDivider";

const projects = [
  {
    title: "Portfolio Profile",
    catalogNo: "LP-001 // STUDIO MASTER RELEASE",
    year: "2026",
    description:
      "Portofolio panggung digital rockstar dengan arsitektur modern Next.js 16, visualisasi 3D Three.js, dan interaktivitas tingkat tinggi untuk audiens web.",
    image: "/portofolio.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js", "GSAP"],
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile",
    rpm: "33 ⅓ RPM",
    side: "SIDE A - TITLE TRACK",
  },
  {
    title: "Sistem Kasir Warung",
    catalogNo: "EP-002 // COMMERCIAL POS SYSTEM",
    year: "2025",
    description:
      "Sistem Point of Sale (POS) handal untuk operasional toko kelontong, dilengkapi manajemen inventaris barang, rekonsiliasi kasir kas riil, dan pelaporan rugi-laba.",
    image: "/kasir.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "PHP"],
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung",
    rpm: "45 RPM",
    side: "SIDE A - BUSINESS GROOVE",
  },
  {
    title: "Aplikasi Presensi Guru",
    catalogNo: "SG-003 // MOBILE TOUR SINGLE",
    year: "2025",
    description:
      "Aplikasi mobile lintas platform bagi instansi pendidikan untuk melacak absensi pendidik secara akurat berbasis radius GPS dan validasi wajah.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Geolocation"],
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden",
    rpm: "45 RPM",
    side: "SIDE B - GEO ANTHEM",
  },
  {
    title: "SahabatBK",
    catalogNo: "EP-004 // ACOUSTIC COUNSELING",
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !galleryRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const gallery = galleryRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(gallery.scrollWidth - window.innerWidth + 140);

      gsap.to(gallery, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${gallery.scrollWidth - window.innerWidth + 500}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-12 select-none"
    >
      <GuitarStringDivider label="DISCOGRAPHY &bull; PINNED FULL-BLEED ALBUMS" fret={7} />

      {/* Header */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/50 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>ORIGINAL MASTER DISCS</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Discography Releases
          </h2>
          <p className="text-xs sm:text-sm font-mono text-zinc-400">
            Scroll vertikal Anda menggeser album proyek satu-per-satu selebar layar penuh.
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span>FULL-SCREEN PIN</span>
          <span>•</span>
          <span className="text-red-400 font-bold">{projects.length} ALBUMS AVAILABLE</span>
        </div>
      </div>

      {/* Full-Bleed Horizontal Gallery */}
      <div className="relative w-full overflow-visible py-4">
        <div
          ref={galleryRef}
          className="flex items-center gap-10 sm:gap-14 will-change-transform"
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="flex-none w-[88vw] sm:w-[82vw] max-w-[1050px] bg-[#110e19]/95 border-2 border-zinc-800 hover:border-red-500/80 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl relative transition-all duration-300 group overflow-hidden"
            >
              {/* Spinning 3D Vinyl Record Overlapping Card Top-Right */}
              <div className="absolute -top-10 sm:-top-14 -right-10 sm:-right-14 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#0a080e] border-[6px] border-zinc-900 shadow-2xl z-20 flex items-center justify-center animate-spin-slow pointer-events-none">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-zinc-800 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-red-600 border-4 border-black flex items-center justify-center text-center shadow-lg">
                    <span className="text-[7px] sm:text-[9px] font-mono font-black text-white uppercase tracking-tighter">
                      RELEASE 0{idx + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Meta Bar */}
              <div className="flex items-center justify-between font-mono text-xs border-b border-zinc-800 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-red-950/70 border border-red-800 text-red-400 font-bold">
                    RELEASE 0{idx + 1}
                  </span>
                  <span className="text-zinc-400 font-bold hidden sm:inline">
                    {project.catalogNo}
                  </span>
                </div>
                <span className="text-red-400 font-bold bg-red-950/60 px-3 py-1 rounded border border-red-900/60 mr-20 sm:mr-28">
                  {project.rpm}
                </span>
              </div>

              {/* Main Two-Column Layout Inside Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Album Sleeve Artwork (Left) */}
                <div className="lg:col-span-7 relative h-56 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden bg-black border border-zinc-700/80 shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 700px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded bg-black/80 backdrop-blur-md border border-red-500/50 text-[10px] font-mono text-red-400 font-bold uppercase tracking-wider flex items-center gap-2">
                    <Disc3 className="w-3.5 h-3.5 text-red-500 animate-spin-slow" />
                    <span>{project.side}</span>
                  </div>
                </div>

                {/* Album Info & Action Console (Right) */}
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <span className="text-xs font-mono text-zinc-500">{project.year}</span>
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white group-hover:text-red-400 transition-colors font-[family-name:var(--font-bebas)] tracking-wide leading-none mt-1">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
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
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black rounded-xl transition-all shadow-[0_0_20px_rgba(255,42,59,0.4)] cursor-pointer"
                    >
                      <Github className="w-4 h-4" />
                      <span>SOURCE REPO</span>
                    </a>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>DETAILS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
