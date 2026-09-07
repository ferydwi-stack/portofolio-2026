"use client";

import { useRef, useState, useMemo } from "react";
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
 * Creates an organic 2D flame tongue shape with curved edges and a pointed tip
 */
function createFlameTongueShape(width: number, height: number, curl: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  // Left curve with natural flare
  shape.bezierCurveTo(
    -width * 0.6,
    height * 0.25,
    -width * 0.85 + curl,
    height * 0.6,
    -width * 0.2 + curl,
    height * 0.88
  );
  // Tip of the flame
  shape.bezierCurveTo(-width * 0.05 + curl, height * 0.98, 0, height, 0, height);
  // Right curve with flame flick
  shape.bezierCurveTo(
    width * 0.05 + curl,
    height * 0.98,
    width * 0.25 + curl,
    height * 0.88,
    width * 0.85 + curl,
    height * 0.6
  );
  shape.bezierCurveTo(width * 0.6, height * 0.25, width * 0.35, 0, 0, 0);
  return shape;
}

/**
 * Dynamic 3D Fiery Flame Aura & Roaring Licking Flames
 */
function RealisticFlameSystem({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const flameGroupRef = useRef<THREE.Group>(null);
  const fireLightRef = useRef<THREE.PointLight>(null);
  const embersRef = useRef<THREE.Points>(null);

  // Generate 20 distinct flame tongues around the ring
  const flameData = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const radius = 1.35 + (i % 3) * 0.12;
      const height = 0.95 + ((i * 7) % 5) * 0.16;
      const width = 0.38 + (i % 2) * 0.12;
      const curl = ((i % 3) - 1) * 0.1;
      const shape = createFlameTongueShape(width, height, curl);
      const isInner = i % 3 === 0;
      const isCore = i % 6 === 0;

      return {
        shape,
        angle,
        radius,
        height,
        width,
        color: isCore ? "#fff2a8" : isInner ? "#ff7700" : "#ff2211",
        opacity: isCore ? 0.95 : isInner ? 0.88 : 0.75,
        speed: 8 + (i % 4) * 2.5,
        phase: i * 0.9,
      };
    });
  }, []);

  // Rising fiery ember particles
  const emberParticles = useMemo(() => {
    const count = 55;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.6;
      positions[i * 3 + 1] = -1.6 + Math.random() * 3.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      speeds[i] = 0.8 + Math.random() * 1.4;
      sizes[i] = 12 + Math.random() * 16;
    }
    return { positions, speeds, sizes, count };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Rotate flame group smoothly
    if (flameGroupRef.current && !prefersReducedMotion) {
      flameGroupRef.current.rotation.z = t * 0.45;
    }

    // Dynamic firelight flicker (casting natural dancing shadows onto guitar)
    if (fireLightRef.current && !prefersReducedMotion) {
      fireLightRef.current.intensity =
        2.2 + Math.sin(t * 14) * 0.5 + Math.sin(t * 26) * 0.35 + (Math.random() - 0.5) * 0.2;
    }

    // Animate rising ember sparks
    if (embersRef.current && !prefersReducedMotion) {
      const positions = embersRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < emberParticles.count; i++) {
        positions[i * 3 + 1] += emberParticles.speeds[i] * 0.02;
        positions[i * 3] += Math.sin(t * 4 + i) * 0.008;

        // Reset ember to base when reaching top
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = -1.8;
          positions[i * 3] = (Math.random() - 0.5) * 2.4;
        }
      }
      embersRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -0.3, -0.08]}>
      {/* Dynamic Warm Flame Light Source */}
      <pointLight
        ref={fireLightRef}
        color="#ff4411"
        intensity={2.4}
        distance={6}
        decay={2}
        position={[0, 0, 0.45]}
      />

      {/* Core Glowing Ember Fire Ring Base */}
      <mesh>
        <ringGeometry args={[1.15, 1.55, 32]} />
        <meshBasicMaterial
          color="#ff3311"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={[1.05, 1.15, 1]}>
        <ringGeometry args={[1.0, 1.35, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Licking 3D Flame Tongues */}
      <group ref={flameGroupRef}>
        {flameData.map((flame, idx) => {
          const posX = Math.cos(flame.angle) * flame.radius;
          const posY = Math.sin(flame.angle) * flame.radius;
          const rotZ = flame.angle - Math.PI / 2;

          return (
            <mesh
              key={`flame-${idx}`}
              position={[posX, posY, 0]}
              rotation={[0, 0, rotZ]}
              scale={[1, 1, 1]}
            >
              <shapeGeometry args={[flame.shape]} />
              <meshBasicMaterial
                color={flame.color}
                transparent
                opacity={flame.opacity}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
                depthWrite={false}
              />
            </mesh>
          );
        })}
      </group>

      {/* Rising Floating Sparks & Embers */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emberParticles.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          color="#ff6622"
          transparent
          opacity={0.88}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Masterpiece Fiery Electric Guitar with Cherry Red Lacquer Sunburst,
 * Polished Chrome Hardware, PAF Humbuckers & Bigsby Tremolo
 */
export function StandaloneGuitar({
  bodyColor = "#a30e1d", // Deep Candy Apple Crimson Red Lacquer
  hardwareColor = "#f0f2f5", // High-grade Polished Chrome
}: StandaloneGuitarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const guitarMeshRef = useRef<THREE.Group>(null);
  const [isVibrating, setIsVibrating] = useState(false);
  const [scaleSpring, setScaleSpring] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  // Curvature for the Archtop Hollow Body with Venetian Cutaway
  const guitarBodyShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.5);
    shape.bezierCurveTo(0.82, -1.5, 1.15, -1.02, 1.08, -0.4);
    shape.bezierCurveTo(1.02, 0.0, 0.66, 0.1, 0.66, 0.4);
    shape.bezierCurveTo(0.66, 0.7, 0.92, 0.9, 0.86, 1.12);
    shape.bezierCurveTo(0.72, 1.34, 0.42, 1.26, 0.25, 0.95);
    shape.lineTo(0.2, 0.95);
    shape.lineTo(-0.2, 0.95);
    shape.bezierCurveTo(-0.4, 1.22, -0.72, 1.16, -0.88, 0.92);
    shape.bezierCurveTo(-0.96, 0.66, -0.72, 0.36, -0.66, 0.2);
    shape.bezierCurveTo(-0.66, 0.0, -0.98, -0.2, -1.08, -0.4);
    shape.bezierCurveTo(-1.18, -0.82, -0.92, -1.45, 0, -1.5);
    return shape;
  }, []);

  // Multi-ply Soundboard Binding Outline (Slightly larger outline to create luxury perimeter bead)
  const soundboardRimShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -1.52);
    shape.bezierCurveTo(0.84, -1.52, 1.17, -1.03, 1.1, -0.4);
    shape.bezierCurveTo(1.04, 0.01, 0.68, 0.11, 0.68, 0.41);
    shape.bezierCurveTo(0.68, 0.72, 0.94, 0.92, 0.88, 1.14);
    shape.bezierCurveTo(0.74, 1.36, 0.43, 1.28, 0.26, 0.97);
    shape.lineTo(0.21, 0.97);
    shape.lineTo(-0.21, 0.97);
    shape.bezierCurveTo(-0.42, 1.24, -0.74, 1.18, -0.9, 0.94);
    shape.bezierCurveTo(-0.98, 0.68, -0.74, 0.38, -0.68, 0.21);
    shape.bezierCurveTo(-0.68, 0.01, -1.0, -0.2, -1.1, -0.4);
    shape.bezierCurveTo(-1.2, -0.83, -0.94, -1.47, 0, -1.52);
    return shape;
  }, []);

  // Body depth extrude with smooth bevels
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 7,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    }),
    []
  );

  // F-Hole Shapes
  const fHoleLeftShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.46, -0.62);
    shape.bezierCurveTo(-0.5, -0.32, -0.38, 0.0, -0.43, 0.26);
    shape.bezierCurveTo(-0.47, 0.32, -0.41, 0.34, -0.37, 0.26);
    shape.bezierCurveTo(-0.33, 0.0, -0.44, -0.32, -0.39, -0.62);
    shape.closePath();
    return shape;
  }, []);

  const fHoleRightShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.46, -0.62);
    shape.bezierCurveTo(0.5, -0.32, 0.38, 0.0, 0.43, 0.26);
    shape.bezierCurveTo(0.47, 0.32, 0.41, 0.34, 0.37, 0.26);
    shape.bezierCurveTo(0.33, 0.0, 0.44, -0.32, 0.39, -0.62);
    shape.closePath();
    return shape;
  }, []);

  // Click / Strum interaction
  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsVibrating(true);
    setScaleSpring(1.08);
    playGuitarChord(110); // A2 rock power chord

    setTimeout(() => {
      setScaleSpring(1);
      setTimeout(() => setIsVibrating(false), 300);
    }, 120);
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Read real-time scroll progress
    const scrollProgress = useScrollStore.getState().scrollProgress || 0;

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

    // Vibration physics decay
    if (guitarMeshRef.current) {
      const currentScale = guitarMeshRef.current.scale.x;
      const targetScale =
        scaleSpring * (isVibrating ? 1 + Math.sin(Date.now() * 0.14) * 0.025 : 1);
      const nextScale = THREE.MathUtils.damp(currentScale, targetScale, 15, delta);
      guitarMeshRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group ref={groupRef} position={[1.15, -0.05, 0]}>
      <Float
        speed={prefersReducedMotion ? 0 : 2.2}
        rotationIntensity={prefersReducedMotion ? 0 : 0.4}
        floatIntensity={prefersReducedMotion ? 0 : 1.2}
        floatingRange={[-0.1, 0.1]}
      >
        <group
          ref={guitarMeshRef}
          onClick={handleClick}
          scale={[1.2, 1.2, 1.2]}
          rotation={[0.12, 0, -0.18]}
        >
          {/* ======================================================== */}
          {/* 1. AUTHENTIC 3D FLAME SYSTEM (Dynamic Licking Flames)    */}
          {/* ======================================================== */}
          <RealisticFlameSystem prefersReducedMotion={prefersReducedMotion} />

          {/* ======================================================== */}
          {/* 2. CHERRY RED LACQUER SUNBURST HOLLOW BODY               */}
          {/* ======================================================== */}
          <group position={[0, 0, -0.14]}>
            {/* Main Archtop Cherry Red Lacquered Body */}
            <mesh castShadow receiveShadow>
              <extrudeGeometry args={[guitarBodyShape, extrudeSettings]} />
              <meshPhysicalMaterial
                color={bodyColor}
                roughness={0.12}
                metalness={0.2}
                clearcoat={1.0}
                clearcoatRoughness={0.06}
                reflectivity={0.9}
                emissive="#4d0309"
                emissiveIntensity={0.3}
              />
            </mesh>

            {/* Vintage Multi-Ply Cream/Black Edge Binding Rim */}
            <mesh position={[0, 0, 0.285]}>
              <extrudeGeometry
                args={[
                  soundboardRimShape,
                  {
                    depth: 0.012,
                    bevelEnabled: false,
                  },
                ]}
              />
              <meshStandardMaterial
                color="#f8f5ee"
                roughness={0.3}
                metalness={0.15}
              />
            </mesh>

            {/* Glossy Cherry Sunburst Soundboard Face Inset */}
            <mesh position={[0, 0, 0.292]}>
              <shapeGeometry args={[guitarBodyShape]} />
              <meshPhysicalMaterial
                color="#b81022"
                roughness={0.08}
                metalness={0.16}
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                reflectivity={0.95}
                emissive="#3d0307"
                emissiveIntensity={0.2}
              />
            </mesh>
          </group>

          {/* Dual F-Holes with Deep Acoustic Shadow */}
          <mesh position={[0, 0, 0.16]}>
            <shapeGeometry args={[fHoleLeftShape]} />
            <meshBasicMaterial color="#050307" side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, 0.16]}>
            <shapeGeometry args={[fHoleRightShape]} />
            <meshBasicMaterial color="#050307" side={THREE.DoubleSide} />
          </mesh>

          {/* ======================================================== */}
          {/* 3. POLISHED CHROME BIGSBY B7 VIBRATO & ROLLER BRIDGE     */}
          {/* ======================================================== */}
          <group position={[0, -1.02, 0.18]}>
            {/* Bigsby Hinge & Main Cast Aluminum Plate */}
            <mesh position={[0, -0.22, 0]}>
              <boxGeometry args={[0.56, 0.38, 0.04]} />
              <meshStandardMaterial
                color={hardwareColor}
                metalness={0.98}
                roughness={0.08}
              />
            </mesh>

            {/* Bigsby Roller String Bar */}
            <mesh position={[0, 0.02, 0.04]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.038, 0.038, 0.54, 16]} />
              <meshStandardMaterial
                color={hardwareColor}
                metalness={0.98}
                roughness={0.06}
              />
            </mesh>

            {/* Heavy-Duty Spring Mount & Helical Spring */}
            <mesh position={[0.15, 0.06, 0.06]}>
              <cylinderGeometry args={[0.05, 0.05, 0.14, 16]} />
              <meshStandardMaterial
                color={hardwareColor}
                metalness={0.98}
                roughness={0.12}
              />
            </mesh>

            {/* Long Whammy Bar Arm with Swivel Mount */}
            <group position={[0.16, 0.1, 0.12]} rotation={[0.18, 0.08, -0.32]}>
              <mesh position={[0, 0.38, 0]}>
                <cylinderGeometry args={[0.016, 0.016, 0.78, 12]} />
                <meshStandardMaterial
                  color={hardwareColor}
                  metalness={0.99}
                  roughness={0.05}
                />
              </mesh>
              {/* Flat Paddle Handle */}
              <mesh position={[0, 0.8, 0]}>
                <boxGeometry args={[0.075, 0.18, 0.018]} />
                <meshStandardMaterial
                  color={hardwareColor}
                  metalness={0.99}
                  roughness={0.05}
                />
              </mesh>
            </group>

            {/* Tune-O-Matic Bridge Base (Rosewood + Chrome Saddles) */}
            <mesh position={[0, 0.42, 0.02]}>
              <boxGeometry args={[0.64, 0.08, 0.05]} />
              <meshStandardMaterial color="#1f140e" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.42, 0.06]}>
              <boxGeometry args={[0.6, 0.045, 0.04]} />
              <meshStandardMaterial
                color={hardwareColor}
                metalness={0.98}
                roughness={0.1}
              />
            </mesh>
            {/* 6 Individual Bridge Saddles */}
            {[-0.22, -0.13, -0.04, 0.04, 0.13, 0.22].map((x, idx) => (
              <mesh key={`saddle-${idx}`} position={[x, 0.42, 0.085]}>
                <boxGeometry args={[0.04, 0.03, 0.02]} />
                <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
              </mesh>
            ))}
          </group>

          {/* ======================================================== */}
          {/* 4. DUAL PAF HUMBUCKER PICKUPS (Chrome Covers + Pole Pieces)*/}
          {/* ======================================================== */}
          {/* Bridge Humbucker */}
          <group position={[0, -0.28, 0.18]}>
            {/* Black Mounting Ring */}
            <mesh>
              <boxGeometry args={[0.72, 0.28, 0.05]} />
              <meshStandardMaterial color="#0c0910" roughness={0.3} metalness={0.3} />
            </mesh>
            {/* Polished Chrome Pickup Cover */}
            <mesh position={[0, 0, 0.03]}>
              <boxGeometry args={[0.64, 0.22, 0.04]} />
              <meshStandardMaterial
                color={hardwareColor}
                metalness={0.99}
                roughness={0.06}
              />
            </mesh>
            {/* 6 Exposed Pole Piece Screws */}
            {[-0.22, -0.13, -0.04, 0.04, 0.13, 0.22].map((x, i) => (
              <mesh key={`bpole-${i}`} position={[x, 0.04, 0.052]}>
                <cylinderGeometry args={[0.02, 0.02, 0.015, 12]} />
                <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.02} />
              </mesh>
            ))}
          </group>

          {/* Neck Humbucker */}
          <group position={[0, 0.26, 0.18]}>
            {/* Black Mounting Ring */}
            <mesh>
              <boxGeometry args={[0.72, 0.28, 0.05]} />
              <meshStandardMaterial color="#0c0910" roughness={0.3} metalness={0.3} />
            </mesh>
            {/* Polished Chrome Pickup Cover */}
            <mesh position={[0, 0, 0.03]}>
              <boxGeometry args={[0.64, 0.22, 0.04]} />
              <meshStandardMaterial
                color={hardwareColor}
                metalness={0.99}
                roughness={0.06}
              />
            </mesh>
            {/* 6 Exposed Pole Piece Screws */}
            {[-0.22, -0.13, -0.04, 0.04, 0.13, 0.22].map((x, i) => (
              <mesh key={`npole-${i}`} position={[x, -0.04, 0.052]}>
                <cylinderGeometry args={[0.02, 0.02, 0.015, 12]} />
                <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.02} />
              </mesh>
            ))}
          </group>

          {/* Elevated Multi-Ply Black Pickguard */}
          <mesh position={[0.42, -0.06, 0.22]} rotation={[0, 0, -0.12]}>
            <boxGeometry args={[0.34, 0.76, 0.022]} />
            <meshPhysicalMaterial
              color="#0d0a12"
              roughness={0.12}
              metalness={0.4}
              clearcoat={0.9}
              reflectivity={0.8}
            />
          </mesh>

          {/* 4 Vintage Gold/Amber Top-Hat Bell Knobs */}
          {[
            [0.56, -0.62, 0.19] as [number, number, number],
            [0.74, -0.82, 0.18] as [number, number, number],
            [0.54, -0.98, 0.17] as [number, number, number],
            [0.72, -1.18, 0.16] as [number, number, number],
          ].map((pos, idx) => (
            <group key={`knob-${idx}`} position={pos}>
              <mesh>
                <cylinderGeometry args={[0.058, 0.068, 0.055, 16]} />
                <meshPhysicalMaterial
                  color="#d49b28"
                  metalness={0.7}
                  roughness={0.18}
                  clearcoat={0.8}
                />
              </mesh>
              {/* Silver Top Indicator Cap */}
              <mesh position={[0, 0.03, 0]}>
                <cylinderGeometry args={[0.045, 0.045, 0.01, 16]} />
                <meshStandardMaterial color="#f0f0f0" metalness={0.98} roughness={0.08} />
              </mesh>
            </group>
          ))}

          {/* 3-Way Pickup Toggle Switch */}
          <group position={[-0.52, 0.55, 0.18]}>
            <mesh>
              <cylinderGeometry args={[0.045, 0.045, 0.015, 16]} />
              <meshStandardMaterial color="#f8f5ed" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.035, 0.02]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.07, 8]} />
              <meshStandardMaterial color="#ffc107" roughness={0.2} metalness={0.3} />
            </mesh>
          </group>

          {/* ======================================================== */}
          {/* 5. ROSEWOOD FRETBOARD & NICKEL-SILVER FRETS              */}
          {/* ======================================================== */}
          {/* Fretboard Slab */}
          <mesh position={[0, 2.05, 0.12]} castShadow>
            <boxGeometry args={[0.33, 2.32, 0.12]} />
            <meshStandardMaterial color="#1a120e" roughness={0.4} metalness={0.08} />
          </mesh>

          {/* 22 Nickel-Silver Frets */}
          {Array.from({ length: 22 }).map((_, i) => {
            const fretY = 0.98 + i * 0.102;
            return (
              <mesh key={`fret-${i}`} position={[0, fretY, 0.19]}>
                <boxGeometry args={[0.32, 0.012, 0.015]} />
                <meshStandardMaterial
                  color={hardwareColor}
                  metalness={0.98}
                  roughness={0.08}
                />
              </mesh>
            );
          })}

          {/* Mother-of-Pearl Fret Inlay Markers */}
          {[3, 5, 7, 9, 12, 15, 17, 19, 21].map((fret) => {
            const inlayY = 0.98 + (fret - 0.5) * 0.102;
            return (
              <mesh key={`inlay-${fret}`} position={[0, inlayY, 0.192]}>
                <boxGeometry args={[0.14, 0.038, 0.005]} />
                <meshStandardMaterial
                  color="#faf8f2"
                  roughness={0.08}
                  metalness={0.7}
                />
              </mesh>
            );
          })}

          {/* Bone Nut */}
          <mesh position={[0, 3.22, 0.19]}>
            <boxGeometry args={[0.33, 0.035, 0.03]} />
            <meshStandardMaterial color="#f7f4ea" roughness={0.4} />
          </mesh>

          {/* ======================================================== */}
          {/* 6. SYMMETRICAL 3+3 CHERRY RED HEADSTOCK                  */}
          {/* ======================================================== */}
          <group position={[0, 3.65, 0.1]}>
            {/* Glossy Lacquered Headstock Face */}
            <mesh>
              <boxGeometry args={[0.5, 0.84, 0.09]} />
              <meshPhysicalMaterial
                color={bodyColor}
                roughness={0.12}
                metalness={0.2}
                clearcoat={1.0}
                emissive="#3d0308"
                emissiveIntensity={0.25}
              />
            </mesh>

            {/* Mother-of-Pearl Custom FDR Inlay */}
            <mesh position={[0, 0.14, 0.052]}>
              <boxGeometry args={[0.2, 0.065, 0.01]} />
              <meshStandardMaterial
                color="#ffffff"
                roughness={0.05}
                metalness={0.85}
              />
            </mesh>

            {/* 3 Chrome Tuning Pegs Left */}
            {[0.22, 0.02, -0.18].map((y, i) => (
              <group key={`peg-l-${i}`} position={[-0.34, y, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.016, 0.016, 0.18, 12]} />
                  <meshStandardMaterial
                    color={hardwareColor}
                    metalness={0.98}
                    roughness={0.08}
                  />
                </mesh>
                <mesh position={[-0.11, 0, 0]}>
                  <boxGeometry args={[0.095, 0.048, 0.018]} />
                  <meshStandardMaterial
                    color={hardwareColor}
                    metalness={0.98}
                    roughness={0.08}
                  />
                </mesh>
              </group>
            ))}

            {/* 3 Chrome Tuning Pegs Right */}
            {[0.22, 0.02, -0.18].map((y, i) => (
              <group key={`peg-r-${i}`} position={[0.34, y, 0]}>
                <mesh rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.016, 0.016, 0.18, 12]} />
                  <meshStandardMaterial
                    color={hardwareColor}
                    metalness={0.98}
                    roughness={0.08}
                  />
                </mesh>
                <mesh position={[0.11, 0, 0]}>
                  <boxGeometry args={[0.095, 0.048, 0.018]} />
                  <meshStandardMaterial
                    color={hardwareColor}
                    metalness={0.98}
                    roughness={0.08}
                  />
                </mesh>
              </group>
            ))}
          </group>

          {/* ======================================================== */}
          {/* 7. SIX GLEAMING STEEL GUITAR STRINGS                     */}
          {/* ======================================================== */}
          {[-0.11, -0.066, -0.022, 0.022, 0.066, 0.11].map((x, i) => (
            <mesh key={`string-${i}`} position={[x, 1.25, 0.22]}>
              <cylinderGeometry args={[0.004 + i * 0.0012, 0.004 + i * 0.0012, 4.6, 8]} />
              <meshStandardMaterial
                color="#f8fafc"
                metalness={0.99}
                roughness={0.03}
                emissive={isVibrating ? "#ff2a3b" : "#ff5533"}
                emissiveIntensity={isVibrating ? 1.0 : 0.25}
              />
            </mesh>
          ))}
        </group>
      </Float>
    </group>
  );
}
