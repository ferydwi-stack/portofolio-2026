"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { playHoverTick } from "@/lib/sound/cyberSound";

const TECH_NODES = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "React", color: "#61DAFB" },
  { name: "Go / Golang", color: "#00ADD8" },
  { name: "Node.js", color: "#68A063" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Tailwind CSS", color: "#38BDF8" },
  { name: "Flutter", color: "#54C5F8" },
  { name: "Docker", color: "#2496ED" },
  { name: "Supabase", color: "#3ECF8E" },
  { name: "Three.js", color: "#4FD1C5" },
  { name: "Python", color: "#FFD43B" },
];

function NodeSphere({
  onHover,
}: {
  onHover: (name: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
  });

  const nodes = useMemo(() => {
    const radius = 2.4;
    return TECH_NODES.map((tech, i) => {
      const phi = Math.acos(-1 + (2 * i) / TECH_NODES.length);
      const theta = Math.sqrt(TECH_NODES.length * Math.PI) * phi;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return {
        ...tech,
        pos: [x, y, z] as [number, number, number],
      };
    });
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Core Wireframe Geodesic Sphere */}
        <mesh scale={2.3}>
          <icosahedronGeometry args={[1, 2]} />
          <meshBasicMaterial
            color="#4FD1C5"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Nodes */}
        {nodes.map((node) => (
          <group key={node.name} position={node.pos}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                playHoverTick();
                onHover(node.name);
              }}
              onPointerOut={() => onHover(null)}
            >
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={1.2}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>

            {/* Floating 3D Text Label using Html */}
            <Html distanceFactor={8} center pointerEvents="none">
              <div className="px-2 py-0.5 rounded bg-slate-950/90 border border-cyan-500/40 text-[9px] font-mono font-bold text-white whitespace-nowrap shadow-md select-none backdrop-blur-xs">
                {node.name}
              </div>
            </Html>
          </group>
        ))}

        {/* Inner Light Glow */}
        <pointLight position={[0, 0, 0]} color="#4FD1C5" intensity={3} distance={6} />
      </group>
    </Float>
  );
}

export function InteractiveTechGlobe() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="w-full h-[320px] sm:h-[360px] relative rounded-3xl bg-slate-950/50 border border-slate-800 p-2 overflow-hidden group">
      {/* Top Left Status */}
      <div className="absolute top-3 left-4 z-10 font-mono text-[10px] text-cyan-400 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D TECH ECOSYSTEM GALAXY // DRAG TO ROTATE</span>
      </div>

      {/* Top Right Hover Indicator */}
      <div className="absolute top-3 right-4 z-10 font-mono text-[10px] text-slate-300 pointer-events-none bg-slate-900/90 px-2.5 py-0.5 rounded border border-cyan-500/30">
        SELECTED: <span className="text-cyan-300 font-bold">{hoveredNode || "EXPLORE NODES"}</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <NodeSphere onHover={setHoveredNode} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.7}
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
