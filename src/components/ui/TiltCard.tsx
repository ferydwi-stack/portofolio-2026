"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { playHoverTick } from "@/lib/sound/cyberSound";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltMaxAngle?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  onClick,
  tiltMaxAngle = 10,
  glareOpacity = 0.16,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { stiffness: 350, damping: 25 };
  const rotateX = useSpring(useTransform(y, [0, 1], [tiltMaxAngle, -tiltMaxAngle]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltMaxAngle, tiltMaxAngle]), springConfig);

  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);

  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx} ${gy}, rgba(79, 209, 197, ${glareOpacity}), transparent 70%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;
    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* 3D Content Container */}
      <div style={{ transform: isHovered ? "translateZ(18px)" : "translateZ(0px)", transition: "transform 0.25s ease-out" }}>
        {children}
      </div>

      {/* Dynamic Specular Holographic Glare */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden -z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.2s ease-out",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: glareBackground,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
