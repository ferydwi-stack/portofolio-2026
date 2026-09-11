/**
 * Photobooth / Instant Camera Retro — Design Tokens
 * Centralized theme configuration for the portfolio redesign.
 */

// ──────────────────────────────────────────
// Color Palette
// ──────────────────────────────────────────
export const COLORS = {
  /** Off-white paper background — instant film base */
  cream: "#F5F0E6",
  /** Slightly darker cream for cards / elevated surfaces */
  creamDark: "#EDE7D9",
  /** Very light cream for subtle section alternation */
  creamLight: "#FAF7F0",

  /** Primary text & dark elements */
  filmBlack: "#1A1A1A",
  /** Softer black for secondary text */
  filmCharcoal: "#2D2D2D",
  /** Muted text */
  filmGray: "#6B6560",
  /** Borders & dividers */
  filmBorder: "#D4CFC5",

  /** Primary accent — mustard / flash bulb glow */
  flashYellow: "#E8B84B",
  flashYellowLight: "#F2D078",
  flashYellowDark: "#C99A2E",

  /** Secondary accent — red flash-bulb */
  flashRed: "#D9483A",
  flashRedLight: "#E8685C",
  flashRedDark: "#B33528",

  /** Pastel highlights */
  dustyPink: "#E8C4C4",
  mint: "#B8D8D0",
  mintLight: "#D0EAE4",

  /** Pure white for polaroid borders */
  polaroidWhite: "#FFFFFF",

  /** Dark overlay for modals / transitions */
  shutterBlack: "#0A0A0A",
} as const;

// ──────────────────────────────────────────
// Typography
// ──────────────────────────────────────────
export const FONTS = {
  /** Headings — clean geometric sans */
  heading: "var(--font-space), 'Space Grotesk', sans-serif",
  /** Body text */
  body: "var(--font-space), 'Space Grotesk', sans-serif",
  /** Handwriting captions on polaroids */
  caption: "var(--font-caveat), 'Caveat', cursive",
  /** Monospace for technical details */
  mono: "var(--font-jetbrains), 'JetBrains Mono', monospace",
} as const;

// ──────────────────────────────────────────
// Shadows (Polaroid print effect)
// ──────────────────────────────────────────
export const SHADOWS = {
  /** Default polaroid shadow */
  polaroid: "4px 6px 16px rgba(0, 0, 0, 0.12), 2px 3px 6px rgba(0, 0, 0, 0.08)",
  /** Hovered polaroid — lifted */
  polaroidHover: "8px 12px 28px rgba(0, 0, 0, 0.18), 4px 6px 12px rgba(0, 0, 0, 0.1)",
  /** Subtle card shadow */
  card: "0 4px 12px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)",
  /** Flash overlay glow */
  flashGlow: "0 0 60px rgba(232, 184, 75, 0.3)",
} as const;

// ──────────────────────────────────────────
// Border Radius
// ──────────────────────────────────────────
export const RADII = {
  /** Slight rounding for polaroid corners */
  polaroid: "3px",
  /** Card corners */
  card: "12px",
  /** Button corners */
  button: "10px",
  /** Pill shape */
  pill: "999px",
} as const;

// ──────────────────────────────────────────
// GSAP Easing Presets
// ──────────────────────────────────────────
export const EASINGS = {
  /** Shutter closing — snappy in-out */
  shutterInOut: "power3.inOut",
  /** Flash fading out */
  flashOut: "power4.out",
  /** Photo developing — smooth reveal */
  developing: "power2.out",
  /** Snap focus — quick settle */
  snapFocus: "back.out(1.4)",
  /** Gentle float for polaroid entrance */
  polaroidDrop: "power2.out",
  /** Elastic bounce for confetti */
  confettiBounce: "elastic.out(1, 0.5)",
} as const;

// ──────────────────────────────────────────
// Animation Durations (seconds)
// ──────────────────────────────────────────
export const DURATIONS = {
  flash: 0.5,
  shutter: 0.9,
  photoReveal: 0.7,
  polaroidEntrance: 0.6,
  confetti: 1.2,
  hoverLift: 0.3,
} as const;

// ──────────────────────────────────────────
// Breakpoints (mirroring Tailwind defaults)
// ──────────────────────────────────────────
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
