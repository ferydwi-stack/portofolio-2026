"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StageLightsProps {
  interactive?: boolean;
}

export function StageLights({ interactive = false }: StageLightsProps) {
  const leftConeRef = useRef<THREE.Mesh>(null);
  const rightConeRef = useRef<THREE.Mesh>(null);
  const centerSpotRef = useRef<THREE.SpotLight>(null);
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!interactive || typeof window === "undefined") return;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to +1
      mouseTargetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTargetRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (prefersReducedMotion) return;

    // Color cycling through concert palette: violet -> cyan -> magenta -> amber -> red
    const PALETTE = ["#8b3ff2", "#17e0c9", "#ff2e88", "#ffb020", "#e11d2e"];
    
    // Left sweeping beam
    if (leftConeRef.current) {
      leftConeRef.current.rotation.z = 0.45 + Math.sin(t * 0.7) * 0.12;
      const leftMat = leftConeRef.current.material as THREE.MeshBasicMaterial;
      const colorIdx = (t * 0.2) % PALETTE.length;
      const c1 = new THREE.Color(PALETTE[Math.floor(colorIdx)]);
      const c2 = new THREE.Color(PALETTE[(Math.floor(colorIdx) + 1) % PALETTE.length]);
      leftMat.color.lerpColors(c1, c2, colorIdx % 1);

      if (interactive) {
        leftConeRef.current.rotation.y = mouseTargetRef.current.x * 0.4;
      }
    }

    // Right beam color cycling with time offset
    if (rightConeRef.current) {
      rightConeRef.current.rotation.z = -0.45 + Math.cos(t * 0.6) * 0.14;
      const rightMat = rightConeRef.current.material as THREE.MeshBasicMaterial;
      const rightIdx = (t * 0.2 + 2.5) % PALETTE.length;
      const rc1 = new THREE.Color(PALETTE[Math.floor(rightIdx)]);
      const rc2 = new THREE.Color(PALETTE[(Math.floor(rightIdx) + 1) % PALETTE.length]);
      rightMat.color.lerpColors(rc1, rc2, rightIdx % 1);

      if (interactive) {
        rightConeRef.current.rotation.x = mouseTargetRef.current.y * 0.3;
      }
    }

    // Center spotlight oscillation
    if (centerSpotRef.current) {
      centerSpotRef.current.intensity = 3 + Math.sin(t * 2.5) * 0.8;
      if (interactive) {
        centerSpotRef.current.position.x = mouseTargetRef.current.x * 4;
      }
    }
  });

  return (
    <group position={[0, 4.5, -2]}>
      {/* Center White/Amber Main Stage Spotlight */}
      <spotLight
        ref={centerSpotRef}
        position={[0, 4, 3]}
        angle={0.65}
        penumbra={0.8}
        intensity={3.5}
        color="#fef3c7"
        distance={25}
      />

      {/* Red Flood Rim Light */}
      <pointLight position={[3, 2, 0]} intensity={2.8} color="#e11d2e" distance={15} />
      <pointLight position={[-3, 2, 0]} intensity={2.2} color="#9333ea" distance={15} />

      {/* Left Volumetric Cone (Additive Blending) */}
      <mesh
        ref={leftConeRef}
        position={[-3.5, 0, 0]}
        rotation={[0, 0, 0.45]}
      >
        <coneGeometry args={[1.6, 12, 16, 1, true]} />
        <meshBasicMaterial
          color="#e11d2e"
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Right Volumetric Cone (Cyan/Purple contrast accent) */}
      <mesh
        ref={rightConeRef}
        position={[3.5, 0, 0]}
        rotation={[0, 0, -0.45]}
      >
        <coneGeometry args={[1.5, 12, 16, 1, true]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
