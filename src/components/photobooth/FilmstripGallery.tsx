"use client";

import { useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, Project } from "@/lib/data/portfolioData";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function FilmstripCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [imgError, setImgError] = React.useState(false);

  // Deterministic rotation per card
  const rotation = useMemo(() => {
    const seed = index * 7 + 3;
    return ((seed % 7) - 3);
  }, [index]);

  const hasValidImage = Boolean(project.image && !imgError);

  return (
    <div
      ref={cardRef}
      className="filmstrip-card flex-none snap-center group"
      style={{ transform: prefersReducedMotion ? "none" : `rotate(${rotation}deg)` }}
    >
      {/* Polaroid Frame */}
      <div
        className="relative bg-white p-3 sm:p-4 pb-16 sm:pb-20 rounded-[3px] polaroid-shadow group-hover:polaroid-shadow-hover transition-all duration-300 cursor-pointer w-[75vw] sm:w-[50vw] md:w-[380px] lg:w-[340px]"
        style={{
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          if (prefersReducedMotion) return;
          const el = e.currentTarget;
          el.style.transform = "translateY(-8px) scale(1.02) rotate(0deg)";
        }}
        onMouseLeave={(e) => {
          if (prefersReducedMotion) return;
          const el = e.currentTarget;
          el.style.transform = `rotate(${rotation}deg)`;
        }}
      >
        {/* Photo area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE7D9] rounded-sm">
          {hasValidImage ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 75vw, 380px"
              onError={() => setImgError(true)}
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#6B6560] bg-[#EDE7D9]">
              <svg className="w-10 h-10 mb-2 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M9 10L4 16h16l-5-6-3 4z" />
                <circle cx="8.5" cy="7.5" r="1.5" />
              </svg>
              <span className="text-xs font-mono opacity-50">BACKEND SERVICE</span>
            </div>
          )}
        </div>

        {/* Caption zone (polaroid bottom) */}
        <div className="absolute bottom-2 sm:bottom-3 left-3 right-3">
          <p className="caption-handwriting text-lg sm:text-xl leading-tight truncate">
            {project.title}
          </p>
          <p className="text-[10px] sm:text-xs font-mono text-[#6B6560] mt-1 truncate">
            {project.year} • {project.tags.slice(0, 3).join(" / ")}
          </p>
        </div>

        {/* Hover overlay with details */}
        <div className="absolute inset-x-3 inset-y-3 bottom-16 sm:bottom-20 bg-[#1A1A1A]/85 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none group-hover:pointer-events-auto">
          <p className="text-white text-xs sm:text-sm leading-relaxed line-clamp-3 mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[9px] font-mono text-white/80 bg-white/15 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8B84B] hover:bg-[#F2D078] text-[#1A1A1A] font-mono text-[11px] font-bold rounded transition-colors"
              data-cursor-text="KODE"
            >
              <Github className="w-3.5 h-3.5" />
              <span>KODE SUMBER</span>
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/80 hover:text-white text-[11px] font-mono transition-colors"
                data-cursor-text="DEMO"
              >
                <span>DEMO</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Tape decoration */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-60 z-10"
          style={{
            background: "linear-gradient(135deg, rgba(232, 184, 75, 0.6) 0%, rgba(232, 184, 75, 0.3) 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

import React from "react";

/**
 * FilmstripGallery — Horizontal scrollable gallery (desktop) / vertical (mobile)
 * showing project cards as polaroid frames with scroll-snap.
 */
export function FilmstripGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // ScrollTrigger: photo developing reveal per card
  useEffect(() => {
    if (prefersReducedMotion || !galleryRef.current) return;

    const cards = galleryRef.current.querySelectorAll(".filmstrip-card");

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, filter: "blur(10px)", y: 30 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.08,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full">
      {/* Filmstrip sprocket decoration top */}
      <div className="w-full h-5 bg-[#1A1A1A] flex items-center justify-between px-4 overflow-hidden rounded-t-md" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-3 h-2.5 rounded-sm bg-[#F5F0E6]/15 flex-shrink-0" />
        ))}
      </div>

      {/* Gallery container */}
      <div
        ref={galleryRef}
        className="flex md:flex-row flex-col gap-8 md:gap-10 py-8 md:py-10 px-6 md:px-10 md:overflow-x-auto md:snap-x md:snap-mandatory overflow-y-visible scrollbar-thin"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {PROJECTS.map((project, idx) => (
          <FilmstripCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      {/* Filmstrip sprocket decoration bottom */}
      <div className="w-full h-5 bg-[#1A1A1A] flex items-center justify-between px-4 overflow-hidden rounded-b-md" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-3 h-2.5 rounded-sm bg-[#F5F0E6]/15 flex-shrink-0" />
        ))}
      </div>
    </div>
  );
}
