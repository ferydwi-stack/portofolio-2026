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
      // 1. Entrance timeline
      const enterTl = gsap.timeline({ delay: 0.2 });

      if (chars.length > 0) {
        enterTl.fromTo(
          chars,
          {
            y: 80,
            opacity: 0,
            filter: "blur(12px)",
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.02,
            duration: 1.1,
            ease: "power4.out",
          }
        );
      }

      if (subheadingRef.current) {
        enterTl.fromTo(
          subheadingRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );
      }

      if (ctaRef.current) {
        enterTl.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
          "-=0.4"
        );
      }

      // Infinite Pick Bounce Indicator
      if (pickIndicatorRef.current) {
        gsap.to(pickIndicatorRef.current, {
          y: 12,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

      // 2. Scroll-driven Exit Animation (headline slides smoothly left on scroll down as a coherent unit)
      if (chars.length > 0) {
        gsap.to(chars, {
          xPercent: -25,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [containerRef, headlineCharsRef, subheadingRef, ctaRef, pickIndicatorRef, prefersReducedMotion]);
}
