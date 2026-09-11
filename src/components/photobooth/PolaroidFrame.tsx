"use client";

import Image from "next/image";
import { useMemo } from "react";

interface PolaroidFrameProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  children?: React.ReactNode;
}

/**
 * PolaroidFrame — Reusable wrapper that frames content in an instant-film
 * polaroid style: thick white border, slightly thicker at the bottom for
 * the caption area, with a soft rotated shadow.
 */
export function PolaroidFrame({
  src,
  alt,
  caption,
  rotate,
  className = "",
  width,
  height,
  priority = false,
  children,
}: PolaroidFrameProps) {
  // Deterministic subtle rotation between -3° and 3° based on alt string
  const rotation = useMemo(() => {
    if (rotate !== undefined) return rotate;
    let hash = 0;
    for (let i = 0; i < alt.length; i++) {
      hash = (hash << 5) - hash + alt.charCodeAt(i);
    }
    return (Math.abs(hash) % 7) - 3;
  }, [rotate, alt]);

  return (
    <div
      className={`group relative inline-block bg-white p-3 sm:p-4 pb-12 sm:pb-14 rounded-[3px] polaroid-shadow hover:polaroid-shadow-hover transition-all duration-300 ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* Photo area */}
      <div className="relative overflow-hidden bg-[#EDE7D9] aspect-[4/3]" style={{ width: width || "100%", height: height || "auto" }}>
        {children ? (
          children
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover object-center"
            priority={priority}
          />
        )}
      </div>

      {/* Caption area (bottom thick border zone) */}
      {caption && (
        <p className="absolute bottom-2 sm:bottom-3 left-4 right-4 text-center caption-handwriting text-base sm:text-lg text-[#2D2D2D] truncate">
          {caption}
        </p>
      )}

      {/* Subtle tape/pin decoration at top */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 rounded-sm opacity-70 z-10"
        style={{
          background: "linear-gradient(135deg, rgba(232, 184, 75, 0.7) 0%, rgba(232, 184, 75, 0.4) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
