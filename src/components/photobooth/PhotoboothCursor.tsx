"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function subscribeTouch(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(pointer: coarse)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getTouchSnapshot() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: coarse)").matches;
}

function getServerTouchSnapshot() {
  return true;
}

/**
 * PhotoboothCursor — Custom cursor styled as a camera lens (default)
 * that transforms into a shutter button on interactive elements.
 * Disabled on mobile/touch devices.
 */
export function PhotoboothCursor() {
  const lensRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorState, setCursorState] = useState<"default" | "interactive">("default");
  const [cursorLabel, setCursorLabel] = useState<string>("");

  const isTouchDevice = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerTouchSnapshot);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || isTouchDevice || prefersReducedMotion) return;

    document.documentElement.classList.add("cursor-none");

    const lens = lensRef.current;
    const ring = ringRef.current;
    if (!lens || !ring) return;

    // GSAP quickTo for buttery-smooth 60/120fps tracking
    const xLens = gsap.quickTo(lens, "x", { duration: 0.08, ease: "power3.out" });
    const yLens = gsap.quickTo(lens, "y", { duration: 0.08, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.2, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.2, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xLens(e.clientX);
      yLens(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");

      if (interactiveEl) {
        setCursorState("interactive");
        const customText = interactiveEl.getAttribute("data-cursor-text");
        setCursorLabel(customText || "KLIK");
      } else {
        setCursorState("default");
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [isTouchDevice, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none" aria-hidden="true">
      {/* Center dot — camera lens aperture */}
      <div
        ref={lensRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform transition-all duration-200 ${
          cursorState === "interactive"
            ? "w-3 h-3 bg-[#D9483A] shadow-[0_0_8px_rgba(217,72,58,0.5)]"
            : "w-2.5 h-2.5 bg-[#1A1A1A] shadow-[0_0_4px_rgba(26,26,26,0.3)]"
        }`}
      />

      {/* Trailing ring — camera lens ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 flex items-center justify-center will-change-transform ${
          cursorState === "interactive"
            ? "w-14 h-14 border-[#D9483A] bg-[#D9483A]/10 shadow-[0_0_16px_rgba(217,72,58,0.2)] scale-110"
            : "w-9 h-9 border-[#1A1A1A]/30 bg-transparent"
        }`}
      >
        {cursorLabel && (
          <span
            ref={labelRef}
            className="text-[8px] font-mono font-bold uppercase text-[#D9483A] tracking-widest pointer-events-none"
          >
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
