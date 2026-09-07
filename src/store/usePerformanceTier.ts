import { create } from "zustand";

export type PerformanceTier = "low" | "mid" | "high";

interface PerformanceTierState {
  tier: PerformanceTier;
  setTier: (tier: PerformanceTier) => void;
}

export function detectTier(): PerformanceTier {
  if (typeof window === "undefined") return "high";
  try {
    const cores = navigator.hardwareConcurrency ?? 4;
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile && cores <= 4) return "low";
    if (isMobile || cores <= 6) return "mid";
    return "high";
  } catch {
    return "mid";
  }
}

export const usePerformanceTier = create<PerformanceTierState>((set) => ({
  tier: "high",
  setTier: (tier) => set({ tier }),
}));
