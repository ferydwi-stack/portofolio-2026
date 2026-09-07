import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { StageCurtainIntro } from "@/components/StageCurtainIntro";
import { StageFollowSpotlight } from "@/components/StageFollowSpotlight";
import { GlobalStageLayer } from "@/components/GlobalStageLayer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fery Dwi Ramadhi | Fullstack Developer × Guitarist",
  description:
    "Live Concert Portfolio of Fery Dwi Ramadhi — Fullstack Developer and Guitarist crafting high-performance digital experiences with heavy rock energy.",
  openGraph: {
    title: "Fery Dwi Ramadhi | Fullstack Developer × Guitarist",
    description:
      "Fullstack Developer × Guitarist. Code, riffs, and high-performance digital creations.",
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
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-[#07060a] text-zinc-100 min-h-screen relative selection:bg-red-600 selection:text-white overflow-x-hidden`}
      >
        {/* Stage Curtain Horizontal Split Load Intro */}
        <StageCurtainIntro />

        {/* Dynamic Concert Stage Follow-Spotlight */}
        <StageFollowSpotlight />

        {/* Global Fixed 3D Stage Scene with Emo Guitarist Centerpiece */}
        <GlobalStageLayer />

        {/* Ambient Film Grain Texture */}
        <div className="fixed inset-0 pointer-events-none stage-noise z-10 opacity-30" />

        {/* Dark Stage Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            <main className="min-h-screen relative z-20">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
