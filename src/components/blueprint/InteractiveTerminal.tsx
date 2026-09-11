"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, CheckCircle } from "lucide-react";
import { playCompileChime, playCyberClick, playHoverTick } from "@/lib/sound/cyberSound";
import { PERSONAL_INFO } from "@/lib/data/portfolioData";
import { useLenis } from "@/hooks/useLenis";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "system" | "success";
}

export function InteractiveTerminal() {
  const { scrollTo } = useLenis();
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    { text: "FERY_KERNEL v2.0.26 (x86_64-linux-gnu)", type: "system" },
    { text: "Ketik 'help' untuk daftar perintah atau klik tombol cepat di bawah.", type: "output" },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    playCyberClick();

    const newLines: TerminalLine[] = [...lines, { text: `> ${cmd}`, type: "input" }];

    switch (cleanCmd) {
      case "help":
        newLines.push(
          { text: "PERINTAH TERSEDIA:", type: "system" },
          { text: "  compile   - Jalankan simulasi kompilasi arsitektur", type: "output" },
          { text: "  skills    - Lihat ringkasan ekosistem teknologi", type: "output" },
          { text: "  projects  - Buka showcase portofolio proyek", type: "output" },
          { text: "  contact   - Dapatkan info kontak langsung & WhatsApp", type: "output" },
          { text: "  clear     - Bersihkan layar terminal", type: "output" }
        );
        break;

      case "compile":
        playCompileChime();
        newLines.push(
          { text: "[INIT] Mengompilasi modul portofolio...", type: "system" },
          { text: "[OK] 10+ modul proyek diverifikasi.", type: "output" },
          { text: "[OK] 17 lisensi sertifikasi terverifikasi.", type: "output" },
          { text: "[READY] BUILD COMPLETED 100% SUCCESSFUL ✓", type: "success" }
        );
        break;

      case "skills":
        newLines.push(
          { text: "CORE STACK:", type: "system" },
          { text: "  Frontend : Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP, Three.js", type: "output" },
          { text: "  Backend  : Node.js, Express, Go, PHP / Laravel, REST API", type: "output" },
          { text: "  Database : PostgreSQL, MySQL, Supabase", type: "output" },
          { text: "  Mobile   : Flutter, Dart, Android Studio", type: "output" }
        );
        scrollTo("#skills", { duration: 1.2 });
        break;

      case "projects":
        newLines.push(
          { text: "PROYEK UNGGULAN TERSEDIA: Mengalihkan ke galeri proyek...", type: "success" }
        );
        scrollTo("#projects", { duration: 1.2 });
        break;

      case "contact":
        newLines.push(
          { text: `Email: ${PERSONAL_INFO.contacts.email}`, type: "output" },
          { text: `WhatsApp: ${PERSONAL_INFO.contacts.whatsapp}`, type: "output" },
          { text: "Mengalihkan ke formulir kontak...", type: "success" }
        );
        scrollTo("#contact", { duration: 1.2 });
        break;

      case "clear":
        setLines([
          { text: "Terminal dibersihkan.", type: "system" },
        ]);
        setInput("");
        return;

      default:
        newLines.push({
          text: `Perintah '${cleanCmd}' tidak dikenali. Ketik 'help' untuk daftar perintah.`,
          type: "output",
        });
        break;
    }

    setLines(newLines);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <div className="w-full rounded-2xl bg-[#090D16] border border-cyan-500/30 p-4 font-mono shadow-[0_0_30px_rgba(79,209,197,0.08)]">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-cyan-400 font-bold">
          <Terminal className="w-4 h-4" />
          <span>INTERACTIVE BLUEPRINT CLI // TERMINAL</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
      </div>

      {/* Terminal Logs Output */}
      <div className="h-44 overflow-y-auto space-y-1.5 text-xs pr-2 scrollbar-thin scrollbar-thumb-slate-800">
        {lines.map((line, idx) => (
          <div
            key={idx}
            className={
              line.type === "input"
                ? "text-cyan-300 font-bold"
                : line.type === "system"
                ? "text-slate-400 font-semibold"
                : line.type === "success"
                ? "text-emerald-400 font-bold flex items-center gap-1.5"
                : "text-slate-300"
            }
          >
            {line.type === "success" && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
            <span>{line.text}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Command Input Form */}
      <form onSubmit={handleSubmit} className="pt-3 mt-2 border-t border-slate-800 flex items-center gap-2">
        <span className="text-cyan-400 font-bold text-xs">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik perintah (contoh: help, compile, skills)..."
          className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
        />
        <button
          type="submit"
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Quick Tap Command Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-2 border-t border-slate-800/80 text-[10px]">
        <span className="text-slate-500">QUICK CMDS:</span>
        {["help", "compile", "skills", "projects", "contact", "clear"].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => executeCommand(cmd)}
            onMouseEnter={playHoverTick}
            className="px-2 py-0.5 rounded bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-300/80 hover:text-cyan-200 transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
