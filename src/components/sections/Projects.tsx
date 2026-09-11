"use client";

import { useState } from "react";
import Image from "next/image";
import { Film, Github, ExternalLink, Code2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/lib/data/portfolioData";
import { playShutterSound } from "@/lib/sound/shutterSound";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const categories = ["ALL", "FULLSTACK", "WEB", "MOBILE"];

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "FULLSTACK") {
      return project.tags.some((t) => ["Next.js", "Express", "Fullstack", "Laravel"].includes(t));
    }
    if (activeFilter === "WEB") {
      return project.tags.some((t) => ["React", "Tailwind", "GSAP", "TypeScript"].includes(t));
    }
    if (activeFilter === "MOBILE") {
      return project.tags.some((t) => ["Flutter", "Dart", "Mobile", "Android"].includes(t));
    }
    return true;
  });

  const handleOpenDetail = (project: Project) => {
    playShutterSound();
    setSelectedProject(project);
  };

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 paper-grain select-none"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5DFC8]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFC8] text-xs font-mono text-[#1C1A18]">
              <Film className="w-3.5 h-3.5 text-[#E24332]" />
              <span className="font-bold uppercase tracking-wider">PORTOFOLIO // PROYEK UNGGULAN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#1C1A18] tracking-tight uppercase">
              Portofolio Proyek Terpilih.
            </h2>
            <p className="text-sm sm:text-base text-[#5A554E] max-w-2xl leading-relaxed">
              Koleksi proyek nyata mencakup platform web fullstack, sistem responsif modern, dan aplikasi interaktif yang dirancang dengan performa optimal.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F3EFE6] border border-[#E5DFC8] text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playShutterSound();
                  setActiveFilter(cat);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#1C1A18] text-white shadow-xs"
                    : "text-[#7A7568] hover:text-[#1C1A18]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid (Curated Lightbox Proofs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 pt-10">
          {filteredProjects.map((project, idx) => {
            return (
              <div
                key={project.title}
                className="group relative p-4 pb-5 rounded-2xl bg-white border border-[#E5DFC8] hover:border-[#F5B738] polaroid-card-shadow transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo Proof Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#ECE7D8] border border-[#DDD6C4] photo-gloss mb-4">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#201E1B] text-[#968F84]">
                      <Code2 className="w-10 h-10 text-[#F5B738] mb-2" />
                      <span className="text-xs font-mono font-bold">SOURCE CODE ARCHITECTURE</span>
                    </div>
                  )}

                  {/* Stamp Tag on Photo */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#1C1A18]/80 backdrop-blur-xs text-white text-[10px] font-mono font-bold">
                    FRAME 0{idx + 1} &bull; {project.year}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-xl font-black text-[#1C1A18] uppercase tracking-tight group-hover:text-[#E24332] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A554E] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E5DFC8] text-[10px] font-mono font-semibold text-[#1C1A18]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-4 mt-4 border-t border-[#ECE7D8] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#1C1A18] text-[#1C1A18] hover:text-white border border-[#E5DFC8] transition-colors cursor-pointer"
                        title="Lihat Kode di GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#E24332] text-[#1C1A18] hover:text-white border border-[#E5DFC8] transition-colors cursor-pointer"
                        title="Buka Demo Langsung"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenDetail(project)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#F5B738] hover:bg-[#FFC955] text-[#1C1A18] font-mono text-[11px] font-bold tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    RINCIAN &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Lightbox Inspection Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-2xl border border-[#E5DFC8] polaroid-card-shadow p-6 sm:p-8 cursor-default max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] hover:bg-[#1C1A18] hover:text-white border border-[#E5DFC8] text-[#1C1A18] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E24332] font-bold uppercase">
                  <span>FRAME PROYEK</span>
                  <span>&bull;</span>
                  <span>TAHUN {selectedProject.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#1C1A18] uppercase">
                  {selectedProject.title}
                </h3>

                {/* Modal Large Photo View */}
                {selectedProject.image && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#ECE7D8] border border-[#DDD6C4]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="text-sm sm:text-base text-[#5A554E] leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono font-bold text-[#1C1A18] uppercase">Teknologi yang Digunakan:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-md bg-[#FAF8F5] border border-[#E5DFC8] text-xs font-mono font-semibold text-[#1C1A18]"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-4 flex flex-wrap gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1A18] text-white hover:bg-[#33302B] font-mono text-xs font-bold uppercase transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>KODE SUMBER GITHUB</span>
                    </a>
                  )}
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F5B738] text-[#1C1A18] hover:bg-[#FFC955] font-mono text-xs font-bold uppercase transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>KUNJUNGI LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
