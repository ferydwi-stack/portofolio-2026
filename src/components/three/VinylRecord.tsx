"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function SpinningDisc({ albumIndex }: { albumIndex: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!meshRef.current || prefersReducedMotion) return;
    meshRef.current.rotation.z -= delta * 1.5;
  });

  return (
    <group ref={meshRef} rotation={[0.4, 0.2, 0]}>
      {/* Vinyl Outer Groove Disc */}
      <mesh>
        <cylinderGeometry args={[1.8, 1.8, 0.04, 32]} />
        <meshStandardMaterial
          color="#08070a"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Grooves Rings (Subtle concentric rings) */}
      {[1.5, 1.25, 1.0].map((radius, idx) => (
        <mesh key={idx} position={[0, 0.025, 0]}>
          <ringGeometry args={[radius - 0.08, radius, 32]} />
          <meshBasicMaterial color="#1a1921" side={THREE.DoubleSide} />
        </mesh>
      ))}

      {/* Center Label (Red Concert Pressing) */}
      <mesh position={[0, 0.026, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.045, 24]} />
        <meshStandardMaterial
          color="#e11d2e"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Center Spindle Hole */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Catalog stamp ring */}
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.5, 20]} />
        <meshBasicMaterial color={albumIndex % 2 === 0 ? "#ffffff" : "#facc15"} wireframe />
      </mesh>
    </group>
  );
}

export function VinylRecord({ albumIndex = 0 }: { albumIndex?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-28 h-28 sm:w-36 sm:h-36 pointer-events-none select-none relative"
      aria-hidden="true"
    >
      {isInView && (
        <Canvas
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 5, 2]} intensity={2.5} color="#ffffff" />
          <pointLight position={[-2, -2, 2]} intensity={1.5} color="#e11d2e" />
          <SpinningDisc albumIndex={albumIndex} />
        </Canvas>
      )}
    </div>
  );
}
