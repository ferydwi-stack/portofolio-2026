"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Spark {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const COLORS = ["#4FD1C5", "#38BDF8", "#34D399", "#E8A33D"];

export function ClickParticles() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newSparks: Spark[] = [];
      const count = 12;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 45 + 25;
        newSparks.push({
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 4 + 2,
        });
      }

      setSparks((prev) => [...prev.slice(-30), ...newSparks]);

      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => !newSparks.includes(s)));
      }, 700);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{
              x: spark.x,
              y: spark.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x: spark.x + spark.vx,
              y: spark.y + spark.vy,
              opacity: 0,
              scale: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              width: spark.size,
              height: spark.size,
              backgroundColor: spark.color,
              boxShadow: `0 0 10px ${spark.color}`,
            }}
            className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
