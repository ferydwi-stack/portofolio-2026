"use client";

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { registerGSAP } from "./gsapConfig";

interface ContactTimelineRefs {
  sectionRef: RefObject<HTMLElement | null>;
  contentRef: RefObject<HTMLElement | null>;
  formRef: RefObject<HTMLElement | null>;
}

export function useContactTimeline({ sectionRef, contentRef, formRef }: ContactTimelineRefs) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();
    if (typeof window === "undefined") return;

    const section = sectionRef.current;
    if (!section) return;

    if (prefersReducedMotion) {
      gsap.to([contentRef.current, formRef.current], { opacity: 1, x: 0, y: 0, duration: 0.4 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (contentRef.current) {
        tl.fromTo(
          contentRef.current,
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
        );
      }

      if (formRef.current) {
        tl.fromTo(
          formRef.current,
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        );
      }
    }, section);

    return () => ctx.revert();
  }, [sectionRef, contentRef, formRef, prefersReducedMotion]);
}
