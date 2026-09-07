"use client";

import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useScrollStore } from "@/store/useScrollStore";
import { playGuitarChord } from "@/lib/sound/guitarSynth";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface StandaloneGuitarProps {
  bodyColor?: string;
  hardwareColor?: string;
}

/**
 * Fiery Hollow-Body Electric Guitar with Bigsby Tremolo & F-Holes
 * Exactly matching the user's reference image:
 * - Archtop / Semi-Hollow Cherry Red body with dual F-holes & cream binding
 * - Chrome Bigsby Vibrato Tailpiece with long whammy bar & roller spring
 * - Dual chrome humbuckers & elevated pickguard
 * - Symmetrical 3+3 Headstock with 6 side tuning pegs
 * - Dynamic Blazing Flame Ring Aura orbiting the guitar body
 */
export function StandaloneGuitar({
  bodyColor = "#c81424",
  hardwareColor = "#e6e8eb",
}: StandaloneGuitarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const guitarMeshRef = useRef<THREE.Group>(null);
  const flameRingRef = useRef<THREE.Group>(null);
  const [isVibrating, setIsVibrating] = useState(false);
  const [scaleSpring, setScaleSpring] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  // Procedural 2D Shape for the Archtop Hollow Body with cutaway
  const guitarBodyShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Starting at base tail
    shape.moveTo(0, -1.5);
    // Lower bout right
    shape.bezierCurveTo(0.8, -1.5, 1.1, -1.0, 1.05, -0.4);
    // Narrow waist right
    shape.bezierCurveTo(1.0, 0.0, 0.65, 0.1, 0.65, 0.4);
    // Upper bout right
    shape.bezierCurveTo(0.65, 0.7, 0.9, 0.9, 0.85, 1.1);
    // Cutaway horn right
    shape.bezierCurveTo(0.7, 1.3, 0.4, 1.25, 0.25, 0.95);
    // Neck pocket top
    shape.lineTo(0.2, 0.95);
    shape.lineTo(-0.2, 0.95);
    // Upper bout left (symmetrical shoulder)
    shape.bezierCurveTo(-0.4, 1.2, -0.7, 1.15, -0.85, 0.9);
    shape.bezierCurveTo(-0.95, 0.65, -0.7, 0.35, -0.65, 0.2);
    // Narrow waist left
    shape.bezierCurveTo(-0.65, 0.0, -0.95, -0.2, -1.05, -0.4);
    // Lower bout left
    shape.bezierCurveTo(-1.15, -0.8, -0.9, -1.45, 0, -1.5);
    return shape;
  }, []);

  // Extrude settings for rich 3D thickness with beveled edges
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    }),
    []
  );

  // F-Hole shape for soundboard
  const fHoleLeftShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.45, -0.6);
    shape.bezierCurveTo(-0.48, -0.3, -0.38, 0.0, -0.42, 0.25);
    shape.bezierCurveTo(-0.45, 0.3, -0.4, 0.32, -0.36, 0.25);
    shape.bezierCurveTo(-0.32, 0.0, -0.42, -0.3, -0.38, -0.6);
    shape.closePath();
    return shape;
  }, []);

  const fHoleRightShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.45, -0.6);
    shape.bezierCurveTo(0.48, -0.3, 0.38, 0.0, 0.42, 0.25);
    shape.bezierCurveTo(0.45, 0.3, 0.4, 0.32, 0.36, 0.25);
    shape.bezierCurveTo(0.32, 0.0, 0.42, -0.3, 0.38, -0.6);
    shape.closePath();
    return shape;
  }, []);

  // Handle guitar strum / click interaction
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsVibrating(true);
    setScaleSpring(1.09);
    playGuitarChord(110); // A2 rock power chord

    setTimeout(() => {
      setScaleSpring(1);
      setTimeout(() => setIsVibrating(false), 300);
    }, 130);
  };

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;

    // Smoothly track scroll progress from global scroll store
    const scrollProgress = useScrollStore.getState().scrollProgress || 0;

    // Map scroll progress to subtle 3D rotational choreography
    const targetRotY = prefersReducedMotion
      ? 0.35
      : 0.35 + scrollProgress * Math.PI * 1.5;
    const targetRotZ = prefersReducedMotion
      ? -0.15
      : -0.2 + Math.sin(scrollProgress * Math.PI) * 0.25;
    const targetPosX = prefersReducedMotion
      ? 1.15
      : 1.15 - Math.sin(scrollProgress * Math.PI * 2) * 0.35;
    const targetPosY = prefersReducedMotion
      ? -0.05
      : (scrollProgress - 0.5) * -0.5;

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
      const targetScale =
        scaleSpring * (isVibrating ? 1 + Math.sin(Date.now() * 0.12) * 0.03 : 1);
      const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 15, delta);
      guitarMeshRef.current.scale.set(nextScale, nextScale, nextScale);
    }

    // Flame aura swirling rotation
    if (flameRingRef.current && !prefersReducedMotion) {
      flameRingRef.current.rotation.z = clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <group ref={groupRef} position={[1.15, -0.05, 0]}>
      <Float
        speed={prefersReducedMotion ? 0 : 2.2}
        rotationIntensity={prefersReducedMotion ? 0 : 0.45}
        floatIntensity={prefersReducedMotion ? 0 : 1.3}
        floatingRange={[-0.12, 0.12]}
      >
        <group
          ref={guitarMeshRef}
          onClick={handleClick}
          scale={[1.18, 1.18, 1.18]}
          rotation={[0.12, 0, -0.18]}
        >
          {/* ======================================================== */}
          {/* 1. BLAZING FLAME AURA RING (Matching Reference Image)    */}
          {/* ======================================================== */}
          <group ref={flameRingRef} position={[0, -0.3, -0.05]}>
            {/* Fiery Outer Aura Torus Glow */}
            <mesh>
              <torusGeometry args={[1.5, 0.12, 16, 48]} />
              <meshBasicMaterial
                color="#ff2a3b"
                transparent
                opacity={0.4}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>

            {/* Inner Intense Flame Burst Torus */}
            <mesh scale={[1.1, 1.3, 1]}>
              <torusGeometry args={[1.3, 0.18, 16, 48]} />
              <meshBasicMaterial
                color="#ff4422"
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>

            {/* Orbiting Fire Embers & Sparkles */}
            {!prefersReducedMotion && (
              <Sparkles
                count={60}
                scale={[3.2, 3.8, 1.5]}
                size={4.5}
                speed={1.2}
                color="#ff3344"
                opacity={0.9}
              />
            )}
          </group>

          {/* ======================================================== */}
          {/* 2. HOLLOWBODY GUITAR BODY (Cherry Red Archtop with Cutaway) */}
          {/* ======================================================== */}
          <group position={[0, 0, -0.14]}>
            <mesh castShadow receiveShadow>
              <extrudeGeometry args={[guitarBodyShape, extrudeSettings]} />
              <meshStandardMaterial
                color={bodyColor}
                roughness={0.22}
                metalness={0.5}
                emissive="#4a040b"
                emissiveIntensity={0.35}
              />
            </mesh>

            {/* Cream Soundboard Binding Outline */}
            <mesh position={[0, 0, 0.35]}>
              <extrudeGeometry
                args={[
                  guitarBodyShape,
                  {
                    depth: 0.015,
                    bevelEnabled: false,
                  },
                ]}
              />
              <meshStandardMaterial color="#f0ede6" roughness={0.4} metalness={0.1} />
            </mesh>
          </group>

          {/* Dual F-Holes (Cut into Soundboard) */}
          <mesh position={[0, 0, 0.22]}>
            <shapeGeometry args={[fHoleLeftShape]} />
            <meshBasicMaterial color="#08060a" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.22]}>
            <shapeGeometry args={[fHoleRightShape]} />
            <meshBasicMaterial color="#08060a" side={THREE.DoubleSide} />
          </mesh>

          {/* ======================================================== */}
          {/* 3. BIGSBY VIBRATO TAILPIECE & ROLLER BRIDGE              */}
          {/* ======================================================== */}
          <group position={[0, -1.05, 0.24]}>
            {/* Bigsby Frame Base Plate */}
            <mesh position={[0, -0.2, 0]}>
              <boxGeometry args={[0.55, 0.35, 0.04]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.12} />
            </mesh>

            {/* Cylindrical String Roller Bar */}
            <mesh position={[0, 0.02, 0.04]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.038, 0.038, 0.52, 16]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
            </mesh>

            {/* Heavy-Duty Compression Spring */}
            <mesh position={[0.15, 0.05, 0.05]}>
              <cylinderGeometry args={[0.045, 0.045, 0.12, 12]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.2} />
            </mesh>

            {/* Long Curved Bigsby Whammy Bar / Vibrato Arm */}
            <group position={[0.16, 0.1, 0.1]} rotation={[0.2, 0.1, -0.35]}>
              <mesh position={[0, 0.38, 0]}>
                <cylinderGeometry args={[0.016, 0.016, 0.75, 12]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.98} roughness={0.08} />
              </mesh>
              {/* Flat Paddle Handle Tip */}
              <mesh position={[0, 0.78, 0]}>
                <boxGeometry args={[0.07, 0.16, 0.018]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.98} roughness={0.08} />
              </mesh>
            </group>

            {/* Tune-o-matic Floating Rosewood Bridge Base */}
            <mesh position={[0, 0.38, 0.02]}>
              <boxGeometry args={[0.62, 0.08, 0.05]} />
              <meshStandardMaterial color="#2a1a14" roughness={0.6} />
            </mesh>
            {/* Chrome Bridge Saddles */}
            <mesh position={[0, 0.38, 0.06]}>
              <boxGeometry args={[0.58, 0.05, 0.04]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.15} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* 4. DUAL CHROME HUMBUCKERS & ELEVATED PICKGUARD           */}
          {/* ======================================================== */}
          {/* Bridge Pickup */}
          <group position={[0, -0.32, 0.24]}>
            <mesh>
              <boxGeometry args={[0.68, 0.26, 0.06]} />
              <meshStandardMaterial color="#1a1420" roughness={0.3} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[0.62, 0.22, 0.05]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
            </mesh>
          </group>

          {/* Neck Pickup */}
          <group position={[0, 0.22, 0.24]}>
            <mesh>
              <boxGeometry args={[0.68, 0.26, 0.06]} />
              <meshStandardMaterial color="#1a1420" roughness={0.3} metalness={0.4} />
            </mesh>
            <mesh position={[0, 0, 0.02]}>
              <boxGeometry args={[0.62, 0.22, 0.05]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
            </mesh>
          </group>

          {/* Elevated Vintage Pickguard with Chrome Bracket */}
          <mesh position={[0.38, -0.1, 0.28]} rotation={[0, 0, -0.1]}>
            <boxGeometry args={[0.34, 0.72, 0.025]} />
            <meshStandardMaterial
              color="#e0ded9"
              roughness={0.2}
              metalness={0.25}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Master Volume & Tone Knobs */}
          {[
            [0.55, -0.65, 0.25] as [number, number, number],
            [0.72, -0.85, 0.24] as [number, number, number],
            [0.58, -1.05, 0.23] as [number, number, number],
          ].map((pos, idx) => (
            <mesh key={`knob-${idx}`} position={pos}>
              <cylinderGeometry args={[0.055, 0.055, 0.06, 16]} />
              <meshStandardMaterial color={hardwareColor} metalness={0.95} roughness={0.15} />
            </mesh>
          ))}

          {/* ======================================================== */}
          {/* 5. MAPLE NECK & ROSEWOOD FRETBOARD                       */}
          {/* ======================================================== */}
          <mesh position={[0, 2.05, 0.16]} castShadow>
            <boxGeometry args={[0.32, 2.3, 0.14]} />
            <meshStandardMaterial color="#211815" roughness={0.45} metalness={0.1} />
          </mesh>

          {/* 22 Nickel Frets */}
          {Array.from({ length: 22 }).map((_, i) => {
            const fretY = 0.98 + i * 0.102;
            return (
              <mesh key={`fret-${i}`} position={[0, fretY, 0.24]}>
                <boxGeometry args={[0.31, 0.012, 0.015]} />
                <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
              </mesh>
            );
          })}

          {/* Pearloid Neo-Classic Thumbnail / Block Fret Inlays */}
          {[3, 5, 7, 9, 12, 15, 17, 19, 21].map((fret) => {
            const inlayY = 0.98 + (fret - 0.5) * 0.102;
            return (
              <mesh key={`inlay-${fret}`} position={[-0.08, inlayY, 0.242]}>
                <boxGeometry args={[0.07, 0.035, 0.005]} />
                <meshStandardMaterial color="#faf8f2" roughness={0.15} metalness={0.6} />
              </mesh>
            );
          })}

          {/* Bone Nut */}
          <mesh position={[0, 3.22, 0.24]}>
            <boxGeometry args={[0.32, 0.035, 0.03]} />
            <meshStandardMaterial color="#f0ece1" roughness={0.5} />
          </mesh>

          {/* ======================================================== */}
          {/* 6. SYMMETRICAL 3+3 CHERRY RED HEADSTOCK                  */}
          {/* ======================================================== */}
          <group position={[0, 3.65, 0.14]}>
            {/* Headstock Body */}
            <mesh>
              <boxGeometry args={[0.48, 0.82, 0.1]} />
              <meshStandardMaterial
                color={bodyColor}
                roughness={0.25}
                metalness={0.5}
                emissive="#3a040b"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Vintage Pearloid Inlay Logo */}
            <mesh position={[0, 0.1, 0.06]}>
              <boxGeometry args={[0.18, 0.06, 0.01]} />
              <meshStandardMaterial color="#f5f5f0" roughness={0.1} metalness={0.8} />
            </mesh>

            {/* 3 Chrome Tuning Pegs Left */}
            {[0.2, 0.0, -0.2].map((y, i) => (
              <group key={`peg-l-${i}`} position={[-0.32, y, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
                  <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
                </mesh>
                <mesh position={[-0.1, 0, 0]}>
                  <boxGeometry args={[0.09, 0.045, 0.018]} />
                  <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
                </mesh>
              </group>
            ))}

            {/* 3 Chrome Tuning Pegs Right */}
            {[0.2, 0.0, -0.2].map((y, i) => (
              <group key={`peg-r-${i}`} position={[0.32, y, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
                  <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
                </mesh>
                <mesh position={[0.1, 0, 0]}>
                  <boxGeometry args={[0.09, 0.045, 0.018]} />
                  <meshStandardMaterial color={hardwareColor} metalness={0.96} roughness={0.1} />
                </mesh>
              </group>
            ))}
          </group>

          {/* ======================================================== */}
          {/* 7. SIX STEEL GUITAR STRINGS                              */}
          {/* ======================================================== */}
          {[-0.11, -0.066, -0.022, 0.022, 0.066, 0.11].map((x, i) => (
            <mesh key={`string-${i}`} position={[x, 1.25, 0.27]}>
              <cylinderGeometry args={[0.004 + i * 0.001, 0.004 + i * 0.001, 4.6, 6]} />
              <meshStandardMaterial
                color="#f5f7fa"
                metalness={0.98}
                roughness={0.05}
                emissive={isVibrating ? "#ff2a3b" : "#ff6644"}
                emissiveIntensity={isVibrating ? 0.9 : 0.2}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}
