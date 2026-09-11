"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Cpu, Globe, Smartphone, CheckCircle, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TECH_DOMAINS, TechDomain, TechCard, TechCardItem } from "@/lib/data/portfolioData";
import { TechLogo } from "@/components/ui/TechLogos";
import { TiltCard } from "@/components/ui/TiltCard";
import { playHoverTick, playCyberClick } from "@/lib/sound/cyberSound";

// Dynamic import Interactive 3D Tech Globe (no SSR)
const InteractiveTechGlobe = dynamic(
  () => import("@/components/blueprint/InteractiveTechGlobe").then((mod) => mod.InteractiveTechGlobe),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[320px] sm:h-[360px] rounded-3xl bg-slate-950/40 border border-slate-800 flex items-center justify-center">
        <span className="text-xs font-mono text-cyan-400/60 animate-pulse">
          INITIALIZING 3D TECH GALAXY...
        </span>
      </div>
    ),
  }
);

export function Skills() {
  const [activeDomainId, setActiveDomainId] = useState<string>("web-dev");

  const currentDomain = TECH_DOMAINS.find((d) => d.id === activeDomainId) || TECH_DOMAINS[0];

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Section Header */}
        <div className="pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-400">
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">KEAHLIAN TEKNIS // TECH ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Keahlian &amp; Ekosistem Teknologi.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Bahasa pemrograman, kerangka kerja, basis data, dan perangkat pendukung rekayasa perangkat lunak yang saya kuasai untuk membangun solusi skala produksi.
            </p>
          </div>

          {/* Domain Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono self-start sm:self-end">
            {TECH_DOMAINS.map((domain: TechDomain) => {
              const isActive = activeDomainId === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => {
                    playCyberClick();
                    setActiveDomainId(domain.id);
                  }}
                  onMouseEnter={playHoverTick}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-[0_0_15px_rgba(79,209,197,0.3)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {domain.id === "web-dev" ? (
                    <Globe className="w-3.5 h-3.5" />
                  ) : (
                    <Smartphone className="w-3.5 h-3.5" />
                  )}
                  <span>{domain.id === "web-dev" ? "WEB ENGINEERING" : "MOBILE APPS"}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Interactive Tech Galaxy Showcase */}
        <div>
          <InteractiveTechGlobe />
        </div>

        {/* Active Domain Info Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-2">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              {currentDomain.tag}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white uppercase mt-0.5">
              {currentDomain.title}
            </h3>
          </div>
          <p className="max-w-md text-left sm:text-right text-[11px] text-slate-400">
            {currentDomain.subtitle}
          </p>
        </div>

        {/* 3D Tactile Skill Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDomainId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentDomain.cards.map((card: TechCard, idx: number) => {
              return (
                <TiltCard key={card.id} tiltMaxAngle={7} className="h-full">
                  <div className="h-full p-5 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 transition-colors duration-300 flex flex-col justify-between backdrop-blur-md shadow-lg shadow-black/40">
                    {/* Card Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 text-[10px] font-mono">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-gradient-to-br from-cyan-500 to-teal-400 text-slate-950 flex items-center justify-center text-[10px] font-black shadow-xs">
                          {idx + 1}
                        </span>
                        <span className="uppercase tracking-wider">{card.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 font-semibold">
                        {card.badge}
                      </span>
                    </div>

                    {/* Subtitle */}
                    <p className="text-xs text-slate-400 font-mono py-2 line-clamp-1">
                      {card.role}
                    </p>

                    {/* Items List */}
                    <div className="space-y-2 py-2">
                      {card.items.map((item: TechCardItem) => (
                        <div
                          key={item.name}
                          onMouseEnter={playHoverTick}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 transition-colors group/item cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-700 shadow-xs group-hover/item:border-cyan-500/40 transition-colors">
                              <TechLogo name={item.name} size={16} />
                            </div>
                            <span className="text-xs font-bold text-slate-200 group-hover/item:text-cyan-300 transition-colors">
                              {item.name}
                            </span>
                          </div>

                          {/* Proficiency Meter */}
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400">
                              {item.proficiency}%
                            </span>
                            <div className="w-14 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.proficiency}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.05 }}
                                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3.5 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" /> BUILD PASSED
                      </span>
                      <span className="text-slate-400 font-semibold">
                        MODULE #{card.number}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
