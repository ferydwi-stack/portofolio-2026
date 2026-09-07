"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function StageFollowSpotlight() {
  const [hasMoved, setHasMoved] = useState(false);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
  const mouseX = useSpring(-500, springConfig);
  const mouseY = useSpring(-500, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHasMoved(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!hasMoved) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Primary Warm Amber Spotlight Cone */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.07)_0%,rgba(255,42,59,0.04)_40%,transparent_70%)] blur-2xl transition-opacity duration-300"
      />

      {/* Secondary Crimson Stage Laser / Rim Highlight */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,42,59,0.12)_0%,transparent_60%)] blur-xl"
      />
    </div>
  );
}
