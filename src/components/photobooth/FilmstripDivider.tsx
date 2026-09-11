"use client";

interface FilmstripDividerProps {
  /** Label text displayed in the center of the strip */
  label?: string;
  /** Visual style variant */
  variant?: "dark" | "light";
}

/**
 * FilmstripDivider — Section divider styled as a film negative strip
 * with sprocket holes. Replaces the old DiagonalDivider (guitar fret).
 */
export function FilmstripDivider({ label, variant = "dark" }: FilmstripDividerProps) {
  const bgColor = variant === "dark" ? "bg-[#1A1A1A]" : "bg-[#2D2D2D]";
  const holeColor = variant === "dark" ? "bg-[#F5F0E6]/15" : "bg-[#F5F0E6]/20";

  return (
    <div className={`relative w-full ${bgColor} py-1 my-4 sm:my-8`} aria-hidden="true">
      {/* Top sprocket holes */}
      <div className="flex items-center justify-between px-3 h-3">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={`top-${i}`}
            className={`w-2.5 h-1.5 rounded-[1px] ${holeColor} flex-shrink-0`}
          />
        ))}
      </div>

      {/* Center content area */}
      <div className="flex items-center justify-center py-3 sm:py-5 px-6">
        {label && (
          <span className="caption-handwriting text-lg sm:text-2xl text-[#F5F0E6]/70 tracking-wide text-center">
            {label}
          </span>
        )}
      </div>

      {/* Bottom sprocket holes */}
      <div className="flex items-center justify-between px-3 h-3">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={`bot-${i}`}
            className={`w-2.5 h-1.5 rounded-[1px] ${holeColor} flex-shrink-0`}
          />
        ))}
      </div>
    </div>
  );
}
