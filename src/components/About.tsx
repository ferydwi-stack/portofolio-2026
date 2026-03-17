import { Code2, Database, Layout, Smartphone } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: <Layout className="w-6 h-6 mb-4 text-blue-500" />,
    items: ["HTML & CSS", "JavaScript", "React / Next.js", "Tailwind CSS"],
  },
  {
    category: "Backend",
    icon: <Database className="w-6 h-6 mb-4 text-emerald-500" />,
    items: ["Node.js", "PHP", "MySQL", "RESTful APIs"],
  },
  {
    category: "Mobile",
    icon: <Smartphone className="w-6 h-6 mb-4 text-purple-500" />,
    items: ["Flutter", "Dart", "Responsive Design", "PWA"],
  },
  {
    category: "Tools & Others",
    icon: <Code2 className="w-6 h-6 mb-4 text-orange-500" />,
    items: ["Git & GitHub", "VS Code", "Figma", "Vercel"],
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-slate-50 dark:bg-[#09090b]/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-start gap-16">
          {/* Bio Section */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">
              Tentang Saya
              <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full" />
            </h2>
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400">
              <p>
                Halo! Saya Fery Dwi Ramadhi, seorang Fullstack Developer yang bersemangat dengan basis di Indonesia. 
                Saya menikmati proses menciptakan sesuatu yang hidup di internet, baik itu website, 
                aplikasi, maupun segala sesuatu di antaranya.
              </p>
              <p>
                Perjalanan saya dalam pengembangan perangkat lunak dimulai dari rasa ingin tahu tentang cara 
                kerja website, yang kemudian secara cepat berubah menjadi eksplorasi mendalam dalam membangun aplikasi yang fungsional dan 
                ramah pengguna. 
              </p>
              <p>
                Saat ini, fokus utama saya adalah membangun produk digital dan pengalaman antarmuka yang 
                berkualitas. Saya memiliki spesialisasi di ranah estetika frontend dan arsitektur backend, memberikan solusi yang utuh dan berperforma tinggi.
              </p>
            </div>
            
            <div className="pt-8">
              <a 
                href="#certificates" 
                className="inline-flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Lihat daftar sertifikat saya
                <span className="text-xl">→</span>
              </a>
            </div>
          </div>

          {/* Core Skills Summary */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div 
                key={skill.category}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:shadow-md transition-all group"
              >
                <div className="group-hover:-translate-y-1 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {skill.category}
                </h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
