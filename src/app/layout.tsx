import type { Metadata } from "next";
import { Space_Grotesk, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { NavbarDock } from "@/components/ui/NavbarDock";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { PhotoboothCursor } from "@/components/photobooth/PhotoboothCursor";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
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
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${caveat.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#F5F0E6] text-[#1A1A1A] min-h-screen relative selection:bg-[#E8B84B] selection:text-[#1A1A1A] overflow-x-hidden`}
      >
        {/* Skip Link for Accessibility */}
        <SkipToContent />

        {/* Custom Cursor — camera lens / shutter style */}
        <PhotoboothCursor />

        {/* Warm Ambient Gradient Background */}
        <div className="fixed inset-0 pointer-events-none warm-ambient-gradient -z-20" aria-hidden="true" />

        {/* Film Grain Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none film-grain-overlay z-10 opacity-30" aria-hidden="true" />

        <SmoothScrollProvider>
          {/* Navigation Dock */}
          <NavbarDock />
          <main id="main-content" className="min-h-screen relative z-20">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
