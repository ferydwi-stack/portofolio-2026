"use client";

import Image from "next/image";
import { Layout, Database, Smartphone, Wrench, Disc3, Award } from "lucide-react";
import { motion } from "framer-motion";
import { GuitarStringDivider } from "./GuitarStringDivider";

const techRigs = [
  {
    category: "Lead Frontend",
    role: "User Experience & Visual Stage",
    icon: <Layout className="w-5 h-5 text-red-500" />,
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
    gain: "GAIN: 10/10",
  },
  {
    category: "Heavy Backend",
    role: "Data Pipelines & Server Architecture",
    icon: <Database className="w-5 h-5 text-amber-500" />,
    items: ["Node.js & Express", "PHP & Laravel", "MySQL & PostgreSQL", "RESTful APIs"],
    gain: "GAIN: 9.5/10",
  },
  {
    category: "Mobile Division",
    role: "Cross-Platform Touring Apps",
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    items: ["Flutter & Dart", "Firebase", "Responsive Design", "PWA"],
    gain: "GAIN: 9.0/10",
  },
  {
    category: "Rig & Gear (Tools)",
    role: "Studio Equipment & Version Control",
    icon: <Wrench className="w-5 h-5 text-zinc-300" />,
    items: ["Git & GitHub", "VS Code", "Figma", "Vercel Deployments"],
    gain: "GAIN: 9.8/10",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <GuitarStringDivider label="BAND BIO &amp; BACKSTAGE ARCHIVES" fret={3} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-20">
          {/* Vinyl Turntable & Tour Polaroid Profile */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <motion.div
              whileHover={{ rotate: 0, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative p-5 pb-10 bg-[#161220] border-2 border-zinc-700/80 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] transform -rotate-2 hover:border-red-500 transition-colors w-full max-w-sm group cursor-pointer"
            >
              {/* Gaffer Tape on Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-600/90 border border-zinc-500/50 rounded-xs transform -rotate-1 shadow-md opacity-90 z-30" />

              {/* VIP Tour Pass Hologram Stamp */}
              <div className="absolute top-7 right-7 z-30 px-3 py-1 bg-red-600 border border-red-400 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xs transform rotate-12 shadow-lg flex items-center gap-1">
                <span>VIP 2026</span>
              </div>

              {/* Turntable Vinyl Record Peek */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-black border border-zinc-800 shadow-inner">
                <Image
                  src="/profile.jpg"
                  alt="Fery Dwi Ramadhi"
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center filter contrast-110 saturate-95 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Disc Graphic */}
                <div className="absolute bottom-3 right-3 p-2 bg-black/80 rounded-full backdrop-blur-sm border border-red-500/50">
                  <Disc3 className="w-6 h-6 text-red-500 group-hover:animate-spin-slow transition-transform" />
                </div>
              </div>

              {/* Polaroid Footer */}
              <div className="mt-5 px-1 flex items-center justify-between font-mono">
                <div>
                  <p className="text-base font-black text-white tracking-wider">
                    FERY DWI RAMADHI
                  </p>
                  <p className="text-xs text-red-400 font-bold tracking-wide">
                    FULLSTACK ARCHITECT &amp; GUITARIST
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-500">STAGE READY</span>
              </div>
            </motion.div>

            {/* Stage Soundcheck Telemetry */}
            <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-sm font-mono text-xs">
              <div className="p-3.5 bg-[#120f1a] border border-zinc-800 rounded-xl text-center shadow-lg">
                <span className="text-zinc-500 block text-[9px] uppercase tracking-widest">
                  TEMPO &amp; PACE
                </span>
                <span className="text-red-400 font-bold text-sm">140 BPM STABLE</span>
              </div>
              <div className="p-3.5 bg-[#120f1a] border border-zinc-800 rounded-xl text-center shadow-lg">
                <span className="text-zinc-500 block text-[9px] uppercase tracking-widest">
                  RIG VOLTAGE
                </span>
                <span className="text-amber-400 font-bold text-sm">240V HIGH GAIN</span>
              </div>
            </div>
          </div>

          {/* Bio Story & Tech Rigs */}
          <div className="flex-1 space-y-7">
            <div className="space-y-3">
              <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-3 h-0.5 bg-red-500 inline-block" />
                <span>{"//"} FRONTMAN PROFILE &amp; PHILOSOPHY</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black uppercase text-white tracking-wider font-[family-name:var(--font-bebas)] leading-tight">
                Harmonisasi Antara Presisi Kode &amp; Karakter Nada
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-sans">
              <p>
                Halo! Saya <strong className="text-white">Fery Dwi Ramadhi</strong>, seorang Fullstack Developer sekaligus gitaris band yang berbasis di Indonesia. Bagi saya, memprogram arsitektur perangkat lunak dan menggubah riff lagu rock memiliki esensi yang identik: keduanya memerlukan kepekaan ritme, fondasi yang kokoh, dan dedikasi penuh untuk mencapai hasil yang harmonis dan bertenaga.
              </p>
              <p>
                Perjalanan rekayasa perangkat lunak saya bermula dari eksplorasi mendalam terhadap mekanisme teknologi internet. Layaknya menyetem senar gitar hingga nada yang paling jernih, saya melatih kapabilitas mulai dari interaksi frontend yang fluid hingga arsitektur database backend yang tangguh menahan beban kerja intensif.
              </p>
              <p>
                Fokus saya saat ini adalah membangun solusi digital yang berkinerja tinggi, berkarakter kuat, dan memberikan dampak nyata bagi pengguna maupun industri.
              </p>
            </div>

            {/* Studio Amplifiers & Pedalboards Arsenal */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 font-mono text-xs text-zinc-400">
                <span className="uppercase tracking-widest text-red-400 font-bold">
                  {"//"} STUDIO AMPLIFIERS &amp; TECH ARSENAL
                </span>
                <span className="text-zinc-500">4 CHANNELS LOADED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techRigs.map((rig) => (
                  <div
                    key={rig.category}
                    className="p-5 rounded-2xl bg-[#121017] border border-zinc-800 hover:border-red-500/70 transition-all hover:shadow-[0_0_25px_rgba(255,42,59,0.15)] group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#1a1624] border border-zinc-700/80 group-hover:border-red-500/50 transition-colors">
                          {rig.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase text-white tracking-wide">
                            {rig.category}
                          </h3>
                          <p className="text-[10px] font-mono text-zinc-400">{rig.role}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/60">
                        {rig.gain}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5 pt-3 border-t border-zinc-800/80">
                      {rig.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs font-sans text-zinc-400 flex items-center gap-2 group-hover:text-zinc-200 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Action link */}
            <div className="pt-2">
              <a
                href="#certificates"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#14101e] border border-red-500/50 hover:bg-red-600 hover:text-white text-xs font-mono uppercase tracking-widest font-bold text-red-400 transition-all group shadow-lg"
              >
                <Award className="w-4 h-4" />
                <span>LIHAT BACKSTAGE PASS &amp; SERTIFIKASI RESMI</span>
                <span className="group-hover:translate-x-1.5 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
