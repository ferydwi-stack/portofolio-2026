"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface GuitaristProps {
  scrollProgress?: number;
  useModel?: boolean;
}

export function GuitaristCharacter({ scrollProgress = 0 }: GuitaristProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const armRef = useRef<THREE.Group>(null);
  const guitarRef = useRef<THREE.Group>(null);
  const prefersReducedMotion = useReducedMotion();

  // Materials with metallic/dark stage aesthetics
  const materials = useMemo(() => {
    return {
      clothing: new THREE.MeshStandardMaterial({
        color: "#0d0c11",
        roughness: 0.85,
        metalness: 0.2,
      }),
      hair: new THREE.MeshStandardMaterial({
        color: "#08070b",
        roughness: 0.9,
      }),
      skin: new THREE.MeshStandardMaterial({
        color: "#2a2228",
        roughness: 0.6,
      }),
      guitarBody: new THREE.MeshStandardMaterial({
        color: "#dc2626", // Candy apple red guitar finish
        roughness: 0.2,
        metalness: 0.7,
      }),
      guitarPickguard: new THREE.MeshStandardMaterial({
        color: "#18181b",
        roughness: 0.4,
      }),
      chromeHardware: new THREE.MeshStandardMaterial({
        color: "#f4f4f5",
        roughness: 0.1,
        metalness: 0.95,
      }),
      fretboard: new THREE.MeshStandardMaterial({
        color: "#271c19",
        roughness: 0.7,
      }),
      rimLight: new THREE.MeshBasicMaterial({
        color: "#ff2a3b",
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      }),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current || prefersReducedMotion) return;

    const t = state.clock.getElapsedTime();

    // 1. Idle breathing
    const breath = 1 + Math.sin(t * 1.8) * 0.012;
    groupRef.current.scale.set(1, breath, 1);

    // 2. Headbang rhythm (emo nod: pitch down & up to tempo)
    if (headRef.current) {
      headRef.current.rotation.x = 0.2 + Math.sin(t * 3.2) * 0.05;
      headRef.current.rotation.z = Math.cos(t * 1.6) * 0.02;
    }

    // 3. Strumming arm motion (rhythmically pick guitar)
    if (armRef.current) {
      const strumSpeed = 6.4;
      const strumIntensity = 0.12 + Math.min(0.2, scrollProgress * 0.3);
      armRef.current.rotation.z = Math.sin(t * strumSpeed) * strumIntensity;
    }

    // 4. Guitar tilt reaction to overall scroll
    if (guitarRef.current) {
      guitarRef.current.rotation.z = -0.38 + Math.sin(t * 1.6) * 0.02 - scrollProgress * 0.15;
    }

    // Subtle stage lean
    groupRef.current.rotation.y = -0.32 + Math.sin(t * 0.8) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0.6, -1.8, 0]}>
      {/* --- LEGS & BOOTS --- */}
      {/* Left Leg & Doc Marten boot */}
      <mesh position={[-0.32, 0.7, 0.05]} material={materials.clothing}>
        <cylinderGeometry args={[0.11, 0.09, 1.4, 16]} />
      </mesh>
      <mesh position={[-0.32, 0.06, 0.12]} material={materials.clothing}>
        <boxGeometry args={[0.22, 0.2, 0.38]} />
      </mesh>

      {/* Right Leg & Boot (stance wide) */}
      <mesh position={[0.38, 0.68, -0.1]} material={materials.clothing} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.11, 0.09, 1.35, 16]} />
      </mesh>
      <mesh position={[0.42, 0.06, -0.05]} material={materials.clothing}>
        <boxGeometry args={[0.22, 0.2, 0.38]} />
      </mesh>

      {/* --- TORSO & HOODIE --- */}
      {/* Hips */}
      <mesh position={[0.02, 1.4, 0]} material={materials.clothing}>
        <boxGeometry args={[0.62, 0.32, 0.36]} />
      </mesh>

      {/* Chest & Oversized emo hoodie */}
      <mesh position={[0.04, 2.05, 0.02]} rotation={[0.12, 0, 0.05]} material={materials.clothing}>
        <boxGeometry args={[0.74, 1.05, 0.44]} />
      </mesh>

      {/* Hoodie wireframe accent */}
      <mesh position={[0.04, 2.05, 0.02]} rotation={[0.12, 0, 0.05]} material={materials.rimLight}>
        <boxGeometry args={[0.76, 1.07, 0.46]} />
      </mesh>

      {/* --- HEAD & SIGNATURE EMO HAIR BANGS --- */}
      <group ref={headRef} position={[0.06, 2.75, 0.08]}>
        {/* Face/Neck */}
        <mesh position={[0, -0.12, 0.02]} material={materials.skin}>
          <cylinderGeometry args={[0.12, 0.14, 0.3, 16]} />
        </mesh>
        <mesh position={[0, 0.08, 0.02]} material={materials.skin}>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>

        {/* Emo Long Fringe / Swoop Bangs covering eye */}
        <mesh position={[0.08, 0.16, 0.14]} rotation={[0.2, 0.25, -0.45]} material={materials.hair}>
          <coneGeometry args={[0.28, 0.65, 8]} />
        </mesh>
        <mesh position={[-0.08, 0.12, 0.12]} rotation={[0.1, -0.15, 0.3]} material={materials.hair}>
          <coneGeometry args={[0.22, 0.5, 8]} />
        </mesh>
        {/* Spikes / Back hair */}
        <mesh position={[0, 0.2, -0.06]} rotation={[-0.2, 0, 0]} material={materials.hair}>
          <sphereGeometry args={[0.27, 12, 12]} />
        </mesh>
      </group>

      {/* --- LEFT ARM (Fretting Hand along Guitar Neck) --- */}
      <group position={[-0.38, 2.35, 0.05]} rotation={[0.4, 0.2, 0.8]}>
        <mesh position={[0, -0.45, 0]} material={materials.clothing}>
          <cylinderGeometry args={[0.09, 0.08, 0.85, 12]} />
        </mesh>
        {/* Forearm angled down toward fretboard */}
        <group position={[0, -0.85, 0]} rotation={[-0.8, -0.4, -0.2]}>
          <mesh position={[0, -0.35, 0]} material={materials.skin}>
            <cylinderGeometry args={[0.07, 0.06, 0.7, 12]} />
          </mesh>
        </group>
      </group>

      {/* --- RIGHT ARM (Strumming Hand over Guitar Body) --- */}
      <group ref={armRef} position={[0.46, 2.3, 0.12]} rotation={[0.2, -0.1, -0.4]}>
        <mesh position={[0, -0.4, 0]} material={materials.clothing}>
          <cylinderGeometry args={[0.09, 0.08, 0.8, 12]} />
        </mesh>
        {/* Forearm hovering over strings with pick */}
        <group position={[0, -0.75, 0]} rotation={[0.9, 0.2, 0.4]}>
          <mesh position={[0, -0.3, 0]} material={materials.skin}>
            <cylinderGeometry args={[0.07, 0.06, 0.65, 12]} />
          </mesh>
          {/* Guitar Pick hand */}
          <mesh position={[0, -0.65, 0.02]} material={materials.chromeHardware}>
            <boxGeometry args={[0.06, 0.08, 0.03]} />
          </mesh>
        </group>
      </group>

      {/* --- ELECTRIC GUITAR (Offset Body / Stratocaster / Jazzmaster Hybrid) --- */}
      <group ref={guitarRef} position={[0.05, 1.55, 0.32]} rotation={[0.1, 0.2, -0.38]}>
        {/* Guitar Body (Dual Horn Cutaways) */}
        <mesh position={[0, -0.1, 0]} material={materials.guitarBody}>
          <boxGeometry args={[0.62, 0.82, 0.1]} />
        </mesh>
        {/* Upper Horn */}
        <mesh position={[-0.24, 0.38, 0]} rotation={[0, 0, 0.3]} material={materials.guitarBody}>
          <coneGeometry args={[0.13, 0.4, 8]} />
        </mesh>
        {/* Lower Horn */}
        <mesh position={[0.22, 0.3, 0]} rotation={[0, 0, -0.4]} material={materials.guitarBody}>
          <coneGeometry args={[0.11, 0.32, 8]} />
        </mesh>

        {/* Pickguard */}
        <mesh position={[0.02, 0.02, 0.055]} material={materials.guitarPickguard}>
          <boxGeometry args={[0.45, 0.62, 0.02]} />
        </mesh>

        {/* Pickups (Humbuckers in Chrome) */}
        <mesh position={[0.02, 0.12, 0.07]} material={materials.chromeHardware}>
          <boxGeometry args={[0.22, 0.07, 0.03]} />
        </mesh>
        <mesh position={[0.02, -0.05, 0.07]} material={materials.chromeHardware}>
          <boxGeometry args={[0.22, 0.07, 0.03]} />
        </mesh>

        {/* Bridge & Tone Knobs */}
        <mesh position={[0.02, -0.25, 0.07]} material={materials.chromeHardware}>
          <boxGeometry args={[0.2, 0.08, 0.03]} />
        </mesh>
        <mesh position={[0.18, -0.22, 0.07]} material={materials.chromeHardware}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
        </mesh>
        <mesh position={[0.18, -0.32, 0.07]} material={materials.chromeHardware}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} />
        </mesh>

        {/* Guitar Neck & 24 Frets */}
        <mesh position={[0, 0.88, 0.02]} material={materials.fretboard}>
          <boxGeometry args={[0.12, 1.25, 0.06]} />
        </mesh>

        {/* Headstock with Tuning Pegs */}
        <group position={[0, 1.62, 0.02]}>
          <mesh material={materials.guitarBody} rotation={[0, 0, 0.1]}>
            <boxGeometry args={[0.14, 0.32, 0.06]} />
          </mesh>
          {/* Tuning pegs */}
          {[-0.1, 0, 0.1].map((offsetY, i) => (
            <mesh key={i} position={[-0.1, offsetY, 0]} material={materials.chromeHardware}>
              <cylinderGeometry args={[0.02, 0.02, 0.06, 8]} />
            </mesh>
          ))}
        </group>

        {/* 6 Steel Strings (Thin gleaming bars) */}
        <mesh position={[0, 0.72, 0.08]} material={materials.chromeHardware}>
          <boxGeometry args={[0.06, 1.6, 0.01]} />
        </mesh>
      </group>
    </group>
  );
}
