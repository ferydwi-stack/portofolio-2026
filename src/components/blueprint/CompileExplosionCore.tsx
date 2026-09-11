"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import {
  playCyberClick,
  playCompileChime,
  playDisassembleSound,
} from "@/lib/sound/cyberSound";

// Deterministic 3D Shard Geometry Definitions (24 facets of a cube/octahedron assembly)
function createShardData() {
  const shards = [];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const layer = Math.floor(i / 9) - 1; // -1, 0, 1
    const x = Math.cos(angle) * (layer === 0 ? 1.1 : 0.8);
    const z = Math.sin(angle) * (layer === 0 ? 1.1 : 0.8);
    const y = layer * 0.9;

    // Disassembled explosion target position
    const expDistance = 3.2 + (i % 5) * 0.6;
    const expX = x * expDistance + Math.sin(i * 3) * 0.8;
    const expY = y * expDistance + Math.cos(i * 2) * 0.8;
    const expZ = z * expDistance + Math.sin(i * 5) * 0.8;

    shards.push({
      id: i,
      solidPos: [x * 0.8, y * 0.8, z * 0.8] as [number, number, number],
      explodedPos: [expX, expY, expZ] as [number, number, number],
      rotSpeed: [Math.sin(i) * 0.03, Math.cos(i) * 0.04, Math.sin(i * 2) * 0.02] as [number, number, number],
      scale: 0.35 + (i % 3) * 0.1,
      color: i % 3 === 0 ? "#4FD1C5" : i % 3 === 1 ? "#38BDF8" : "#34D399",
    });
  }
  return shards;
}

const SHARD_DATA = createShardData();

/** Individual dynamic 3D shard that lerps between solid and exploded state */
function ShardMesh({
  shard,
  assemblyFactor,
  isWireframe,
}: {
  shard: (typeof SHARD_DATA)[0];
  assemblyFactor: number; // 0 = exploded, 1 = solid
  isWireframe: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const currentPos = useRef(new THREE.Vector3(...shard.explodedPos));

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Target position interpolated by assembly factor
    const targetX = THREE.MathUtils.lerp(shard.explodedPos[0], shard.solidPos[0], assemblyFactor);
    const targetY = THREE.MathUtils.lerp(shard.explodedPos[1], shard.solidPos[1], assemblyFactor);
    const targetZ = THREE.MathUtils.lerp(shard.explodedPos[2], shard.solidPos[2], assemblyFactor);

    currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetX, 5, delta);
    currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetY, 5, delta);
    currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetZ, 5, delta);

    meshRef.current.position.copy(currentPos.current);

    // Continuous rotation when exploded, lock alignment when solid
    if (assemblyFactor < 0.95) {
      meshRef.current.rotation.x += shard.rotSpeed[0];
      meshRef.current.rotation.y += shard.rotSpeed[1];
      meshRef.current.rotation.z += shard.rotSpeed[2];
    } else {
      meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, 0, 8, delta);
      meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, 0, 8, delta);
      meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, 0, 8, delta);
    }
  });

  return (
    <mesh ref={meshRef} scale={shard.scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={shard.color}
        emissive={shard.color}
        emissiveIntensity={isWireframe ? 0.8 : assemblyFactor * 0.4 + 0.2}
        wireframe={isWireframe}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={isWireframe ? 0.7 : 0.88}
      />
    </mesh>
  );
}

/** The Assembly Core cluster */
function AssemblyGroup({
  assemblyFactor,
  isWireframe,
  autoRotate,
}: {
  assemblyFactor: number;
  isWireframe: boolean;
  autoRotate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Central Luminous Quantum Reactor Core */}
        <mesh scale={0.75}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#4FD1C5"
            emissive="#4FD1C5"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={0.9}
            wireframe={isWireframe}
          />
        </mesh>

        {/* Orbiting Shards */}
        {SHARD_DATA.map((shard) => (
          <ShardMesh
            key={shard.id}
            shard={shard}
            assemblyFactor={assemblyFactor}
            isWireframe={isWireframe}
          />
        ))}

        {/* Dynamic Light Casting */}
        <pointLight position={[0, 0, 0]} color="#4FD1C5" intensity={4} distance={9} />
        <pointLight position={[3, 3, 3]} color="#38BDF8" intensity={2} distance={7} />
        <pointLight position={[-3, -3, -3]} color="#34D399" intensity={1.5} distance={7} />

        {/* Cyber Sparkles */}
        <Sparkles
          count={45}
          scale={5}
          size={3.5}
          speed={0.8}
          color="#4FD1C5"
        />
      </group>
    </Float>
  );
}

export function CompileExplosionCore() {
  const [assemblyFactor, setAssemblyFactor] = useState(1); // 1 = solid, 0 = exploded
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [statusText, setStatusText] = useState("STRUCTURE SOLID // SYNCHRONIZED");

  // Re-assemble action
  const handleAssemble = () => {
    playCompileChime();
    setAssemblyFactor(1);
    setStatusText("COMPILING ARTIFACT... BUILD SOLIDIFIED ✓");
  };

  // Disassemble action
  const handleDisassemble = () => {
    playDisassembleSound();
    setAssemblyFactor(0);
    setStatusText("CORE DECONSTRUCTED // SHARDS SCATTERED");
  };

  // Toggle wireframe
  const handleToggleWireframe = () => {
    playCyberClick();
    setIsWireframe((prev) => !prev);
    setStatusText(isWireframe ? "RENDER: SOLID PBR" : "RENDER: WIREFRAME SCHEMATIC");
  };

  // Toggle rotate
  const handleToggleRotate = () => {
    playCyberClick();
    setAutoRotate((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Canvas Viewport */}
      <div className="w-full aspect-square max-w-[440px] lg:max-w-[480px] relative rounded-3xl bg-slate-950/60 border border-cyan-500/30 p-2 shadow-[0_0_50px_rgba(79,209,197,0.15)] overflow-hidden group">
        {/* Cyber HUD Corner Brackets */}
        <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-cyan-400 pointer-events-none z-10" />
        <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-cyan-400 pointer-events-none z-10" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-cyan-400 pointer-events-none z-10" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-cyan-400 pointer-events-none z-10" />

        {/* Top HUD Telemetry */}
        <div className="absolute top-3.5 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900/90 border border-cyan-500/30 text-cyan-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            3D ARCHITECTURE RUNTIME
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-slate-400">
            DRAG 360° TO INSPECT
          </span>
        </div>

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 6.5], fov: 48 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#4FD1C5" />
          <AssemblyGroup
            assemblyFactor={assemblyFactor}
            isWireframe={isWireframe}
            autoRotate={autoRotate}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.8}
            dampingFactor={0.08}
          />
        </Canvas>

        {/* Bottom Status Live Banner */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10 text-[10px] font-mono px-3 py-1 rounded-xl bg-slate-950/90 border border-cyan-500/30 text-cyan-300">
          <span className="truncate">{statusText}</span>
          <span className="font-bold text-slate-400">
            {assemblyFactor === 1 ? "SOLID 100%" : "EXPLODED"}
          </span>
        </div>
      </div>

      {/* Interactive 3D Control Console */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-3 font-mono text-[11px]">
        <button
          onClick={handleAssemble}
          className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
            assemblyFactor === 1
              ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(79,209,197,0.4)]"
              : "bg-slate-900/80 text-cyan-400 border-slate-700 hover:border-cyan-400"
          }`}
        >
          <span>⚡ COMPILE CORE</span>
        </button>

        <button
          onClick={handleDisassemble}
          className={`px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 font-bold ${
            assemblyFactor === 0
              ? "bg-gradient-to-r from-amber-500 to-orange-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,183,56,0.4)]"
              : "bg-slate-900/80 text-amber-400 border-slate-700 hover:border-amber-400"
          }`}
        >
          <span>💥 DISASSEMBLE</span>
        </button>

        <button
          onClick={handleToggleWireframe}
          className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium ${
            isWireframe
              ? "bg-cyan-950 border-cyan-400 text-cyan-300"
              : "bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white"
          }`}
        >
          {isWireframe ? "WIREFRAME: ON" : "WIREFRAME: OFF"}
        </button>

        <button
          onClick={handleToggleRotate}
          className="px-3 py-1.5 rounded-xl border bg-slate-900/80 text-slate-400 border-slate-700 hover:text-white transition-all cursor-pointer"
        >
          {autoRotate ? "SPIN: ON" : "SPIN: PAUSED"}
        </button>
      </div>
    </div>
  );
}
