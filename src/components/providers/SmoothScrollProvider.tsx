"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP } from "@/animations/gsapConfig";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useScrollStore } from "@/store/useScrollStore";

interface LenisContextType {
  getLenis: () => Lenis | null;
  scrollTo: (target: string | HTMLElement, options?: { duration?: number; offset?: number }) => void;
}

export const LenisContext = createContext<LenisContextType>({
  getLenis: () => null,
  scrollTo: () => {},
});

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    registerGSAP();

    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", (e: { progress: number }) => {
      ScrollTrigger.update();
      useScrollStore.setState({ scrollProgress: e.progress });
    });

    // Single synchronized drive loop via gsap.ticker (no duplicate RAF)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenis;

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = (target: string | HTMLElement, options?: { duration?: number; offset?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: options?.duration ?? 1.2,
        offset: options?.offset ?? 0,
      });
    } else {
      if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      } else if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      }
    }
  };

  const getLenis = () => lenisRef.current;

  return (
    <LenisContext.Provider value={{ getLenis, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
