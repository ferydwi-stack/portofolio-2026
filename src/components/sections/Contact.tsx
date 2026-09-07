"use client";

import { useState, useRef } from "react";
import { Mail, MessageSquare, Send, Linkedin, CheckCircle2, Radio } from "lucide-react";
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

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playGuitarChord(164.81); // Bright triumph rock chord
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4500);
    }, 1000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen py-28 px-6 sm:px-12 lg:px-24 flex flex-col justify-center overflow-hidden select-none"
    >
      {/* Background Section Ambient Watermark */}
      <div className="absolute left-6 bottom-12 font-[family-name:var(--font-bebas)] text-[18vw] font-black text-white/[0.02] pointer-events-none select-none">
        DISPATCH
      </div>

      {/* Asymmetric Split: Open Left for 3D Stage Lights, Shifted Right Form Console */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
        {/* Left Side: Dramatic Headline & Direct Channels */}
        <div ref={contentRef} className="lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/50 bg-[#140f1a]/90 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(255,42,59,0.3)]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>DIRECT STAGE DISPATCH</span>
            </div>

            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white font-[family-name:var(--font-anton)] leading-[0.92]">
              Ready To Rock? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-600">
                Book The Tour
              </span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-sans leading-relaxed max-w-xl">
              Pintu panggung terbuka untuk tawaran kolaborasi proyek perangkat lunak baru, rekrutmen tim, maupun diskusi seputar arsitektur sistem dan musik rock.
            </p>
          </div>

          {/* Direct Access Channels */}
          <div className="space-y-3 max-w-lg">
            <a
              href={`mailto:${PERSONAL_INFO.contacts.email}`}
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-red-500 group transition-all backdrop-blur-md shadow-xl"
              data-cursor-text="MAIL"
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  ELECTRONIC MAIL
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
                  WHATSAPP HOTLINE
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
              data-cursor-text="LINK"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  LINKEDIN NETWORK
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
                <h3 className="text-xl font-bold uppercase text-white tracking-wide">
                  TRANSMIT STAGE RIDER
                </h3>
                <p className="text-xs text-zinc-500">
                  Input detail kebutuhan proyek atau kolaborasi Anda.
                </p>
              </div>
              <span className="text-xs text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded border border-red-900">
                LIVE DISPATCH
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
                  className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-red-500 text-white font-sans text-base placeholder:text-zinc-600 transition-colors"
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
                  className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-red-500 text-white font-sans text-base placeholder:text-zinc-600 transition-colors"
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
                SUBJEK RIDER *
              </label>
              <input
                type="text"
                id="contact-subject"
                required
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-red-500 text-white font-sans text-base placeholder:text-zinc-600 transition-colors"
                placeholder="Tawaran Proyek / Diskusi Teknis"
              />
            </div>

            {/* Underline Minimalist Input: Message */}
            <div className="space-y-2 relative">
              <label
                htmlFor="contact-message"
                className="text-xs font-mono uppercase tracking-wider text-zinc-400 block"
              >
                PESAN RIDER DETAIL *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full py-2.5 px-0 bg-transparent border-b-2 border-zinc-700 focus:outline-none focus:border-red-500 text-white font-sans text-base placeholder:text-zinc-600 resize-none transition-colors"
                placeholder="Tuliskan spesifikasi proyek, deadline, atau pertanyaan Anda..."
              />
            </div>

            <div className="relative">
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="relative w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 group disabled:opacity-75 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,42,59,0.5)] cursor-pointer overflow-hidden"
                data-cursor-text="TRANSMIT"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span className="text-emerald-200">PASS CONFIRMED // MESSAGE SENT BACKSTAGE</span>
                  </>
                ) : (
                  <>
                    <span>SEND IT BACKSTAGE</span>
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
