"use client";

import { useState, useRef } from "react";
import { Camera, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playShutterSound } from "@/lib/sound/shutterSound";
import { useConfettiFlash } from "./ConfettiFlash";

export function InteractiveCameraWidget() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [hasSnapped, setHasSnapped] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const { fire: fireConfetti } = useConfettiFlash({ triggerRef: widgetRef });

  const takeSnapshot = () => {
    if (countdown !== null || isFlashing) return;

    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          triggerFlash();
          return null;
        }
        return prev - 1;
      });
    }, 600);
  };

  const triggerFlash = () => {
    setIsFlashing(true);
    playShutterSound();
    fireConfetti();

    setTimeout(() => {
      setIsFlashing(false);
      setHasSnapped(true);
      setTimeout(() => setHasSnapped(false), 4000);
    }, 450);
  };

  return (
    <div ref={widgetRef} className="relative w-full max-w-lg">
      {/* Full-screen Flash Blitz when Snapshot triggers */}
      <AnimatePresence>
        {isFlashing && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-[9999] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Retro Camera Control Panel */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#181615] border border-[#383531] text-[#FAF8F5] shadow-xl relative overflow-hidden">
        {/* Panel Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2C2926] text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E24332] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E24332]"></span>
            </span>
            <span className="font-bold tracking-wider text-[#F5B738]">CEKREK CONSOLE 35MM</span>
          </div>
          <span className="text-[#968F84]">EXP: 36/36 &bull; ISO 400</span>
        </div>

        {/* Viewfinder Preview Box */}
        <div className="relative my-4 aspect-[16/9] w-full rounded-xl bg-[#0D0C0B] border border-[#2B2825] flex items-center justify-center overflow-hidden">
          {/* Grid Viewfinder Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-16 h-16 border-2 border-dashed border-[#F5B738] rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#E24332]" />
            </div>
            <div className="absolute top-4 left-4 text-[9px] font-mono text-[#7FA99B]">[AF-ON]</div>
            <div className="absolute bottom-4 right-4 text-[9px] font-mono text-[#F5B738]">F/1.8 1/250s</div>
          </div>

          {/* Countdown Display */}
          <AnimatePresence>
            {countdown !== null && (
              <motion.div
                key={countdown}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 2, opacity: 0 }}
                className="text-6xl sm:text-7xl font-black text-[#F5B738] drop-shadow-[0_0_20px_rgba(245,183,56,0.8)] z-20 font-mono"
              >
                {countdown}
              </motion.div>
            )}
          </AnimatePresence>

          {countdown === null && (
            <div className="text-center p-4 z-10">
              <Camera className="w-8 h-8 text-[#F5B738] mx-auto mb-2 animate-bounce" />
              <p className="font-handwriting text-2xl text-white">
                Siap untuk berfoto?
              </p>
              <span className="text-[10px] font-mono text-[#968F84] uppercase tracking-widest">
                Klik tombol shutter di bawah
              </span>
            </div>
          )}
        </div>

        {/* Shutter Button & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-left w-full sm:w-auto">
            <span className="block text-[10px] font-mono text-[#968F84] uppercase">Trigger Shutter</span>
            <span className="text-xs font-semibold text-white">Klik &bull; Suara &bull; Flash</span>
          </div>

          <button
            onClick={takeSnapshot}
            disabled={countdown !== null}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E24332] to-[#F5B738] hover:from-[#F05544] hover:to-[#FFC955] text-white font-bold text-sm font-mono tracking-wider shadow-lg hover:shadow-xl transition-all transform active:scale-95 cursor-pointer disabled:opacity-50"
            data-cursor-text="CEKREK"
          >
            <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
            <span>{countdown !== null ? `MENGHITUNG (${countdown})...` : "AMBIL FOTO // CEKREK!"}</span>
          </button>
        </div>

        {/* Success Toast */}
        <AnimatePresence>
          {hasSnapped && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 p-2.5 rounded-lg bg-[#24352F] border border-[#7FA99B] text-[#A6D1C4] text-xs font-mono flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4 text-[#7FA99B] flex-shrink-0" />
              <span>Foto sukses tertangkap! Gulir ke bawah untuk melihat galeri karya.</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
