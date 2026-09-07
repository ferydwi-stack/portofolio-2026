"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Linkedin, CheckCircle2, Radio } from "lucide-react";
import { GuitarStringDivider } from "./GuitarStringDivider";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-24 pl-6 sm:pl-12 lg:pl-28 pr-6 sm:pr-12 select-none overflow-hidden flex flex-col justify-between"
    >
      <GuitarStringDivider label="BOOK THE TOUR &bull; STAGE DISPATCH RIDER" fret={12} />

      {/* Asymmetric Full-Screen Layout: Left Side Light Beam & Headline, Right Side Form */}
      <div className="pt-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Dramatic Stage Marquee & Floodlight Visuals */}
        <div className="lg:col-span-6 space-y-8 relative z-20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/50 bg-[#140f1a]/90 text-red-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(255,42,59,0.3)]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>DIRECT STAGE DISPATCH</span>
            </div>

            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase text-white font-[family-name:var(--font-bebas)] leading-[0.88] text-glow-crimson">
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
              href="mailto:ferydwir27@gmail.com"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-red-500 group transition-all backdrop-blur-md shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-red-950/80 border border-red-800 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  ELECTRONIC MAIL
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                  ferydwir27@gmail.com
                </span>
              </div>
            </a>

            <a
              href="https://wa.me/6282183458754"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-emerald-500 group transition-all backdrop-blur-md shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  WHATSAPP HOTLINE
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                  +62 821-8345-8754
                </span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/fery-dwi-575204313"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-[#120f1a]/90 border border-zinc-800 hover:border-blue-500 group transition-all backdrop-blur-md shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                  LINKEDIN NETWORK
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                  Fery Dwi Ramadhi
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Right Side: Stage Rider Form */}
        <div className="lg:col-span-6 relative z-20">
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
                LIVE INPUT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  NAMA ANDA *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600"
                  placeholder="Nama Lengkap"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  ALAMAT EMAIL *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600"
                  placeholder="email@domain.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                SUBJEK RIDER *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formState.subject}
                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600"
                placeholder="Tawaran Proyek / Diskusi Teknis"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                PESAN RIDER DETAIL *
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600 resize-none"
                placeholder="Tuliskan gambaran proyek, target waktu, atau hal yang ingin Anda tanyakan..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-mono text-xs uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,42,59,0.5)] cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isSubmitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>PESAN BERHASIL DITRANSMISIKAN // TERIMA KASIH!</span>
                </>
              ) : (
                <>
                  <span>TRANSMIT STAGE MESSAGE</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
