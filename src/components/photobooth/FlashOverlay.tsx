"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FlashOverlayProps {
  /** Trigger the flash. Pass a new value to re-trigger. */
  trigger?: boolean;
  /** Duration of the flash fade in seconds */
  duration?: number;
  /** Called when flash animation completes */
  onComplete?: () => void;
}

/**
 * FlashOverlay — Full-screen white flash that simulates a camera flash/blitz.
 * Triggers on mount (page load) and can be re-triggered via props.
 * Replaces the old CurtainIntro component.
 */
export function FlashOverlay({ trigger = true, duration = 0.5, onComplete }: FlashOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    // Play on mount or when trigger changes
    if (trigger && !hasPlayed.current) {
      hasPlayed.current = true;

      gsap.fromTo(
        overlayRef.current,
        { opacity: 1, visibility: "visible" },
        {
          opacity: 0,
          duration,
          ease: "power4.out",
          delay: 0.1,
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.visibility = "hidden";
            }
            onComplete?.();
          },
        }
      );
    }
  }, [trigger, duration, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] bg-white pointer-events-none"
      style={{ visibility: "visible", opacity: 1 }}
      aria-hidden="true"
    />
  );
}
