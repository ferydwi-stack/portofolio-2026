"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface ProjectsTimelineRefs {
  sectionRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLElement | null>;
}

export function useProjectsTimeline({ sectionRef, galleryRef }: ProjectsTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(gallery.scrollWidth - window.innerWidth + 140);

      gsap.to(gallery, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${gallery.scrollWidth - window.innerWidth + 500}`,
          scrub: 1.2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, galleryRef, prefersReducedMotion]);
}
