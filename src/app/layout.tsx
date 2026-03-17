import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fery Dwi Ramadhi | Fullstack Developer",
  description: "Personal portfolio of Fery Dwi Ramadhi, a Fullstack Developer building scalable web and mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-[#09090b] text-slate-900 dark:text-slate-50`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
