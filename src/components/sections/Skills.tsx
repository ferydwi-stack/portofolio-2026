"use client";

import { useState } from "react";
import { Cpu, Globe, Smartphone, CheckCircle } from "lucide-react";
import { TECH_DOMAINS, TechDomain, TechCard, TechCardItem } from "@/lib/data/portfolioData";
import { TechLogo } from "@/components/ui/TechLogos";

export function Skills() {
  const [activeDomainId, setActiveDomainId] = useState<string>("web-dev");

  const currentDomain = TECH_DOMAINS.find((d) => d.id === activeDomainId) || TECH_DOMAINS[0];

  return (
    <section
      id="skills"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 blueprint-grid select-none overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[#4FD1C5]/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#1E293B]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B232E] border border-[#334155] text-xs font-mono text-[#E8A33D]">
              <Cpu className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">KEAHLIAN TEKNIS // TECH ECOSYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#E2E8F0] tracking-tight uppercase">
              Keahlian &amp; Ekosistem Teknologi.
            </h2>
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
              Bahasa pemrograman, kerangka kerja, basis data, dan perangkat pendukung rekayasa perangkat lunak yang saya kuasai untuk membangun solusi skala produksi.
            </p>
          </div>

          {/* Domain Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#1B232E] border border-[#334155] text-xs font-mono">
            {TECH_DOMAINS.map((domain: TechDomain) => {
              const isActive = activeDomainId === domain.id;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomainId(domain.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] shadow-xs"
                      : "text-[#64748B] hover:text-[#E2E8F0]"
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

        {/* Active Domain Info Bar */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#64748B]">
          <div>
            <span className="text-[#4FD1C5] font-bold uppercase">{currentDomain.tag}</span>
            <h3 className="text-lg sm:text-xl font-black text-[#E2E8F0] uppercase mt-0.5">
              {currentDomain.title}
            </h3>
          </div>
          <p className="max-w-md text-right sm:text-right text-[11px]">
            {currentDomain.subtitle}
          </p>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {currentDomain.cards.map((card: TechCard, idx: number) => {
            return (
              <div
                key={card.id}
                className="group relative p-5 rounded-2xl compile-card transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#1E293B] text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 font-bold text-[#E2E8F0]">
                    <span className="w-4 h-4 rounded-full bg-gradient-to-br from-[#4FD1C5] to-[#38BDF8] text-[#0A0F1A] flex items-center justify-center text-[9px] font-black">
                      {idx + 1}
                    </span>
                    <span className="uppercase tracking-wider">{card.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#0A0F1A] border border-[#334155] text-[#4FD1C5] font-semibold">
                    {card.badge}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-[#64748B] font-mono py-2 line-clamp-1">
                  {card.role}
                </p>

                {/* Items List */}
                <div className="space-y-2 py-2">
                  {card.items.map((item: TechCardItem) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#0A0F1A]/60 group-hover:bg-[#111827] border border-[#1E293B] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#1B232E] border border-[#334155] shadow-xs">
                          <TechLogo name={item.name} size={16} />
                        </div>
                        <span className="text-xs font-bold text-[#E2E8F0]">
                          {item.name}
                        </span>
                      </div>

                      {/* Proficiency Meter */}
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-mono text-[#64748B]">
                          {item.proficiency}%
                        </span>
                        <div className="w-10 h-1.5 rounded-full bg-[#1E293B] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#4FD1C5] to-[#34D399] rounded-full"
                            style={{ width: `${item.proficiency}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer */}
                <div className="pt-3.5 mt-2 border-t border-[#1E293B] flex items-center justify-between text-[10px] font-mono text-[#475569]">
                  <span className="flex items-center gap-1 text-[#34D399] font-bold">
                    <CheckCircle className="w-3.5 h-3.5" /> BUILD PASSED
                  </span>
                  <span className="group-hover:text-[#4FD1C5] transition-colors font-semibold">
                    MODULE #{card.number}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
