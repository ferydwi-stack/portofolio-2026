"use client";

interface FilmstripDividerProps {
  label?: string;
}

export function FilmstripDivider({ label }: FilmstripDividerProps) {
  return (
    <div className="relative w-full py-4 my-2 overflow-hidden select-none" aria-hidden="true">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 sm:px-10">
        {/* Left Perforated Sprocket Line */}
        <div className="flex-1 flex items-center gap-2 overflow-hidden opacity-35">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-[2px] bg-[#1C1A18] flex-shrink-0" />
          ))}
        </div>

        {/* Center Handwritten Section Stamp */}
        {label && (
          <div className="px-4 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFC8] text-xs font-mono font-bold text-[#1C1A18] uppercase tracking-wider shadow-xs whitespace-nowrap">
            {label}
          </div>
        )}

        {/* Right Perforated Sprocket Line */}
        <div className="flex-1 flex items-center gap-2 overflow-hidden opacity-35">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-3 h-2 rounded-[2px] bg-[#1C1A18] flex-shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );
}
