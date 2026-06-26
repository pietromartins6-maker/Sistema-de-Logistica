import { useState, useEffect, useRef } from "react";
import {
  Factory, MapPin, Users, Truck, Package, BarChart3, TrendingUp,
  ChevronRight, ArrowRight, Layers, Settings, Shield, Zap,
  Globe, Award, Clock, CheckCircle2
} from "lucide-react";

interface HomeProps {
  onEnterSystem: () => void;
}

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, start]);
  return count;
}

const statsData = [
  { label: "Colaboradores", value: 1240, suffix: "+", icon: Users, color: "#3b82f6" },
  { label: "Fornecedores", value: 87, suffix: "", icon: Truck, color: "#10b981" },
  { label: "Cap. Produtiva/mês", value: 45000, suffix: "", icon: Factory, color: "#f97316" },
  { label: "Pedidos Mensais", value: 3800, suffix: "+", icon: Package, color: "#8b5cf6" },
  { label: "Centros de Distribuição", value: 12, suffix: "", icon: MapPin, color: "#06b6d4" },
];

const sectors = [
  { name: "Recebimento", desc: "Conferência e entrada de materiais e insumos", icon: Truck, color: "#3b82f6" },
  { name: "Armazém", desc: "Gestão de estoque e endereçamento WMS", icon: Package, color: "#10b981" },
  { name: "Produção", desc: "Ordens de fabricação e controle de linha", icon: Factory, color: "#f97316" },
  { name: "Expedição", desc: "Separação, romaneio e carregamento", icon: Layers, color: "#8b5cf6" },
  { name: "Distribuição", desc: "Rastreamento e entrega ao cliente", icon: Globe, color: "#06b6d4" },
  { name: "Qualidade", desc: "Inspeção, conformidade e certificações", icon: Shield, color: "#ec4899" },
  { name: "Planejamento", desc: "MRP, PPCP e gestão de suprimentos", icon: BarChart3, color: "#f59e0b" },
  { name: "Controle", desc: "KPIs, indicadores e análise gerencial", icon: TrendingUp, color: "#14b8a6" },
];

const timeline = [
  { year: "2008", event: "Fundação da LogiTech Indústria em São Paulo" },
  { year: "2011", event: "Expansão para o mercado nacional com 3 CDs" },
  { year: "2014", event: "Certificação ISO 9001 e implementação do ERP" },
  { year: "2017", event: "Inauguração da Planta Industrial 2 — Campinas" },
  { year: "2020", event: "Digitalização completa da cadeia logística" },
  { year: "2023", event: "Lançamento do Sistema LogiTech v2.0" },
  { year: "2024", event: "Expansão para América Latina — 12 CDs ativos" },
];

const flowSteps = [
  { label: "Fornecedor", icon: Globe, color: "#3b82f6" },
  { label: "Recebimento", icon: Truck, color: "#06b6d4" },
  { label: "Armazém", icon: Package, color: "#10b981" },
  { label: "Produção", icon: Factory, color: "#f97316" },
  { label: "Expedição", icon: Layers, color: "#8b5cf6" },
  { label: "Cliente", icon: Users, color: "#ec4899" },
];

export function Home({ onEnterSystem }: HomeProps) {
  const [statsVisible, setStatsVisible] = useState(false);
  const [flowActive, setFlowActive] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStatsVisible(true);
    }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setFlowActive(p => (p + 1) % flowSteps.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-full overflow-auto" style={{ background: "#070d1a", color: "#e8edf5" }}>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* BG grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #2563eb 0%, transparent 60%)", transform: "translate(30%,-30%)" }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #10b981 0%, transparent 60%)", transform: "translate(-30%,30%)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#93c5fd" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Sistema Operacional Ativo — Turno A
              </div>

              <div>
                <h1 className="text-white leading-tight" style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800 }}>
                  LogiTech{" "}
                  <span style={{ background: "linear-gradient(135deg,#3b82f6,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    Indústria
                  </span>
                </h1>
                <p className="text-slate-400 mt-4 leading-relaxed" style={{ fontSize: "1.125rem" }}>
                  Centro de Operações Logísticas Industriais. Gerencie toda a cadeia de suprimentos — do recebimento ao cliente final — em um único ambiente operacional integrado.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {["Fabricação de equipamentos eletrônicos industriais", "Operação 24/7 com 3 turnos de produção", "ISO 9001:2015 | ISO 14001 | OHSAS 18001"].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="shrink-0" size={16} style={{ color: "#10b981" }} />
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button onClick={onEnterSystem}
                  className="flex items-center gap-3 px-8 py-4 rounded-xl text-white cursor-pointer transition-all duration-200 hover:scale-105"
                  style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 0 30px rgba(37,99,235,0.4)" }}>
                  <Zap size={18} />
                  Entrar no Sistema
                  <ArrowRight size={16} />
                </button>
                <button className="flex items-center gap-3 px-8 py-4 rounded-xl text-blue-300 cursor-pointer transition-all duration-200 hover:bg-blue-950"
                  style={{ border: "1px solid rgba(59,130,246,0.3)" }}>
                  <Settings size={18} />
                  Saiba Mais
                </button>
              </div>
            </div>

            {/* Flow animation */}
            <div className="hidden lg:flex flex-col items-center gap-6 p-8 rounded-2xl"
              style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.15)", backdropFilter: "blur(10px)" }}>
              <p className="text-blue-400 text-xs tracking-widest uppercase" style={{ letterSpacing: "0.2em" }}>Fluxo Logístico</p>
              <div className="flex flex-col gap-3 w-full">
                {flowSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = flowActive === i;
                  return (
                    <div key={step.label}>
                      <div className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-500"
                        style={{
                          background: isActive ? `rgba(${step.color === "#3b82f6" ? "59,130,246" : step.color === "#10b981" ? "16,185,129" : step.color === "#06b6d4" ? "6,182,212" : step.color === "#f97316" ? "249,115,22" : step.color === "#8b5cf6" ? "139,92,246" : "236,72,153"},0.15)` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${isActive ? step.color + "40" : "transparent"}`
                        }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: isActive ? step.color : "rgba(255,255,255,0.05)" }}>
                          <Icon size={16} color={isActive ? "white" : "#6b82a0"} />
                        </div>
                        <span className="text-sm" style={{ color: isActive ? "#e8edf5" : "#6b82a0", fontWeight: isActive ? 600 : 400 }}>
                          {step.label}
                        </span>
                        {isActive && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: step.color }} />
                          </div>
                        )}
                      </div>
                      {i < flowSteps.length - 1 && (
                        <div className="flex justify-center my-1">
                          <div className="h-3 border-l" style={{ borderColor: flowActive > i ? "#3b82f6" : "#1e3a5f", borderStyle: flowActive > i ? "solid" : "dashed" }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
          <span>Role para explorar</span>
          <ChevronRight size={14} style={{ transform: "rotate(90deg)" }} />
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-20 px-8" style={{ background: "rgba(13,22,40,0.5)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.25em" }}>Operação em Números</p>
            <h2 className="text-white" style={{ fontSize: "2rem", fontWeight: 700 }}>Indicadores da Empresa</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {statsData.map(stat => {
              const Icon = stat.icon;
              const count = useCountUp(stat.value, 2000, statsVisible);
              return (
                <div key={stat.label} className="p-6 rounded-2xl text-center transition-transform duration-200 hover:-translate-y-1"
                  style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: stat.color + "18" }}>
                    <Icon size={22} style={{ color: stat.color }} />
                  </div>
                  <div className="text-white mb-1" style={{ fontSize: "1.875rem", fontWeight: 800, fontFamily: "var(--font-mono)" }}>
                    {count.toLocaleString("pt-BR")}{stat.suffix}
                  </div>
                  <p className="text-slate-500 text-xs">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Missão", icon: "🎯", text: "Desenvolver e fabricar equipamentos eletrônicos industriais de alta tecnologia, otimizando os processos logísticos para garantir entregas eficientes e satisfação total dos clientes." },
              { title: "Visão", icon: "🔭", text: "Ser referência nacional em manufatura de equipamentos eletrônicos industriais até 2030, reconhecida pela excelência operacional e inovação em logística integrada." },
              { title: "Valores", icon: "⚡", text: "Qualidade, Inovação, Eficiência, Sustentabilidade, Transparência e Compromisso com as pessoas. Nossa cadeia logística reflete esses princípios em cada operação." },
            ].map(item => (
              <div key={item.title} className="p-8 rounded-2xl"
                style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white mb-3" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 px-8" style={{ background: "rgba(13,22,40,0.3)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.25em" }}>Estrutura Operacional</p>
            <h2 className="text-white" style={{ fontSize: "2rem", fontWeight: 700 }}>Setores da Empresa</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sectors.map(s => {
              const Icon = s.icon;
              return (
                <div key={s.name} className="p-6 rounded-2xl group cursor-pointer transition-all duration-200 hover:-translate-y-1"
                  style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.08)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: s.color + "18" }}>
                    <Icon size={20} style={{ color: s.color }} />
                  </div>
                  <h4 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{s.name}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs tracking-widest uppercase mb-3" style={{ letterSpacing: "0.25em" }}>Jornada</p>
            <h2 className="text-white" style={{ fontSize: "2rem", fontWeight: 700 }}>Linha do Tempo</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, #1d4ed8, transparent)" }} />
            <div className="flex flex-col gap-6">
              {timeline.map((item, i) => (
                <div key={item.year} className={`flex items-center gap-8 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block p-4 rounded-xl"
                      style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
                      <div className="text-blue-400 text-xs mb-1" style={{ fontFamily: "var(--font-mono)" }}>{item.year}</div>
                      <p className="text-slate-300 text-sm">{item.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-3 h-3 rounded-full shrink-0"
                    style={{ background: "#2563eb", boxShadow: "0 0 10px rgba(37,99,235,0.8)" }} />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ background: "radial-gradient(ellipse at center, #2563eb 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
          <Award size={48} style={{ color: "#3b82f6" }} />
          <div>
            <h2 className="text-white mb-4" style={{ fontSize: "2.5rem", fontWeight: 800 }}>
              Pronto para operar?
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Acesse o Centro de Operações Logísticas e acompanhe todos os processos industriais em tempo real. Controle recebimento, estoque, produção, expedição e distribuição em um único painel.
            </p>
          </div>
          <button onClick={onEnterSystem}
            className="flex items-center gap-3 px-10 py-5 rounded-xl text-white cursor-pointer transition-all duration-200 hover:scale-105"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 0 40px rgba(37,99,235,0.5)", fontSize: "1.0625rem" }}>
            <Zap size={20} />
            Entrar no Sistema
            <ArrowRight size={18} />
          </button>
          <p className="text-slate-600 text-xs">Sistema operando normalmente — Última sincronização: agora</p>
        </div>
      </section>
    </div>
  );
}
