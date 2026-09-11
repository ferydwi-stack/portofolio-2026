"use client";

import dynamic from "next/dynamic";
import { TechCursor } from "./TechCursor";
import { ClickParticles } from "./ClickParticles";
import { ScrollProgressLaser } from "./ScrollProgressLaser";
import { CyberBeacon } from "./CyberBeacon";

const GlobalBlueprintScene = dynamic(
  () =>
    import("./GlobalBlueprintScene").then((mod) => mod.GlobalBlueprintScene),
  { ssr: false }
);

export function ClientSceneWrapper() {
  return (
    <>
      {/* Top Scroll Laser Progress */}
      <ScrollProgressLaser />

      {/* Cyber Cursor Reticle */}
      <TechCursor />

      {/* Click Fireworks */}
      <ClickParticles />

      {/* Floating Cyber WhatsApp Beacon */}
      <CyberBeacon />

      {/* 3D Space Background */}
      <GlobalBlueprintScene />
    </>
  );
}
