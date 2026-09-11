"use client";

import { motion } from "framer-motion";

interface CameraLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * CameraLogo — Retro instant camera & aperture brand mark for FDR Photobooth
 */
export function CameraLogo({
  size = 36,
  className = "",
  glow = false,
}: CameraLogoProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: glow
            ? "drop-shadow(0 4px 12px rgba(232, 184, 75, 0.45))"
            : "drop-shadow(0 2px 5px rgba(26, 26, 26, 0.15))",
        }}
      >
        {/* Camera Outer Body (Rounded Rect) */}
        <rect
          x="3"
          y="9"
          width="38"
          height="31"
          rx="7"
          fill="#1A1A1A"
          stroke="#E8B84B"
          strokeWidth="2"
        />

        {/* Viewfinder Bump on Top */}
        <path
          d="M13 9V5C13 4 14 3 15 3H20C21 3 22 4 22 5V9H13Z"
          fill="#2A2A2A"
          stroke="#E8B84B"
          strokeWidth="1.5"
        />

        {/* Small Red Indicator Flash LED */}
        <circle cx="35" cy="15" r="2" fill="#D9483A" />

        {/* Outer Lens Ring */}
        <circle
          cx="22"
          cy="25"
          r="11"
          fill="#242424"
          stroke="#E8B84B"
          strokeWidth="2"
        />

        {/* Inner Lens Element */}
        <circle cx="22" cy="25" r="7.5" fill="#141414" />

        {/* Lens Reflection Highlight */}
        <path
          d="M18 20 C20 18.5 24 18.5 26 20"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* FDR Monogram in center */}
        <text
          x="22"
          y="26"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#E8B84B"
          className="font-mono font-bold select-none"
          style={{ fontSize: "6.5px", letterSpacing: "0.4px" }}
        >
          FDR
        </text>
      </svg>
    </motion.div>
  );
}
