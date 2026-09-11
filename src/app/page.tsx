import { BootSequence } from "@/components/blueprint/BootSequence";
import { BlueprintDivider } from "@/components/blueprint/BlueprintDivider";
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
      {/* Terminal Boot Sequence on First Visit */}
      <BootSequence />

      {/* 1. Hero Section */}
      <Hero />

      <BlueprintDivider label="PROFIL // PENGALAMAN // REKAYASA" />

      {/* 2. About Section */}
      <About />

      <BlueprintDivider label="KEAHLIAN // STACK // TEKNOLOGI" />

      {/* 3. Skills Section */}
      <Skills />

      <BlueprintDivider label="PORTOFOLIO // PROYEK // HASIL KARYA" />

      {/* 4. Projects Section */}
      <Projects />

      <BlueprintDivider label="SERTIFIKASI // LISENSI RESMI" />

      {/* 5. Certificates Section */}
      <Certificates />

      <BlueprintDivider label="KONTAK // KOLABORASI // DISKUSI" />

      {/* 6. Contact Section */}
      <Contact />

      {/* 7. Footer */}
      <Footer />
    </>
  );
}
