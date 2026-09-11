"use client";

import { useRef } from "react";
import { useConfettiFlash } from "./ConfettiFlash";
import { playShutterSound } from "@/lib/sound/shutterSound";

interface ShutterButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  sound?: boolean;
  "data-cursor-text"?: string;
}

/**
 * ShutterButton — CTA button styled like a camera shutter release.
 * Scale-down micro-interaction on click, brief white flash on the button
 * area, realistic shutter audio click, and optional confetti burst.
 */
export function ShutterButton({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  sound = true,
  ...props
}: ShutterButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { fire: fireConfetti } = useConfettiFlash({ triggerRef: buttonRef });

  const handleClick = () => {
    if (sound) playShutterSound();
    fireConfetti();
    onClick?.();
  };

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`shutter-btn relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#E8B84B] hover:bg-[#F2D078] text-[#1A1A1A] font-semibold text-sm tracking-wide rounded-[10px] transition-colors shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${className}`}
      {...props}
    >
      {/* Shutter ring decoration */}
      <span className="absolute -inset-[3px] rounded-[13px] border-2 border-[#E8B84B]/30 pointer-events-none" aria-hidden="true" />
      {children}
    </button>
  );
}
