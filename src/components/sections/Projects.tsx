"use client";

import { useState } from "react";
import Image from "next/image";
import { FolderGit2, Github, ExternalLink, Code2, X, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, Project } from "@/lib/data/portfolioData";
import { TiltCard } from "@/components/ui/TiltCard";

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
      className="relative w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">PORTOFOLIO // PROYEK UNGGULAN</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Portofolio Proyek Terpilih.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Koleksi proyek nyata mencakup platform web fullstack, sistem responsif modern, dan aplikasi interaktif yang dirancang dengan performa optimal.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tactile Project Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 pt-10"
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              return (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                >
                  <TiltCard
                    tiltMaxAngle={8}
                    className="h-full rounded-2xl group"
                  >
                    <div className="h-full p-4 pb-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 transition-colors duration-300 flex flex-col justify-between backdrop-blur-md shadow-lg shadow-black/40">
                      {/* Cyber Top Corner Ticks */}
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80 font-mono text-[10px] text-slate-500">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          BUILD 0{idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {project.year}
                        </span>
                      </div>

                      {/* Thumbnail Frame */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover object-center group-hover:scale-108 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-500">
                            <Code2 className="w-10 h-10 text-cyan-400 mb-2" />
                            <span className="text-xs font-mono font-bold">SOURCE CODE ARCHITECTURE</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Project Details */}
                      <div className="space-y-2 flex-grow">
                        <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-cyan-300 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-mono font-medium text-slate-400 group-hover:border-cyan-500/30 group-hover:text-cyan-300/80 transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons Row */}
                      <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition-colors cursor-pointer"
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
                              className="p-2 rounded-lg bg-slate-800/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 border border-slate-700 transition-colors cursor-pointer"
                              title="Buka Demo Langsung"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-teal-400 hover:to-cyan-500 text-slate-950 font-mono text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md shadow-cyan-500/20"
                        >
                          RINCIAN &rarr;
                        </button>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#0E1524] rounded-2xl border border-cyan-500/30 p-6 sm:p-8 cursor-default max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(79,209,197,0.15)]"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700 text-slate-400 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <Terminal className="w-4 h-4" />
                  <span>BUILD ARTIFACT</span>
                  <span>&bull;</span>
                  <span>TAHUN {selectedProject.year}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white uppercase">
                  {selectedProject.title}
                </h3>

                {/* Modal Large Photo View */}
                {selectedProject.image && (
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-mono font-bold text-white uppercase">Teknologi yang Digunakan:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-cyan-300"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 font-mono text-xs font-bold uppercase transition-colors"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(79,209,197,0.3)]"
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
