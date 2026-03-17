import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Portfolio",
    description: "Portofolio pribadi yang menampilkan informasi tentang diri saya, keahlian, dan proyek-proyek yang telah saya kerjakan.",
    image: "/portofolio.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "#",
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile.git"
  },
  {
    title: "Sistem Kasir Warung",
    description: "Sistem Point of Sale sederhana yang dirancang khusus untuk toko kelontong, dilengkapi dengan manajemen inventaris, pelacakan penjualan, dan pelaporan.",
    image: "/kasir.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung.git"
  },
  {
    title: "Aplikasi Presensi Guru",
    description: "Aplikasi mobile lintas platform untuk sekolah untuk melacak presensi guru secara efisien menggunakan layanan lokasi dan verifikasi wajah.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase"],
    liveUrl: "#",
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden.git"
  },
  {
    title: "SahabatBK",
    description: "Aplikasi mobile untuk membantu siswa dalam mengatasi masalah pribadi dan akademik dengan menyediakan konseling online dan sumber daya pendidikan.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase"],
    liveUrl: "#",
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin.git"
  },

];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-50 dark:bg-[#09090b]/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white inline-flex flex-col items-center">
            Proyek Unggulan
            <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full" />
          </h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Beberapa hal yang telah saya bangun. Proyek-proyek ini menunjukkan pengalaman saya di berbagai teknologi serta pemecahan masalah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <div 
              key={project.title}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-sm transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Fallback pattern if image goes down */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-300 via-slate-100 to-transparent dark:from-slate-600 dark:via-slate-800 dark:to-transparent" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                  
                <div className="flex">
                  <a 
                    href={project.githubUrl}
                    className="flex items-center justify-center gap-2 p-2.5 border-2 border-slate-200 dark:border-slate-800 rounded-xl text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-all"
                    aria-label="Lihat Kode Sumber"
                  >
                    <Github className="w-5 h-5" />
                    <span className="font-medium">Kode Sumber</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://github.com/ferydwi-stack" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Lihat lebih banyak proyek di GitHub 
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
