"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * StageEffects Component (§4.10 v4 Spec)
 * Library-based stage lights, atmosphere, and postprocessing glow:
 * - Drei Sparkles for atmospheric concert dust (stage-red, stage-violet, stage-cyan)
 * - Dynamic Spotlights with cycling stage hues (red/violet/cyan)
 * - Studio lights for chrome and hardware metallic reflections
 */
export function StageEffects() {
  const prefersReducedMotion = useReducedMotion();
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const spotLight2Ref = useRef<THREE.SpotLight>(null);

  // Strict Palette: stage-red (#e11d2e), stage-violet (#8b3ff2), stage-cyan (#17e0c9)
  // NO YELLOW/ORANGE
  const colors = [
    new THREE.Color("#e11d2e"),
    new THREE.Color("#8b3ff2"),
    new THREE.Color("#17e0c9"),
  ];

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime() * 0.4;

    if (spotLightRef.current) {
      const colIdx = Math.floor(t) % colors.length;
      const nextColIdx = (colIdx + 1) % colors.length;
      const alpha = (Math.sin(t * Math.PI) + 1) / 2;
      spotLightRef.current.color.lerpColors(colors[colIdx], colors[nextColIdx], alpha);
    }

    if (spotLight2Ref.current) {
      const colIdx = (Math.floor(t) + 1) % colors.length;
      const nextColIdx = (colIdx + 1) % colors.length;
      const alpha = (Math.cos(t * Math.PI) + 1) / 2;
      spotLight2Ref.current.color.lerpColors(colors[colIdx], colors[nextColIdx], alpha);
    }
  });

  return (
    <>
      {/* 1. Ambient & Directional Stage Lights */}
      <ambientLight intensity={0.65} color="#140f1f" />
      <directionalLight position={[5, 6, 4]} intensity={1.5} color="#f5f5f0" />
      <directionalLight position={[-4, -3, -2]} intensity={0.8} color="#8b3ff2" />

      {/* 2. Studio Reflection Point Lights for Chrome Pickups & Hardware */}
      <pointLight position={[3, 2, 4]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-3, 1, 3]} intensity={2.2} color="#8b3ff2" />
      <pointLight position={[0, 4, -2]} intensity={4.0} color="#e11d2e" />
      <pointLight position={[2, -3, 2]} intensity={2.5} color="#17e0c9" />

      {/* 3. Dynamic Cycling Spotlights (§4.10a) */}
      <spotLight
        ref={spotLightRef}
        position={[2.5, 6, 3.5]}
        angle={0.65}
        penumbra={0.7}
        intensity={4.5}
        distance={18}
        color="#e11d2e"
      />

      <spotLight
        ref={spotLight2Ref}
        position={[-3, 5, 2.5]}
        angle={0.7}
        penumbra={0.8}
        intensity={3.8}
        distance={16}
        color="#17e0c9"
      />

      {/* 4. Drei Atmosphere Particles / Sparkles (§4.10b) */}
      {!prefersReducedMotion && (
        <group position={[0, 0, 0]}>
          <Sparkles
            count={50}
            scale={[14, 12, 10]}
            size={3.5}
            speed={0.4}
            color="#e11d2e"
            opacity={0.75}
          />
          <Sparkles
            count={35}
            scale={[12, 10, 8]}
            size={3.0}
            speed={0.3}
            color="#8b3ff2"
            opacity={0.7}
          />
          <Sparkles
            count={30}
            scale={[12, 10, 8]}
            size={2.8}
            speed={0.35}
            color="#17e0c9"
            opacity={0.65}
          />
        </group>
      )}
    </>
  );
}
