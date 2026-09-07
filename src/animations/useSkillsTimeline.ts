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
        if (!cards.length) return;

        // Animate entrance once, and clear all inline styles so cards NEVER disappear
        gsap.fromTo(
          cards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
            clearProps: "all", // Clears inline opacity and transform
            scrollTrigger: {
              trigger: group,
              start: "top 95%",
              once: true, // Play once only; never reverse or hide cards again
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, prefersReducedMotion]);
}
