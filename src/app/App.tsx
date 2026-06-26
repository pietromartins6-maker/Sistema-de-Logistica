/* MARKER-MAKE-KIT-INVOKED */
import { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { SystemLayout } from "./components/SystemLayout";

type AppScreen = "boot" | "home" | "system";

export default function App() {
  const [screen, setScreen] = useState<AppScreen>("boot");
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStep, setBootStep] = useState(0);

  const bootSteps = [
    "Inicializando sistema operacional...",
    "Carregando módulos logísticos...",
    "Conectando aos servidores de dados...",
    "Sincronizando estoque e produção...",
    "Verificando integridade dos dados...",
    "Carregando painéis de controle...",
    "Sistema pronto.",
  ];

  useEffect(() => {
    if (screen !== "boot") return;
    const totalDuration = 3200;
    const interval = 40;
    const steps = totalDuration / interval;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      const pct = Math.min(100, Math.round((current / steps) * 100));
      setBootProgress(pct);
      const stepIdx = Math.min(
        bootSteps.length - 1,
        Math.floor((pct / 100) * bootSteps.length)
      );
      setBootStep(stepIdx);
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(() => setScreen("home"), 500);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [screen]);

  if (screen === "boot") {
    return (
      <div className="size-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #040810 0%, #070d1a 50%, #050a14 100%)" }}>
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 70%)" }} />

        <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8">
          {/* Logo */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center relative"
              style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)", boxShadow: "0 0 40px rgba(37,99,235,0.5)" }}>
              <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
                <rect x="4" y="18" width="8" height="14" rx="1" fill="white" opacity="0.9"/>
                <rect x="16" y="12" width="8" height="20" rx="1" fill="white" opacity="0.9"/>
                <rect x="28" y="6" width="8" height="26" rx="1" fill="white" opacity="0.9"/>
                <path d="M4 14L20 8L36 4" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-center">
              <div className="text-white tracking-[0.25em] uppercase" style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "0.2em" }}>
                LogiTech
              </div>
              <div className="text-blue-400 tracking-[0.4em] uppercase" style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.3em" }}>
                Indústria
              </div>
            </div>
          </div>

          {/* System name */}
          <div className="text-center">
            <p className="text-blue-300 text-sm tracking-widest uppercase" style={{ letterSpacing: "0.2em" }}>
              Sistema de Operações Logísticas
            </p>
            <p className="text-slate-500 text-xs mt-1">v2.4.1 — Módulo ERP Industrial</p>
          </div>

          {/* Progress */}
          <div className="w-full flex flex-col gap-3">
            <div className="w-full bg-slate-800 rounded-full overflow-hidden" style={{ height: "3px" }}>
              <div className="h-full rounded-full transition-all duration-100"
                style={{
                  width: `${bootProgress}%`,
                  background: "linear-gradient(90deg, #1d4ed8, #3b82f6, #60a5fa)"
                }} />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-blue-400 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                {bootSteps[bootStep]}
              </p>
              <p className="text-slate-500 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                {bootProgress}%
              </p>
            </div>
          </div>

          {/* Scanning dots */}
          <div className="flex gap-2">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: bootProgress > i * 20 ? "#3b82f6" : "#1e3a5f",
                  boxShadow: bootProgress > i * 20 ? "0 0 6px #3b82f6" : "none",
                  transition: "all 0.3s"
                }} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-slate-600 text-xs text-center">
          © 2024 LogiTech Indústria — Sistema ERP Industrial &nbsp;|&nbsp; Equipamentos Eletrônicos Industriais
        </div>
      </div>
    );
  }

  if (screen === "home") {
    return <Home onEnterSystem={() => setScreen("system")} />;
  }

  return <SystemLayout onGoHome={() => setScreen("home")} />;
}
