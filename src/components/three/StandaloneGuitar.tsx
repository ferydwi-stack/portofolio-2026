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
 * GLSL Procedural 99% Photorealistic Concert Stage Fire Shader
 * Fluid thermal convection, multi-octave simplex fBM noise, and blackbody temperature color ramp
 */
const fireVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fireFragmentShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uFlameScale;
  uniform float uIntensityMultiplier;
  varying vec2 vUv;

  // 2D Simplex Noise hash
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(in vec2 p) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2
    const float K2 = 0.211324865; // (3-sqrt(3))/6
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 uv) {
    float f = 0.0;
    f += 0.5000 * noise(uv); uv *= 2.02;
    f += 0.2500 * noise(uv); uv *= 2.04;
    f += 0.1250 * noise(uv); uv *= 2.01;
    f += 0.0625 * noise(uv);
    return f;
  }

  void main() {
    vec2 uv = vUv;

    // Upward flame convection physics
    float t = uTime * uSpeed;

    // Teardrop flame envelope (wide bottom, tapered pointed top)
    float centerDist = abs(uv.x - 0.5) * 2.0;
    float verticalFade = clamp(1.0 - uv.y, 0.0, 1.0);
    float widthAtY = mix(0.92, 0.08, pow(clamp(uv.y, 0.0, 1.0), 0.75));
    float envelope = smoothstep(widthAtY, widthAtY - 0.38, centerDist) * verticalFade;

    // Organic noise coordinates
    vec2 noiseCoord = uv * vec2(2.4, 1.6) * uFlameScale;
    float n1 = fbm(noiseCoord - vec2(0.0, t * 1.6));
    float n2 = fbm(noiseCoord * 1.8 - vec2(t * 0.5, t * 2.1));

    // Flame tongue turbulent lick displacement
    float flameDensity = fbm(noiseCoord + vec2(n1 * 0.42, -t * 2.4 + n2 * 0.3));

    // Combine envelope & noise
    float intensity = envelope * (flameDensity * 1.5 + 0.55) - uv.y * 0.55;
    intensity = clamp(intensity * uIntensityMultiplier, 0.0, 1.0);

    if (intensity < 0.015) {
      discard;
    }

    // High-fidelity Temperature Gradient matching Cherry Sunburst Guitar:
    // Smoky Crimson -> Deep Ruby Cherry -> Vivid Neon Scarlet -> Blazing Amber Orange -> Hot Golden Yellow -> White-Hot Core
    vec3 color;
    if (intensity < 0.22) {
      color = mix(vec3(0.28, 0.01, 0.03), vec3(0.88, 0.05, 0.12), intensity / 0.22);
    } else if (intensity < 0.52) {
      color = mix(vec3(0.88, 0.05, 0.12), vec3(1.0, 0.32, 0.0), (intensity - 0.22) / 0.30);
    } else if (intensity < 0.82) {
      color = mix(vec3(1.0, 0.32, 0.0), vec3(1.0, 0.84, 0.18), (intensity - 0.52) / 0.30);
    } else {
      color = mix(vec3(1.0, 0.84, 0.18), vec3(1.0, 0.98, 0.92), (intensity - 0.82) / 0.18);
    }

    gl_FragColor = vec4(color, intensity * 0.96);
  }
`;

/**
 * Creates procedural authentic Gibson Custom Shop Cherry Sunburst with Flamed Maple Tiger Grain
 */
function createCherrySunburstTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  // 1. Rich 5-Stop Radial Sunburst Gradient
  // Center is warm glowing amber honey, transitioning into vivid ruby cherry, deep wine crimson, and dark mahogany edge
  const grad = ctx.createRadialGradient(512, 540, 40, 512, 520, 500);
  grad.addColorStop(0.0, "#ffb326"); // Warm Honey Amber center
  grad.addColorStop(0.25, "#e62234"); // Radiant Cherry Red
  grad.addColorStop(0.55, "#ad0a1b"); // Deep Ruby Crimson
  grad.addColorStop(0.82, "#52040b"); // Dark Wine Burgundy
  grad.addColorStop(1.0, "#1c0104"); // Edge Mahogany Burst

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. High-End 3D Curly Flamed Maple "Tiger Stripe" Wood Grain
  ctx.save();
  ctx.globalCompositeOperation = "overlay";
  for (let y = 0; y < 1024; y += 6) {
    const waveFreq = 0.015;
    const waveAmp = 5 + Math.sin(y * 0.02) * 3;
    const alpha = 0.08 + Math.sin(y * 0.04) * 0.05;

    ctx.fillStyle = y % 12 === 0 ? `rgba(255, 235, 180, ${alpha})` : `rgba(0, 0, 0, ${alpha * 1.4})`;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 16) {
      ctx.lineTo(x, y + Math.sin(x * waveFreq) * waveAmp);
    }
    ctx.lineTo(1024, y + 4);
    ctx.lineTo(0, y + 4);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  // 3. Fine Vertical Wood Pore Grain Texture
  ctx.save();
  ctx.globalAlpha = 0.04;
  for (let x = 0; x < 1024; x += 3) {
    ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
    ctx.fillRect(x, 0, 1, 1024);
  }
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 99% Photorealistic Roaring Concert Fire Plumes & Rising Ember Sparks
 */
function RealisticFlameSystem({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const mainFlameMatRef = useRef<THREE.ShaderMaterial>(null);
  const leftFlameMatRef = useRef<THREE.ShaderMaterial>(null);
  const rightFlameMatRef = useRef<THREE.ShaderMaterial>(null);
  const baseFlameMatRef = useRef<THREE.ShaderMaterial>(null);
  const fireLightRef = useRef<THREE.PointLight>(null);
  const embersRef = useRef<THREE.Points>(null);

  // Common Shader Material Constructor
  const createFireMaterial = (speed = 1.0, flameScale = 1.0, intensity = 1.0) => {
    return new THREE.ShaderMaterial({
      vertexShader: fireVertexShader,
      fragmentShader: fireFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uFlameScale: { value: flameScale },
        uIntensityMultiplier: { value: intensity },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  };

  const mainMat = useMemo(() => createFireMaterial(1.15, 0.95, 1.0), []);
  const leftMat = useMemo(() => createFireMaterial(1.35, 1.25, 0.95), []);
  const rightMat = useMemo(() => createFireMaterial(1.3, 1.2, 0.95), []);
  const baseMat = useMemo(() => createFireMaterial(1.45, 1.5, 1.05), []);

  // Rising embers & sparks drifting upwards
  const emberParticles = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2.8;
      positions[i * 3 + 1] = -1.8 + Math.random() * 4.2;
      positions[i * 3 + 2] = -0.15 + (Math.random() - 0.5) * 0.9;
      speeds[i] = 1.0 + Math.random() * 1.8;
    }
    return { positions, speeds, count };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      if (mainFlameMatRef.current) mainFlameMatRef.current.uniforms.uTime.value = t;
      if (leftFlameMatRef.current) leftFlameMatRef.current.uniforms.uTime.value = t + 0.3;
      if (rightFlameMatRef.current) rightFlameMatRef.current.uniforms.uTime.value = t + 0.7;
      if (baseFlameMatRef.current) baseFlameMatRef.current.uniforms.uTime.value = t + 1.1;

      // Authentic firelight flicker
      if (fireLightRef.current) {
        fireLightRef.current.intensity =
          3.0 + Math.sin(t * 16) * 0.6 + Math.sin(t * 29) * 0.4 + (Math.random() - 0.5) * 0.25;
      }

      // Animate rising ember sparks
      if (embersRef.current) {
        const positions = embersRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < emberParticles.count; i++) {
          positions[i * 3 + 1] += emberParticles.speeds[i] * 0.025;
          positions[i * 3] += Math.sin(t * 4.5 + i) * 0.008;

          if (positions[i * 3 + 1] > 3.4) {
            positions[i * 3 + 1] = -1.9;
            positions[i * 3] = (Math.random() - 0.5) * 2.6;
          }
        }
        embersRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group position={[0, -0.15, -0.18]}>
      {/* Dynamic Warm Pyrotechnic Fire Light */}
      <pointLight
        ref={fireLightRef}
        color="#ff4411"
        intensity={3.2}
        distance={7.5}
        decay={2}
        position={[0, -0.1, 0.7]}
      />

      {/* 1. Main Roaring Fire Plume (Rising Directly Behind Guitar Body) */}
      <mesh position={[0, 0.45, -0.06]} scale={[2.6, 3.8, 1]}>
        <planeGeometry args={[1, 1, 16, 16]} />
        <primitive object={mainMat} ref={mainFlameMatRef} attach="material" />
      </mesh>

      {/* 2. Left Flanking Roaring Flame Tongue */}
      <mesh
        position={[-0.85, 0.15, -0.04]}
        rotation={[0, 0, 0.18]}
        scale={[1.6, 3.2, 1]}
      >
        <planeGeometry args={[1, 1, 16, 16]} />
        <primitive object={leftMat} ref={leftFlameMatRef} attach="material" />
      </mesh>

      {/* 3. Right Flanking Roaring Flame Tongue */}
      <mesh
        position={[0.85, 0.15, -0.04]}
        rotation={[0, 0, -0.18]}
        scale={[1.6, 3.2, 1]}
      >
        <planeGeometry args={[1, 1, 16, 16]} />
        <primitive object={rightMat} ref={rightFlameMatRef} attach="material" />
      </mesh>

      {/* 4. Base Fiery Pyrotechnic Firebed (Under Tailpiece) */}
      <mesh position={[0, -1.05, -0.02]} scale={[2.2, 1.8, 1]}>
        <planeGeometry args={[1, 1, 16, 16]} />
        <primitive object={baseMat} ref={baseFlameMatRef} attach="material" />
      </mesh>

      {/* 5. Glowing Fiery Ember Sparks */}
      <points ref={embersRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[emberParticles.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ff7722"
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * Masterpiece Cherry Sunburst Flamed Maple Hollow-Body Electric Guitar
 * With Polished Chrome Bigsby Vibrato, Dual PAF Humbuckers & Photorealistic Stage Flames
 */
export function StandaloneGuitar({
  hardwareColor = "#f0f2f5", // High-grade Polished Chrome
}: StandaloneGuitarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const guitarMeshRef = useRef<THREE.Group>(null);
  const [isVibrating, setIsVibrating] = useState(false);
  const [scaleSpring, setScaleSpring] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  // Create Hand-rubbed Cherry Sunburst Flamed Maple Texture
  const sunburstTexture = useMemo(() => createCherrySunburstTexture(), []);

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

  // Multi-ply Soundboard Binding Outline Rim
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
          {/* 1. 99% REALISTIC CONCERT FIRE SHADER SYSTEM              */}
          {/* ======================================================== */}
          <RealisticFlameSystem prefersReducedMotion={prefersReducedMotion} />

          {/* ======================================================== */}
          {/* 2. HAND-RUBBED CHERRY SUNBURST FLAMED MAPLE BODY         */}
          {/* ======================================================== */}
          <group position={[0, 0, -0.14]}>
            {/* Main Archtop Cherry Sunburst Body with Lacquer Clearcoat */}
            <mesh castShadow receiveShadow>
              <extrudeGeometry args={[guitarBodyShape, extrudeSettings]} />
              <meshPhysicalMaterial
                color="#850917"
                map={sunburstTexture || undefined}
                roughness={0.12}
                metalness={0.18}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
                reflectivity={0.95}
                emissive="#380307"
                emissiveIntensity={0.25}
              />
            </mesh>

            {/* Vintage Multi-Ply Cream/Black Soundboard Perimeter Rim */}
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

            {/* Front Soundboard Face: Radiant Sunburst with Flamed Maple Grain */}
            <mesh position={[0, 0, 0.292]}>
              <shapeGeometry args={[guitarBodyShape]} />
              <meshPhysicalMaterial
                color="#ffffff"
                map={sunburstTexture || undefined}
                roughness={0.08}
                metalness={0.14}
                clearcoat={1.0}
                clearcoatRoughness={0.04}
                reflectivity={0.98}
                emissive="#ff3344"
                emissiveIntensity={0.15}
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
                color="#850917"
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
