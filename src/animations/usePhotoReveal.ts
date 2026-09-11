"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { registerGSAP } from "./gsapConfig";

interface PhotoRevealOptions {
  /** The element(s) to animate */
  target: RefObject<HTMLElement | null> | string;
  /** ScrollTrigger start position */
  start?: string;
  /** Duration of the reveal */
  duration?: number;
  /** Stagger delay between multiple targets */
  stagger?: number;
  /** Initial blur amount in pixels */
  blurAmount?: number;
  /** Additional Y offset */
  yOffset?: number;
}

/**
 * usePhotoReveal — Reusable hook for "photo developing" scroll-triggered animation.
 * Elements start blurred + transparent and resolve into clarity as they enter viewport.
 */
export function usePhotoReveal({
  target,
  start = "top 85%",
  duration = 0.7,
  stagger = 0.1,
  blurAmount = 10,
  yOffset = 20,
}: PhotoRevealOptions) {
  useEffect(() => {
    registerGSAP();

    const elements =
      typeof target === "string"
        ? document.querySelectorAll(target)
        : target.current
        ? [target.current]
        : [];

    if (!elements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        {
          opacity: 0,
          filter: `blur(${blurAmount}px)`,
          y: yOffset,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: elements[0],
            start,
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [target, start, duration, stagger, blurAmount, yOffset]);
}
