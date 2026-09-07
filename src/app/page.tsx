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

      {/* 1. Hero Section (Out-of-center 14vw headline overlapping 3D character) */}
      <Hero />

      <DiagonalDivider direction="tilt-right" fretNumber={3} label="STAGE BOUNDARY &bull; BIO DOSSIER" />

      {/* 2. About Section (Diagonal split layout with -8deg tilted photo) */}
      <About />

      <DiagonalDivider direction="tilt-left" fretNumber={5} label="SOUNDCHECK &bull; SETLIST ANTHEMS" />

      {/* 3. Skills Section (Pinned horizontal setlist with non-uniform cards) */}
      <Skills />

      <DiagonalDivider direction="tilt-right" fretNumber={7} label="DISCOGRAPHY &bull; MASTER PRESSINGS" />

      {/* 4. Projects Section (Pinned full-bleed 90vw gallery with 3D vinyl records) */}
      <Projects />

      <DiagonalDivider direction="tilt-left" fretNumber={9} label="CREDENTIALS &bull; BACKSTAGE WALL" />

      {/* 5. Certificates Section (Chaotic wall collage with seeded angles & hover physics) */}
      <Certificates />

      <DiagonalDivider direction="tilt-right" fretNumber={12} label="STAGE TRANSMISSION &bull; RIDER DISPATCH" />

      {/* 6. Contact Section (Asymmetric stage lights on left, form on right) */}
      <Contact />

      {/* 7. Footer Section (Slender with vibrating guitar string divider) */}
      <Footer />
    </>
  );
}
