export interface Project {
  title: string;
  catalogNo: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  rpm: string;
  side: string;
}

export interface Skill {
  track: string;
  name: string;
  category: string;
  level: number; // 1-5 scale or percentage
  proficiency: number; // 0-100%
  bpm: number;
  featured?: boolean;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  image: string;
  type: "academic" | "external";
}

export interface TechRig {
  category: string;
  role: string;
  items: string[];
}

export const PERSONAL_INFO = {
  name: "FERY DWI RAMADHI",
  role: "Mahasiswa Informatika & Web Developer",
  headline: "FERY DWI RAMADHI",
  npm: "23312086",
  major: "Informatika",
  tagline: "Membangun Solusi Digital Berkualitas Tinggi & Berkinerja Optimal",
  bioParagraphs: [
    "Halo! Saya Fery Dwi Ramadhi, Mahasiswa Informatika (NPM: 23312086) yang memiliki minat mendalam di bidang Web Development dan Project Management khusus dunia Informatika.",
    "Fokus saya mencakup perancangan antarmuka responsif, rekayasa fullstack terstruktur, arsitektur basis data, serta pengelolaan siklus hidup proyek perangkat lunak dari inisiasi hingga tahap produksi.",
    "Selalu antusias mempelajari teknologi web termutakhir, mengoptimalkan arsitektur sistem yang skalabel, dan mewujudkan ide-ide inovatif menjadi aplikasi nyata yang berdaya guna tinggi.",
  ],
  contacts: {
    email: "ferydwir27@gmail.com",
    whatsapp: "+62 821-8345-8754",
    whatsappUrl: "https://wa.me/6282183458754",
    linkedin: "Fery Dwi Ramadhi",
    linkedinUrl: "https://www.linkedin.com/in/fery-dwi-575204313",
    githubUrl: "https://github.com/ferydwi-stack",
  },
  profileImage: "/profile.jpg",
};

export const TECH_RIGS: TechRig[] = [
  {
    category: "Frontend Engineering",
    role: "Antarmuka Pengguna & Interaktivitas Web",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    category: "Backend Architecture",
    role: "API RESTful, Layanan Server & Basis Data",
    items: ["Node.js & Express", "PHP & Laravel", "MySQL & PostgreSQL", "RESTful APIs"],
  },
  {
    category: "Mobile Application",
    role: "Pengembangan Aplikasi Lintas Platform",
    items: ["Flutter & Dart", "Firebase", "Responsive Design", "PWA"],
  },
  {
    category: "Tools & Management",
    role: "Version Control, Workflow & Project Management",
    items: ["Git & GitHub", "Project Management", "VS Code", "Figma"],
  },
];

export const SKILLS_SETLIST: Skill[] = [
  { track: "01", name: "CSS / Tailwind", category: "CSS Framework", level: 5, proficiency: 95, bpm: 95, featured: true },
  { track: "02", name: "React.js", category: "Frontend Library", level: 5, proficiency: 90, bpm: 90, featured: true },
  { track: "03", name: "Next.js", category: "Fullstack Framework", level: 4, proficiency: 88, bpm: 88, featured: true },
  { track: "04", name: "Node.js", category: "JavaScript Runtime", level: 4, proficiency: 86, bpm: 86, featured: true },
  { track: "05", name: "Express.js", category: "Backend Framework", level: 4, proficiency: 85, bpm: 85 },
  { track: "06", name: "TypeScript", category: "Typed Programming", level: 4, proficiency: 82, bpm: 82 },
  { track: "07", name: "MySQL", category: "Relational Database", level: 4, proficiency: 82, bpm: 82 },
  { track: "08", name: "PHP & Laravel", category: "Backend MVC Framework", level: 3, proficiency: 80, bpm: 80 },
  { track: "09", name: "Flutter & Dart", category: "Cross-Platform Mobile", level: 3, proficiency: 78, bpm: 78 },
  { track: "10", name: "PostgreSQL", category: "Relational Database", level: 3, proficiency: 74, bpm: 74 },
];

export const PROJECTS: Project[] = [
  {
    title: "SISTEM KASIR ADMIN",
    catalogNo: "CAT-01 // POINT OF SALE",
    year: "2025",
    description:
      "Dashboard manajemen produk terintegrasi, pemrosesan transaksi kasir instan, dan pelaporan penjualan otomatis berbasis arsitektur web andal.",
    image: "/kasir.png",
    tags: ["PHP", "HTML", "CSS", "MySQL", "Dashboard"],
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung",
    rpm: "33 RPM",
    side: "SIDE A // MASTER POS",
  },
  {
    title: "LAT7 — BIODATA & KEAHLIAN",
    catalogNo: "CAT-02 // ADVANCED LAYOUT",
    year: "2025",
    description:
      "Project layouting tingkat lanjut (Final Fix) dengan implementasi struktur antarmuka responsif, tipografi presisi, dan visualisasi data keahlian.",
    image: "/portofolio.png",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile",
    rpm: "45 RPM",
    side: "SIDE B // FRONTEND RIG",
  },
  {
    title: "Tugas MusikA3",
    catalogNo: "CAT-03 // MULTIMEDIA & AUDIO",
    year: "2025",
    description:
      "Project multimedia interaktif dengan analisis vokal/audio digital dan integrasi pemrosesan sinyal suara berbasis Web Audio.",
    image: "/absen.jpg",
    tags: ["JavaScript", "Web Audio", "Multimedia", "Signal Analysis"],
    githubUrl: "https://github.com/ferydwi-stack",
    rpm: "33 RPM",
    side: "SIDE C // AUDIO LAB",
  },
  {
    title: "Aplikasi Presensi Guru",
    catalogNo: "CAT-04 // MOBILE PRESENCE",
    year: "2025",
    description:
      "Aplikasi mobile lintas platform bagi instansi pendidikan untuk pelacakan absensi berbasis geofencing GPS dan sinkronisasi real-time.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Geolocation"],
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden",
    rpm: "45 RPM",
    side: "SIDE D // MOBILE CORE",
  },
  {
    title: "SahabatBK",
    catalogNo: "APLIKASI KONSELING // PLATFORM EDUKASI",
    year: "2024",
    description:
      "Platform bimbingan konseling digital untuk mendampingi siswa mengatasi kendala akademik maupun psikososial melalui konseling privat dan materi panduan.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Cross-Platform"],
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin",
    rpm: "Mobile App",
    side: "COUNSELING PLATFORM",
  },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    title: "Sertifikasi Web Junior",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan uji kompetensi Web Programmer Junior.",
    image: "/juniorweb.png",
    type: "academic",
  },
  {
    id: "cert-2",
    title: "Kecerdasan Buatan",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Kecerdasan Buatan.",
    image: "/kecerdasanbuatan.png",
    type: "academic",
  },
  {
    id: "cert-3",
    title: "Data Science",
    issuer: "Dicoding Indonesia",
    year: "2025",
    description: "Sertifikasi kompetensi pengolahan dan pemodelan data terapan.",
    image: "/datascience_dicoding.png",
    type: "external",
  },
  {
    id: "cert-4",
    title: "AI Digitalent",
    issuer: "KOMDIGI",
    year: "2025",
    description: "Sertifikasi kompetensi Artificial Intelligence Digital Talent Scholarship.",
    image: "/aidigitalent.png",
    type: "external",
  },
  {
    id: "cert-5",
    title: "Matematika Diskrit",
    issuer: "Universitas",
    year: "2024",
    description: "Sertifikasi kelulusan mata kuliah Matematika Diskrit.",
    image: "/matematikadiskrit.png",
    type: "academic",
  },
  {
    id: "cert-6",
    title: "Pemrograman Mobile 1",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Pemrograman Mobile 1.",
    image: "/mobile1.png",
    type: "academic",
  },
  {
    id: "cert-7",
    title: "Organisasi Komputer",
    issuer: "Universitas",
    year: "2024",
    description: "Sertifikasi kelulusan mata kuliah Organisasi Komputer (Orkom).",
    image: "/orkom.png",
    type: "academic",
  },
  {
    id: "cert-8",
    title: "Sistem Operasi",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Sistem Operasi.",
    image: "/sistemoperasi.png",
    type: "academic",
  },
  {
    id: "cert-9",
    title: "Sistem Paralel",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Sistem Paralel.",
    image: "/sistemparalel.png",
    type: "academic",
  },
  {
    id: "cert-10",
    title: "Keamanan Informasi",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Keamanan Informasi.",
    image: "/keamananinformasi.png",
    type: "academic",
  },
  {
    id: "cert-11",
    title: "Kalkulus",
    issuer: "Universitas",
    year: "2024",
    description: "Sertifikasi kelulusan mata kuliah Kalkulus.",
    image: "/kalkulus.png",
    type: "academic",
  },
  {
    id: "cert-12",
    title: "Grafika Komputer",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Grafika Komputer.",
    image: "/grafikakomputer.png",
    type: "academic",
  },
  {
    id: "cert-13",
    title: "Basic Programmer 1",
    issuer: "Universitas",
    year: "2024",
    description: "Sertifikasi kompetensi dasar Programmer 1.",
    image: "/programmer1.png",
    type: "academic",
  },
  {
    id: "cert-14",
    title: "Basic Programmer 2",
    issuer: "Universitas",
    year: "2024",
    description: "Sertifikasi kompetensi lanjutan Programmer 2.",
    image: "/programmer2.png",
    type: "academic",
  },
  {
    id: "cert-15",
    title: "Metodologi Penelitian Ilmu Komputer",
    issuer: "Universitas",
    year: "2025",
    description: "Sertifikasi kelulusan mata kuliah Metodologi Penelitian (MPIK).",
    image: "/mpik.png",
    type: "academic",
  },
  {
    id: "cert-16",
    title: "Micro Skill Digitalent",
    issuer: "KOMDIGI",
    year: "2025",
    description: "Sertifikasi pelatihan spesialisasi Micro Skill dari Kementerian Komdigi.",
    image: "/microskildigitalent.png",
    type: "external",
  },
  {
    id: "cert-17",
    title: "Junior Web Developer",
    issuer: "KOMDIGI",
    year: "2025",
    description: "Standar sertifikasi industri Junior Web Developer resmi Komdigi.",
    image: "/juniorwebdigitalent.png",
    type: "external",
  },
];
