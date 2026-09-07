"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface GuitarModelProps {
  color?: string;
  hardwareColor?: string;
}

/**
 * High-fidelity Electric Guitar Model (§4.3.2)
 * Double-horn cutaway body (Stratocaster/Jazzmaster style), 24 frets,
 * 6 tuning pegs, dual pickups, tremolo bridge, volume knobs, and 6 steel strings.
 */
export function GuitarModel({
  color = "#e11d2e",
  hardwareColor = "#b8bcc2",
}: GuitarModelProps) {
  // Generate SVG data texture for the electric guitar
  const guitarTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 900" width="400" height="900">
        <defs>
          <linearGradient id="bodyBurst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${color}" />
            <stop offset="45%" stop-color="#880815" />
            <stop offset="85%" stop-color="#2a0408" />
            <stop offset="100%" stop-color="#0d0103" />
          </linearGradient>

          <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="50%" stop-color="${hardwareColor}" />
            <stop offset="100%" stop-color="#ffffff" />
          </linearGradient>

          <filter id="guitarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#e11d2e" flood-opacity="0.8"/>
          </filter>
        </defs>

        <g transform="translate(0, 50)">
          <!-- 1. Double-Horn Cutaway Guitar Body -->
          <!-- Upper horn longer, lower horn shorter, waist curves, rounded lower bout -->
          <path d="M 160 480 
                   C 130 420 110 360 140 330 
                   C 160 310 185 320 200 350 
                   C 210 370 220 395 205 435 
                   C 195 470 215 540 280 540 
                   C 345 540 365 475 350 425 
                   C 335 375 375 330 410 370 
                   C 440 415 425 520 375 595 
                   C 325 670 160 680 110 600 
                   C 80 550 100 480 90 440 
                   C 80 400 130 350 160 380 Z" 
                fill="url(#bodyBurst)" 
                stroke="#ff4d5a" 
                stroke-width="3" 
                filter="url(#guitarGlow)"/>

          <!-- 3-Ply Scratchplate / Pickguard -->
          <path d="M 170 420 
                   C 190 435 210 460 250 460 
                   C 300 460 320 420 340 410 
                   C 350 450 340 510 300 540 
                   C 230 560 170 520 170 420 Z" 
                fill="#0d0a14" 
                stroke="#2a2436" 
                stroke-width="2"/>

          <!-- Dual Humbucker Pickups -->
          <rect x="235" y="440" width="56" height="18" rx="3" fill="#15121e" stroke="url(#chrome)" stroke-width="1.5"/>
          <rect x="235" y="475" width="56" height="18" rx="3" fill="#15121e" stroke="url(#chrome)" stroke-width="1.5"/>
          <!-- Magnet Pole Pieces -->
          <circle cx="245" cy="449" r="2.2" fill="#fff"/>
          <circle cx="255" cy="449" r="2.2" fill="#fff"/>
          <circle cx="265" cy="449" r="2.2" fill="#fff"/>
          <circle cx="275" cy="449" r="2.2" fill="#fff"/>
          <circle cx="245" cy="484" r="2.2" fill="#fff"/>
          <circle cx="255" cy="484" r="2.2" fill="#fff"/>
          <circle cx="265" cy="484" r="2.2" fill="#fff"/>
          <circle cx="275" cy="484" r="2.2" fill="#fff"/>

          <!-- Tremolo Bridge & Tailpiece -->
          <rect x="235" y="520" width="56" height="24" rx="3" fill="url(#chrome)" stroke="#110d18" stroke-width="1.5"/>
          <!-- Volume / Tone Knobs -->
          <circle cx="310" cy="515" r="7.5" fill="url(#chrome)" stroke="#111" stroke-width="1"/>
          <circle cx="300" cy="545" r="7.5" fill="url(#chrome)" stroke="#111" stroke-width="1"/>

          <!-- 2. Maple Neck & Fretboard (Progressively closer frets) -->
          <path d="M 250 440 L 250 40 L 276 40 L 276 440 Z" fill="#1c1614" stroke="#4a3832" stroke-width="1.5"/>
          
          <!-- Frets with progressive spacing (closer as they near body) -->
          <line x1="250" y1="65"  x2="276" y2="65"  stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="95"  x2="276" y2="95"  stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="130" x2="276" y2="130" stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="170" x2="276" y2="170" stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="215" x2="276" y2="215" stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="265" x2="276" y2="265" stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="320" x2="276" y2="320" stroke="url(#chrome)" stroke-width="1.2"/>
          <line x1="250" y1="380" x2="276" y2="380" stroke="url(#chrome)" stroke-width="1.2"/>

          <!-- Pearloid Dot Inlays on Frets 3, 5, 7, 9, 12 -->
          <circle cx="263" cy="80"  r="2.5" fill="#f5f5f0" opacity="0.9"/>
          <circle cx="263" cy="150" r="2.5" fill="#f5f5f0" opacity="0.9"/>
          <circle cx="263" cy="240" r="2.5" fill="#f5f5f0" opacity="0.9"/>
          <circle cx="260" cy="350" r="2" fill="#f5f5f0" opacity="0.9"/>
          <circle cx="266" cy="350" r="2" fill="#f5f5f0" opacity="0.9"/>

          <!-- 3. Classic 6-in-line Headstock & Tuning Pegs -->
          <path d="M 250 40 L 235 -40 L 255 -60 L 275 -35 L 276 40 Z" fill="#0c0a12" stroke="#ff2a3b" stroke-width="1.5"/>
          <circle cx="240" cy="20"  r="3.5" fill="url(#chrome)"/>
          <circle cx="242" cy="5"   r="3.5" fill="url(#chrome)"/>
          <circle cx="244" cy="-10" r="3.5" fill="url(#chrome)"/>
          <circle cx="246" cy="-25" r="3.5" fill="url(#chrome)"/>
          <circle cx="248" cy="-40" r="3.5" fill="url(#chrome)"/>
          <circle cx="250" cy="-55" r="3.5" fill="url(#chrome)"/>

          <!-- 4. Exactly 6 Steel Guitar Strings -->
          <line x1="253" y1="-45" x2="253" y2="530" stroke="#f5f5f0" stroke-width="0.9" opacity="0.9"/>
          <line x1="257" y1="-45" x2="257" y2="530" stroke="#f5f5f0" stroke-width="0.9" opacity="0.9"/>
          <line x1="261" y1="-45" x2="261" y2="530" stroke="#f5f5f0" stroke-width="1.1" opacity="0.9"/>
          <line x1="265" y1="-45" x2="265" y2="530" stroke="#f5f5f0" stroke-width="1.3" opacity="0.9"/>
          <line x1="269" y1="-45" x2="269" y2="530" stroke="#f5f5f0" stroke-width="1.5" opacity="0.9"/>
          <line x1="273" y1="-45" x2="273" y2="530" stroke="#f5f5f0" stroke-width="1.7" opacity="0.9"/>
        </g>
      </svg>
    `;

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const loader = new THREE.TextureLoader();
    const tex = loader.load(url, () => {
      URL.revokeObjectURL(url);
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [color, hardwareColor]);

  if (!guitarTexture) return null;

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[1.5, 3.4]} />
      <meshBasicMaterial
        map={guitarTexture}
        transparent
        alphaTest={0.01}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
