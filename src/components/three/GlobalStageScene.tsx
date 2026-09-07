"use client";

import { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GuitaristCharacter } from "./GuitaristCharacter";
import { ParticleField } from "./ParticleField";
import { StageLights } from "./StageLights";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function mapScrollToCameraKeyframes(progress: number) {
  const p = Math.max(0, Math.min(1, progress));

  if (p <= 0.18) {
    const t = p / 0.18;
    return {
      camX: 0.2 - t * 0.2,
      camY: 0.1 + t * 0.2,
      camZ: 5.8 - t * 1.0,
      lookX: 0.1,
      lookY: 0.1,
      lookZ: 0,
      charX: 0.6,
      charY: -1.7,
      charZ: 0,
    };
  } else if (p <= 0.40) {
    const t = (p - 0.18) / 0.22;
    return {
      camX: 0.0 + t * 0.8,
      camY: 0.3 - t * 0.1,
      camZ: 4.8 + t * 1.0,
      lookX: 0.8 * t,
      lookY: 0.1,
      lookZ: 0,
      charX: 0.6 + t * 0.9,
      charY: -1.7 + t * 0.1,
      charZ: 0,
    };
  } else if (p <= 0.65) {
    const t = (p - 0.40) / 0.25;
    return {
      camX: 0.8 - t * 0.6,
      camY: 0.2 + t * 0.3,
      camZ: 5.8 + t * 0.6,
      lookX: 0.8 - t * 0.7,
      lookY: 0.2,
      lookZ: 0,
      charX: 1.5 - t * 0.7,
      charY: -1.6,
      charZ: -0.5,
    };
  } else if (p <= 0.85) {
    const t = (p - 0.65) / 0.20;
    return {
      camX: 0.2 - t * 0.4,
      camY: 0.5 - t * 0.6,
      camZ: 6.4 - t * 1.2,
      lookX: 0.1,
      lookY: 0.1,
      lookZ: 0,
      charX: 0.8 - t * 0.4,
      charY: -1.6,
      charZ: 0,
    };
  } else {
    const t = (p - 0.85) / 0.15;
    return {
      camX: -0.2 - t * 0.8,
      camY: -0.1 + t * 0.3,
      camZ: 5.2 - t * 0.6,
      lookX: -0.5 * t,
      lookY: 0.1,
      lookZ: 0,
      charX: 0.4 - t * 1.8,
      charY: -1.7,
      charZ: 0,
    };
  }
}

function SceneController({ scrollProgress }: { scrollProgress: number }) {
  const prefersReducedMotion = useReducedMotion();
  const targetCam = useRef({ x: 0, y: 0, z: 5.5, lookX: 0, lookY: 0, lookZ: 0 });
  const targetChar = useRef({ x: 0.6, y: -1.7, z: 0 });
  const charGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (prefersReducedMotion) {
      state.camera.position.set(0, 0, 5.5);
      state.camera.lookAt(0, 0, 0);
      if (charGroupRef.current) {
        charGroupRef.current.position.set(0.6, -1.7, 0);
      }
      return;
    }

    const kf = mapScrollToCameraKeyframes(scrollProgress);

    targetCam.current.x = THREE.MathUtils.lerp(targetCam.current.x, kf.camX, 0.08);
    targetCam.current.y = THREE.MathUtils.lerp(targetCam.current.y, kf.camY, 0.08);
    targetCam.current.z = THREE.MathUtils.lerp(targetCam.current.z, kf.camZ, 0.08);

    targetCam.current.lookX = THREE.MathUtils.lerp(targetCam.current.lookX, kf.lookX, 0.08);
    targetCam.current.lookY = THREE.MathUtils.lerp(targetCam.current.lookY, kf.lookY, 0.08);
    targetCam.current.lookZ = THREE.MathUtils.lerp(targetCam.current.lookZ, kf.lookZ, 0.08);

    state.camera.position.set(
      targetCam.current.x,
      targetCam.current.y,
      targetCam.current.z
    );
    state.camera.lookAt(
      targetCam.current.lookX,
      targetCam.current.lookY,
      targetCam.current.lookZ
    );

    targetChar.current.x = THREE.MathUtils.lerp(targetChar.current.x, kf.charX, 0.08);
    targetChar.current.y = THREE.MathUtils.lerp(targetChar.current.y, kf.charY, 0.08);
    targetChar.current.z = THREE.MathUtils.lerp(targetChar.current.z, kf.charZ, 0.08);

    if (charGroupRef.current) {
      charGroupRef.current.position.set(
        targetChar.current.x,
        targetChar.current.y,
        targetChar.current.z
      );
    }
  });

  const isContactSection = scrollProgress > 0.85;

  return (
    <>
      <fog attach="fog" args={["#0a0a0c", 4, 22]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -2, -2]} intensity={2.0} color="#e11d2e" />

      {/* Volumetric Stage Lights & Beams */}
      <StageLights interactive={isContactSection} />

      {/* Sparks and Concert Dust Field */}
      <ParticleField />

      {/* Centerpiece 3D Emo Guitarist Character */}
      <group ref={charGroupRef} position={[0.6, -1.7, 0]}>
        <GuitaristCharacter scrollProgress={scrollProgress} />
      </group>
    </>
  );
}

export default function GlobalStageScene() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentScroll / docHeight)) : 0;
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        camera={{ position: [0, 0, 5.8], fov: 48 }}
        className="w-full h-full"
      >
        <SceneController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
