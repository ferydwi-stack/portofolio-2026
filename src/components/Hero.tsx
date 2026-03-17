import Image from "next/image";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";

export function Hero() {
  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl -z-10 pointer-events-none translate-x-1/3 -translate-y-1/3" />
      
      <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Text Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              Tersedia untuk peluang baru
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
              Halo, Saya <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">
                Fery Dwi Ramadhi
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-slate-700 dark:text-slate-300">
              Fullstack Developer
            </h2>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400">
              Membangun aplikasi web dan mobile yang scalable dengan teknologi modern. 
              Mengubah masalah kompleks menjadi solusi yang elegan dan ramah pengguna.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <a 
              href="#projects" 
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center gap-2 group shadow-lg shadow-blue-500/25"
            >
              Lihat Proyek 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3.5 rounded-full border-2 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 font-medium transition-colors text-slate-900 dark:text-white"
            >
              Hubungi Saya
            </a>
          </div>

          <div className="flex items-center gap-6 pt-6">
            <a href="https://github.com/ferydwi-stack" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors" aria-label="GitHub">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/fery-dwi-575204313" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:ferydwir27@gmail.com" className="text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors" aria-label="Email">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Profile Image Space */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 dark:opacity-40 animate-pulse" />
            <div className="relative w-full h-full rounded-full border-4 border-white dark:border-slate-800 shadow-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
              {/* Replace with actual image later */}
              <Image
                src="/profile.jpg"
                alt="Fery Dwi Ramadhi"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating badges */}
            <div className="absolute -top-6 -right-6 md:top-0 md:-right-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transform rotate-12 hover:rotate-0 transition-transform">
              <span className="text-2xl">💻</span>
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-2 md:-left-8 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 transform -rotate-12 hover:rotate-0 transition-transform">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
