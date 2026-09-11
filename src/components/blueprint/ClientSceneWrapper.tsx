"use client";

import dynamic from "next/dynamic";
import { TechCursor } from "./TechCursor";
import { ClickParticles } from "./ClickParticles";

const GlobalBlueprintScene = dynamic(
  () =>
    import("./GlobalBlueprintScene").then((mod) => mod.GlobalBlueprintScene),
  { ssr: false }
);

export function ClientSceneWrapper() {
  return (
    <>
      <TechCursor />
      <ClickParticles />
      <GlobalBlueprintScene />
    </>
  );
}
