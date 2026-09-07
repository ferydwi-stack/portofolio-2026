import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

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
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased bg-[#08080c] text-zinc-100 min-h-screen relative selection:bg-red-600 selection:text-white`}
      >
        {/* Stage Noise Overlay */}
        <div className="fixed inset-0 pointer-events-none stage-noise z-40 opacity-40" />

        {/* Ambient Stage Vignette */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)] z-30" />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            <main className="min-h-screen relative z-10">{children}</main>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
