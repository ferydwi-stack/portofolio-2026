"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GuitaristCharacter } from "./GuitaristCharacter";
import { ParticleField } from "./ParticleField";
import { StageLights } from "./StageLights";
import { WebGLFallback } from "./WebGLFallback";
import { mapScrollToCameraKeyframes } from "@/animations/cameraKeyframes";
import { useScrollStore } from "@/store/useScrollStore";
import { usePerformanceTier, detectTier } from "@/store/usePerformanceTier";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function SceneController() {
  const prefersReducedMotion = useReducedMotion();
  const currentPos = useRef(new THREE.Vector3(0, 1.6, 5.5));
  const currentRot = useRef(new THREE.Euler(0, 0, 0));

  useFrame((state) => {
    if (prefersReducedMotion) {
      state.camera.position.set(0, 1.5, 5.5);
      state.camera.rotation.set(0, 0, 0);
      return;
    }

    // Read real-time progress from Zustand store without triggering React re-renders
    const progress = useScrollStore.getState().scrollProgress;
    const kf = mapScrollToCameraKeyframes(progress);

    // Smooth camera inertia lerp
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, kf.pos[0], 0.08);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, kf.pos[1], 0.08);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, kf.pos[2], 0.08);

    currentRot.current.x = THREE.MathUtils.lerp(currentRot.current.x, kf.rot[0], 0.08);
    currentRot.current.y = THREE.MathUtils.lerp(currentRot.current.y, kf.rot[1], 0.08);
    currentRot.current.z = THREE.MathUtils.lerp(currentRot.current.z, kf.rot[2], 0.08);

    state.camera.position.copy(currentPos.current);
    state.camera.rotation.copy(currentRot.current);
  });

  const activeSection = useScrollStore((s) => s.activeSection);
  const tier = usePerformanceTier((s) => s.tier);

  return (
    <>
      {tier !== "low" && <fog attach="fog" args={["#0a0a0c", 4, 22]} />}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={2.0} color="#e11d2e" />

      {/* Volumetric Stage Lights */}
      <StageLights interactive={activeSection === "contact"} />

      {/* Concert Ember Sparks */}
      <ParticleField />

      {/* Centerpiece 3D Emo Guitarist Character Silhouette Artwork */}
      <group position={[0.2, 0.4, 0]}>
        <Suspense fallback={null}>
          <GuitaristCharacter />
        </Suspense>
      </group>
    </>
  );
}

export default function GlobalStageScene() {
  const [hasWebGL] = useState(() => isWebGLAvailable());
  const setTier = usePerformanceTier((s) => s.setTier);

  useEffect(() => {
    setTier(detectTier());
  }, [setTier]);

  if (!hasWebGL) {
    return <WebGLFallback />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-screen h-screen overflow-hidden bg-[#0a0a0c]"
      aria-hidden="true"
    >
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        camera={{ position: [0, 1.6, 5.5], fov: 48 }}
        className="w-full h-full"
      >
        <SceneController />
      </Canvas>
    </div>
  );
}
