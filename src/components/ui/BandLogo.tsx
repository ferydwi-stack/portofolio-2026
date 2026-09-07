"use client";

import { motion } from "framer-motion";

interface BandLogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
  animated?: boolean;
}

export function BandLogo({
  size = 36,
  className = "",
  glow = true,
  animated = false,
}: BandLogoProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: glow
            ? "drop-shadow(0 0 8px rgba(225, 29, 46, 0.65)) drop-shadow(0 0 16px rgba(255, 46, 136, 0.35))"
            : undefined,
        }}
      >
        <defs>
          <linearGradient id="pickGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e11d2e" />
            <stop offset="50%" stop-color="#990b17" />
            <stop offset="100%" stop-color="#0a080f" />
          </linearGradient>

          <linearGradient id="neonEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff3344" />
            <stop offset="50%" stop-color="#ff2e88" />
            <stop offset="100%" stop-color="#17e0c9" />
          </linearGradient>
        </defs>

        {/* Outer Guitar Pick Shape Contour */}
        <motion.path
          d="M 20 38 C 9 28 3 18 3 9 C 3 4 8 2 20 2 C 32 2 37 4 37 9 C 37 18 31 28 20 38 Z"
          fill="url(#pickGrad)"
          stroke="url(#neonEdgeGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animated ? { pathLength: 0, opacity: 0 } : false}
          animate={animated ? { pathLength: 1, opacity: 1 } : false}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        {/* 3 Horizontal Vibrating Guitar Strings Across Pick */}
        <line x1="8" y1="13" x2="32" y2="13" stroke="#b8bcc2" strokeWidth="0.8" opacity="0.6" />
        <line x1="11" y1="20" x2="29" y2="20" stroke="#f5f5f0" strokeWidth="0.9" opacity="0.75" />
        <line x1="14" y1="27" x2="26" y2="27" stroke="#b8bcc2" strokeWidth="0.8" opacity="0.6" />

        {/* Monogram Initial "FR" (Fery Ramadhi) */}
        <text
          x="20"
          y="23.5"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#f5f5f0"
          className="font-[family-name:var(--font-bebas)] font-black select-none"
          style={{
            fontSize: "15px",
            letterSpacing: "0.5px",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.9))",
          }}
        >
          FR
        </text>

        {/* Subtle Lightning Notch Accent */}
        <polygon points="19.5,4 21,7.5 19,8 20.5,11.5 18,7.5 20,7" fill="#ffb020" opacity="0.9" />
      </svg>
    </motion.div>
  );
}
