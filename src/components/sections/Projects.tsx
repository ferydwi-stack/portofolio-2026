"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderGit2, Github, ExternalLink, Code2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/lib/data/portfolioData";

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

  return (
    <section
      id="projects"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 blueprint-grid select-none"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#E8A33D]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1E293B]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B232E] border border-[#334155] text-xs font-mono text-[#4FD1C5]">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">PORTOFOLIO // PROYEK UNGGULAN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#E2E8F0] tracking-tight uppercase">
              Portofolio Proyek Terpilih.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
              Koleksi proyek nyata mencakup platform web fullstack, sistem responsif modern, dan aplikasi interaktif yang dirancang dengan performa optimal.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1B232E] border border-[#334155] text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] shadow-xs"
                    : "text-[#64748B] hover:text-[#E2E8F0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 pt-10">
          {filteredProjects.map((project, idx) => {
            return (
              <div
                key={project.title}
                className="group relative p-4 pb-5 rounded-2xl compile-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Thumbnail Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#1B232E] border border-[#1E293B] mb-4">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#111827] text-[#475569]">
                      <Code2 className="w-10 h-10 text-[#4FD1C5] mb-2" />
                      <span className="text-xs font-mono font-bold">SOURCE CODE ARCHITECTURE</span>
                    </div>
                  )}

                  {/* Badge on image */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0A0F1A]/80 backdrop-blur-xs text-[#4FD1C5] text-[10px] font-mono font-bold border border-[#4FD1C5]/20">
                    BUILD 0{idx + 1} &bull; {project.year}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2 flex-grow">
                  <h3 className="text-xl font-black text-[#E2E8F0] uppercase tracking-tight group-hover:text-[#4FD1C5] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-[#0A0F1A] border border-[#334155] text-[10px] font-mono font-semibold text-[#94A3B8]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="pt-4 mt-4 border-t border-[#1E293B] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#1B232E] hover:bg-[#E8A33D] text-[#94A3B8] hover:text-[#0A0F1A] border border-[#334155] transition-colors cursor-pointer"
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
                        className="p-2 rounded-lg bg-[#1B232E] hover:bg-[#4FD1C5] text-[#94A3B8] hover:text-[#0A0F1A] border border-[#334155] transition-colors cursor-pointer"
                        title="Buka Demo Langsung"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] hover:from-[#38BDF8] hover:to-[#4FD1C5] text-[#0A0F1A] font-mono text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    RINCIAN &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1A]/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full compile-card rounded-2xl p-6 sm:p-8 cursor-default max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-[#1B232E] hover:bg-[#4FD1C5] hover:text-[#0A0F1A] border border-[#334155] text-[#94A3B8] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#4FD1C5] font-bold uppercase">
                  <span>BUILD ARTIFACT</span>
                  <span>&bull;</span>
                  <span>TAHUN {selectedProject.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-[#E2E8F0] uppercase">
                  {selectedProject.title}
                </h3>

                {/* Modal Large Photo View */}
                {selectedProject.image && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#1B232E] border border-[#1E293B]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono font-bold text-[#E2E8F0] uppercase">Teknologi yang Digunakan:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-md bg-[#0A0F1A] border border-[#334155] text-xs font-mono font-semibold text-[#94A3B8]"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B232E] hover:bg-[#E8A33D] hover:text-[#0A0F1A] text-[#E2E8F0] border border-[#334155] font-mono text-xs font-bold uppercase transition-colors"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] font-mono text-xs font-bold uppercase transition-colors"
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
