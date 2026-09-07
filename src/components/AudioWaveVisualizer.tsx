"use client";

import { useEffect, useRef, useState } from "react";
import { Zap, Activity } from "lucide-react";

type ToneMode = "distortion" | "overdrive" | "clean";

export function AudioWaveVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [tone, setTone] = useState<ToneMode>("distortion");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      const logicalWidth = canvas.offsetWidth;
      const logicalHeight = canvas.offsetHeight;
      const centerY = logicalHeight / 2;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      phase += tone === "distortion" ? 0.08 : tone === "overdrive" ? 0.05 : 0.03;

      // Base Waveform Parameters
      const frequency = tone === "distortion" ? 0.025 : tone === "overdrive" ? 0.018 : 0.012;
      const amplitude = (logicalHeight / 3) * (isHovered ? 1.3 : 1.0);

      // Gradient Line
      const gradient = ctx.createLinearGradient(0, 0, logicalWidth, 0);
      if (tone === "distortion") {
        gradient.addColorStop(0, "rgba(255, 42, 59, 0.2)");
        gradient.addColorStop(0.5, "#ff2a3b");
        gradient.addColorStop(1, "rgba(255, 42, 59, 0.2)");
      } else if (tone === "overdrive") {
        gradient.addColorStop(0, "rgba(245, 158, 11, 0.2)");
        gradient.addColorStop(0.5, "#f59e0b");
        gradient.addColorStop(1, "rgba(245, 158, 11, 0.2)");
      } else {
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        gradient.addColorStop(0.5, "#ffffff");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
      }

      ctx.lineWidth = tone === "distortion" ? 2.5 : 2;
      ctx.strokeStyle = gradient;
      ctx.beginPath();

      for (let x = 0; x < logicalWidth; x++) {
        let y = centerY;
        if (tone === "distortion") {
          // Clipped hard-knee waveform
          const raw =
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 2.5 - phase * 1.5) * (amplitude * 0.4);
          // Hard clipping threshold
          const clip = amplitude * 0.65;
          const clipped = Math.max(-clip, Math.min(clip, raw));
          y = centerY + clipped;
        } else if (tone === "overdrive") {
          // Warm asymmetric soft-clipping
          const raw =
            Math.sin(x * frequency + phase) * amplitude +
            Math.sin(x * frequency * 1.8 + phase) * (amplitude * 0.25);
          y = centerY + Math.tanh(raw / amplitude) * amplitude;
        } else {
          // Pure clean sine wave with subtle chorus shimmer
          y =
            centerY +
            Math.sin(x * frequency + phase) * amplitude * 0.8 +
            Math.cos(x * frequency * 0.5 - phase * 0.6) * 4;
        }

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Ambient Waveform Glow Shadow
      ctx.shadowColor = tone === "distortion" ? "#ff2a3b" : tone === "overdrive" ? "#f59e0b" : "#ffffff";
      ctx.shadowBlur = 14;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [tone, isHovered]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full bg-[#0e0c15] border border-zinc-800/80 rounded-xl p-3.5 space-y-2 shadow-xl"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-zinc-400">
        <span className="flex items-center gap-1.5 text-red-400 uppercase font-bold">
          <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          OSCILLOSCOPE LIVE FREQ
        </span>

        {/* Tone Selectors */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-md border border-zinc-800">
          <button
            onClick={() => setTone("distortion")}
            className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold transition-all cursor-pointer ${
              tone === "distortion"
                ? "bg-red-600 text-white shadow-[0_0_8px_#ff2a3b]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            DISTORTION
          </button>
          <button
            onClick={() => setTone("overdrive")}
            className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold transition-all cursor-pointer ${
              tone === "overdrive"
                ? "bg-amber-500 text-black shadow-[0_0_8px_#f59e0b]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            OVERDRIVE
          </button>
          <button
            onClick={() => setTone("clean")}
            className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold transition-all cursor-pointer ${
              tone === "clean"
                ? "bg-zinc-200 text-black shadow-[0_0_8px_#ffffff]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            CLEAN
          </button>
        </div>
      </div>

      {/* Canvas Screen */}
      <div className="relative h-14 w-full bg-[#07060a] rounded-lg overflow-hidden border border-zinc-900 flex items-center justify-center">
        {/* Subtle Oscilloscope Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1726_1px,transparent_1px),linear-gradient(to_bottom,#1b1726_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none" />
        <canvas ref={canvasRef} className="w-full h-full relative z-10" />
      </div>

      <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500">
        <span className="flex items-center gap-1">
          <Zap className="w-2.5 h-2.5 text-amber-400" />
          SIGNAL: ACTIVE 120Hz - 18kHz
        </span>
        <span className="text-zinc-400">CLICK TONES TO SWITCH CHANNELS</span>
      </div>
    </div>
  );
}
