import type { Metadata } from "next";
import { Space_Grotesk, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { RetroNavbar } from "@/components/photobooth/RetroNavbar";
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
    "Portofolio resmi Fery Dwi Ramadhi — Fullstack Developer & Mahasiswa Informatika. Arsitektur web modern, performa tinggi, dan pengalaman digital berkarakter.",
  openGraph: {
    title: "Fery Dwi Ramadhi | Fullstack Developer & Software Engineer",
    description:
      "Fullstack Developer & Software Engineer. Portofolio profesional dengan pengalaman visual interaktif.",
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
        className={`${spaceGrotesk.variable} ${caveat.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#FAF8F5] text-[#1C1A18] min-h-screen relative selection:bg-[#F5B738] selection:text-[#181615] overflow-x-hidden`}
      >
        {/* Skip Link for Accessibility */}
        <SkipToContent />

        {/* Custom Photobooth Cursor */}
        <PhotoboothCursor />

        <SmoothScrollProvider>
          {/* Floating Retro Studio Navigation */}
          <RetroNavbar />

          <main id="main-content" className="min-h-screen relative z-10">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
