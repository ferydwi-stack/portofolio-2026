"use client";

import dynamic from "next/dynamic";

const GlobalStageScene = dynamic(
  () => import("@/components/three/GlobalStageScene"),
  { ssr: false }
);

export function GlobalStageLayer() {
  return <GlobalStageScene />;
}
