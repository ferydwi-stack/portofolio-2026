"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Github, ExternalLink, Disc3, Radio, Play, Pause } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { PROJECTS, Project } from "@/lib/data/portfolioData";
import { VinylRecord } from "@/components/three/VinylRecord";
import { useProjectsTimeline } from "@/animations/useProjectsTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { playGuitarChord } from "@/lib/sound/guitarSynth";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isPlayingRiff, setIsPlayingRiff] = useState(false);

  // Mouse tilt tracking with framer-motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
  const rotateY = useTransform(mouseX, [-250, 250], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePlayRiff = () => {
    setIsPlayingRiff(true);
    const chords = [82.41, 110.0, 98.0, 123.47];
    playGuitarChord(chords[index % chords.length]);
    setTimeout(() => {
      setIsPlayingRiff(false);
    }, 1200);
  };

  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      role="article"
      aria-label={`Album 0${index + 1}: ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handlePlayRiff();
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: prefersReducedMotion ? 0 : rotateX,
        rotateY: prefersReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="flex-none w-[88vw] sm:w-[84vw] max-w-[1100px] h-[520px] sm:h-[580px] rounded-3xl bg-[#0f0c18]/95 border-2 border-zinc-800 hover:border-red-500/80 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/50 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl relative transition-colors duration-300 group overflow-hidden"
    >
      {/* 3D Vinyl Record Sliding Out on Hover */}
      <div className="absolute -top-6 right-8 sm:right-12 z-30 pointer-events-none filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] transform group-hover:translate-x-6 group-hover:-translate-y-2 transition-transform duration-500">
        <VinylRecord albumIndex={index} />
      </div>

      {/* Full-Bleed Background Image with Stage Lighting Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-60 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a080f] via-[#0a080f]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a080f] via-[#0a080f]/50 to-transparent" />
      </div>

      {/* Top Header Information Bar */}
      <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between font-mono text-xs border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-red-600 text-white font-black tracking-wider">
            PROYEK 0{index + 1}
          </span>
          <span className="text-zinc-300 font-bold hidden sm:inline">
            {project.catalogNo}
          </span>
        </div>
        <div className="flex items-center gap-4 mr-28 sm:mr-36">
          <span className="text-red-400 font-bold bg-red-950/80 px-2.5 py-1 rounded border border-red-900/80">
            {project.rpm}
          </span>
          <span className="text-zinc-500 hidden md:inline">{project.year}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-end h-[calc(100%-75px)] space-y-4 max-w-2xl">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-red-400 font-bold uppercase tracking-widest">
            {project.side}
          </span>
          <h3 className="headline-section text-2xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-wide text-white drop-shadow-md">
            {project.title}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 font-sans line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-zinc-300 bg-[#161220]/90 px-3 py-1 rounded-md border border-zinc-700/80 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links & Preview Soundboard */}
        <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-widest font-black rounded-xl transition-all shadow-[0_0_20px_rgba(255,42,59,0.5)] cursor-pointer active:scale-95"
            data-cursor-text="KODE"
          >
            <Github className="w-4 h-4" />
            <span>KODE SUMBER</span>
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-300 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
            data-cursor-text="DEMO"
          >
            <span>LIHAT DEMO</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Interactive Riff Preview Button */}
          <button
            onClick={handlePlayRiff}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all cursor-pointer ${
              isPlayingRiff
                ? "bg-red-600 text-white border-red-500 animate-pulse shadow-[0_0_15px_rgba(255,42,59,0.5)]"
                : "bg-black/60 text-zinc-400 hover:text-white border-zinc-700 hover:border-red-500"
            }`}
            data-cursor-text="SUARA"
          >
            {isPlayingRiff ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-red-400" />}
            <span className="text-[10px] font-bold">PETIK RIFF</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Connect full-bleed horizontal scroll timeline
  useProjectsTimeline({ sectionRef, galleryRef });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-24 select-none ${
        prefersReducedMotion ? "py-24" : "min-h-screen"
      }`}
      data-cursor-drag="true"
    >
      {/* Header */}
      <div className="pt-6 pb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>PORTOFOLIO SISTEM &amp; APLIKASI</span>
          </div>
          <h2 className="headline-section text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-wider text-white leading-none">
            Portofolio Proyek Terpilih
          </h2>
          <p className="text-xs sm:text-sm font-sans text-zinc-400">
            {prefersReducedMotion
              ? "Koleksi proyek perangkat lunak dan aplikasi web yang telah dibangun."
              : "Geser horizontal untuk menjelajahi rincian sistem dan implementasi teknologi."}
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span className="text-red-400 font-bold bg-red-950/60 px-3 py-1 rounded border border-red-900/60 tracking-wider">
            {PROJECTS.length} PROYEK UTAMA
          </span>
        </div>
      </div>

      {/* Full-Bleed Horizontal Gallery */}
      <div className="relative w-full overflow-visible py-4 z-10">
        <div
          ref={galleryRef}
          className={`${
            prefersReducedMotion
              ? "flex flex-col gap-10"
              : "flex items-center gap-10 sm:gap-14 will-change-transform"
          }`}
        >
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
