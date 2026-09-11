import { FlashOverlay } from "@/components/photobooth/FlashOverlay";
import { FilmstripDivider } from "@/components/photobooth/FilmstripDivider";
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
      {/* Photobooth Flash Effect on Page Load */}
      <FlashOverlay duration={0.6} />

      {/* 1. Hero Studio Section */}
      <Hero />

      <FilmstripDivider label="PROFIL &bull; PENGALAMAN &bull; REKAYASA" />

      {/* 2. About Scrapbook Section */}
      <About />

      <FilmstripDivider label="KEAHLIAN &bull; STACK &bull; TEKNOLOGI" />

      {/* 3. Skills Contact Sheet Section */}
      <Skills />

      <FilmstripDivider label="PORTOFOLIO &bull; PROYEK &bull; HASIL KARYA" />

      {/* 4. Projects Filmstrip Section */}
      <Projects />

      <FilmstripDivider label="SERTIFIKASI &bull; LISENSI RESMI" />

      {/* 5. Certificates Pinboard Section */}
      <Certificates />

      <FilmstripDivider label="KONTAK &bull; KOLABORASI &bull; DISKUSI" />

      {/* 6. Contact Postcard Section */}
      <Contact />

      {/* 7. Footer Section with End-of-roll styling */}
      <Footer />
    </>
  );
}
