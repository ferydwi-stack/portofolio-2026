"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";

interface EqualizerBarsProps {
  count?: number;
  className?: string;
  barWidth?: number;
  height?: number;
}

const BAR_COLORS = [
  "#e11d2e", // Stage Red
  "#ff6b35", // Amp Glow
  "#ffb020", // Stage Amber
  "#ff2e88", // Stage Magenta
  "#8b3ff2", // Stage Violet
  "#17e0c9", // Stage Cyan
];

export function EqualizerBars({
  count = 24,
  className = "",
  barWidth = 3,
  height = 36,
}: EqualizerBarsProps) {
  const prefersReducedMotion = useReducedMotion();

  // Deterministic heights and animation delays
  const bars = Array.from({ length: count }, (_, i) => {
    const color = BAR_COLORS[i % BAR_COLORS.length];
    const duration = 0.5 + ((i * 13) % 7) * 0.1; // 0.5s - 1.1s
    const delay = ((i * 17) % 10) * 0.08;
    const baseHeightPercent = 20 + ((i * 23) % 65);

    return { id: i, color, duration, delay, baseHeightPercent };
  });

  return (
    <div
      aria-hidden="true"
      className={`flex items-end justify-center gap-1 select-none pointer-events-none ${className}`}
      style={{ height }}
    >
      {bars.map((bar) => (
        <span
          key={bar.id}
          className="rounded-full will-change-transform"
          style={{
            width: barWidth,
            height: "100%",
            backgroundColor: bar.color,
            opacity: 0.75,
            transformOrigin: "bottom",
            transform: prefersReducedMotion ? `scaleY(${bar.baseHeightPercent / 100})` : undefined,
            animation: prefersReducedMotion
              ? "none"
              : `eq-dance-${(bar.id % 5) + 1} ${bar.duration}s ease-in-out infinite alternate ${bar.delay}s`,
            boxShadow: `0 0 6px ${bar.color}66`,
          }}
        />
      ))}
    </div>
  );
}
