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
  role: "Rockstar Fullstack Developer & Lead Guitarist",
  headline: "FERY DWI RAMADHI",
  tagline: "Harmonisasi Antara Logika Kode & Distorsi Nada",
  bioParagraphs: [
    "Halo! Saya Fery Dwi Ramadhi, seorang Fullstack Developer dan gitaris band di Indonesia. Bagi saya, memprogram arsitektur perangkat lunak dan menggubah riff gitar memiliki prinsip dasar yang sama: keduanya memerlukan kestabilan tempo, struktur yang kokoh, dan keberanian bereksplorasi.",
    "Perjalanan rekayasa teknologi saya bermula dari rasa ingin tahu tentang cara kerja web modern. Layaknya menyetem senar gitar hingga nada yang paling bersih, saya mengasah kapabilitas mulai dari antarmuka pengguna yang responsif hingga arsitektur backend yang tahan beban tinggi.",
    "Fokus saya saat ini adalah merancang produk digital yang berkinerja tinggi, berkarakter kuat, dan memberikan solusi yang elegan bagi pengguna.",
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
    category: "Lead Frontend",
    role: "User Experience & Visual Stage",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3"],
  },
  {
    category: "Heavy Backend",
    role: "Data Pipelines & Server Architecture",
    items: ["Node.js & Express", "PHP & Laravel", "MySQL & PostgreSQL", "RESTful APIs"],
  },
  {
    category: "Mobile Division",
    role: "Cross-Platform Touring Apps",
    items: ["Flutter & Dart", "Firebase", "Responsive Design", "PWA"],
  },
  {
    category: "Rig & Gear (Tools)",
    role: "Studio Equipment & Deployments",
    items: ["Git & GitHub", "VS Code", "Figma", "Vercel Deployments"],
  },
];

export const SKILLS_SETLIST: Skill[] = [
  { track: "01", name: "Tailwind CSS", category: "FAST VISUALS", level: 5, proficiency: 95, bpm: 155, featured: true },
  { track: "02", name: "React.js", category: "REACTIVE UI", level: 5, proficiency: 90, bpm: 140, featured: true },
  { track: "03", name: "Next.js", category: "FULLSTACK ENGINE", level: 4, proficiency: 88, bpm: 145, featured: true },
  { track: "04", name: "Node.js", category: "ASYNC RUNTIME", level: 4, proficiency: 86, bpm: 138, featured: true },
  { track: "05", name: "Express.js", category: "REST APIS", level: 4, proficiency: 85, bpm: 135 },
  { track: "06", name: "TypeScript", category: "STRICT TYPES", level: 4, proficiency: 82, bpm: 130 },
  { track: "07", name: "MySQL", category: "RELATIONAL DB", level: 4, proficiency: 82, bpm: 132 },
  { track: "08", name: "PHP & Laravel", category: "MVC CORE", level: 3, proficiency: 80, bpm: 125 },
  { track: "09", name: "Flutter & Dart", category: "MOBILE TOURING", level: 3, proficiency: 78, bpm: 120 },
  { track: "10", name: "PostgreSQL", category: "ACID ENGINE", level: 3, proficiency: 74, bpm: 118 },
];

export const PROJECTS: Project[] = [
  {
    title: "Portfolio Profile",
    catalogNo: "LP-001 // STUDIO MASTER RELEASE",
    year: "2026",
    description:
      "Portofolio panggung digital rockstar dengan arsitektur modern Next.js 16, visualisasi 3D Three.js, dan interaktivitas tingkat tinggi untuk audiens web.",
    image: "/portofolio.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Three.js", "GSAP"],
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile",
    rpm: "33 ⅓ RPM",
    side: "SIDE A - TITLE TRACK",
  },
  {
    title: "Sistem Kasir Warung",
    catalogNo: "EP-002 // COMMERCIAL POS SYSTEM",
    year: "2025",
    description:
      "Sistem Point of Sale (POS) handal untuk operasional toko kelontong, dilengkapi manajemen inventaris barang, rekonsiliasi kasir kas riil, dan pelaporan rugi-laba.",
    image: "/kasir.png",
    tags: ["Laravel", "MySQL", "Tailwind CSS", "PHP"],
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung",
    rpm: "45 RPM",
    side: "SIDE A - BUSINESS GROOVE",
  },
  {
    title: "Aplikasi Presensi Guru",
    catalogNo: "SG-003 // MOBILE TOUR SINGLE",
    year: "2025",
    description:
      "Aplikasi mobile lintas platform bagi instansi pendidikan untuk melacak absensi pendidik secara akurat berbasis radius GPS dan validasi wajah.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Geolocation"],
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden",
    rpm: "45 RPM",
    side: "SIDE B - GEO ANTHEM",
  },
  {
    title: "SahabatBK",
    catalogNo: "EP-004 // ACOUSTIC COUNSELING",
    year: "2024",
    description:
      "Platform bimbingan konseling digital untuk mendampingi siswa mengatasi kendala akademik maupun psikososial melalui konseling privat dan materi panduan.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Cross-Platform"],
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin",
    rpm: "33 ⅓ RPM",
    side: "SIDE B - SUPPORT RIFF",
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
