import type { Metadata } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalStageLayer } from "@/components/providers/GlobalStageLayer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavbarDock } from "@/components/ui/NavbarDock";
import { SkipToContent } from "@/components/ui/SkipToContent";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fery Dwi Ramadhi | Rockstar Fullstack Developer & Lead Guitarist",
  description:
    "Live Stage Portfolio of Fery Dwi Ramadhi — Rockstar Fullstack Developer and Guitarist crafting high-performance digital experiences with heavy rock distortion.",
  openGraph: {
    title: "Fery Dwi Ramadhi | Rockstar Fullstack Developer & Lead Guitarist",
    description:
      "Fullstack Developer × Guitarist. High-performance code, heavy riffs, and concert stage visuals.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="dark">
      <body
        className={`${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0c] text-[#f5f5f0] min-h-screen relative selection:bg-red-600 selection:text-white overflow-x-hidden`}
      >
        {/* Skip Link for Accessibility */}
        <SkipToContent />

        {/* Global Custom Cursor with Lagging Ring & State Variants */}
        <CustomCursor />

        {/* Global Fixed 3D Stage Scene with 3D Emo Guitarist Centerpiece */}
        <GlobalStageLayer />

        {/* Ambient Film Grain Texture */}
        <div className="fixed inset-0 pointer-events-none stage-noise z-10 opacity-25" aria-hidden="true" />

        {/* Dark Stage Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10" aria-hidden="true" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {/* Left Edge Vertical Dock / Responsive Mobile Sheet */}
            <NavbarDock />
            <main id="main-content" className="min-h-screen relative z-20">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
