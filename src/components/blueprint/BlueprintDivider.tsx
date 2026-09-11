"use client";

interface BlueprintDividerProps {
  label: string;
}

export function BlueprintDivider({ label }: BlueprintDividerProps) {
  return (
    <div className="relative w-full py-6 sm:py-8 px-5 sm:px-10 lg:px-16 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        {/* Left node */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#4FD1C5] shadow-[0_0_8px_rgba(79,209,197,0.4)]" />
          <div className="w-8 h-px bg-gradient-to-r from-[#4FD1C5]/50 to-transparent" />
        </div>

        {/* Left dashed line */}
        <div className="flex-1 border-t border-dashed border-[#4FD1C5]/20" />

        {/* Center label */}
        <div className="shrink-0 px-4 py-1.5 rounded-full border border-[#4FD1C5]/20 bg-[#0A0F1A]">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-[#4FD1C5]/60 tracking-[0.15em] uppercase">
            {label}
          </span>
        </div>

        {/* Right dashed line */}
        <div className="flex-1 border-t border-dashed border-[#4FD1C5]/20" />

        {/* Right node */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-px bg-gradient-to-l from-[#4FD1C5]/50 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-[#4FD1C5] shadow-[0_0_8px_rgba(79,209,197,0.4)]" />
        </div>
      </div>
    </div>
  );
}
