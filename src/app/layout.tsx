import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { GlobalStageLayer } from "@/components/providers/GlobalStageLayer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavbarDock } from "@/components/ui/NavbarDock";

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
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-[#0a0a0c] text-zinc-100 min-h-screen relative selection:bg-red-600 selection:text-white overflow-x-hidden`}
      >
        {/* Global Custom Cursor with Lagging Ring & State Variants */}
        <CustomCursor />

        {/* Global Fixed 3D Stage Scene with 3D Emo Guitarist Centerpiece */}
        <GlobalStageLayer />

        {/* Ambient Film Grain Texture */}
        <div className="fixed inset-0 pointer-events-none stage-noise z-10 opacity-25" />

        {/* Dark Stage Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-10" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {/* Left Edge Vertical Dock / Responsive Hamburger */}
            <NavbarDock />
            <main className="min-h-screen relative z-20">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
