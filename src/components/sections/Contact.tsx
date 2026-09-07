"use client";

import { useState, useRef } from "react";
import { Mail, MessageSquare, Send, Linkedin, CheckCircle2, Radio, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useContactTimeline } from "@/animations/useContactTimeline";
import { playStompClick, playGuitarChord } from "@/lib/sound/guitarSynth";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  // Connect GSAP timeline
  useContactTimeline({ sectionRef, contentRef, formRef });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    playStompClick();

    // Construct formatted WhatsApp message
    const formattedMessage = [
      `*PESAN PORTOFOLIO WEBSITE*`,
      `*Nama:* ${formState.name}`,
      `*Email:* ${formState.email}`,
      `*Subjek:* ${formState.subject}`,
      ``,
      `*Detail Pesan:*`,
      `${formState.message}`,
    ].join("\n");

    const waUrl = `https://wa.me/6282183458754?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playGuitarChord(164.81); // Bright triumph rock chord

      // Open WhatsApp directly in new window
      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4500);
    }, 800);
  };


  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-28 px-6 sm:px-12 lg:px-24 flex flex-col justify-center overflow-hidden select-none"
    >
      {/* Background Section Ambient Watermark */}
      <div className="absolute left-6 bottom-12 font-[family-name:var(--font-bebas)] text-[18vw] font-black text-white/[0.02] pointer-events-none select-none">
        KONTAK
      </div>

      {/* Asymmetric Split: Open Left for 3D Stage Lights, Shifted Right Form Console */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Side: Headline & Direct Channels */}
        <div ref={contentRef} className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/50 bg-[#140f1a]/90 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(255,42,59,0.3)]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>SALURAN KOMUNIKASI RESMI</span>
            </div>

            <h2 className="headline-section text-5xl sm:text-7xl lg:text-8xl font-normal uppercase text-white leading-[0.95]">
              Siap Berkolaborasi? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-600">
                Mari Terhubung
              </span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-xl">
              Terbuka untuk tawaran proyek pengembangan perangkat lunak, kolaborasi tim teknik, maupun konsultasi arsitektur web modern.
            </p>
          </div>

          {/* Direct Access Channels */}
          <div className="space-y-3 max-w-lg">
            <a
              href={`mailto:${PERSONAL_INFO.contacts.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-red-500 group transition-all backdrop-blur-md shadow-xl"
              data-cursor-text="EMAIL"
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  EMAIL RESMI
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                  {PERSONAL_INFO.contacts.email}
                </span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-emerald-500 group transition-all backdrop-blur-md shadow-xl"
              data-cursor-text="CHAT"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  WHATSAPP CHAT
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {PERSONAL_INFO.contacts.whatsapp}
                </span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.contacts.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-blue-500 group transition-all backdrop-blur-md shadow-xl"
              data-cursor-text="LINKEDIN"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  PROFIL LINKEDIN
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                  {PERSONAL_INFO.contacts.linkedin}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Minimalist Stage Rider Form (Underline styled inputs) */}
        <div ref={formRef} className="lg:col-span-6">
          <form
            onSubmit={handleSubmit}
            className="bg-[#110e19]/95 p-6 sm:p-10 rounded-3xl border-2 border-zinc-800 hover:border-red-500/70 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl space-y-6"
          >
            <div className="border-b border-zinc-800 pb-4 flex items-center justify-between font-mono">
              <div>
                <h3 className="text-xl font-bold uppercase text-white tracking-wide flex items-center gap-2">
                  <span>KIRIM PESAN &amp; KONSULTASI</span>
                  <span className="text-emerald-400 text-xs px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/50">WA</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Isi formulir di bawah, pesan akan otomatis terformat &amp; diteruskan ke WhatsApp resmi.
                </p>
              </div>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-600/60 flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>WHATSAPP DIRECT</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Underline Minimalist Input: Name */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-400 block"
                >
                  NAMA LENGKAP *
                </label>
                <input
                  type="text"
                  id="contact-name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-emerald-500 text-white font-sans text-base placeholder:text-zinc-600 transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Underline Minimalist Input: Email */}
              <div className="space-y-2 relative">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-400 block"
                >
                  ALAMAT EMAIL *
                </label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-emerald-500 text-white font-sans text-base placeholder:text-zinc-600 transition-colors"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Underline Minimalist Input: Subject */}
            <div className="space-y-2 relative">
              <label
                htmlFor="contact-subject"
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 block"
              >
                SUBJEK PESAN *
              </label>
              <input
                type="text"
                id="contact-subject"
                required
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-emerald-500 text-white font-sans text-base placeholder:text-zinc-600 transition-colors"
                placeholder="Tawaran Proyek / Diskusi Teknis"
              />
            </div>

            {/* Underline Minimalist Input: Message */}
            <div className="space-y-2 relative">
              <label
                htmlFor="contact-message"
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 block"
              >
                DETAIL PESAN ATAU KEBUTUHAN PROYEK *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-emerald-500 text-white font-sans text-base placeholder:text-zinc-600 resize-none transition-colors"
                placeholder="Tuliskan spesifikasi sistem, ruang lingkup proyek, target waktu, atau pertanyaan teknis Anda..."
              />
            </div>

            <div className="relative">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="relative w-full py-4 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 hover:from-emerald-500 hover:to-green-500 text-white rounded-xl font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2.5 group disabled:opacity-75 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(16,185,129,0.5)] cursor-pointer overflow-hidden border border-emerald-400/40 active:scale-95"
                data-cursor-text="WHATSAPP"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span className="text-white font-bold">MEMBUKA WHATSAPP // PESAN DITERUSKAN</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
                    <span>KIRIM PESAN KE WHATSAPP</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>


              {/* Spark Burst Confirmation Micro-interaction */}
              <AnimatePresence>
                {isSubmitted && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => {
                      const rad = (angle * Math.PI) / 180;
                      const dist = 70 + (idx % 2) * 20;
                      return (
                        <motion.div
                          key={angle}
                          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                          animate={{
                            opacity: 0,
                            scale: [0, 1.5, 0.4],
                            x: Math.cos(rad) * dist,
                            y: Math.sin(rad) * dist,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.65, ease: "easeOut" }}
                          className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_12px_#ff6b35]"
                        />
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
