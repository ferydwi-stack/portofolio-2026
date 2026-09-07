"use client";

import Image from "next/image";
import { Layout, Database, Smartphone, Wrench, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { GuitarStringDivider } from "./GuitarStringDivider";

const techRigs = [
  {
    category: "Lead Frontend",
    role: "User Experience & Visual Stage",
    icon: <Layout className="w-5 h-5 text-red-500" />,
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
    gain: "95%",
  },
  {
    category: "Heavy Backend",
    role: "Data Pipelines & Architecture",
    icon: <Database className="w-5 h-5 text-amber-500" />,
    items: ["Node.js & Express", "PHP & Laravel", "MySQL & PostgreSQL", "RESTful APIs"],
    gain: "88%",
  },
  {
    category: "Mobile Division",
    role: "Cross-Platform Touring Apps",
    icon: <Smartphone className="w-5 h-5 text-purple-400" />,
    items: ["Flutter & Dart", "Firebase", "Responsive Design", "PWA"],
    gain: "82%",
  },
  {
    category: "Rig & Gear (Tools)",
    role: "Studio Equipment & Version Control",
    icon: <Wrench className="w-5 h-5 text-zinc-300" />,
    items: ["Git & GitHub", "VS Code", "Figma", "Vercel Deployments"],
    gain: "92%",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <GuitarStringDivider label="BAND BIO & DOSSIER" fret={3} />

      <div className="container mx-auto px-6 md:px-12 pt-8">
        <div className="flex flex-col lg:flex-row items-start gap-14 lg:gap-20">
          {/* Polaroid / Tour Album Profile Frame */}
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <motion.div
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative p-4 pb-12 bg-[#171320] border-2 border-zinc-700/70 rounded-xl shadow-2xl transform -rotate-2 hover:border-red-500/80 transition-colors w-full max-w-sm group cursor-pointer"
            >
              {/* Gaff Tape on Top */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-zinc-600/80 border border-zinc-500/40 rounded-xs transform -rotate-1 shadow-md opacity-85 z-20" />

              {/* VIP Tour Pass Stamp */}
              <div className="absolute top-6 right-6 z-20 px-2.5 py-1 bg-red-600/90 border border-red-400 text-white font-mono text-[10px] font-black uppercase tracking-widest rounded-xs transform rotate-12 shadow-lg">
                ALL ACCESS
              </div>

              {/* Photo Frame with Stage Lighting Contrast */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-black border border-zinc-800">
                <Image
                  src="/profile.jpg"
                  alt="Fery Dwi Ramadhi"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-center filter contrast-110 saturate-95 group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-red-950/20 pointer-events-none" />
              </div>

              {/* Handwritten style tour caption */}
              <div className="mt-4 px-2 flex items-center justify-between font-mono">
                <div>
                  <p className="text-sm font-bold text-zinc-100 tracking-wider">
                    FERY DWI RAMADHI
                  </p>
                  <p className="text-xs text-red-400 font-semibold tracking-wide">
                    DEV & GUITARIST // 2026 TOUR
                  </p>
                </div>
                <Flame className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
            </motion.div>

            {/* Quick Stats Pill */}
            <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-sm font-mono text-xs">
              <div className="p-3 bg-[#110f17] border border-zinc-800 rounded-lg text-center">
                <span className="text-zinc-500 block text-[10px] uppercase">STATUS</span>
                <span className="text-red-400 font-bold">READY TO DEPLOY</span>
              </div>
              <div className="p-3 bg-[#110f17] border border-zinc-800 rounded-lg text-center">
                <span className="text-zinc-500 block text-[10px] uppercase">DISCIPLINE</span>
                <span className="text-amber-400 font-bold">FULLSTACK × RIFFS</span>
              </div>
            </div>
          </div>

          {/* Bio Story Section */}
          <div className="flex-1 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-mono text-red-500 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-0.5 bg-red-500 inline-block" />
                {"//"} THE FRONTMAN STORY
              </div>
              <h2 className="text-4xl sm:text-5xl font-black uppercase text-white tracking-wider font-[family-name:var(--font-bebas)]">
                Harmonisasi Antara Logika Kode &amp; Distorsi Nada
              </h2>
            </div>

            <div className="space-y-4 text-base text-zinc-300 leading-relaxed font-sans">
              <p>
                Halo! Saya <strong className="text-white">Fery Dwi Ramadhi</strong>, seorang Fullstack Developer dan gitaris band yang berbasis di Indonesia. Bagi saya, memprogram perangkat lunak dan menggubah riff gitar memiliki DNA yang sama: keduanya membutuhkan presisi ritme, ketekunan arsitektur, dan keberanian untuk mengeksplorasi harmoni baru.
              </p>
              <p>
                Perjalanan saya dalam software engineering berakar dari rasa penasaran mendalam tentang bagaimana teknologi beroperasi di balik layar. Layaknya menyetem senar gitar hingga pitch sempurna, saya mengasah kemampuan dari pengembangan frontend yang responsif hingga arsitektur backend yang tahan beban tinggi.
              </p>
              <p>
                Fokus utama saya saat ini adalah membangun produk digital dan pengalaman antarmuka yang tidak hanya fungsional, tetapi juga berkarakter kuat — tangguh di performa, estetik dalam interaksi, dan selalu ramah pengguna.
              </p>
            </div>

            {/* Gear & Tech Rig Cards (Amplifier Style) */}
            <div className="pt-6">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <span>AMPLIFIER RIGS &amp; TECH ARSENAL</span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {techRigs.map((rig) => (
                  <div
                    key={rig.category}
                    className="p-5 rounded-xl bg-[#121017] border border-zinc-800/90 hover:border-red-500/60 transition-all hover:shadow-[0_0_15px_rgba(255,42,59,0.15)] group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-red-500/40 transition-colors">
                          {rig.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-mono uppercase text-white tracking-wide">
                            {rig.category}
                          </h3>
                          <p className="text-[10px] font-mono text-zinc-500">{rig.role}</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-900/50">
                        {rig.gain}
                      </span>
                    </div>

                    <ul className="mt-3 space-y-1.5 pt-2 border-t border-zinc-800/60">
                      {rig.items.map((item) => (
                        <li
                          key={item}
                          className="text-xs font-sans text-zinc-400 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA to Certificates */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href="#certificates"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-red-400 hover:text-red-300 transition-colors group"
              >
                <span>LIHAT BACKSTAGE PASS &amp; LAMINATES SERTIFIKAT</span>
                <span className="text-base group-hover:translate-x-1.5 transition-transform">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
