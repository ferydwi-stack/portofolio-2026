"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 180;

// Deterministic pseudo-random generation to avoid SSR/purity warnings
function createParticleData(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    // Seeded distribution across stage depth
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
    });
  }
  return data;
}

export function ParticleField() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => createParticleData(PARTICLE_COUNT), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Float upward like stage sparks / ember dust
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
      args={[undefined, undefined, PARTICLE_COUNT]}
      frustumCulled={false}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial
        color="#ff3344"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
