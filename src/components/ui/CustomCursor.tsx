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

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorState, setCursorState] = useState<"default" | "interactive" | "drag">("default");
  const [cursorLabel, setCursorLabel] = useState<string>("");

  const isTouchDevice = useSyncExternalStore(subscribeTouch, getTouchSnapshot, getServerTouchSnapshot);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || isTouchDevice || prefersReducedMotion) return;

    // Add cursor-none class to body
    document.documentElement.classList.add("cursor-none");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // gsap.quickTo for instant 60/120fps tracking without React re-render lag
    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power3.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      // Check target element interactive tags
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor]");
      const dragEl = target.closest("#skills, #projects, [data-cursor-drag]");

      if (dragEl) {
        setCursorState("drag");
        setCursorLabel("DRAG");
      } else if (interactiveEl) {
        setCursorState("interactive");
        const customText = interactiveEl.getAttribute("data-cursor-text");
        setCursorLabel(customText || "VIEW");
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
      {/* Center sharp laser dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ff2a3b] will-change-transform"
      />

      {/* Lagging trailing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-200 flex items-center justify-center will-change-transform ${
          cursorState === "interactive"
            ? "w-14 h-14 bg-red-600/20 border-red-500 shadow-[0_0_25px_rgba(255,42,59,0.5)] scale-110"
            : cursorState === "drag"
            ? "w-16 h-16 bg-zinc-900/60 border-red-400/80 shadow-[0_0_20px_rgba(255,42,59,0.3)] scale-125"
            : "w-8 h-8 bg-transparent border-red-500/40"
        }`}
      >
        {cursorLabel && (
          <span
            ref={labelRef}
            className="text-[9px] font-mono font-black uppercase text-white tracking-widest pointer-events-none drop-shadow-md"
          >
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
