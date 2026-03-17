"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Phone } from "lucide-react";

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset after showing success message
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-[#09090b]/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white inline-flex flex-col items-center">
            Hubungi Saya
            <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full" />
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Punya ide proyek atau sekadar ingin menyapa? Jangan ragu untuk menghubungi. Saat ini saya terbuka untuk peluang baru.
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* Contact Info */}
          <div className="flex-1 space-y-8 lg:pr-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Informasi Kontak
              </h3>
              <div className="space-y-6">
                <a href="mailto:ferydwir27@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</p>
                    <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      ferydwir27@gmail.com
                    </p>
                  </div>
                </a>
                
                <a href="https://wa.me/6282183458754" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">WhatsApp</p>
                    <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      +62 821-8345-8754
                    </p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/fery-dwi-575204313" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">LinkedIn</p>
                    <p className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Fery Dwi
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-[1.5]">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Nama Anda
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white"
                    placeholder="Budi Santoso"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Anda
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white"
                    placeholder="budi@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-6">
                <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Subjek
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all text-slate-900 dark:text-white"
                  placeholder="Ada yang bisa saya bantu?"
                />
              </div>

              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Pesan
                </label>
                <textarea 
                  id="message" 
                  rows={5}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all resize-none text-slate-900 dark:text-white"
                  placeholder="Tuliskan pesan Anda di sini..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSubmitted ? (
                  "Pesan Berhasil Terkirim"
                ) : (
                  <>
                    Kirim Pesan
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
