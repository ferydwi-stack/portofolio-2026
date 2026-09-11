import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { BlueprintNavbar } from "@/components/blueprint/BlueprintNavbar";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ClientSceneWrapper } from "@/components/blueprint/ClientSceneWrapper";

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
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0A0F1A] text-[#E2E8F0] min-h-screen relative overflow-x-hidden`}
      >
        {/* Skip Link for Accessibility */}
        <SkipToContent />

        {/* Global 3D Space Scene & Tech Cursor */}
        <ClientSceneWrapper />

        <SmoothScrollProvider>
          {/* Blueprint Navigation */}
          <BlueprintNavbar />

          <main id="main-content" className="min-h-screen relative z-10">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
