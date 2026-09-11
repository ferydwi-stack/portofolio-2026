"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Simplified vintage camera model using primitive geometry */
function CameraModel() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseHandler = useRef<((e: MouseEvent) => void) | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * -0.3;
    };
    mouseHandler.current = handler;
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouseTarget.current.x - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (mouseTarget.current.y - groupRef.current.rotation.x) * 0.05;
  });

  const bodyMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2D2D2D", roughness: 0.6, metalness: 0.3 }), []);
  const lensMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#1A1A1A", roughness: 0.3, metalness: 0.7 }), []);
  const chromeMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#C0C0C0", roughness: 0.15, metalness: 0.9 }), []);
  const glassMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#4488AA", roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.6 }), []);
  const flashMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#E8B84B", roughness: 0.4, metalness: 0.5, emissive: "#E8B84B", emissiveIntensity: 0.15 }), []);
  const leatherMat = useMemo(() => new THREE.MeshStandardMaterial({ color: "#4A3728", roughness: 0.85, metalness: 0.05 }), []);

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.1, -0.2, 0]}>
      {/* Camera body */}
      <mesh material={bodyMat} position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 1.6, 1.2]} />
      </mesh>

      {/* Leather grip wrap */}
      <mesh material={leatherMat} position={[0, 0, 0.61]}>
        <boxGeometry args={[2.42, 1.62, 0.02]} />
      </mesh>

      {/* Top viewfinder bump */}
      <mesh material={bodyMat} position={[0.3, 1.0, 0]}>
        <boxGeometry args={[0.8, 0.5, 0.6]} />
      </mesh>

      {/* Viewfinder glass */}
      <mesh material={chromeMat} position={[0.3, 1.0, 0.32]}>
        <boxGeometry args={[0.5, 0.3, 0.05]} />
      </mesh>

      {/* Lens barrel outer */}
      <mesh material={lensMat} position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.58, 0.5, 32]} />
      </mesh>

      {/* Lens barrel inner */}
      <mesh material={lensMat} position={[0, 0, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.5, 0.3, 32]} />
      </mesh>

      {/* Lens chrome ring */}
      <mesh material={chromeMat} position={[0, 0, 1.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.06, 32]} />
      </mesh>

      {/* Lens glass */}
      <mesh material={glassMat} position={[0, 0, 1.34]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.02, 32]} />
      </mesh>

      {/* Focus ring grooves */}
      {[0, 0.12, 0.24].map((offset, i) => (
        <mesh key={i} material={chromeMat} position={[0, 0, 0.75 + offset]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.56, 0.008, 4, 32]} />
        </mesh>
      ))}

      {/* Flash unit */}
      <mesh material={flashMat} position={[-0.85, 0.7, 0.3]}>
        <boxGeometry args={[0.5, 0.4, 0.3]} />
      </mesh>

      {/* Flash reflector dish */}
      <mesh material={chromeMat} position={[-0.85, 0.7, 0.48]}>
        <circleGeometry args={[0.16, 24]} />
      </mesh>

      {/* Shutter button */}
      <mesh material={chromeMat} position={[0.8, 0.88, 0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
      </mesh>

      {/* Shutter button rim */}
      <mesh material={bodyMat} position={[0.8, 0.83, 0.2]}>
        <cylinderGeometry args={[0.14, 0.14, 0.03, 16]} />
      </mesh>

      {/* Film advance lever */}
      <mesh material={chromeMat} position={[-0.8, 0.88, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.05, 16]} />
      </mesh>

      {/* Hot shoe mount */}
      <mesh material={chromeMat} position={[0.3, 1.28, 0]}>
        <boxGeometry args={[0.4, 0.06, 0.3]} />
      </mesh>

      {/* Film door line (back) */}
      <mesh material={chromeMat} position={[0.6, 0, -0.61]}>
        <boxGeometry args={[0.01, 1.4, 0.01]} />
      </mesh>

      {/* Strap lugs */}
      <mesh material={chromeMat} position={[1.22, 0.6, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
      </mesh>
      <mesh material={chromeMat} position={[-1.22, 0.6, 0]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
      </mesh>
    </group>
  );
}

function CameraPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#EDE7D9]/50 rounded-2xl">
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

import { Suspense } from "react";

export function VintageCameraScene({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full min-h-[300px] ${className}`}>
      <Suspense fallback={<CameraPlaceholder />}>
        <Canvas
          camera={{ position: [0, 0.5, 5], fov: 35 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.6} color="#FFF5E6" />
          <pointLight position={[3, 3, 4]} intensity={1.2} color="#FFEEDD" distance={15} />
          <pointLight position={[-3, 1, 2]} intensity={0.4} color="#E8C4C4" distance={12} />
          <pointLight position={[0, -2, -3]} intensity={0.3} color="#B8D8D0" distance={10} />
          <CameraModel />
        </Canvas>
      </Suspense>
    </div>
  );
}
