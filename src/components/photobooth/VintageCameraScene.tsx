"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Simplified vintage camera model using primitive geometry */
function CameraModel() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });

  // Track mouse for parallax
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * -0.3;
    }, { passive: true });
  }

  useFrame(() => {
    if (!groupRef.current) return;
    // Smooth lerp toward mouse position
    groupRef.current.rotation.y += (mouseTarget.current.x - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouseTarget.current.y - groupRef.current.rotation.x) * 0.05;
  });

  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#2D2D2D",
    roughness: 0.6,
    metalness: 0.3,
  }), []);

  const lensMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#1A1A1A",
    roughness: 0.3,
    metalness: 0.7,
  }), []);

  const chromeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#C0C0C0",
    roughness: 0.15,
    metalness: 0.9,
  }), []);

  const lensGlassMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#4488AA",
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.6,
  }), []);

  const flashMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: "#E8B84B",
    roughness: 0.4,
    metalness: 0.5,
    emissive: "#E8B84B",
    emissiveIntensity: 0.15,
  }), []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.1, -0.2, 0]}>
      {/* Camera body */}
      <mesh material={bodyMaterial} position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.6, 1.2]} />
      </mesh>

      {/* Top viewfinder bump */}
      <mesh material={bodyMaterial} position={[0.3, 1.0, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
      </mesh>

      {/* Viewfinder glass */}
      <mesh material={chromeMaterial} position={[0.3, 1.0, 0.32]}>
        <boxGeometry args={[0.5, 0.3, 0.05]} />
      </mesh>

      {/* Lens barrel */}
      <mesh material={lensMaterial} position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.55, 0.6, 32]} />
      </mesh>

      {/* Lens outer ring (chrome) */}
      <mesh material={chromeMaterial} position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.08, 32]} />
      </mesh>

      {/* Lens glass */}
      <mesh material={lensGlassMaterial} position={[0, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.03, 32]} />
      </mesh>

      {/* Flash unit (top-right) */}
      <mesh material={flashMaterial} position={[-0.85, 0.7, 0.3]}>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
      </mesh>

      {/* Flash reflector */}
      <mesh material={chromeMaterial} position={[-0.85, 0.7, 0.48]}>
        <circleGeometry args={[0.15, 16]} />
      </mesh>

      {/* Shutter button */}
      <mesh material={chromeMaterial} position={[0.8, 0.85, 0.2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.08, 16]} />
      </mesh>

      {/* Film advance lever */}
      <mesh material={chromeMaterial} position={[-0.8, 0.85, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.06, 16]} />
      </mesh>

      {/* Grip texture (side) */}
      <mesh material={bodyMaterial} position={[1.22, -0.1, 0]}>
        <boxGeometry args={[0.06, 1.0, 0.9]} />
      </mesh>
    </group>
  );
}

/** Loading skeleton */
function CameraPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#EDE7D9] rounded-xl">
      <div className="flex flex-col items-center gap-3 text-[#6B6560]">
        <svg className="w-16 h-16 opacity-30 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="2" />
          <rect x="15" y="3" width="4" height="3" rx="1" />
        </svg>
        <span className="text-xs font-mono opacity-40">Memuat kamera 3D...</span>
      </div>
    </div>
  );
}

/**
 * VintageCameraScene — Three.js scene with a simplified vintage camera model
 * built from primitive geometry. Mouse parallax with smooth damping.
 * Dynamically imported with { ssr: false }.
 */
export function VintageCameraScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Suspense fallback={<CameraPlaceholder />}>
        <Canvas
          camera={{ position: [0, 0.5, 5], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          {/* Ambient light — soft fill */}
          <ambientLight intensity={0.6} color="#FFF5E6" />

          {/* Warm key light — studio photo feel */}
          <pointLight position={[3, 3, 4]} intensity={1.2} color="#FFEEDD" distance={15} />

          {/* Subtle fill from other side */}
          <pointLight position={[-3, 1, 2]} intensity={0.4} color="#E8C4C4" distance={12} />

          {/* Rim light */}
          <pointLight position={[0, -2, -3]} intensity={0.3} color="#B8D8D0" distance={10} />

          <CameraModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
