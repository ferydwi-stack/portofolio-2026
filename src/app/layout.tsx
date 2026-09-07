import type { Metadata } from "next";
import { Bebas_Neue, Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalStageLayer } from "@/components/providers/GlobalStageLayer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavbarDock } from "@/components/ui/NavbarDock";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { SkipToContent } from "@/components/ui/SkipToContent";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

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
  title: "Fery Dwi Ramadhi | Fullstack Developer & Software Engineer",
  description:
    "Portofolio profesional Fery Dwi Ramadhi — Fullstack Developer & Software Engineer yang berfokus pada arsitektur web modern, performa tinggi, dan solusi digital terintegrasi.",
  openGraph: {
    title: "Fery Dwi Ramadhi | Fullstack Developer & Software Engineer",
    description:
      "Fullstack Developer & Software Engineer. Mengembangkan aplikasi web interaktif, performa optimal, dan sistem digital terukur.",
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
        className={`${bebasNeue.variable} ${anton.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0c] text-[#f5f5f0] min-h-screen relative selection:bg-red-600 selection:text-white overflow-x-hidden`}
      >
        {/* Skip Link for Accessibility */}
        <SkipToContent />

        {/* Global Custom Cursor with Lagging Ring & State Variants */}
        <CustomCursor />

        {/* Animated stage gradient background (ambient concert glow) */}
        <div className="fixed inset-0 pointer-events-none stage-ambient-gradient -z-20" aria-hidden="true" />

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
            {/* Audio Synth Toggle Switch */}
            <SoundToggle />
            <main id="main-content" className="min-h-screen relative z-20">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
