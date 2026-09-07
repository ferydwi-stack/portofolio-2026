"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface SkillsTimelineRefs {
  sectionRef: RefObject<HTMLElement | null>;
  trackRef?: RefObject<HTMLElement | null>;
}

export function useSkillsTimeline({ sectionRef }: SkillsTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const domains = section.querySelectorAll(".tech-domain-group");
      domains.forEach((group) => {
        const cards = group.querySelectorAll(".tech-card");
        gsap.from(cards, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);
}
