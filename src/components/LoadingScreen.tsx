import { useState, useEffect } from "react";
import { Terminal, Shield } from "lucide-react";

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  const loadingSteps = [
    "Establishing remote terminal secure payload...",
    "Initializing Java encapsulation engines [JDK 21]...",
    "Connecting Spring Boot schema containers...",
    "Injecting Relational MySQL database adapters...",
    "Verifying CGPA parameters [8.19 GPA]...",
    "Loading Desha Sashi Raghavendra Kumar Profile details...",
    "System compilation online. Executing portfolios..."
  ];

  // Dynamic log emitter
  useEffect(() => {
    let logIdx = 0;
    const interval = setInterval(() => {
      if (logIdx < loadingSteps.length) {
        setLogs((prev) => [...prev, loadingSteps[logIdx]]);
        logIdx++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  // Micro percentage counter
  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setComplete(true), 400); // Hold briefly
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  if (complete) return null;

  return (
    <div
      id="loading-overlay"
      className="fixed inset-0 bg-[#030712] z-[9999] flex flex-col justify-between p-6 sm:p-12 font-mono"
    >
      {/* Top section: System specs */}
      <div className="flex items-center justify-between text-[10px] text-gray-500 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-brand-cyan animate-pulse" />
          <span>Sashi_Portfolio_System_Core.bin</span>
        </div>
        <span>UTC Clock: 2026-05-27</span>
      </div>

      {/* Centered: Percentage & Core Initials Glow */}
      <div className="flex flex-col items-center justify-center space-y-4">
        
        {/* Core Halo Circle */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/5 flex items-center justify-center overflow-hidden">
          {/* Neon Spin Ring */}
          <div className="absolute inset-1 border border-dashed border-brand-cyan/20 rounded-full animate-spin [animation-duration:12s]" />
          <div className="absolute inset-4 border border-brand-purple/20 rounded-full animate-pulse" />
          
          <span className="font-display font-medium text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple tracking-tight select-none">
            DS
          </span>
        </div>

        {/* Loading display */}
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold tracking-wide text-white uppercase flex items-center justify-center gap-1.5">
            Loading System Core...
          </p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-neutral-300">
            {percent}%
          </p>
        </div>

        {/* Solid Bar */}
        <div className="w-56 h-1.5 bg-white/5 rounded-full overflow-hidden relative border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-brand-cyan to-brand-purple rounded-full shadow-[0_0_8px_#06b6d4] transition-all duration-150 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

      </div>

      {/* Bottom section: Log diagnostics terminal style */}
      <div className="max-w-xl w-full mx-auto space-y-1.5 text-[9px] sm:text-xs text-gray-500 font-mono h-32 overflow-y-hidden pt-4 border-t border-white/5">
        {logs.map((log, idx) => (
          <p key={idx} className="flex items-center gap-2 text-zinc-400">
            <span className="text-brand-cyan select-none">&gt;</span>
            <span className="truncate">{log}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
