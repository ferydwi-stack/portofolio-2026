"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playHoverTick, playCyberClick } from "@/lib/sound/cyberSound";

export function CyberBeacon() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenWhatsApp = () => {
    playCyberClick();
    const msg = encodeURIComponent("Halo Fery, saya melihat portofolio Anda dan ingin berdiskusi mengenai proyek.");
    window.open(`https://wa.me/6282183458754?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 sm:right-8 z-40 select-none font-mono">
      {/* Expanded Quick Message Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="absolute bottom-16 right-0 w-72 p-4 rounded-2xl bg-[#0C121E] border border-cyan-500/40 shadow-[0_0_35px_rgba(79,209,197,0.2)] backdrop-blur-xl mb-2"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-cyan-300">COMMS BEACON // ONLINE</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 py-3 leading-relaxed">
              Ingin mendiskusikan penawaran proyek, rekayasa web, atau kolaborasi secara langsung?
            </p>

            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>CHAT VIA WHATSAPP &rarr;</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Beacon Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          playCyberClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={playHoverTick}
        className="relative group p-3.5 rounded-full bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 shadow-[0_0_25px_rgba(79,209,197,0.35)] flex items-center justify-center text-cyan-400 cursor-pointer"
        aria-label="Open Communication Beacon"
      >
        {/* Animated Radar Pulse Rings */}
        <span className="absolute -inset-1 rounded-full border border-cyan-400/30 animate-ping pointer-events-none" />
        <span className="absolute -inset-2 rounded-full border border-dashed border-cyan-400/20 pointer-events-none" />

        <MessageCircle className="w-5 h-5 text-cyan-300 group-hover:scale-110 transition-transform" />

        {/* Status Dot */}
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
      </motion.button>
    </div>
  );
}
