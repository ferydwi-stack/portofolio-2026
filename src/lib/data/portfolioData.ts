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
    category: "Languages & Frameworks",
    role: "Bahasa Pemrograman & Framework Utama",
    items: ["Go (Golang)", "Python", "TypeScript & JavaScript", "Dart (Flutter)", "PHP & Laravel", "React & Next.js"],
  },
  {
    category: "Frontend Engineering",
    role: "Antarmuka Pengguna & Interaktivitas Web",
    items: ["Tailwind CSS", "HTML5 & CSS3", "Responsive UI", "UI/UX Prototyping"],
  },
  {
    category: "Backend & Databases",
    role: "Arsitektur Microservices, RESTful API & Basis Data",
    items: ["Go Microservices", "Node.js & Express", "MySQL & PostgreSQL", "Firebase", "RESTful APIs"],
  },
  {
    category: "Tools & Management",
    role: "Version Control, Developer Tools & Manajemen Proyek",
    items: ["Git & GitHub", "VS Code", "Postman", "Project Management", "Figma"],
  },
];

export const SKILLS_SETLIST: Skill[] = [
  { track: "01", name: "CSS / Tailwind", category: "CSS Framework", level: 5, proficiency: 95, bpm: 95, featured: true },
  { track: "02", name: "TypeScript", category: "Typed Programming", level: 5, proficiency: 92, bpm: 92, featured: true },
  { track: "03", name: "React.js", category: "Frontend Library", level: 5, proficiency: 90, bpm: 90, featured: true },
  { track: "04", name: "Go (Golang)", category: "Systems & Backend", level: 4, proficiency: 88, bpm: 88, featured: true },
  { track: "05", name: "Flutter & Dart", category: "Cross-Platform Mobile", level: 4, proficiency: 86, bpm: 86, featured: true },
  { track: "06", name: "Node.js", category: "JavaScript Runtime", level: 4, proficiency: 86, bpm: 86 },
  { track: "07", name: "PHP & Laravel", category: "Backend MVC Framework", level: 4, proficiency: 85, bpm: 85 },
  { track: "08", name: "MySQL", category: "Relational Database", level: 4, proficiency: 84, bpm: 84 },
  { track: "09", name: "Python", category: "Scripting & AI/NLP", level: 4, proficiency: 82, bpm: 82 },
  { track: "10", name: "Firebase", category: "Backend-as-a-Service", level: 4, proficiency: 80, bpm: 80 },
  { track: "11", name: "PostgreSQL", category: "Relational Database", level: 3, proficiency: 78, bpm: 78 },
];

export const PROJECTS: Project[] = [
  {
    title: "SISTEM KASIR WARUNG",
    catalogNo: "CAT-01 // POINT OF SALE",
    year: "2025",
    description:
      "Sistem aplikasi kasir berbasis web untuk pencatatan transaksi penjualan, manajemen inventaris stok barang terpusat, dan rekapitulasi laporan finansial secara real-time.",
    image: "/kasir.png",
    tags: ["PHP", "MySQL", "JavaScript", "Bootstrap", "Point of Sale"],
    githubUrl: "https://github.com/ferydwi-stack/sistem-kasir-warung",
    rpm: "33 RPM",
    side: "SIDE A // MASTER POS",
  },
  {
    title: "PORTFOLIO PROFILE (LAT7)",
    catalogNo: "CAT-02 // INTERACTIVE PROFILE",
    year: "2025",
    description:
      "Website profil dan portofolio interaktif berbasis web responsif dengan tipografi presisi, layout modern, dan integrasi visualisasi kompetensi informatika.",
    image: "/portofolio.png",
    tags: ["TypeScript", "HTML5", "CSS3", "Responsive UI", "Portfolio"],
    githubUrl: "https://github.com/ferydwi-stack/Portfolio-Profile",
    rpm: "45 RPM",
    side: "SIDE B // FRONTEND RIG",
  },
  {
    title: "APLIKASI PRESENSI GURU",
    catalogNo: "CAT-03 // MOBILE ATTENDANCE",
    year: "2025",
    description:
      "Aplikasi mobile presensi guru (SMAN 1 Padang Cermin) berbasis Flutter lintas platform, dilengkapi validasi radius lokasi GPS (geofencing), autentikasi instansi, dan sinkronisasi real-time.",
    image: "/absen.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Geolocation", "Mobile App"],
    githubUrl: "https://github.com/ferydwi-stack/kelompok-Citra-Garden",
    rpm: "33 RPM",
    side: "SIDE C // MOBILE ATTENDANCE",
  },
  {
    title: "SISTEM E-LEARNING (LMS)",
    catalogNo: "CAT-04 // ACADEMIC PLATFORM",
    year: "2025",
    description:
      "Platform pembelajaran daring interaktif yang dikembangkan saat kegiatan PKL untuk distribusi modul materi, kuis pembelajaran, dan manajemen tugas akademik yang fleksibel kapan saja dan di mana saja.",
    image: "/elearning.jpg",
    tags: ["TypeScript", "PHP", "MySQL", "LMS", "REST API"],
    githubUrl: "https://github.com/ferydwi-stack/Sistem-E-learning",
    rpm: "45 RPM",
    side: "SIDE D // E-LEARNING RIG",
  },
  {
    title: "SAHABAT BK",
    catalogNo: "CAT-05 // DIGITAL COUNSELING",
    year: "2024",
    description:
      "Platform bimbingan konseling digital untuk mendampingi siswa sekolah dalam mengatasi kendala akademik maupun psikososial melalui konseling privat dan panduan bimbingan terstruktur.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Mobile UI", "Cross-Platform"],
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin",
    rpm: "33 RPM",
    side: "SIDE E // COUNSELING APP",
  },
  {
    title: "BACKEND SMART VILLAGE",
    catalogNo: "CAT-06 // SERVICE ARCHITECTURE",
    year: "2025",
    description:
      "Arsitektur backend microservice berkinerja tinggi menggunakan bahasa pemrograman Go (Golang) untuk mengelola data kependudukan, permohonan surat administrasi warga, dan integrasi layanan smart village.",
    image: "/smart_village.jpg",
    tags: ["Go (Golang)", "RESTful API", "Microservices", "PostgreSQL", "Backend"],
    githubUrl: "https://github.com/ferydwi-stack/backend_smart_village",
    rpm: "45 RPM",
    side: "SIDE F // MICROSERVICE API",
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
