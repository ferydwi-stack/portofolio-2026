export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-white dark:bg-[#09090b] border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            © {currentYear} Fery Dwi Ramadhi. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#home" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Beranda
            </a>
            <a href="#projects" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Proyek
            </a>
            <a href="#contact" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
