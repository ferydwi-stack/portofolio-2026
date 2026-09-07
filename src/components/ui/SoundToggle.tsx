"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { playStompClick } from "@/lib/sound/guitarSynth";

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("stage_audio_muted");
    if (saved === "true") {
      setIsMuted(true);
    }
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    localStorage.setItem("stage_audio_muted", String(nextState));
    if (!nextState) {
      playStompClick();
    }
  };

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-2xl cursor-pointer flex items-center justify-center group ${
        isMuted
          ? "bg-zinc-900/80 border-zinc-700 text-zinc-500 hover:text-white hover:border-zinc-500"
          : "bg-[#140f1a]/90 border-red-500/60 text-red-400 hover:text-white hover:border-red-400 shadow-[0_0_20px_rgba(225,29,46,0.35)]"
      }`}
      aria-label={isMuted ? "Aktifkan Efek Audio Gitar" : "Matikan Efek Audio Gitar"}
      data-cursor-text={isMuted ? "UNMUTE" : "MUTE"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 transition-transform group-hover:scale-110" />
      ) : (
        <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110 animate-pulse" />
      )}
    </button>
  );
}
