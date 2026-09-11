"use client";

import { useState } from "react";
import { Mail, Send, Linkedin, MessageCircle, MapPin, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formattedMessage = [
      `*PESAN MASUK DARI PORTOFOLIO // FERY DWI RAMADHI*`,
      `*Nama:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Subjek:* ${formData.subject}`,
      ``,
      `*Isi Pesan:*`,
      `${formData.message}`,
    ].join("\n");

    const waUrl = `https://wa.me/6282183458754?text=${encodeURIComponent(formattedMessage)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (typeof window !== "undefined") {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 4500);
    }, 500);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 select-none flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">HUBUNGI SAYA // MULAI KOLABORASI</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Mari Berkolaborasi.
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Punya ide produk digital, membutuhkan rekayasa web skala penuh, atau tertarik untuk berdiskusi peluang kerja sama? Saya selalu siap berdiskusi.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/20 font-bold text-cyan-400 shadow-xs">
              RESPON CEPAT &lt; 24 JAM
            </span>
          </div>
        </div>

        {/* Postcard / Terminal Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-12 items-start">
          {/* Left Column: Direct Access Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4 backdrop-blur-xs">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                Saluran Kontak Langsung
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pilih metode komunikasi yang paling nyaman bagi Anda untuk memulai pembicaraan:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.contacts.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">Alamat Email</span>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {PERSONAL_INFO.contacts.email}
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">WhatsApp Chat</span>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      Chat Instan dengan Fery &rarr;
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-950/50 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-slate-500 uppercase">Profil LinkedIn</span>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-blue-300 transition-colors">
                      Koneksi Profesional
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs font-mono text-slate-400 px-2">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>INDONESIA &bull; TERSEDIA SECARA REMOTE ATAU ONSITE</span>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0E1524] border border-cyan-500/20 shadow-[0_0_50px_rgba(79,209,197,0.05)]">
              {/* Form Top Strip */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    TRANSMIT INQUIRY // SECURE FORM
                  </span>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                    Tuliskan pesan Anda di bawah ini
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-950/40 flex items-center gap-2 text-[10px] font-mono text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SECURE // 256-BIT</span>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Nama Pengirim *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama lengkap Anda"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@perusahaan.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                    Subjek Diskusi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Contoh: Diskusi Proyek Web / Penawaran Kerja Sama"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-300 uppercase">
                    Rincian Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan kebutuhan proyek, estimasi waktu, atau pertanyaan Anda..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-xs font-sans focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(79,209,197,0.3)] hover:shadow-[0_0_25px_rgba(79,209,197,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>{isSubmitting ? "MEMPROSES PENGIRIMAN..." : "KIRIM VIA WHATSAPP (INSTAN)"}</span>
                  </button>
                </div>

                {/* Success Notification */}
                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>Pesan siap! Mengalihkan ke WhatsApp untuk konfirmasi instan.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
