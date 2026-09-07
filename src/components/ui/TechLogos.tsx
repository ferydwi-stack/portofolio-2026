"use client";

import React, { useState } from "react";

export interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

// Map technology names to official SVG CDN URLs (Devicon & Simple Icons)
const TECH_ONLINE_LOGOS: Record<string, string> = {
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  next: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  express: "https://cdn.simpleicons.org/express/white",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  mysql: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
  php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
  flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg",
  dart: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  postgres: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  github: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg",
  vscode: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg",
  figma: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  html: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  css: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  go: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  golang: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
};

export function TechLogo({ name, className = "", size = 24 }: TechLogoProps) {
  const normalized = name.toLowerCase();
  const [hasError, setHasError] = useState(false);

  // Match key from dictionary
  let matchedKey = Object.keys(TECH_ONLINE_LOGOS).find((k) => normalized.includes(k));
  if (!matchedKey && (normalized.includes("laravel") || normalized.includes("php"))) {
    matchedKey = "laravel";
  }

  const logoUrl = matchedKey ? TECH_ONLINE_LOGOS[matchedKey] : null;

  if (logoUrl && !hasError) {
    return (
      <img
        src={logoUrl}
        alt={`${name} official logo`}
        width={size}
        height={size}
        loading="lazy"
        onError={() => setHasError(true)}
        className={`object-contain transition-transform duration-200 ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Fallback icon
  return (
    <div
      className={`flex items-center justify-center font-mono font-bold text-[10px] text-zinc-300 bg-zinc-800 rounded ${className}`}
      style={{ width: size, height: size }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

// Brand accent colors for border and hover glow
export function getTechBrandColor(name: string): { glow: string; border: string; bg: string; text: string } {
  const normalized = name.toLowerCase();
  if (normalized.includes("tailwind")) {
    return { glow: "rgba(56, 189, 248, 0.4)", border: "border-[#38bdf8]/40", bg: "bg-[#38bdf8]/10", text: "text-[#38bdf8]" };
  }
  if (normalized.includes("react")) {
    return { glow: "rgba(97, 218, 251, 0.4)", border: "border-[#61dafb]/40", bg: "bg-[#61dafb]/10", text: "text-[#61dafb]" };
  }
  if (normalized.includes("next")) {
    return { glow: "rgba(255, 255, 255, 0.35)", border: "border-white/40", bg: "bg-white/10", text: "text-white" };
  }
  if (normalized.includes("node")) {
    return { glow: "rgba(104, 160, 99, 0.4)", border: "border-[#68a063]/40", bg: "bg-[#68a063]/10", text: "text-[#68a063]" };
  }
  if (normalized.includes("express")) {
    return { glow: "rgba(241, 245, 249, 0.3)", border: "border-slate-300/40", bg: "bg-slate-500/10", text: "text-slate-200" };
  }
  if (normalized.includes("typescript")) {
    return { glow: "rgba(49, 120, 198, 0.45)", border: "border-[#3178c6]/40", bg: "bg-[#3178c6]/10", text: "text-[#3178c6]" };
  }
  if (normalized.includes("mysql")) {
    return { glow: "rgba(0, 117, 143, 0.45)", border: "border-[#00758f]/40", bg: "bg-[#00758f]/10", text: "text-[#00758f]" };
  }
  if (normalized.includes("laravel") || normalized.includes("php")) {
    return { glow: "rgba(255, 45, 32, 0.45)", border: "border-[#ff2d20]/40", bg: "bg-[#ff2d20]/10", text: "text-[#ff2d20]" };
  }
  if (normalized.includes("flutter") || normalized.includes("dart")) {
    return { glow: "rgba(2, 86, 155, 0.45)", border: "border-[#02569b]/40", bg: "bg-[#02569b]/10", text: "text-[#02569b]" };
  }
  if (normalized.includes("postgres")) {
    return { glow: "rgba(51, 103, 145, 0.45)", border: "border-[#336791]/40", bg: "bg-[#336791]/10", text: "text-[#336791]" };
  }
  if (normalized.includes("go") || normalized.includes("golang")) {
    return { glow: "rgba(0, 173, 216, 0.45)", border: "border-[#00ADD8]/40", bg: "bg-[#00ADD8]/10", text: "text-[#00ADD8]" };
  }
  if (normalized.includes("python")) {
    return { glow: "rgba(55, 118, 171, 0.45)", border: "border-[#3776AB]/40", bg: "bg-[#3776AB]/10", text: "text-[#3776AB]" };
  }
  if (normalized.includes("firebase")) {
    return { glow: "rgba(255, 202, 40, 0.45)", border: "border-[#FFCA28]/40", bg: "bg-[#FFCA28]/10", text: "text-[#FFCA28]" };
  }
  return { glow: "rgba(255, 42, 59, 0.4)", border: "border-red-500/40", bg: "bg-red-500/10", text: "text-red-500" };
}

