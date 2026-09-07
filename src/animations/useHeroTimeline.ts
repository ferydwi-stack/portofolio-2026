"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface HeroTimelineRefs {
  containerRef: RefObject<HTMLElement | null>;
  headlineRef: RefObject<HTMLElement | null>;
  subheadingRef: RefObject<HTMLElement | null>;
  ctaRef: RefObject<HTMLElement | null>;
  pickIndicatorRef: RefObject<HTMLElement | null>;
}

export function useHeroTimeline({
  containerRef,
  headlineRef,
  subheadingRef,
  ctaRef,
  pickIndicatorRef,
}: HeroTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    const headline = headlineRef.current;
    if (!container || !headline) return;

    if (prefersReducedMotion) {
      gsap.set([headline, subheadingRef.current, ctaRef.current, pickIndicatorRef.current], {
        opacity: 1,
        y: 0,
        filter: "none",
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Entrance timeline on initial load
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      const words = headline.children;
      tl.fromTo(
        words.length > 0 ? words : headline,
        { y: 35, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.14, ease: "back.out(1.3)", clearProps: "transform" }
      );

      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, clearProps: "transform" },
          "-=0.5"
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)", clearProps: "transform" },
          "-=0.4"
        );
      }

      // Infinite Pick Bounce Indicator
      if (pickIndicatorRef.current) {
        gsap.to(pickIndicatorRef.current, {
          y: 8,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "sine.inOut",
        });
      }

      // 2. Scroll Parallax - Always restores opacity 1 and y 0 when scrolled back to the top!
      gsap.fromTo(
        headline,
        { opacity: 1, y: 0 },
        {
          opacity: 0.45,
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, [containerRef, headlineRef, subheadingRef, ctaRef, pickIndicatorRef, prefersReducedMotion]);
}
