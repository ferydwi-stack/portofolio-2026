"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * Gimbal Rings rotating on multiple axes
 */
function GimbalRing({
  radius,
  tube,
  color,
  speedX,
  speedY,
  speedZ,
}: {
  radius: number;
  tube: number;
  color: string;
  speedX: number;
  speedY: number;
  speedZ: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.x = t * speedX;
    ringRef.current.rotation.y = t * speedY;
    ringRef.current.rotation.z = t * speedZ;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, tube, 16, 64]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
      />
    </mesh>
  );
}

/**
 * Satellite Nodes that orbit around the core
 */
function OrbitingSatellites({ count = 8, radius = 2.4 }: { count?: number; radius?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2;
  });

  const satellites = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const y = Math.sin(angle * 2) * 0.5;
      return {
        pos: [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [number, number, number],
        color: i % 2 === 0 ? "#4FD1C5" : "#38BDF8",
      };
    });
  }, [count, radius]);

  return (
    <group ref={groupRef}>
      {satellites.map((s, i) => (
        <mesh key={i} position={s.pos} scale={0.12}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={0.8}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Central Quantum Compiler Core with Wireframe + Translucent Inner Facets
 */
function CompilerCore({ isHovered }: { isHovered: boolean }) {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      mouseTarget.current.y = (e.clientY / window.innerHeight - 0.5) * -1.2;
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state) => {
    if (!coreRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth mouse inertia tracking
    coreRef.current.rotation.y += (mouseTarget.current.x - coreRef.current.rotation.y) * 0.05;
    coreRef.current.rotation.x += (mouseTarget.current.y - coreRef.current.rotation.x) * 0.05;

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
      const pulse = 1 + Math.sin(t * 3) * (isHovered ? 0.15 : 0.05);
      innerRef.current.scale.setScalar(pulse * 0.9);
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y = t * 0.3;
      outerWireRef.current.rotation.x = t * 0.2;
      const wirePulse = 1.3 + Math.sin(t * 2) * (isHovered ? 0.1 : 0.04);
      outerWireRef.current.scale.setScalar(wirePulse);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={coreRef}>
        {/* Outer Wireframe Icosahedron */}
        <mesh ref={outerWireRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#4FD1C5"
            wireframe
            transparent
            opacity={isHovered ? 0.9 : 0.7}
          />
        </mesh>

        {/* Inner Solid Holographic Core */}
        <mesh ref={innerRef}>
          <dodecahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial
            color="#0E7490"
            emissive="#4FD1C5"
            emissiveIntensity={isHovered ? 0.9 : 0.4}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.75}
          />
        </mesh>

        {/* Gimbal Nested Rings */}
        <GimbalRing radius={1.9} tube={0.025} color="#4FD1C5" speedX={0.2} speedY={0.3} speedZ={0.1} />
        <GimbalRing radius={2.2} tube={0.02} color="#38BDF8" speedX={-0.25} speedY={0.15} speedZ={0.2} />
        <GimbalRing radius={2.5} tube={0.015} color="#E8A33D" speedX={0.15} speedY={-0.3} speedZ={-0.1} />

        {/* Orbiting Telemetry Satellites */}
        <OrbitingSatellites count={10} radius={2.8} />

        {/* Point Lights casting rich glows */}
        <pointLight position={[0, 0, 0]} color="#4FD1C5" intensity={isHovered ? 4 : 2.5} distance={8} />
        <pointLight position={[2, 2, 2]} color="#38BDF8" intensity={1.5} distance={6} />
      </group>
    </Float>
  );
}

function Scene({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#4FD1C5" />
      <CompilerCore isHovered={isHovered} />
    </>
  );
}

export function WireframeAssemblyCanvas() {
  const [isHovered, setIsHovered] = useState(false);
  const [telemetry, setTelemetry] = useState({ hz: 120, load: 38 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry({
        hz: 118 + Math.floor(Math.random() * 5),
        load: 35 + Math.floor(Math.random() * 8),
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full aspect-square max-w-[440px] lg:max-w-[480px] mx-auto relative group cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Holographic HUD Ring */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/20 pointer-events-none animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/15 pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />
      <div className="absolute inset-8 rounded-full border border-slate-800/80 pointer-events-none" />

      {/* Cyber Corner HUD Brackets */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cyan-400 pointer-events-none" />

      {/* Live HUD Telemetry Tags */}
      <div className="absolute top-3 left-4 font-mono text-[9px] text-cyan-400 flex items-center gap-1.5 pointer-events-none bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-500/20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>CORE // {telemetry.hz} Hz</span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[9px] text-slate-400 pointer-events-none bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
        SYS LOAD: <span className="text-cyan-300 font-bold">{telemetry.load}%</span>
      </div>

      {/* Interactive 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene isHovered={isHovered} />
      </Canvas>

      {/* Bottom Status Capsule */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shadow-[0_0_20px_rgba(79,209,197,0.2)] pointer-events-none whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>QUANTUM COMPILE CORE // INTERACTIVE 3D</span>
      </div>
    </div>
  );
}
