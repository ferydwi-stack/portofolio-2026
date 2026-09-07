"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Low-poly procedural Electric Guitar
function ElectricGuitar() {
  const groupRef = useRef<THREE.Group>(null);

  // Procedural guitar body shape
  const bodyShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Start at bottom center
    shape.moveTo(0, -1.8);
    // Lower right bout
    shape.bezierCurveTo(1.1, -1.8, 1.4, -0.9, 1.2, 0);
    // Right waist cut
    shape.bezierCurveTo(1.0, 0.4, 0.7, 0.6, 0.9, 1.0);
    // Right horn (cutaway)
    shape.bezierCurveTo(1.1, 1.4, 1.2, 1.9, 0.6, 1.7);
    shape.bezierCurveTo(0.4, 1.5, 0.3, 1.1, 0.2, 0.8);
    // Neck pocket
    shape.lineTo(-0.2, 0.8);
    // Left horn (cutaway)
    shape.bezierCurveTo(-0.3, 1.1, -0.4, 1.5, -0.6, 1.9);
    shape.bezierCurveTo(-1.3, 2.1, -1.2, 1.3, -0.9, 0.9);
    // Left waist cut
    shape.bezierCurveTo(-0.7, 0.5, -1.0, 0.3, -1.2, 0);
    // Lower left bout
    shape.bezierCurveTo(-1.4, -0.9, -1.1, -1.8, 0, -1.8);
    return shape;
  }, []);

  const extrudeSettings = useMemo(
    () => ({
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    }),
    []
  );

  // Strings positions
  const strings = useMemo(() => {
    const arr = [];
    const count = 6;
    const width = 0.16;
    for (let i = 0; i < count; i++) {
      const x = -width / 2 + (i / (count - 1)) * width;
      arr.push(x);
    }
    return arr;
  }, []);

  // Animate gentle floating, reactive rotation, and mouse tilt
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const mouse = state.pointer;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      Math.sin(t * 0.4) * 0.2 + mouse.x * 0.4 + 0.15,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      Math.cos(t * 0.3) * 0.1 - mouse.y * 0.3 - 0.1,
      0.05
    );
    groupRef.current.rotation.z = -0.3 + Math.sin(t * 0.25) * 0.05;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef} scale={1.15} position={[0, -0.2, 0]}>
      {/* Guitar Body */}
      <mesh position={[0, 0, -0.11]} castShadow receiveShadow>
        <extrudeGeometry args={[bodyShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#181116"
          roughness={0.25}
          metalness={0.8}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Crimson Sunburst / Pickguard Accent */}
      <mesh position={[0, -0.2, 0.16]}>
        <circleGeometry args={[0.7, 32]} />
        <meshStandardMaterial
          color="#ff2238"
          roughness={0.4}
          metalness={0.5}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, 2.2, 0.04]} castShadow>
        <boxGeometry args={[0.24, 2.8, 0.14]} />
        <meshStandardMaterial color="#2d221c" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Fretboard & Frets */}
      <mesh position={[0, 2.2, 0.12]}>
        <boxGeometry args={[0.22, 2.76, 0.02]} />
        <meshStandardMaterial color="#1a1412" roughness={0.4} />
      </mesh>

      {/* Headstock */}
      <mesh position={[-0.03, 3.85, 0.02]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.3, 0.7, 0.12]} />
        <meshStandardMaterial color="#181116" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Tuning Pegs */}
      {[-0.2, 0, 0.2].map((yOffset, idx) => (
        <group key={`peg-${idx}`} position={[0.16, 3.8 + yOffset, 0.04]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 0.15, 8]} />
            <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Pickups (Bridge & Neck Humbuckers) */}
      <mesh position={[0, 0.4, 0.14]}>
        <boxGeometry args={[0.4, 0.2, 0.06]} />
        <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.2, 0.14]}>
        <boxGeometry args={[0.4, 0.2, 0.06]} />
        <meshStandardMaterial color="#09090b" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Bridge */}
      <mesh position={[0, -0.8, 0.14]}>
        <boxGeometry args={[0.36, 0.16, 0.08]} />
        <meshStandardMaterial color="#d4d4d8" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Chrome Volume/Tone Knobs */}
      <mesh position={[0.45, -0.9, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.35, -1.2, 0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Strings */}
      {strings.map((xPos, idx) => (
        <mesh key={`string-${idx}`} position={[xPos, 1.45, 0.16]}>
          <cylinderGeometry args={[0.004, 0.004, 4.6, 6]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

// Precomputed deterministic stage sparks
const PARTICLE_COUNT = 75;
const sparkPositions = new Float32Array(PARTICLE_COUNT * 3);
const sparkColors = new Float32Array(PARTICLE_COUNT * 3);
const crimsonCol = new THREE.Color("#ff334b");
const amberCol = new THREE.Color("#ffaa22");

for (let i = 0; i < PARTICLE_COUNT; i++) {
  // Deterministic pseudo-random distribution
  const seedX = Math.sin(i * 12.9898) * 43758.5453;
  const seedY = Math.sin((i + 1) * 78.233) * 43758.5453;
  const seedZ = Math.sin((i + 2) * 45.164) * 43758.5453;

  sparkPositions[i * 3] = ((seedX - Math.floor(seedX)) - 0.5) * 8;
  sparkPositions[i * 3 + 1] = ((seedY - Math.floor(seedY)) - 0.5) * 8;
  sparkPositions[i * 3 + 2] = ((seedZ - Math.floor(seedZ)) - 0.5) * 5;

  const mixed = i % 2 === 0 ? crimsonCol : amberCol;
  sparkColors[i * 3] = mixed.r;
  sparkColors[i * 3 + 1] = mixed.g;
  sparkColors[i * 3 + 2] = mixed.b;
}

// Stage Sparks / Dust Particles floating in the stage lights
function StageSparks() {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime() * 0.15;
    pointsRef.current.rotation.y = t * 0.2;
    pointsRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[sparkPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[sparkColors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeStageGuitar() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Stage Lighting */}
        <ambientLight intensity={0.4} />
        {/* Amber Stage Spotlight from top left */}
        <spotLight
          position={[-4, 5, 4]}
          angle={0.6}
          penumbra={0.8}
          intensity={3.5}
          color="#ffb347"
          castShadow
        />
        {/* Crimson Red Rim Light from behind right */}
        <pointLight position={[3, -1, -2]} intensity={4.5} color="#ff2a3b" />
        {/* Fill White Light */}
        <directionalLight position={[0, 2, 4]} intensity={1.2} color="#ffffff" />

        <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
          <ElectricGuitar />
        </Float>

        <StageSparks />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
