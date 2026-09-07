"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Sparkles, SpotLight, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * StageEffects Component (§4.10 v4 Spec)
 * Library-based stage lights, atmosphere, and postprocessing glow:
 * - Drei Sparkles for atmospheric concert dust
 * - Drei SpotLights with cycling red/violet/cyan stage hues
 * - Drei Environment for realistic metal/chrome reflections
 * - Postprocessing Bloom for glowing guitar strings and highlights
 */
export function StageEffects() {
  const prefersReducedMotion = useReducedMotion();
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const spotLight2Ref = useRef<THREE.SpotLight>(null);

  // Palette: stage-red (#e11d2e), stage-violet (#8b3ff2), stage-cyan (#17e0c9)
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
      <ambientLight intensity={0.45} color="#140f1f" />
      <directionalLight position={[5, 6, 4]} intensity={1.2} color="#f5f5f0" castShadow />
      <directionalLight position={[-4, -3, -2]} intensity={0.5} color="#8b3ff2" />

      {/* 2. Dynamic Drei SpotLights (§4.10a) */}
      <SpotLight
        ref={spotLightRef}
        position={[2, 6, 3]}
        target-position={[1.2, 0, 0]}
        angle={0.65}
        penumbra={0.7}
        intensity={2.8}
        distance={15}
        color="#e11d2e"
        castShadow
      />

      <SpotLight
        ref={spotLight2Ref}
        position={[-3, 5, 2]}
        target-position={[1.2, 0, 0]}
        angle={0.7}
        penumbra={0.8}
        intensity={2.2}
        distance={14}
        color="#17e0c9"
      />

      {/* 3. Drei Atmosphere Particles / Sparkles (§4.10b) */}
      {!prefersReducedMotion && (
        <>
          <Sparkles
            count={45}
            scale={[12, 10, 8]}
            size={3.2}
            speed={0.4}
            color="#e11d2e"
            opacity={0.65}
          />
          <Sparkles
            count={35}
            scale={[10, 8, 6]}
            size={2.8}
            speed={0.3}
            color="#8b3ff2"
            opacity={0.6}
          />
          <Sparkles
            count={25}
            scale={[10, 8, 6]}
            size={2.5}
            speed={0.35}
            color="#17e0c9"
            opacity={0.55}
          />
        </>
      )}

      {/* 4. Drei Studio Environment for Chrome & Metallic Reflections */}
      <Environment preset="night" />

      {/* 5. Postprocessing Bloom Effect (§4.10) */}
      {!prefersReducedMotion && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.35}
            luminanceSmoothing={0.85}
            intensity={1.1}
            radius={0.6}
          />
        </EffectComposer>
      )}
    </>
  );
}
