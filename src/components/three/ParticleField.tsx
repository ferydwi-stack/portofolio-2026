"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePerformanceTier } from "@/store/usePerformanceTier";

const CONCERT_PALETTE = [
  "#e11d2e", // stage-red
  "#ff6b35", // amp-glow
  "#ffb020", // stage-amber
  "#ff2e88", // stage-magenta
  "#8b3ff2", // stage-violet
  "#17e0c9", // stage-cyan
];

function createParticleData(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const seed = (i * 9301 + 49297) % 233280;
    const rnd1 = seed / 233280;
    const rnd2 = ((seed * 9301 + 49297) % 233280) / 233280;
    const rnd3 = (((seed + 11) * 9301 + 49297) % 233280) / 233280;

    data.push({
      x: (rnd1 - 0.5) * 16,
      y: (rnd2 - 0.5) * 12,
      z: (rnd3 - 0.5) * 10 - 2,
      speedY: 0.2 + rnd1 * 0.4,
      speedX: (rnd2 - 0.5) * 0.15,
      phase: rnd3 * Math.PI * 2,
      scale: 0.02 + rnd1 * 0.035,
      colorIndex: Math.floor(rnd2 * CONCERT_PALETTE.length) % CONCERT_PALETTE.length,
    });
  }
  return data;
}

export function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tier = usePerformanceTier((s) => s.tier);

  const count = tier === "low" ? 60 : tier === "mid" ? 150 : 300;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => createParticleData(count), [count]);

  // Set per-instance colors from multi-color stage palette
  useEffect(() => {
    if (!meshRef.current) return;
    const tempColor = new THREE.Color();

    particles.forEach((p, i) => {
      tempColor.set(CONCERT_PALETTE[p.colorIndex]);
      meshRef.current?.setColorAt(i, tempColor);
    });

    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      const currentY = ((p.y + t * p.speedY + 6) % 12) - 6;
      const currentX = p.x + Math.sin(t * 0.8 + p.phase) * 0.3;
      const currentZ = p.z + Math.cos(t * 0.5 + p.phase) * 0.2;

      dummy.position.set(currentX, currentY, currentZ);
      dummy.scale.setScalar(p.scale * (1 + 0.3 * Math.sin(t * 2 + p.phase)));
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
      aria-hidden="true"
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
