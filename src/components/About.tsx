"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Layout, Database, Smartphone, Wrench, Flame, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GuitarStringDivider } from "./GuitarStringDivider";

const techRigs = [
  {
    category: "Lead Frontend",
    role: "User Experience & Visual Stage",
    icon: <Layout className="w-4 h-4 text-red-500" />,
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    category: "Heavy Backend",
    role: "Data Pipelines & Server Architecture",
    icon: <Database className="w-4 h-4 text-amber-500" />,
    items: ["Node.js & Express", "PHP & Laravel", "MySQL & PostgreSQL", "RESTful APIs"],
  },
  {
    category: "Mobile Division",
    role: "Cross-Platform Touring Apps",
    icon: <Smartphone className="w-4 h-4 text-purple-400" />,
    items: ["Flutter & Dart", "Firebase", "Responsive Design", "PWA"],
  },
  {
    category: "Rig & Gear (Tools)",
    role: "Studio Equipment & Deployments",
    icon: <Wrench className="w-4 h-4 text-zinc-300" />,
    items: ["Git & GitHub", "VS Code", "Figma", "Vercel Deployments"],
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const photoFrameRef = useRef<HTMLDivElement | null>(null);
  const textContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current || !photoFrameRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Photo slides in from far right with heavy inertia
      gsap.fromTo(
        photoFrameRef.current,
        { x: 180, opacity: 0, rotate: 14 },
        {
          x: 0,
          opacity: 1,
          rotate: 8,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );

      // Bio text staggered fade up
      if (textContentRef.current) {
        gsap.fromTo(
          textContentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen py-24 overflow-hidden pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-12"
    >
      <GuitarStringDivider label="BAND BIO &amp; BACKSTAGE DOSSIER" fret={3} />

      <div className="relative pt-12 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-8">
        {/* Asymmetric Bio Text Column (Left Side, dynamic width) */}
        <div ref={textContentRef} className="w-full lg:w-7/12 space-y-7 z-20">
          <div className="space-y-3">
            <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2">
              <Flame className="w-4 h-4 text-red-500" />
              <span>{"//"} FRONTMAN DOSSIER</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black uppercase text-white tracking-wider font-[family-name:var(--font-bebas)] leading-[0.9]">
              Harmonisasi Antara Logika Kode &amp; Distorsi Nada
            </h2>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-2xl">
            <p>
              Halo! Saya <strong className="text-white">Fery Dwi Ramadhi</strong>, seorang Fullstack Developer dan gitaris band di Indonesia. Bagi saya, memprogram arsitektur perangkat lunak dan menggubah riff gitar memiliki prinsip dasar yang sama: keduanya memerlukan kestabilan tempo, struktur yang kokoh, dan keberanian bereksplorasi.
            </p>
            <p>
              Perjalanan rekayasa teknologi saya bermula dari rasa ingin tahu tentang cara kerja web modern. Layaknya menyetem senar gitar hingga nada yang paling bersih, saya mengasah kapabilitas mulai dari antarmuka pengguna yang responsif hingga arsitektur backend yang tahan beban tinggi.
            </p>
            <p>
              Fokus saya saat ini adalah merancang produk digital yang berkinerja tinggi, berkarakter kuat, dan memberikan solusi yang elegan bagi pengguna.
            </p>
          </div>

          {/* Amplifier Rigs Arsenal */}
          <div className="pt-4 space-y-3 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold border-b border-zinc-800 pb-2 flex items-center justify-between">
              <span>{"//"} STUDIO ARSENAL &amp; TECH GEAR</span>
              <span className="text-zinc-500">READY CHANNELS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techRigs.map((rig) => (
                <div
                  key={rig.category}
                  className="p-4 rounded-xl bg-[#110f17]/90 border border-zinc-800 hover:border-red-500/70 transition-all group backdrop-blur-md"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-700/80 group-hover:border-red-500 transition-colors">
                      {rig.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-mono uppercase text-white">
                        {rig.category}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-500">{rig.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/80">
                    {rig.items.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] font-mono text-zinc-400 bg-black/50 px-2 py-0.5 rounded border border-zinc-800"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <a
              href="#certificates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14101e] border border-red-500/50 hover:bg-red-600 hover:text-white text-xs font-mono uppercase tracking-widest font-bold text-red-400 transition-all shadow-lg group cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>LIHAT BACKSTAGE PASS &amp; SERTIFIKAT RESMI</span>
              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
            </a>
          </div>
        </div>

        {/* Diagonal Tilted Polaroid Frame (Right Viewport Edge Overlap) */}
        <div className="w-full lg:w-5/12 flex justify-center lg:justify-end z-20">
          <div
            ref={photoFrameRef}
            className="relative p-4 pb-12 bg-[#161220] border-2 border-zinc-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-sm w-full transform rotate-8 lg:translate-x-8 hover:rotate-0 transition-transform duration-500 group cursor-pointer"
          >
            {/* Gaffer Tape Strip */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-600/90 border border-zinc-500/50 rounded-xs transform -rotate-1 shadow-md opacity-90 z-30" />

            {/* VIP Pass Stamp */}
            <div className="absolute top-6 right-6 z-30 px-3 py-1 bg-red-600 border border-red-400 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xs transform rotate-12 shadow-lg">
              ALL ACCESS
            </div>

            {/* Photo Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black border border-zinc-800">
              <Image
                src="/profile.jpg"
                alt="Fery Dwi Ramadhi"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center filter contrast-110 saturate-95 group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-950/20 pointer-events-none" />
            </div>

            {/* Polaroid Bottom Caption */}
            <div className="mt-4 px-2 flex items-center justify-between font-mono">
              <div>
                <p className="text-sm font-black text-white tracking-wider">
                  FERY DWI RAMADHI
                </p>
                <p className="text-xs text-red-400 font-bold">
                  DEV &amp; GUITARIST // TOUR 2026
                </p>
              </div>
              <span className="text-xs font-mono text-zinc-500">STAGE READY</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
