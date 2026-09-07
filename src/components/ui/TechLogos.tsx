import React from "react";

export interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export function TechLogo({ name, className = "", size = 24 }: TechLogoProps) {
  const normalized = name.toLowerCase();

  // Tailwind CSS
  if (normalized.includes("tailwind")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#38bdf8] ${className}`}
      >
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    );
  }

  // React.js
  if (normalized.includes("react")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="-11.5 -10.23174 23 20.46348"
        fill="currentColor"
        className={`text-[#61dafb] ${className}`}
      >
        <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Next.js
  if (normalized.includes("next")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 180 180"
        fill="none"
        className={`text-white ${className}`}
      >
        <circle cx="90" cy="90" r="90" fill="#000" stroke="#fff" strokeWidth="6" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.16 149.508 157.52Z"
          fill="white"
        />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </svg>
    );
  }

  // Node.js
  if (normalized.includes("node")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#68a063] ${className}`}
      >
        <path d="M12 1.5L2.5 7v10L12 22.5l9.5-5.5V7L12 1.5zm0 2.3l7.5 4.3v8.6L12 21l-7.5-4.3V8.1L12 3.8zm-1.2 5.7c-1.8 0-2.8 1.1-2.8 2.5 0 2.2 2.7 2.2 2.7 3.3 0 .4-.3.6-.8.6-.6 0-1.1-.3-1.6-.7l-.8 1.1c.7.6 1.5.9 2.4.9 1.9 0 2.9-1.1 2.9-2.5 0-2.3-2.7-2.3-2.7-3.3 0-.3.3-.5.7-.5.5 0 .9.2 1.4.5l.7-1.1c-.6-.5-1.3-.8-2.4-.8zm4.5.1h-1.6v6.5h1.6V9.6z" />
      </svg>
    );
  }

  // Express.js
  if (normalized.includes("express")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#e2e8f0] ${className}`}
      >
        <path d="M11.66 4.75a7.25 7.25 0 1 0 7.25 7.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75a5.75 5.75 0 1 1-5.75-5.75c1.78 0 3.35.81 4.39 2.09l-1.58.53c-.39.13-.6.55-.47.94.13.39.55.6.94.47l3.21-1.07c.33-.11.55-.41.55-.76V5.21c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1.27A7.22 7.22 0 0 0 11.66 4.75zm-3.66 5.5a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5H8zm0 3.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5H8z" />
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes("typescript")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#3178c6] ${className}`}
      >
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 13.59h-2.9v6.86H7.17v-6.86H4.28V11.5h7.96v2.09zm9.05 1.54c-.23-.17-.58-.33-1.04-.49l-1.28-.43c-.87-.29-1.46-.58-1.77-.87-.31-.29-.46-.66-.46-1.12 0-.49.19-.9.56-1.22.37-.32.89-.48 1.55-.48.65 0 1.21.14 1.67.42.46.28.81.67 1.05 1.17l-1.8 1.13c-.11-.25-.28-.45-.51-.6-.23-.15-.52-.22-.87-.22-.32 0-.58.07-.77.21-.19.14-.28.32-.28.54 0 .19.07.35.21.48.14.13.43.26.87.4l1.24.41c.98.33 1.66.67 2.04 1.02.38.35.57.81.57 1.38 0 .61-.22 1.12-.66 1.53-.44.41-1.07.61-1.89.61-.83 0-1.54-.19-2.13-.57-.59-.38-.99-.92-1.2-1.62l1.92-1.04c.12.37.33.66.63.87.3.21.68.32 1.14.32.4 0 .73-.08.99-.24.26-.16.39-.37.39-.63 0-.25-.09-.45-.27-.6z" />
      </svg>
    );
  }

  // MySQL
  if (normalized.includes("mysql")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#00758f] ${className}`}
      >
        <path d="M12.002 2c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zm5.12 14.73c-.68.74-1.74 1.27-3.05 1.27-2.43 0-4.22-1.81-4.22-4.27 0-2.42 1.77-4.25 4.18-4.25 1.33 0 2.37.54 3.03 1.28l-1.32 1.25c-.4-.44-1.03-.78-1.74-.78-1.38 0-2.34 1.07-2.34 2.5 0 1.45.98 2.52 2.38 2.52.74 0 1.35-.35 1.76-.8l1.32 1.28zm1.88-6.73h-1.8v8h1.8v-8z" />
      </svg>
    );
  }

  // PHP & Laravel
  if (normalized.includes("laravel") || normalized.includes("php")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#ff2d20] ${className}`}
      >
        <path d="M21.173 17.587l-6.31-3.647v-4.13l-4.524 2.614v3.91l6.309 3.645v3.967l7.25-4.188v-4.188l-2.725 1.574v-3.757zm-8.035-7.391l4.524-2.614-4.524-2.613-4.524 2.613 4.524 2.614zm-7.25 11.75l7.25-4.188v-4.188l-2.726 1.574v-3.757l-4.524 2.614v7.945zm0-11.912l4.524-2.614-4.524-2.614-4.524 2.614 4.524 2.614zM2.827 6.413L9.136 10.06v4.13l4.524-2.614v-3.91L7.351 4.02v-3.967L.102 4.24v4.188l2.725-1.574v3.757z" />
      </svg>
    );
  }

  // Flutter & Dart
  if (normalized.includes("flutter") || normalized.includes("dart")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#02569b] ${className}`}
      >
        <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm-.014 11.072L7.857 17.514 14.3 23.957h7.37L15.2 17.486l6.471-6.414h-7.37z" />
      </svg>
    );
  }

  // PostgreSQL
  if (normalized.includes("postgres")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`text-[#336791] ${className}`}
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93c-2.31 0-3.93-1.62-3.93-3.93s1.62-3.93 3.93-3.93c1.35 0 2.45.62 3.12 1.63l-1.38.93c-.45-.63-1.08-.96-1.74-.96-1.35 0-2.31.99-2.31 2.33s.96 2.33 2.31 2.33c.69 0 1.29-.33 1.74-.96l1.38.93c-.67 1.01-1.77 1.63-3.12 1.63z" />
      </svg>
    );
  }

  // Fallback generic terminal / chip code icon
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-red-500 ${className}`}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// Brand accent colors for border and hover glow
export function getTechBrandColor(name: string): { glow: string; border: string; bg: string; text: string } {
  const normalized = name.toLowerCase();
  if (normalized.includes("tailwind")) {
    return { glow: "rgba(56, 189, 248, 0.4)", border: "border-[#38bdf8]/40", bg: "bg-[#38bdf8]/15", text: "text-[#38bdf8]" };
  }
  if (normalized.includes("react")) {
    return { glow: "rgba(97, 218, 251, 0.4)", border: "border-[#61dafb]/40", bg: "bg-[#61dafb]/15", text: "text-[#61dafb]" };
  }
  if (normalized.includes("next")) {
    return { glow: "rgba(255, 255, 255, 0.35)", border: "border-white/40", bg: "bg-white/15", text: "text-white" };
  }
  if (normalized.includes("node")) {
    return { glow: "rgba(104, 160, 99, 0.4)", border: "border-[#68a063]/40", bg: "bg-[#68a063]/15", text: "text-[#68a063]" };
  }
  if (normalized.includes("express")) {
    return { glow: "rgba(241, 245, 249, 0.3)", border: "border-slate-300/40", bg: "bg-slate-500/15", text: "text-slate-200" };
  }
  if (normalized.includes("typescript")) {
    return { glow: "rgba(49, 120, 198, 0.45)", border: "border-[#3178c6]/40", bg: "bg-[#3178c6]/15", text: "text-[#3178c6]" };
  }
  if (normalized.includes("mysql")) {
    return { glow: "rgba(0, 117, 143, 0.45)", border: "border-[#00758f]/40", bg: "bg-[#00758f]/15", text: "text-[#00758f]" };
  }
  if (normalized.includes("laravel") || normalized.includes("php")) {
    return { glow: "rgba(255, 45, 32, 0.45)", border: "border-[#ff2d20]/40", bg: "bg-[#ff2d20]/15", text: "text-[#ff2d20]" };
  }
  if (normalized.includes("flutter") || normalized.includes("dart")) {
    return { glow: "rgba(2, 86, 155, 0.45)", border: "border-[#02569b]/40", bg: "bg-[#02569b]/15", text: "text-[#02569b]" };
  }
  if (normalized.includes("postgres")) {
    return { glow: "rgba(51, 103, 145, 0.45)", border: "border-[#336791]/40", bg: "bg-[#336791]/15", text: "text-[#336791]" };
  }
  return { glow: "rgba(255, 42, 59, 0.4)", border: "border-red-500/40", bg: "bg-red-500/15", text: "text-red-500" };
}
