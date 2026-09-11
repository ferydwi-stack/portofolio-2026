"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function TechCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest("button") ||
        target?.closest("a") ||
        target?.closest("[role='button']") ||
        target?.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Outer Reticle Crosshair */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-8 h-8 rounded-full border border-cyan-400/40 flex items-center justify-center pointer-events-none"
      >
        {/* Crosshair Ticks */}
        <div className="absolute top-0 w-1 h-0.5 bg-cyan-400" />
        <div className="absolute bottom-0 w-1 h-0.5 bg-cyan-400" />
        <div className="absolute left-0 w-0.5 h-1 bg-cyan-400" />
        <div className="absolute right-0 w-0.5 h-1 bg-cyan-400" />
      </motion.div>

      {/* Central Laser Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        className="w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none shadow-[0_0_8px_#4FD1C5]"
      />

      {/* Dynamic Coordinate Tag */}
      {isHovering && (
        <motion.div
          style={{
            x: smoothX,
            y: smoothY,
            translateX: "18px",
            translateY: "18px",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="font-mono text-[9px] text-cyan-300 bg-slate-950/90 border border-cyan-500/30 px-1.5 py-0.5 rounded shadow-lg pointer-events-none tracking-tight"
        >
          LOC [{coords.x},{coords.y}]
        </motion.div>
      )}
    </div>
  );
}
