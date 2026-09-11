"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";
import { COLORS } from "@/styles/photobooth-theme";

interface ConfettiFlashProps {
  /** DOM element to spawn confetti from. If null, spawns from center. */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** Max number of particles (reduced on mobile) */
  maxParticles?: number;
}

const CONFETTI_COLORS = [
  COLORS.flashYellow,
  COLORS.dustyPink,
  COLORS.mint,
  COLORS.flashRed,
  COLORS.flashYellowLight,
];

/**
 * ConfettiFlash — Spawns a burst of small colored squares that fall with
 * gravity and fade out when triggered. Uses CSS/GSAP instead of Three.js
 * for lightweight rendering.
 */
export function useConfettiFlash({ triggerRef, maxParticles }: ConfettiFlashProps = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fire = useCallback(() => {
    // Determine particle count (reduced on mobile)
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = maxParticles ?? (isMobile ? 18 : 50);

    // Get spawn origin
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight / 2;

    if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    // Ensure container exists
    if (!containerRef.current) {
      const div = document.createElement("div");
      div.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
      div.setAttribute("aria-hidden", "true");
      document.body.appendChild(div);
      containerRef.current = div;
    }

    const container = containerRef.current;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = 6 + Math.random() * 8;
      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 1px;
        left: ${originX}px;
        top: ${originY}px;
        pointer-events: none;
      `;

      container.appendChild(particle);

      const angle = (Math.random() * Math.PI * 2);
      const velocity = 80 + Math.random() * 200;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity - 100; // upward bias

      gsap.to(particle, {
        x: dx,
        y: dy + 300, // gravity pull
        rotation: Math.random() * 720 - 360,
        opacity: 0,
        duration: 1 + Math.random() * 0.5,
        ease: "power2.out",
        onComplete: () => {
          particle.remove();
        },
      });
    }

    // Cleanup container after all particles settle
    setTimeout(() => {
      if (container && container.childElementCount === 0) {
        container.remove();
        containerRef.current = null;
      }
    }, 2500);
  }, [triggerRef, maxParticles]);

  return { fire };
}
