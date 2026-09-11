"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function WireframeObject({ position, rotation, scale, color, speed }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
    </mesh>
  );
}

function CentralStructure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  const objects = useMemo(() => [
    { pos: [0, 0, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number], scale: 1.8, color: "#4FD1C5", speed: 0.5 },
    { pos: [1.5, 1.2, -0.5] as [number, number, number], rot: [0.5, 0.3, 0] as [number, number, number], scale: 0.6, color: "#38BDF8", speed: 0.8 },
    { pos: [-1.3, -0.8, 0.8] as [number, number, number], rot: [0, 0.7, 0.3] as [number, number, number], scale: 0.5, color: "#E8A33D", speed: 1.0 },
    { pos: [0.8, -1.5, -0.3] as [number, number, number], rot: [0.3, 0, 0.5] as [number, number, number], scale: 0.45, color: "#34D399", speed: 0.7 },
    { pos: [-1.8, 0.5, -0.8] as [number, number, number], rot: [0.1, 0.4, 0.2] as [number, number, number], scale: 0.35, color: "#4FD1C5", speed: 1.2 },
    { pos: [1.2, 0.3, 1.0] as [number, number, number], rot: [0.6, 0.2, 0.1] as [number, number, number], scale: 0.3, color: "#94A3B8", speed: 0.9 },
  ], []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {objects.map((obj, i) => (
          <WireframeObject key={i} position={obj.pos} rotation={obj.rot} scale={obj.scale} color={obj.color} speed={obj.speed} />
        ))}
        {/* Central glow point */}
        <pointLight position={[0, 0, 0]} color="#4FD1C5" intensity={2} distance={5} />
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#4FD1C5" intensity={0.5} />
      <pointLight position={[-5, -3, 3]} color="#E8A33D" intensity={0.3} />
      <CentralStructure />
    </>
  );
}

export function WireframeAssemblyCanvas() {
  return (
    <div className="w-full aspect-square max-w-[420px] mx-auto relative">
      {/* Outer frame decoration */}
      <div className="absolute inset-0 rounded-2xl border border-[#4FD1C5]/10 pointer-events-none" />
      <div className="absolute -inset-1 rounded-2xl border border-dashed border-[#4FD1C5]/5 pointer-events-none" />

      {/* Corner markers */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#4FD1C5]/30 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#4FD1C5]/30 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-[#4FD1C5]/30 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-[#4FD1C5]/30 pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>

      {/* Bottom label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#4FD1C5]/40 tracking-[0.2em] uppercase pointer-events-none">
        WIREFRAME ASSEMBLY // 3D
      </div>
    </div>
  );
}
