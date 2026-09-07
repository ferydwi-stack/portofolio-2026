"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface CertificatesTimelineRefs {
  sectionRef: RefObject<HTMLElement | null>;
  wallRef: RefObject<HTMLElement | null>;
}

export function useCertificatesTimeline({ sectionRef, wallRef }: CertificatesTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    const wall = wallRef.current;
    if (!section || !wall) return;

    if (prefersReducedMotion) {
      gsap.to(wall.children, { opacity: 1, y: 0, duration: 0.4 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wall.children,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.04,
          duration: 0.8,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef, wallRef, prefersReducedMotion]);
}
