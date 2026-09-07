"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface AboutTimelineRefs {
  containerRef: RefObject<HTMLElement | null>;
  photoRef: RefObject<HTMLElement | null>;
  bioTextRef: RefObject<HTMLElement | null>;
  rigsRef?: RefObject<HTMLElement | null>;
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
      const elementsToAnimate = [photoRef.current, bioTextRef.current];
      if (rigsRef?.current) elementsToAnimate.push(rigsRef.current);
      gsap.to(elementsToAnimate, {
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
          start: "top 75%",
          once: true,
        },
      });

      // Photo frame slides in with momentum from left
      if (photoRef.current) {
        tl.fromTo(
          photoRef.current,
          { x: -180, opacity: 0, rotate: -10 },
          { x: 0, opacity: 1, rotate: -4, duration: 1.0, ease: "power3.out", clearProps: "all" }
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

      // Tech gear items stagger (optional)
      if (rigsRef?.current) {
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
