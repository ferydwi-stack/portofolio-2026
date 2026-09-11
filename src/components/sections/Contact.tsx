"use client";

import { useState } from "react";
import { Mail, Send, Linkedin, MessageCircle, MapPin, CheckCircle2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { playShutterSound } from "@/lib/sound/shutterSound";

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
    playShutterSound();

    const formattedMessage = [
      `*PESAN MASUK DARI PORTOFOLIO CEKREK*`,
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
    }, 600);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 sm:py-32 px-5 sm:px-10 lg:px-16 paper-grain select-none flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="pb-12 sm:pb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5DFC8]">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#E5DFC8] text-xs font-mono text-[#E24332]">
              <Mail className="w-3.5 h-3.5" />
              <span className="font-bold uppercase tracking-wider">HUBUNGI SAYA // MULAI KOLABORASI</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#1C1A18] tracking-tight uppercase">
              Mari Berkolaborasi.
            </h2>
            <p className="text-sm sm:text-base text-[#5A554E] max-w-2xl leading-relaxed">
              Punya ide produk digital, membutuhkan rekayasa web skala penuh, atau tertarik untuk berdiskusi peluang kerja sama? Saya selalu siap berdiskusi.
            </p>
          </div>

          <div className="text-xs font-mono text-[#7A7568] flex items-center gap-2 self-start sm:self-end">
            <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5DFC8] font-bold text-[#1C1A18] shadow-xs">
              RESPON CEPAT &lt; 24 JAM
            </span>
          </div>
        </div>

        {/* Postcard Container Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pt-12 items-start">
          {/* Left Column: Direct Access Stamps */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-[#E5DFC8] polaroid-card-shadow space-y-4">
              <h3 className="text-lg font-black text-[#1C1A18] uppercase tracking-tight">
                Saluran Kontak Langsung
              </h3>
              <p className="text-xs text-[#5A554E] leading-relaxed">
                Pilih metode komunikasi yang paling nyaman bagi Anda untuk memulai pembicaraan:
              </p>

              <div className="space-y-3 pt-2">
                <a
                  href={`mailto:${PERSONAL_INFO.contacts.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#E5DFC8] hover:border-[#F5B738] transition-all cursor-pointer group"
                  data-cursor-text="EMAIL"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#FAF2DE] border border-[#F5B738]/60 flex items-center justify-center text-[#996D14]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#968F84] uppercase">Alamat Email</span>
                    <span className="text-xs font-bold text-[#1C1A18] group-hover:text-[#E24332] transition-colors">
                      {PERSONAL_INFO.contacts.email}
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.contacts.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#E5DFC8] hover:border-[#2C6E64] transition-all cursor-pointer group"
                  data-cursor-text="WHATSAPP"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E6F4F1] border border-[#7FA99B] flex items-center justify-center text-[#2C6E64]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#968F84] uppercase">WhatsApp Chat</span>
                    <span className="text-xs font-bold text-[#1C1A18] group-hover:text-[#2C6E64] transition-colors">
                      Chat Instan dengan Fery &rarr;
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.contacts.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[#FAF8F5] hover:bg-white border border-[#E5DFC8] hover:border-[#0077B5] transition-all cursor-pointer group"
                  data-cursor-text="LINKEDIN"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#E8F4F9] border border-[#81D4FA] flex items-center justify-center text-[#0288D1]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono text-[#968F84] uppercase">Profil LinkedIn</span>
                    <span className="text-xs font-bold text-[#1C1A18] group-hover:text-[#0288D1] transition-colors">
                      Koneksi Profesional
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#7A7568] px-2">
              <MapPin className="w-4 h-4 text-[#E24332]" />
              <span>INDONESIA &bull; TERSEDIA SECARA REMOTE ATAU ONSITE</span>
            </div>
          </div>

          {/* Right Column: Airmail Postcard Form */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-[#E5DFC8] polaroid-card-shadow">
              {/* Postcard Top Strip with Stamp */}
              <div className="flex items-center justify-between border-b border-[#ECE7D8] pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#1C1A18] uppercase tracking-wider">
                    LEMBAR KARTU POS STUDIO // INQUIRY
                  </span>
                  <p className="text-[10px] font-mono text-[#7A7568]">
                    Tuliskan pesan Anda di bawah ini
                  </p>
                </div>

                {/* Postage Stamp Box */}
                <div className="w-12 h-14 rounded border-2 border-dashed border-[#E24332] flex flex-col items-center justify-center text-[8px] font-mono font-black text-[#E24332] bg-[#FFF5F5]">
                  <span>POST</span>
                  <Heart className="w-3 h-3 fill-current my-0.5" />
                  <span>2026</span>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#1C1A18] uppercase">
                      Nama Pengirim *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama lengkap Anda"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] text-[#1C1A18] placeholder-[#968F84] text-xs font-sans focus:outline-none focus:border-[#F5B738] transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono font-bold text-[#1C1A18] uppercase">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@perusahaan.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] text-[#1C1A18] placeholder-[#968F84] text-xs font-sans focus:outline-none focus:border-[#F5B738] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#1C1A18] uppercase">
                    Subjek Diskusi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Contoh: Diskusi Proyek Web / Penawaran Kerja Sama"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] text-[#1C1A18] placeholder-[#968F84] text-xs font-sans focus:outline-none focus:border-[#F5B738] transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono font-bold text-[#1C1A18] uppercase">
                    Rincian Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan kebutuhan proyek, estimasi waktu, atau pertanyaan Anda..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFC8] text-[#1C1A18] placeholder-[#968F84] text-xs font-sans focus:outline-none focus:border-[#F5B738] transition-colors resize-none"
                  />
                </div>

                {/* Submit Shutter Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#1C1A18] hover:bg-[#33302B] text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    data-cursor-text="KIRIM"
                  >
                    <Send className="w-4 h-4 text-[#F5B738]" />
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
                      className="p-3 rounded-xl bg-[#E6F4F1] border border-[#7FA99B] text-[#2C6E64] text-xs font-mono font-semibold flex items-center gap-2"
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
