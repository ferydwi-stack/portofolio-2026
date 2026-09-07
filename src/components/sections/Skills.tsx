"use client";

import { useRef } from "react";
import { Radio, Flame, Sparkles, Globe, Smartphone, Terminal, Layers } from "lucide-react";
import { TECH_DOMAINS, TechDomain, TechCard, TechCardItem } from "@/lib/data/portfolioData";
import { useSkillsTimeline } from "@/animations/useSkillsTimeline";
import { playGuitarChord } from "@/lib/sound/guitarSynth";
import { TechLogo, getTechBrandColor } from "@/components/ui/TechLogos";

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Connect GSAP scroll reveal timeline
  useSkillsTimeline({ sectionRef });

  const handlePlaySongChord = (index: number) => {
    const chords = [82.41, 110.0, 98.0, 123.47, 146.83, 164.81, 130.81, 87.31, 174.61, 73.42, 196.0, 220.0];
    playGuitarChord(chords[index % chords.length]);
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full py-24 sm:py-32 px-4 sm:px-10 lg:px-20 select-none overflow-hidden"
    >
      {/* Background Section Watermark */}
      <div
        className="absolute left-6 top-1/4 -translate-y-1/2 font-[family-name:var(--font-bebas)] text-[18vw] font-black text-white/[0.02] pointer-events-none select-none tracking-widest leading-none"
        aria-hidden="true"
      >
        STACK
      </div>

      {/* Header Bar */}
      <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/60 px-3.5 py-1.5 rounded-lg border border-red-900/60 shadow-[0_0_15px_rgba(255,42,59,0.2)]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>PENGUASAAN TEKNOLOGI &amp; TOOLS</span>
          </div>
          <h2 className="headline-section text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-wider text-white leading-tight">
            Klasifikasi Stack &amp; Perangkat Kerja
          </h2>
          <p className="text-xs sm:text-base font-sans text-zinc-400 max-w-2xl leading-relaxed">
            Struktur penguasaan teknologi terbagi menjadi dua ranah utama: Website Development (Frontend, Backend, Tools &amp; Deployment) serta Mobile Development (Framework, Backend &amp; Database, Tools).
          </p>
        </div>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2 self-start sm:self-end">
          <span className="text-red-400 font-bold bg-red-950/60 px-3.5 py-1.5 rounded-lg border border-red-900/60 tracking-wider">
            6 KATEGORI TERSTRUKTUR
          </span>
        </div>
      </div>

      {/* Sub-Judul & Card Groups */}
      <div className="space-y-16 sm:space-y-20 relative z-10">
        {TECH_DOMAINS.map((domain: TechDomain, domainIdx: number) => {
          const isWeb = domain.id === "web-dev";

          return (
            <div key={domain.id} className="tech-domain-group space-y-6 sm:space-y-8">
              {/* Domain Sub-Judul Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-zinc-800/80 pb-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest text-red-400 uppercase">
                    {isWeb ? <Globe className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
                    <span>{domain.tag}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-wide text-white font-sans">
                    {domain.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 font-sans">
                    {domain.subtitle}
                  </p>
                </div>

                <span className="font-mono text-xs text-zinc-500 bg-zinc-900/90 px-3 py-1 rounded-md border border-zinc-800 self-start md:self-auto">
                  3 CARD EQUAL DIMENSION // 0{domainIdx + 1}
                </span>
              </div>

              {/* 3 Symmetrical Cards with Exact Same Dimensions and Height */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {domain.cards.map((card: TechCard, cardIdx: number) => {
                  return (
                    <div
                      key={card.id}
                      className="tech-card relative rounded-3xl bg-[#0e0b16]/95 border-2 border-zinc-800 hover:border-red-500/60 p-5 sm:p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col justify-between h-full min-h-[460px] sm:min-h-[480px] transition-all duration-300 group"
                    >
                      {/* Giant Faint Side Watermark in Background */}
                      <div
                        className="absolute right-5 bottom-4 font-[family-name:var(--font-bebas)] text-6xl sm:text-7xl font-normal text-white/[0.025] pointer-events-none select-none leading-none tracking-wider"
                        aria-hidden="true"
                      >
                        {card.watermark}
                      </div>

                      {/* Card Header */}
                      <div className="relative z-10 border-b border-zinc-800/90 pb-4 mb-4">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[11px] font-mono font-bold text-red-500 tracking-wider uppercase bg-red-950/40 px-2.5 py-0.5 rounded border border-red-900/40">
                            {card.badge}
                          </span>
                          <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center font-mono text-[10px] text-zinc-400 font-bold">
                            {card.number}
                          </div>
                        </div>

                        <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide font-sans group-hover:text-red-400 transition-colors">
                          {card.title}
                        </h4>
                        <p className="text-[11px] font-mono text-zinc-400 mt-1 line-clamp-1">
                          {card.role}
                        </p>
                      </div>

                      {/* 4 Interactive Track Items */}
                      <div className="relative z-10 flex flex-col divide-y divide-zinc-800/60 flex-1 justify-around">
                        {card.items.map((item: TechCardItem, itemIdx: number) => {
                          const globalIdx = domainIdx * 12 + cardIdx * 4 + itemIdx;
                          const brand = getTechBrandColor(item.name);

                          return (
                            <div
                              key={item.name}
                              tabIndex={0}
                              role="button"
                              aria-label={`${item.name}, Tingkat ${item.level} dari 5, Kategori ${item.category}`}
                              onClick={() => handlePlaySongChord(globalIdx)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handlePlaySongChord(globalIdx);
                                }
                              }}
                              className="group/item py-2.5 px-2 rounded-xl transition-all duration-200 flex items-center justify-between gap-2.5 cursor-pointer hover:bg-zinc-900/80 focus:outline-none focus:ring-1 focus:ring-red-500"
                              data-cursor-text="PLAY"
                            >
                              {/* Left: Track Number + Official Online Logo Badge */}
                              <div className="flex items-center gap-2.5 flex-shrink-0">
                                <span className="font-mono text-[11px] font-bold text-zinc-500 group-hover/item:text-red-400 transition-colors w-4">
                                  {item.track}
                                </span>

                                <div
                                  className={`w-8 h-8 rounded-xl ${brand.bg} border ${brand.border} flex items-center justify-center p-1.5 flex-shrink-0 transition-transform duration-300 group-hover/item:scale-110 shadow-sm`}
                                >
                                  <TechLogo name={item.name} size={18} />
                                </div>
                              </div>

                              {/* Middle: Name + Category */}
                              <div className="flex flex-col min-w-0 flex-1 pr-2">
                                <div className="flex items-center gap-1.5 truncate">
                                  <span className="text-sm font-bold text-white group-hover/item:text-red-400 transition-colors font-sans truncate">
                                    {item.name}
                                  </span>
                                  {item.featured && (
                                    <Flame className="w-3 h-3 text-red-500 animate-pulse flex-shrink-0" />
                                  )}
                                </div>
                                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider truncate">
                                  [{item.category}]
                                </span>
                              </div>

                              {/* Right: Dot Meter & Percentage */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <div className="hidden sm:flex items-center gap-1" aria-hidden="true">
                                  {[1, 2, 3, 4, 5].map((dot) => (
                                    <span
                                      key={dot}
                                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                        dot <= item.level
                                          ? "bg-red-500 shadow-[0_0_5px_#ff2a3b]"
                                          : "bg-zinc-700/60"
                                      }`}
                                    />
                                  ))}
                                </div>

                                <span className="font-mono text-xs font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/40 min-w-[38px] text-center">
                                  {item.proficiency}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Card Footer */}
                      <div className="relative z-10 pt-3.5 mt-3 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-red-500" />
                          <span>PRODUCTION-READY</span>
                        </div>
                        <span className="text-zinc-400 group-hover:text-red-400 transition-colors">
                          KLIK NADA ↵
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
