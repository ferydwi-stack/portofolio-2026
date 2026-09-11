"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface ShutterTransitionProps {
  /** When true, plays the shutter close→open animation */
  isActive: boolean;
  /** Called when the shutter is fully closed (midpoint) */
  onMidpoint?: () => void;
  /** Called when the animation fully completes */
  onComplete?: () => void;
  /** Total duration in seconds */
  duration?: number;
}

/**
 * ShutterTransition — Two black panels (top & bottom) that close like a camera
 * shutter, then re-open. Used for major section transitions.
 */
export function ShutterTransition({
  isActive,
  onMidpoint,
  onComplete,
  duration = 0.9,
}: ShutterTransitionProps) {
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const playShutter = useCallback(() => {
    if (!topPanelRef.current || !bottomPanelRef.current) return;

    // Kill any existing timeline
    timelineRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // Close: panels slide to center
    tl.fromTo(
      topPanelRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: duration / 2, ease: "power3.inOut" },
      0
    );
    tl.fromTo(
      bottomPanelRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: duration / 2, ease: "power3.inOut" },
      0
    );

    // Midpoint callback
    tl.call(() => onMidpoint?.(), [], duration / 2);

    // Open: panels slide away
    tl.to(
      topPanelRef.current,
      { yPercent: -100, duration: duration / 2, ease: "power3.inOut" },
      duration / 2 + 0.05
    );
    tl.to(
      bottomPanelRef.current,
      { yPercent: 100, duration: duration / 2, ease: "power3.inOut" },
      duration / 2 + 0.05
    );

    timelineRef.current = tl;
  }, [duration, onMidpoint, onComplete]);

  useEffect(() => {
    if (isActive) {
      playShutter();
    }
  }, [isActive, playShutter]);

  return (
    <div className="fixed inset-0 z-[9997] pointer-events-none" aria-hidden="true">
      {/* Top panel */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A]"
        style={{ transform: "translateY(-100%)" }}
      />
      {/* Bottom panel */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A]"
        style={{ transform: "translateY(100%)" }}
      />
    </div>
  );
}
