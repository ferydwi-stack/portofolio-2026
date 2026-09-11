"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Star, Camera, Smile } from "lucide-react";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { playShutterSound } from "@/lib/sound/shutterSound";

interface PhotoStripProps {
  className?: string;
  theme?: "classic-white" | "vintage-black";
}

const STRIP_FRAMES = [
  {
    id: 1,
    title: "Focus Mode",
    caption: "01. Engineering Core",
    filter: "contrast-105 saturate-95",
  },
  {
    id: 2,
    title: "Creative Spark",
    caption: "02. UI/UX Aesthetics",
    filter: "contrast-110 saturate-110",
  },
  {
    id: 3,
    title: "Problem Solver",
    caption: "03. High Performance",
    filter: "contrast-100 sepia-[0.15]",
  },
  {
    id: 4,
    title: "Ready to Ship",
    caption: "04. Production Ready",
    filter: "contrast-105 brightness-105",
  },
];

export function PhotoStrip4Cut({ className = "", theme = "classic-white" }: PhotoStripProps) {
  const [activeFilter, setActiveFilter] = useState<"normal" | "bw" | "warm">("normal");

  const isWhite = theme === "classic-white";

  const getFilterStyle = () => {
    if (activeFilter === "bw") return "grayscale contrast-125";
    if (activeFilter === "warm") return "sepia-[0.3] contrast-105 saturate-110";
    return "";
  };

  const cycleFilter = () => {
    playShutterSound();
    setActiveFilter((prev) => {
      if (prev === "normal") return "bw";
      if (prev === "bw") return "warm";
      return "normal";
    });
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Interactive Filter Picker Tag on Top */}
      <div className="flex items-center justify-between px-3 py-1.5 mb-2.5 rounded-full bg-[#1A1A1A] text-white text-[11px] font-mono shadow-md">
        <span className="flex items-center gap-1.5 text-[#F5B738] font-bold">
          <Camera className="w-3.5 h-3.5" />
          FILTER: {activeFilter.toUpperCase()}
        </span>
        <button
          onClick={cycleFilter}
          className="px-2.5 py-0.5 rounded-full bg-[#F5B738] text-[#1A1A1A] font-bold text-[10px] hover:bg-[#FFC955] transition-colors cursor-pointer"
          title="Ganti filter warna strip foto"
        >
          GANTI FILTER
        </button>
      </div>

      {/* The 4-Cut Vertical Photo Strip */}
      <motion.div
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative w-[280px] sm:w-[310px] p-3.5 sm:p-4 rounded-xl photostrip-shadow transition-all duration-500 cursor-pointer ${
          isWhite
            ? "bg-[#FFFFFF] text-[#1C1A18] border border-[#E5DFC8]"
            : "bg-[#181615] text-[#FAF8F5] border border-[#383531]"
        }`}
        style={{ transform: "rotate(2deg)" }}
        onClick={cycleFilter}
      >
        {/* Washi Tape Header Decoration */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-1 z-30 opacity-90 pointer-events-none" />

        {/* Cute Scrapbook Stickers */}
        <div className="absolute top-8 -right-3 z-30 w-7 h-7 rounded-full bg-[#F5B738] text-[#1A1A1A] flex items-center justify-center shadow-md rotate-12 pointer-events-none">
          <Star className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute top-1/2 -left-3.5 z-30 w-7 h-7 rounded-full bg-[#E24332] text-white flex items-center justify-center shadow-md -rotate-12 pointer-events-none">
          <Heart className="w-4 h-4 fill-current" />
        </div>
        <div className="absolute bottom-28 -right-3 z-30 w-7 h-7 rounded-full bg-[#7FA99B] text-white flex items-center justify-center shadow-md rotate-6 pointer-events-none">
          <Smile className="w-4 h-4" />
        </div>

        {/* Strip Top Metadata */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#ECE7D8] text-[9px] font-mono tracking-wider opacity-70">
          <span className="font-bold uppercase tracking-widest">CEKREK! PHOTOBOOTH</span>
          <span>SERI 01 &bull; 2026</span>
        </div>

        {/* 4 Photos Vertical Stack */}
        <div className="space-y-2.5">
          {STRIP_FRAMES.map((frame) => (
            <div
              key={frame.id}
              className="relative aspect-[4/3] w-full rounded-md overflow-hidden bg-[#ECE7D8] photo-gloss border border-[#DDD6C4]"
            >
              <Image
                src={PERSONAL_INFO.profileImage}
                alt={`${PERSONAL_INFO.name} - ${frame.title}`}
                fill
                sizes="310px"
                className={`object-cover object-center transition-all duration-500 ${frame.filter} ${getFilterStyle()}`}
                priority
              />
              {/* Corner Frame Stamp */}
              <div className="absolute bottom-1.5 right-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[8px] font-mono font-bold">
                {frame.caption}
              </div>
            </div>
          ))}
        </div>

        {/* Strip Bottom Footer (Photobooth Signature Zone) */}
        <div className="pt-4 mt-2 border-t border-[#ECE7D8] flex flex-col items-center gap-1.5 text-center">
          <p className="font-handwriting text-2xl leading-none text-[#1C1A18] tracking-tight">
            Fery Dwi Ramadhi
          </p>
          <span className="text-[9px] font-mono text-[#7A7568] tracking-widest uppercase">
            FULLSTACK DEVELOPER &bull; INDONESIA
          </span>

          {/* Barcode Graphic */}
          <div className="w-full pt-1 flex flex-col items-center gap-0.5 opacity-60">
            <div className="w-40 h-5 bg-[repeating-linear-gradient(to_right,#1C1A18_0,#1C1A18_2px,transparent_2px,transparent_4px,#1C1A18_4px,#1C1A18_7px,transparent_7px,transparent_9px)]" />
            <span className="text-[7px] font-mono tracking-[3px]">FDR-CEKREK-2026</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
