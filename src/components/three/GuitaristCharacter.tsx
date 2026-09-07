"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GuitaristProps {
  scrollProgress?: number;
  useModel?: boolean;
}

function SilhouetteMesh({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture("/images/guitarist-silhouette.svg");
  const prefersReducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    const t = state.clock.getElapsedTime();

    // 1. Idle breathing (whole figure scale oscillation ~1.0 ± 0.01)
    const breath = 1 + Math.sin(t * 1.8) * 0.012;
    groupRef.current.scale.set(1, breath, 1);

    // 2. Subtle rhythmic headbang nod (~0.03 - 0.05 rad)
    const headbang = Math.sin(t * 2.8) * 0.04;
    groupRef.current.rotation.x = headbang;

    // 3. Subtle rock posture sway (tilting slightly with stage inertia)
    groupRef.current.rotation.z = Math.sin(t * 1.4) * 0.015 - scrollProgress * 0.08;

    // 4. Strum recoil on scroll change
    const strumRecoil = Math.sin(scrollProgress * Math.PI * 4) * 0.05;
    groupRef.current.rotation.y = -0.05 + strumRecoil;
  });

  return (
    <group ref={groupRef} position={[0.6, 0.0, 0]}>
      {/* Dynamic Crimson Concert Backlight Plane Glow */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[3.0, 4.2]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0.4}
          color="#ff1122"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Main Stylized Emo Guitarist Silhouette Artwork Plane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.8, 4.0]} />
        <meshBasicMaterial
          map={texture}
          transparent
          alphaTest={0.01}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export function GuitaristCharacter({ scrollProgress = 0 }: GuitaristProps) {
  return <SilhouetteMesh scrollProgress={scrollProgress} />;
}
