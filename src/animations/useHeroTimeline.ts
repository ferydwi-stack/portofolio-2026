"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface HeroTimelineRefs {
  containerRef: RefObject<HTMLElement | null>;
  headlineCharsRef: RefObject<(HTMLSpanElement | null)[]>;
  subheadingRef: RefObject<HTMLElement | null>;
  ctaRef: RefObject<HTMLElement | null>;
  pickIndicatorRef: RefObject<HTMLElement | null>;
}

export function useHeroTimeline({
  containerRef,
  headlineCharsRef,
  subheadingRef,
  ctaRef,
  pickIndicatorRef,
}: HeroTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const chars = (headlineCharsRef.current || []).filter(Boolean);

    if (prefersReducedMotion) {
      gsap.to([chars, subheadingRef.current, ctaRef.current, pickIndicatorRef.current], {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline - use clearProps so text is never stuck at opacity 0
      if (chars.length > 0) {
        gsap.from(chars, {
          y: 40,
          opacity: 0,
          stagger: 0.02,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          x: 40,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          clearProps: "all",
        });
      }

      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          y: 25,
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          ease: "back.out(1.5)",
          clearProps: "all",
        });
      }

      // Infinite Pick Bounce Indicator
      if (pickIndicatorRef.current) {
        gsap.to(pickIndicatorRef.current, {
          y: 10,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

      // 2. Scroll-driven Exit Animation (gentle slide left on scroll)
      if (chars.length > 0) {
        gsap.to(chars, {
          xPercent: -20,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [containerRef, headlineCharsRef, subheadingRef, ctaRef, pickIndicatorRef, prefersReducedMotion]);
}
