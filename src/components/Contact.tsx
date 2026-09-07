"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Linkedin, Flame, CheckCircle2 } from "lucide-react";
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

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setIsSubmitted(false), 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <GuitarStringDivider label="BOOK THE SHOW &amp; COLLABORATION" fret={12} />

      {/* Dramatic Concert Stage Spotlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-red-600/15 via-amber-500/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6 md:px-12 pt-8 relative z-10">
        {/* Marquee Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest bg-red-950/40 px-3 py-1 rounded border border-red-900/50">
            <Flame className="w-3.5 h-3.5" />
            <span>DIRECT COMM CHANNELS &amp; BOOKING RIDER</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white font-[family-name:var(--font-bebas)]">
            Ready to Rock? Book the Show
          </h2>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base font-sans">
            Apakah Anda memiliki proyek perangkat lunak baru, tawaran kolaborasi teknis, atau sekadar ingin berdiskusi seputar stack dan musik? Pintu panggung selalu terbuka.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Direct Line Channels */}
          <div className="flex-1 space-y-6">
            <div className="bg-[#121017] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="border-b border-zinc-800 pb-4">
                <h3 className="text-xl font-bold font-mono uppercase text-white tracking-wide">
                  STAGE ACCESS CHANNELS
                </h3>
                <p className="text-xs font-mono text-zinc-500">
                  Direct Response Time: &lt; 24 Jam
                </p>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href="mailto:ferydwir27@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#171320] border border-zinc-800/80 hover:border-red-500/80 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                      ELECTRONIC MAIL
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                      ferydwir27@gmail.com
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/6282183458754"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#171320] border border-zinc-800/80 hover:border-emerald-500/80 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                      WHATSAPP HOTLINE
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                      +62 821-8345-8754
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/fery-dwi-575204313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#171320] border border-zinc-800/80 hover:border-blue-500/80 group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                      PROFESSIONAL NETWORK
                    </span>
                    <span className="text-sm sm:text-base font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                      Fery Dwi Ramadhi
                    </span>
                  </div>
                </a>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800/80 font-mono text-xs text-zinc-400">
                <span className="text-red-400 font-bold">STATUS JADWAL:</span> Terbuka
                untuk posisi Full-Time, Kontrak Remote, &amp; Proyek Khusus.
              </div>
            </div>
          </div>

          {/* Booking Inquiry Form */}
          <div className="flex-[1.4]">
            <form
              onSubmit={handleSubmit}
              className="bg-[#121017] p-6 sm:p-8 rounded-2xl border border-zinc-800 shadow-2xl space-y-6"
            >
              <div className="border-b border-zinc-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold font-mono uppercase text-white tracking-wide">
                    SEND STAGE RIDER / MESSAGE
                  </h3>
                  <p className="text-xs font-mono text-zinc-500">
                    Sampaikan detail proyek atau rencana kolaborasi Anda.
                  </p>
                </div>
                <span className="text-xs font-mono text-red-500 font-bold">LIVE INPUT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-xs font-mono uppercase tracking-wider text-zinc-300 block"
                  >
                    NAMA ANDA / ENTITAS *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600"
                    placeholder="Contoh: Alex Rivers"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-mono uppercase tracking-wider text-zinc-300 block"
                  >
                    ALAMAT EMAIL *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600"
                    placeholder="alex@studio.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-300 block"
                >
                  SUBJEK PESAN *
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600"
                  placeholder="Proyek Web App / Diskusi Kolaborasi"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-mono uppercase tracking-wider text-zinc-300 block"
                >
                  PESAN / RIDER KEBUTUHAN *
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#171422] border border-zinc-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-white font-sans text-sm placeholder:text-zinc-600 resize-none"
                  placeholder="Tuliskan gambaran proyek, timeline, atau gagasan yang ingin Anda diskusikan..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,42,59,0.4)]"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>PESAN BERHASIL TERKIRIM // TERIMA KASIH!</span>
                  </>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE / KIRIM PESAN</span>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
