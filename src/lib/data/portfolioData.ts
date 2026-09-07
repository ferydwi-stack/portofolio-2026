export interface Project {
  title: string;
  catalogNo: string;
  year: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  rpm: string;
  side: string;
}

export interface Skill {
  track: string;
  name: string;
  category: string;
  group: "frontend" | "backend";
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

export interface TechCardItem {
  track: string;
  name: string;
  category: string;
  level: number;
  proficiency: number;
  bpm: number;
  featured?: boolean;
}

export interface TechCard {
  id: string;
  number: string;
  title: string;
  role: string;
  badge: string;
  watermark: string;
  items: TechCardItem[];
}

export interface TechDomain {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  cards: TechCard[];
}

export const TECH_DOMAINS: TechDomain[] = [
  {
    id: "web-dev",
    tag: "SUB JUDUL 01 // WEBSITE DEVELOPMENT",
    title: "Website Development & Engineering",
    subtitle: "Pengembangan ekosistem web fullstack: Frontend interaktif & animasi modern, arsitektur backend & database, serta tools & deployment.",
    cards: [
      {
        id: "web-frontend",
        number: "01",
        title: "Frontend Development",
        role: "Antarmuka Web, Animasi Interaktif, 3D Canvas & Styling",
        badge: "FRONTEND",
        watermark: "FRONTEND",
        items: [
          { track: "01", name: "React.js & Next.js", category: "Frontend & SSR/SSG", level: 5, proficiency: 92, bpm: 92, featured: true },
          { track: "02", name: "TypeScript", category: "Typed Programming Core", level: 5, proficiency: 92, bpm: 92, featured: true },
          { track: "03", name: "CSS / Tailwind", category: "Utility-First CSS & Styling", level: 5, proficiency: 95, bpm: 95, featured: true },
          { track: "04", name: "GSAP & Animation", category: "Smooth Scroll & Motion", level: 5, proficiency: 90, bpm: 90, featured: true },
          { track: "05", name: "Three.js & 3D Web", category: "WebGL Interactive Canvas", level: 4, proficiency: 86, bpm: 86 },
          { track: "06", name: "HTML5 & Modern JS", category: "Semantic Web & ES6+", level: 5, proficiency: 94, bpm: 94, featured: true },
        ],
      },
      {
        id: "web-backend-db",
        number: "02",
        title: "Backend & Database",
        role: "Logika Server, Arsitektur RESTful API & Manajemen Basis Data",
        badge: "BACKEND & DB",
        watermark: "BACKEND",
        items: [
          { track: "07", name: "Node.js & Express", category: "Javascript Runtime & API", level: 4, proficiency: 88, bpm: 88, featured: true },
          { track: "08", name: "PHP & Laravel", category: "Backend MVC Framework", level: 4, proficiency: 86, bpm: 86 },
          { track: "09", name: "Go (Golang)", category: "High-Performance Services", level: 4, proficiency: 85, bpm: 85 },
          { track: "10", name: "MySQL", category: "Relational Database RDBMS", level: 5, proficiency: 90, bpm: 90, featured: true },
          { track: "11", name: "PostgreSQL", category: "Enterprise Relational DB", level: 4, proficiency: 88, bpm: 88 },
          { track: "12", name: "Supabase", category: "Postgres Cloud & Realtime BaaS", level: 4, proficiency: 86, bpm: 86, featured: true },
        ],
      },
      {
        id: "web-tools-deploy",
        number: "03",
        title: "Tools & Deployment",
        role: "Kontrol Versi, Pengujian API, Cloud Hosting & CI/CD",
        badge: "TOOLS & DEPLOY",
        watermark: "DEPLOY",
        items: [
          { track: "13", name: "Git & GitHub", category: "Version Control & Team Repo", level: 5, proficiency: 90, bpm: 90, featured: true },
          { track: "14", name: "Vercel", category: "Frontend Edge Deployment", level: 4, proficiency: 88, bpm: 88, featured: true },
          { track: "15", name: "Railway", category: "Deploy Backend & Cloud MySQL", level: 4, proficiency: 87, bpm: 87, featured: true },
          { track: "16", name: "PythonAnywhere", category: "Deploy Model AI & Flask API", level: 4, proficiency: 85, bpm: 85, featured: true },
          { track: "17", name: "Postman", category: "REST API Testing & Debugging", level: 4, proficiency: 85, bpm: 85 },
          { track: "18", name: "VS Code & Figma", category: "Code IDE & UI Design", level: 5, proficiency: 92, bpm: 92 },
        ],
      },
    ],
  },
  {
    id: "mobile-dev",
    tag: "SUB JUDUL 02 // MOBILE DEVELOPMENT",
    title: "Mobile App Development & Ecosystem",
    subtitle: "Pengembangan aplikasi mobile lintas platform (Android & iOS): framework Dart, cloud database real-time & tools distribusi.",
    cards: [
      {
        id: "mobile-framework",
        number: "04",
        title: "Bahasa & Framework Mobile",
        role: "Pengembangan Aplikasi Mobile Lintas Platform (Android/iOS)",
        badge: "MOBILE APP",
        watermark: "FLUTTER",
        items: [
          { track: "19", name: "Flutter & Dart", category: "Cross-Platform Framework", level: 5, proficiency: 90, bpm: 90, featured: true },
          { track: "20", name: "Mobile UI & Widgets", category: "Material Design 3 & State", level: 4, proficiency: 88, bpm: 88 },
          { track: "21", name: "Geolocation & Maps", category: "GPS Radius & Geofencing", level: 4, proficiency: 86, bpm: 86 },
          { track: "22", name: "Android & Native APIs", category: "Camera, Storage & Sensor", level: 4, proficiency: 84, bpm: 84 },
        ],
      },
      {
        id: "mobile-backend-db",
        number: "05",
        title: "Backend & Database Mobile",
        role: "Cloud Database Real-time, Backend API & Offline Storage",
        badge: "MOBILE BACKEND & DB",
        watermark: "FIREBASE",
        items: [
          { track: "23", name: "Firebase", category: "Cloud Firestore Realtime DB", level: 4, proficiency: 86, bpm: 86, featured: true },
          { track: "24", name: "Firebase Auth", category: "Cloud User Authentication", level: 4, proficiency: 88, bpm: 88 },
          { track: "25", name: "Go / Node.js API", category: "Mobile RESTful Microservices", level: 4, proficiency: 85, bpm: 85 },
          { track: "26", name: "SQLite & Local Cache", category: "Offline-First Local Storage", level: 4, proficiency: 84, bpm: 84 },
        ],
      },
      {
        id: "mobile-tools-deploy",
        number: "06",
        title: "Tools & Mobile Ecosystem",
        role: "Mobile IDE, Emulasi Perangkat, Debugging & Distribusi APK",
        badge: "MOBILE TOOLS",
        watermark: "STUDIO",
        items: [
          { track: "27", name: "Android Studio", category: "Android SDK & Emulators", level: 4, proficiency: 86, bpm: 86 },
          { track: "28", name: "VS Code (Flutter)", category: "Flutter DevTools & Profiling", level: 5, proficiency: 90, bpm: 90, featured: true },
          { track: "29", name: "Git & GitHub", category: "Mobile Project Versioning", level: 5, proficiency: 90, bpm: 90 },
          { track: "30", name: "APK & Play Console", category: "Build Release & Distribution", level: 4, proficiency: 85, bpm: 85 },
        ],
      },
    ],
  },
];

export const TECH_RIGS: TechRig[] = [
  {
    category: "Website Development (Frontend)",
    role: "Antarmuka Pengguna, Styling & Interaktivitas Web",
    items: ["React & Next.js", "TypeScript", "Tailwind CSS", "HTML5 & CSS3", "Responsive UI", "UI Prototyping"],
  },
  {
    category: "Website Development (Backend & DB)",
    role: "Arsitektur Server, API & Relational Database",
    items: ["Node.js & Express", "PHP & Laravel", "MySQL", "PostgreSQL", "RESTful APIs", "ORM & Query"],
  },
  {
    category: "Mobile & Cloud Systems",
    role: "Aplikasi Mobile, Microservices & BaaS",
    items: ["Flutter & Dart", "Go (Golang)", "Firebase Cloud", "Python (API)", "Microservices", "Realtime Sync"],
  },
  {
    category: "Tools & Cloud Deployment",
    role: "Version Control, Hosting & Workflow",
    items: ["Git & GitHub", "Vercel", "VS Code", "Postman", "Project Management", "Figma"],
  },
];

export const SKILLS_SETLIST: Skill[] = [
  // Flat list export for compatibility
  { track: "01", name: "React.js & Next.js", category: "Frontend & Fullstack", group: "frontend", level: 5, proficiency: 92, bpm: 92, featured: true },
  { track: "02", name: "TypeScript", category: "Typed Programming Core", group: "frontend", level: 5, proficiency: 92, bpm: 92, featured: true },
  { track: "03", name: "CSS / Tailwind", category: "CSS Framework & UI", group: "frontend", level: 5, proficiency: 95, bpm: 95, featured: true },
  { track: "04", name: "Node.js & Express", category: "Backend Runtime & API", group: "frontend", level: 4, proficiency: 86, bpm: 86 },
  { track: "05", name: "PHP & Laravel", category: "Backend MVC Framework", group: "frontend", level: 4, proficiency: 85, bpm: 85 },
  { track: "06", name: "MySQL & PostgreSQL", category: "Relational Databases", group: "frontend", level: 4, proficiency: 84, bpm: 84 },
  { track: "07", name: "Flutter & Dart", category: "Cross-Platform Mobile UI", group: "backend", level: 4, proficiency: 88, bpm: 88, featured: true },
  { track: "08", name: "Go (Golang)", category: "High-Perf Microservices", group: "backend", level: 4, proficiency: 88, bpm: 88, featured: true },
  { track: "09", name: "Firebase", category: "Cloud & Realtime BaaS", group: "backend", level: 4, proficiency: 82, bpm: 82 },
  { track: "10", name: "Python", category: "Scripting & AI / NLP", group: "backend", level: 4, proficiency: 82, bpm: 82 },
  { track: "11", name: "Git & GitHub", category: "Version Control & Team", group: "backend", level: 4, proficiency: 88, bpm: 88 },
  { track: "12", name: "Vercel & Deployment", category: "Cloud Hosting & CI/CD", group: "backend", level: 4, proficiency: 86, bpm: 86 },
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
    image: "/elearning.png",
    tags: ["TypeScript", "PHP", "MySQL", "LMS", "REST API"],
    githubUrl: "https://github.com/ferydwi-stack/Sistem-E-learning",
    rpm: "45 RPM",
    side: "SIDE D // E-LEARNING RIG",
  },
  {
    title: "PHOTOBOOTH WEB APP",
    catalogNo: "CAT-05 // INTERACTIVE WEBCAM",
    year: "2026",
    description:
      "Aplikasi photobooth interaktif berbasis Next.js dan TypeScript dengan fitur pengambilan foto webcam real-time, filter kamera digital, strip kolase foto, dan ekspor cetak foto instan.",
    image: "",
    tags: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Webcam API"],
    githubUrl: "https://github.com/ferydwi-stack/photoboth",
    demoUrl: "https://photoboth-zeta.vercel.app",
    rpm: "33 RPM",
    side: "SIDE E // PHOTOBOOTH APP",
  },
  {
    title: "UNDANGYUK — DIGITAL INVITATION",
    catalogNo: "CAT-06 // EVENT PLATFORM",
    year: "2026",
    description:
      "Platform penyedia template dan layanan undangan digital interaktif multi-acara (pernikahan adat Nusantara & modern, khitanan, wisuda) dengan integrasi RSVP Firebase dan audio latar.",
    image: "",
    tags: ["HTML5", "CSS3", "JavaScript", "Firebase RSVP", "Web Audio"],
    githubUrl: "https://github.com/ferydwi-stack/UndangyYuk",
    demoUrl: "https://undangy-yuk.vercel.app",
    rpm: "45 RPM",
    side: "SIDE F // INVITATION RIG",
  },
  {
    title: "SAHABAT BK",
    catalogNo: "CAT-07 // DIGITAL COUNSELING",
    year: "2024",
    description:
      "Platform bimbingan konseling digital untuk mendampingi siswa sekolah dalam mengatasi kendala akademik maupun psikososial melalui konseling privat dan panduan bimbingan terstruktur.",
    image: "/sahabatbk.jpg",
    tags: ["Flutter", "Dart", "Firebase", "Mobile UI", "Cross-Platform"],
    githubUrl: "https://github.com/ferydwi-stack/SahabatBK-by-vitamin",
    rpm: "33 RPM",
    side: "SIDE G // COUNSELING APP",
  },
  {
    title: "BACKEND SMART VILLAGE",
    catalogNo: "CAT-08 // SERVICE ARCHITECTURE",
    year: "2025",
    description:
      "Arsitektur backend microservice berkinerja tinggi menggunakan bahasa pemrograman Go (Golang) untuk mengelola data kependudukan, permohonan surat administrasi warga, dan integrasi layanan smart village.",
    image: "",
    tags: ["Go (Golang)", "RESTful API", "Microservices", "PostgreSQL", "Backend"],
    githubUrl: "https://github.com/ferydwi-stack/backend_smart_village",
    rpm: "45 RPM",
    side: "SIDE H // MICROSERVICE API",
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
