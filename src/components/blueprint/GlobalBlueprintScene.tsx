"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/store/useScrollStore";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function generateParticles(count: number) {
  const data = [];
  for (let i = 0; i < count; i++) {
    const u = pseudoRandom(i * 3 + 1);
    const v = pseudoRandom(i * 3 + 2);
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(pseudoRandom(i * 3 + 3)) * 18 + 2;
    const sinPhi = Math.sin(phi);

    data.push({
      x: r * sinPhi * Math.cos(theta),
      y: (pseudoRandom(i * 5 + 4) - 0.5) * 35,
      z: r * sinPhi * Math.sin(theta) - 5,
      speedY: (pseudoRandom(i * 7 + 1) - 0.5) * 0.3,
      speedRot: (pseudoRandom(i * 11 + 2) - 0.5) * 0.8,
      scale: pseudoRandom(i * 13 + 3) * 0.08 + 0.03,
      isHex: pseudoRandom(i * 17 + 5) > 0.6,
    });
  }
  return data;
}

const STATIC_PARTICLES = generateParticles(140);

/**
 * Floating 3D Blueprint Fragment Particles
 * Generates an interconnected network of cyber particles and geometry shards
 */
function ParticleNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    STATIC_PARTICLES.forEach((p, i) => {
      const y = ((p.y + t * p.speedY + 20) % 40) - 20;
      dummy.position.set(p.x, y, p.z);
      dummy.rotation.x = t * p.speedRot;
      dummy.rotation.y = t * p.speedRot * 0.7;
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 1.5 + i) * 0.2));
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, STATIC_PARTICLES.length]}
      frustumCulled={false}
    >
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#4FD1C5"
        wireframe
        transparent
        opacity={0.35}
      />
    </instancedMesh>
  );
}

/**
 * Floating 3D Cyber Shards (Floating Wireframe Cubes & Tetrahedrons)
 */
function FloatingShards() {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => [
    { pos: [-9, 12, -8] as [number, number, number], scale: 1.4, speed: 0.25, type: "box" },
    { pos: [11, 4, -12] as [number, number, number], scale: 1.8, speed: -0.2, type: "octa" },
    { pos: [-12, -8, -10] as [number, number, number], scale: 1.2, speed: 0.3, type: "tetra" },
    { pos: [10, -18, -14] as [number, number, number], scale: 2.2, speed: -0.15, type: "octa" },
    { pos: [-8, -26, -9] as [number, number, number], scale: 1.6, speed: 0.22, type: "box" },
    { pos: [9, -34, -11] as [number, number, number], scale: 1.5, speed: -0.18, type: "tetra" },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const s = shards[i];
      child.rotation.x = t * s.speed;
      child.rotation.y = t * s.speed * 1.3;
      child.position.y += Math.sin(t * 0.8 + i) * 0.003;
    });
  });

  return (
    <group ref={groupRef}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          {s.type === "box" && <boxGeometry args={[1, 1, 1]} />}
          {s.type === "octa" && <octahedronGeometry args={[1, 0]} />}
          {s.type === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
          <meshBasicMaterial
            color={i % 2 === 0 ? "#4FD1C5" : "#38BDF8"}
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 3D Grid Wave Surface in Depth
 */
function GridWave() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.getElapsedTime();
    gridRef.current.position.z = ((t * 0.8) % 4) - 8;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, "#4FD1C5", "#1E293B"]}
      position={[0, -12, -8]}
      rotation={[Math.PI / 8, 0, 0]}
    />
  );
}

/**
 * Scene Controller that synchronizes 3D Camera with Lenis Scroll & Mouse Parallax
 */
function SceneController() {
  const prefersReducedMotion = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 10));

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -2;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("mousemove", handlePointerMove);
  }, []);

  useFrame((state) => {
    if (prefersReducedMotion) return;

    // Get continuous scroll progress (0 to 1) from store
    const progress = useScrollStore.getState().scrollProgress || 0;

    // Calculate dynamic camera track down the Y/Z axis based on scroll
    const targetY = -progress * 28;
    const targetZ = 10 - Math.sin(progress * Math.PI) * 2;
    const targetX = Math.sin(progress * Math.PI * 2) * 1.5 + mouse.current.x * 0.8;

    cameraTarget.current.x = THREE.MathUtils.lerp(cameraTarget.current.x, targetX, 0.05);
    cameraTarget.current.y = THREE.MathUtils.lerp(cameraTarget.current.y, targetY + mouse.current.y * 0.5, 0.05);
    cameraTarget.current.z = THREE.MathUtils.lerp(cameraTarget.current.z, targetZ, 0.05);

    state.camera.position.copy(cameraTarget.current);
    state.camera.lookAt(
      targetX * 0.2,
      targetY - 2,
      cameraTarget.current.z - 10
    );
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} color="#4FD1C5" intensity={0.8} distance={30} />
      <pointLight position={[-10, -10, 5]} color="#38BDF8" intensity={0.5} distance={30} />
      <ParticleNodes />
      <FloatingShards />
      <GridWave />
    </>
  );
}

export function GlobalBlueprintScene() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <SceneController />
      </Canvas>
    </div>
  );
}
