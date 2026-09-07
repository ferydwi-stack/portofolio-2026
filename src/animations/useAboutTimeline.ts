"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface AboutTimelineRefs {
  containerRef: RefObject<HTMLElement | null>;
  photoRef: RefObject<HTMLElement | null>;
  bioTextRef: RefObject<HTMLElement | null>;
  rigsRef: RefObject<HTMLElement | null>;
}

export function useAboutTimeline({
  containerRef,
  photoRef,
  bioTextRef,
  rigsRef,
}: AboutTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    if (prefersReducedMotion) {
      gsap.to([photoRef.current, bioTextRef.current, rigsRef.current], {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.4,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Photo frame slides in with heavy momentum from right
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          { x: 350, opacity: 0, rotate: 18 },
          { x: 0, opacity: 1, rotate: -8, duration: 1.2, ease: "power3.out" }
        );
      }

      // Bio text stagger
      if (bioTextRef.current) {
        const bioChildren = Array.from(bioTextRef.current.children);
        tl.fromTo(
          bioChildren,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power2.out" },
          "-=0.9"
        );
      }

      // Tech gear items stagger
      if (rigsRef.current) {
        const rigs = Array.from(rigsRef.current.children);
        tl.fromTo(
          rigs,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: "power2.out" },
          "-=0.5"
        );
      }
    }, container);

    return () => ctx.revert();
  }, [containerRef, photoRef, bioTextRef, rigsRef, prefersReducedMotion]);
}
