"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      // Find any elements marked with data-reveal
      const reveals = element.querySelectorAll("[data-reveal]");
      if (reveals.length > 0) {
        gsap.fromTo(
          reveals,
          {
            opacity: 0,
            y: 40,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, element);

    return () => ctx.revert();
  }, []);

  return ref;
}
