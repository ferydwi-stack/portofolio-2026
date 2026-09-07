"use client";

import dynamic from "next/dynamic";

const GlobalStageScene = dynamic(() => import("./GlobalStageScene"), {
  ssr: false,
});

export function GlobalStageLayer() {
  return <GlobalStageScene />;
}
