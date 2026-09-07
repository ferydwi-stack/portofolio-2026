"use client";

import { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useScrollStore } from "@/store/useScrollStore";
import { playGuitarChord } from "@/lib/sound/guitarSynth";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StandaloneGuitarProps {
  bodyColor?: string;
  hardwareColor?: string;
}

/**
 * StandaloneGuitar Component (§4.3 v4 Spec)
 * Pure electric guitar without human character.
 * Floats seamlessly using Drei <Float> and rotates dynamically via scroll progress.
 * Responsive on-click punch and vibration spring interaction.
 */
export function StandaloneGuitar({
  bodyColor = "#e11d2e",
  hardwareColor = "#b8bcc2",
}: StandaloneGuitarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const guitarMeshRef = useRef<THREE.Group>(null);
  const [isVibrating, setIsVibrating] = useState(false);
  const [scaleSpring, setScaleSpring] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  // Handle guitar strum / click interaction
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsVibrating(true);
    setScaleSpring(1.08);
    playGuitarChord(110); // A2 rock power chord

    setTimeout(() => {
      setScaleSpring(1);
      setTimeout(() => setIsVibrating(false), 250);
    }, 120);
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Smoothly track scroll progress from global scroll store
    const scrollProgress = useScrollStore.getState().scrollProgress || 0;

    // Map scroll progress to subtle 3D rotational choreography
    // Rotate smoothly across Y and Z axes
    const targetRotY = prefersReducedMotion
      ? 0.35
      : 0.35 + scrollProgress * Math.PI * 1.5;
    const targetRotZ = prefersReducedMotion
      ? -0.2
      : -0.25 + Math.sin(scrollProgress * Math.PI) * 0.3;
    const targetPosX = prefersReducedMotion
      ? 1.2
      : 1.2 - Math.sin(scrollProgress * Math.PI * 2) * 0.4;
    const targetPosY = prefersReducedMotion
      ? 0
      : (scrollProgress - 0.5) * -0.6;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      3.5,
      delta
    );
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      targetRotZ,
      3.5,
      delta
    );
    groupRef.current.position.x = THREE.MathUtils.damp(
      groupRef.current.position.x,
      targetPosX,
      3,
      delta
    );
    groupRef.current.position.y = THREE.MathUtils.damp(
      groupRef.current.position.y,
      targetPosY,
      3,
      delta
    );

    // Vibration feedback decay
    if (guitarMeshRef.current) {
      const currentScale = guitarMeshRef.current.scale.x;
      const targetScale = scaleSpring * (isVibrating ? 1 + Math.sin(Date.now() * 0.1) * 0.03 : 1);
      const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 15, delta);
      guitarMeshRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={groupRef} position={[1.2, 0, 0]}>
      <Float
        speed={prefersReducedMotion ? 0 : 2}
        rotationIntensity={prefersReducedMotion ? 0 : 0.45}
        floatIntensity={prefersReducedMotion ? 0 : 1.4}
        floatingRange={[-0.15, 0.15]}
      >
        <group
          ref={guitarMeshRef}
          onClick={handleClick}
          scale={[1.15, 1.15, 1.15]}
          rotation={[0.15, 0, -0.22]}
        >
          {/* --- 1. Electric Guitar Solid Body (Double Cutaway Offset) --- */}
          {/* Main Body Center Core */}
          <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.5, 2.2, 0.22]} />
            <meshStandardMaterial
              color={bodyColor}
              roughness={0.25}
              metalness={0.45}
              emissive="#3a040a"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Upper Horn (Longer Cutaway) */}
          <mesh position={[-0.65, 0.35, 0]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.45, 1.2, 0.2]} />
            <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} />
          </mesh>

          {/* Lower Horn (Shorter Cutaway) */}
          <mesh position={[0.65, 0.2, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.4, 0.9, 0.2]} />
            <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} />
          </mesh>

          {/* Rounded Lower Bout Left */}
          <mesh position={[-0.55, -1.0, 0]} rotation={[0, 0, -0.15]}>
            <cylinderGeometry args={[0.45, 0.5, 0.2, 16]} />
            <meshStandardMaterial color="#880815" roughness={0.3} metalness={0.4} />
          </mesh>

          {/* Rounded Lower Bout Right */}
          <mesh position={[0.55, -1.0, 0]} rotation={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.45, 0.5, 0.2, 16]} />
            <meshStandardMaterial color="#880815" roughness={0.3} metalness={0.4} />
          </mesh>

          {/* --- 2. 3-Ply Scratchplate / Pickguard --- */}
          <mesh position={[-0.1, -0.3, 0.12]}>
            <boxGeometry args={[1.0, 1.3, 0.03]} />
            <meshStandardMaterial color="#110e19" roughness={0.5} metalness={0.2} />
          </mesh>

          {/* --- 3. Dual Humbucker Pickups --- */}
          {/* Neck Pickup */}
          <group position={[0, 0.05, 0.14]}>
            <mesh>
              <boxGeometry args={[0.72, 0.22, 0.08]} />
              <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.7} />
            </mesh>
            {[-0.25, -0.15, -0.05, 0.05, 0.15, 0.25].map((x, i) => (
              <mesh key={`p1-${i}`} position={[x, 0, 0.05]}>
                <cylinderGeometry args={[0.022, 0.022, 0.03, 8]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.1} />
              </mesh>
            ))}
          </group>

          {/* Bridge Pickup */}
          <group position={[0, -0.35, 0.14]}>
            <mesh>
              <boxGeometry args={[0.72, 0.22, 0.08]} />
              <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.7} />
            </mesh>
            {[-0.25, -0.15, -0.05, 0.05, 0.15, 0.25].map((x, i) => (
              <mesh key={`p2-${i}`} position={[x, 0, 0.05]}>
                <cylinderGeometry args={[0.022, 0.022, 0.03, 8]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.1} />
              </mesh>
            ))}
          </group>

          {/* --- 4. Chrome Bridge & Tailpiece --- */}
          <mesh position={[0, -0.75, 0.14]}>
            <boxGeometry args={[0.65, 0.25, 0.09]} />
            <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.15} />
          </mesh>

          {/* Whammy Bar (Tremolo Arm) */}
          <group position={[0.26, -0.75, 0.18]} rotation={[0.2, 0, -0.4]}>
            <mesh>
              <cylinderGeometry args={[0.015, 0.015, 0.55, 8]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshStandardMaterial color="#111" roughness={0.5} />
            </mesh>
          </group>

          {/* Knurled Chrome Volume & Tone Knobs */}
          {[
            { pos: [0.35, -0.5, 0.15] as [number, number, number] },
            { pos: [0.45, -0.7, 0.15] as [number, number, number] },
            { pos: [0.38, -0.9, 0.15] as [number, number, number] },
          ].map((knob, idx) => (
            <mesh key={`knob-${idx}`} position={knob.pos}>
              <cylinderGeometry args={[0.065, 0.065, 0.06, 16]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.9} roughness={0.2} />
            </mesh>
          ))}

          {/* --- 5. Maple Neck & Fretboard --- */}
          <mesh position={[0, 1.85, 0.08]} castShadow>
            <boxGeometry args={[0.34, 2.6, 0.14]} />
            <meshStandardMaterial color="#211815" roughness={0.4} metalness={0.15} />
          </mesh>

          {/* 24 Chrome Nickel Frets */}
          {Array.from({ length: 24 }).map((_, i) => {
            const fretY = 0.65 + i * 0.105;
            return (
              <mesh key={`fret-${i}`} position={[0, fretY, 0.155]}>
                <boxGeometry args={[0.33, 0.012, 0.012]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.1} />
              </mesh>
            );
          })}

          {/* Pearloid Fret Inlay Markers */}
          {[3, 5, 7, 9, 12, 15, 17, 19, 21].map((fret) => {
            const inlayY = 0.65 + (fret - 0.5) * 0.105;
            return (
              <mesh key={`inlay-${fret}`} position={[0, inlayY, 0.156]}>
                <circleGeometry args={[0.022, 12]} />
                <meshStandardMaterial color="#f5f5f0" roughness={0.2} metalness={0.8} />
              </mesh>
            );
          })}

          {/* --- 6. Reverse Angled Headstock --- */}
          <group position={[0.04, 3.4, 0.05]} rotation={[0, 0, -0.08]}>
            <mesh>
              <boxGeometry args={[0.38, 0.75, 0.12]} />
              <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} />
            </mesh>

            {/* In-Line 6 Chrome Tuning Pegs */}
            {Array.from({ length: 6 }).map((_, i) => (
              <group key={`peg-${i}`} position={[-0.24, -0.25 + i * 0.1, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.12, 8]} />
                  <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[-0.08, 0, 0]}>
                  <boxGeometry args={[0.08, 0.035, 0.015]} />
                  <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.1} />
                </mesh>
              </group>
            ))}
          </group>

          {/* --- 7. Six Steel Guitar Strings --- */}
          {[-0.125, -0.075, -0.025, 0.025, 0.075, 0.125].map((x, i) => (
            <mesh key={`string-${i}`} position={[x, 1.35, 0.18]}>
              <cylinderGeometry args={[0.004 + i * 0.001, 0.004 + i * 0.001, 4.3, 6]} />
              <meshStandardMaterial
                color="#f0f2f5"
                metalness={0.98}
                roughness={0.05}
                emissive={isVibrating ? "#ff2a3b" : "#17e0c9"}
                emissiveIntensity={isVibrating ? 0.8 : 0.15}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}
