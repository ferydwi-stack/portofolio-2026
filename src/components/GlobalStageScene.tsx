"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic concert sparks
const SPARK_COUNT = 90;
const sparkPositions = new Float32Array(SPARK_COUNT * 3);
const sparkColors = new Float32Array(SPARK_COUNT * 3);
const redColor = new THREE.Color("#ff2a3b");
const amberColor = new THREE.Color("#f59e0b");

for (let i = 0; i < SPARK_COUNT; i++) {
  const seedX = Math.sin(i * 37.12) * 43758.5453;
  const seedY = Math.sin((i + 1) * 61.34) * 43758.5453;
  const seedZ = Math.sin((i + 2) * 89.21) * 43758.5453;

  sparkPositions[i * 3] = (seedX - Math.floor(seedX) - 0.5) * 14;
  sparkPositions[i * 3 + 1] = (seedY - Math.floor(seedY) - 0.5) * 12;
  sparkPositions[i * 3 + 2] = (seedZ - Math.floor(seedZ) - 0.5) * 8;

  const col = i % 2 === 0 ? redColor : amberColor;
  sparkColors[i * 3] = col.r;
  sparkColors[i * 3 + 1] = col.g;
  sparkColors[i * 3 + 2] = col.b;
}

// Stylized Emo Band Guitarist Model (Black hoodie, emo bangs, boots, guitar)
function EmoGuitarist({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const guitarRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rootRef.current) return;
    const t = state.clock.getElapsedTime();
    const progress = scrollProgress.current;

    // Headbang & Breathing idle motion
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 2.8) * 0.12 + 0.15;
      headRef.current.rotation.z = Math.cos(t * 1.4) * 0.08 - 0.05;
    }

    // Strumming arm rhythm
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 5.6) * 0.18 - 0.4;
    }

    // Guitar subtle sway
    if (guitarRef.current) {
      guitarRef.current.rotation.z = -0.45 + Math.sin(t * 2.8) * 0.04;
    }

    // React to scroll progress: rotate and move in stage space
    rootRef.current.position.y = Math.sin(t * 1.5) * 0.08 - progress * 1.5;
    rootRef.current.position.x = 1.2 - progress * 2.5;
    rootRef.current.rotation.y = -0.35 + progress * 0.8 + Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={rootRef} position={[1.2, -0.4, 0]} scale={1.25}>
      {/* Torso & Black Emo Hoodie */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.7, 0.95, 0.4]} />
        <meshStandardMaterial color="#0b0a0f" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Silver Zipper Accent */}
      <mesh position={[0, 0.4, 0.21]}>
        <boxGeometry args={[0.03, 0.85, 0.02]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Head & Neck */}
      <group ref={headRef} position={[0, 1.05, 0.05]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.38, 0.42, 0.38]} />
          <meshStandardMaterial color="#1a141b" roughness={0.6} />
        </mesh>

        {/* Iconic Long Side-swept Emo Bangs covering eye */}
        <mesh position={[-0.12, 0.18, 0.22]} rotation={[0.1, -0.2, -0.4]}>
          <boxGeometry args={[0.32, 0.45, 0.12]} />
          <meshStandardMaterial color="#07060a" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0.08, 0.25, 0.2]} rotation={[-0.05, 0.15, 0.2]}>
          <boxGeometry args={[0.26, 0.35, 0.1]} />
          <meshStandardMaterial color="#07060a" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Back Hair */}
        <mesh position={[0, 0.2, -0.15]} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.42, 0.45, 0.2]} />
          <meshStandardMaterial color="#07060a" roughness={0.4} />
        </mesh>
      </group>

      {/* Left Arm on Guitar Neck */}
      <group position={[-0.45, 0.65, 0.1]} rotation={[0.4, 0.5, 0.8]}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[0.16, 0.7, 0.18]} />
          <meshStandardMaterial color="#09080d" roughness={0.6} />
        </mesh>
      </group>

      {/* Right Arm Strumming */}
      <group ref={rightArmRef} position={[0.45, 0.65, 0.15]} rotation={[0.2, -0.3, -0.4]}>
        <mesh position={[0, -0.35, 0]}>
          <boxGeometry args={[0.16, 0.65, 0.18]} />
          <meshStandardMaterial color="#09080d" roughness={0.6} />
        </mesh>
        {/* Hand with Guitar Pick */}
        <mesh position={[0, -0.7, 0.05]}>
          <coneGeometry args={[0.05, 0.08, 3]} />
          <meshStandardMaterial color="#ff2a3b" emissive="#ff2a3b" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Electric Guitar Strapped to Musician */}
      <group ref={guitarRef} position={[-0.1, 0.15, 0.4]} rotation={[0.2, 0.3, -0.45]}>
        {/* Guitar Body - Double Cutaway */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.8, 1.1, 0.14]} />
          <meshStandardMaterial color="#1a0f16" roughness={0.25} metalness={0.8} />
        </mesh>
        {/* Crimson Sunburst Burst */}
        <mesh position={[0, -0.3, 0.08]}>
          <circleGeometry args={[0.32, 24]} />
          <meshStandardMaterial color="#ff2a3b" roughness={0.4} metalness={0.6} transparent opacity={0.7} />
        </mesh>
        {/* Pickups */}
        <mesh position={[0, -0.15, 0.09]}>
          <boxGeometry args={[0.28, 0.12, 0.04]} />
          <meshStandardMaterial color="#08080c" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.4, 0.09]}>
          <boxGeometry args={[0.28, 0.12, 0.04]} />
          <meshStandardMaterial color="#08080c" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Chrome Bridge */}
        <mesh position={[0, -0.65, 0.09]}>
          <boxGeometry args={[0.24, 0.1, 0.05]} />
          <meshStandardMaterial color="#ffffff" metalness={1} roughness={0.1} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.9, 0.04]}>
          <boxGeometry args={[0.14, 1.4, 0.09]} />
          <meshStandardMaterial color="#2d201b" roughness={0.5} />
        </mesh>
        {/* Headstock */}
        <mesh position={[-0.04, 1.8, 0.05]} rotation={[0, 0, 0.2]}>
          <boxGeometry args={[0.2, 0.45, 0.08]} />
          <meshStandardMaterial color="#140e14" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Strings */}
        {[-0.04, -0.02, 0, 0.02, 0.04].map((xOffset, i) => (
          <mesh key={i} position={[xOffset, 0.55, 0.09]}>
            <cylinderGeometry args={[0.003, 0.003, 2.1, 4]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>

      {/* Skinny Jeans Legs */}
      <group position={[0, -0.6, 0]}>
        <mesh position={[-0.18, -0.6, 0]}>
          <boxGeometry args={[0.22, 1.1, 0.26]} />
          <meshStandardMaterial color="#0e0c12" roughness={0.8} />
        </mesh>
        <mesh position={[0.18, -0.6, 0]}>
          <boxGeometry args={[0.22, 1.1, 0.26]} />
          <meshStandardMaterial color="#0e0c12" roughness={0.8} />
        </mesh>

        {/* Combat Boots */}
        <mesh position={[-0.18, -1.2, 0.06]}>
          <boxGeometry args={[0.24, 0.26, 0.38]} />
          <meshStandardMaterial color="#060508" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0.18, -1.2, 0.06]}>
          <boxGeometry args={[0.24, 0.26, 0.38]} />
          <meshStandardMaterial color="#060508" roughness={0.4} metalness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

// Stage Floating Sparks
function StageParticles() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() * 0.18;
    pointsRef.current.rotation.y = t * 0.25;
    pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.12;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[sparkPositions, 3]} />
        <bufferAttribute attach="attributes-color" args={[sparkColors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneContainer() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollProgress.current = window.scrollY / totalScroll;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <ambientLight intensity={0.45} />
      {/* Overhead Warm Amber Stage Spotlight */}
      <spotLight
        position={[-5, 7, 5]}
        angle={0.7}
        penumbra={0.85}
        intensity={4.5}
        color="#ffb347"
        castShadow
      />
      {/* Intense Crimson Backlight */}
      <pointLight position={[3, -1, -3]} intensity={6.0} color="#ff2a3b" />
      {/* Cool Front Rim Light */}
      <directionalLight position={[2, 3, 5]} intensity={1.5} color="#e4e4e7" />

      <EmoGuitarist scrollProgress={scrollProgress} />
      <StageParticles />
    </>
  );
}

export default function GlobalStageScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <SceneContainer />
      </Canvas>
    </div>
  );
}
