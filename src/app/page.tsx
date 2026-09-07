import { CurtainIntro } from "@/components/ui/CurtainIntro";
import { DiagonalDivider } from "@/components/ui/DiagonalDivider";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* Curtain Intro on First Page Load */}
      <CurtainIntro />

      {/* 1. Hero Section */}
      <Hero />

      <DiagonalDivider direction="tilt-right" fretNumber={3} label="PROFIL &bull; TENTANG SAYA" />

      {/* 2. About Section */}
      <About />

      <DiagonalDivider direction="tilt-left" fretNumber={5} label="KEAHLIAN &bull; TEKNOLOGI" />

      {/* 3. Skills Section */}
      <Skills />

      <DiagonalDivider direction="tilt-right" fretNumber={7} label="PORTOFOLIO &bull; PROYEK PILIHAN" />

      {/* 4. Projects Section */}
      <Projects />

      <DiagonalDivider direction="tilt-left" fretNumber={9} label="SERTIFIKASI &bull; LISENSI RESMI" />

      {/* 5. Certificates Section */}
      <Certificates />

      <DiagonalDivider direction="tilt-right" fretNumber={12} label="KONTAK &bull; KONSULTASI" />

      {/* 6. Contact Section */}
      <Contact />

      {/* 7. Footer Section (Slender with vibrating guitar string divider) */}
      <Footer />
    </>
  );
}
