import { useState, useEffect } from "react";
import {
  Package, Factory, Truck, Clock, TrendingUp, Users, CheckCircle,
  AlertTriangle, ArrowUp, ArrowDown, Activity, BarChart3,
  Circle, Zap, Globe, Send, ChevronRight
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

const prodData = [
  { d: "Seg", prod: 420, meta: 400 },
  { d: "Ter", prod: 380, meta: 400 },
  { d: "Qua", prod: 450, meta: 400 },
  { d: "Qui", prod: 410, meta: 400 },
  { d: "Sex", prod: 490, meta: 400 },
  { d: "Sáb", prod: 320, meta: 350 },
  { d: "Dom", prod: 280, meta: 350 },
];

const estoqueData = [
  { m: "Jan", entrada: 2400, saida: 1800 },
  { m: "Fev", entrada: 3200, saida: 2400 },
  { m: "Mar", entrada: 2800, saida: 2600 },
  { m: "Abr", entrada: 3600, saida: 3000 },
  { m: "Mai", entrada: 3100, saida: 2800 },
  { m: "Jun", entrada: 4200, saida: 3500 },
];

const pieData = [
  { name: "Eletrônica", value: 38, color: "#3b82f6" },
  { name: "Mecânica", value: 27, color: "#10b981" },
  { name: "Embalagem", value: 18, color: "#f97316" },
  { name: "MRO", value: 17, color: "#8b5cf6" },
];

const alertas = [
  { tipo: "critical", msg: "Estoque crítico: Capacitor 470µF — 12 un.", modulo: "Estoque" },
  { tipo: "warning", msg: "Ordem OP-2847 parada há 2h — Linha 3", modulo: "Produção" },
  { tipo: "warning", msg: "NF-e 001847 aguardando conferência", modulo: "Recebimento" },
  { tipo: "critical", msg: "Atraso previsto: Pedido #PED-9921 — 3 dias", modulo: "Expedição" },
  { tipo: "info", msg: "Manutenção preventiva programada: Prensa H2", modulo: "Manutenção" },
];

const atividades = [
  { hora: "08:42", evento: "Recebimento NF-e 001849 — Fornecedor Altamira", modulo: "Recebimento", ok: true },
  { hora: "08:15", evento: "OP-2845 concluída — 380 unidades Controlador CLP-200", modulo: "Produção", ok: true },
  { hora: "07:58", evento: "Separação pedido PED-9918 iniciada", modulo: "Expedição", ok: true },
  { hora: "07:30", evento: "Turno A iniciado — 126 colaboradores", modulo: "RH", ok: true },
  { hora: "06:45", evento: "Saída veículo PLK-3847 — rota SP/RJ", modulo: "Distribuição", ok: true },
  { hora: "05:20", evento: "Alerta: Sensor de temperatura Linha 2", modulo: "Manutenção", ok: false },
];

const agenda = [
  { hora: "09:00", atividade: "Recebimento — Fornecedor Tech Components", tipo: "recebimento" },
  { hora: "10:30", atividade: "Início OP-2849 — Linha 1 — CLP-500", tipo: "producao" },
  { hora: "13:00", atividade: "Expedição — Pedidos PED-9920/9921", tipo: "expedicao" },
  { hora: "14:30", atividade: "Reunião PPCP — Planejamento semana 24", tipo: "reuniao" },
  { hora: "16:00", atividade: "Manutenção Preventiva — Prensa H2", tipo: "manutencao" },
];

const flowNodes = [
  { label: "Fornecedor", sub: "87 ativos", icon: Globe, color: "#3b82f6" },
  { label: "Recebimento", sub: "3 veículos hoje", icon: Truck, color: "#06b6d4" },
  { label: "Armazém", sub: "12.450 itens", icon: Package, color: "#10b981" },
  { label: "Produção", sub: "4 linhas ativas", icon: Factory, color: "#f97316" },
  { label: "Expedição", sub: "18 pedidos hoje", icon: Send, color: "#8b5cf6" },
  { label: "Cliente", sub: "3.800/mês", icon: Users, color: "#ec4899" },
];

const kpis = [
  { label: "Itens em Estoque", value: "12.450", delta: "+3.2%", up: true, icon: Package, color: "#3b82f6" },
  { label: "Em Produção", value: "8 OPs", delta: "+2 vs ontem", up: true, icon: Factory, color: "#f97316" },
  { label: "Entregas Previstas", value: "18", delta: "hoje", up: true, icon: Truck, color: "#10b981" },
  { label: "Lead Time Médio", value: "4.2d", delta: "-0.3d", up: true, icon: Clock, color: "#8b5cf6" },
  { label: "Cap. Utilizada", value: "87%", delta: "+5% vs meta", up: false, icon: Activity, color: "#f59e0b" },
  { label: "Fornecedores", value: "87", delta: "2 novos", up: true, icon: Users, color: "#06b6d4" },
  { label: "Pedidos Concluídos", value: "142", delta: "este mês", up: true, icon: CheckCircle, color: "#10b981" },
  { label: "Ordens Ativas", value: "8", delta: "em andamento", up: true, icon: BarChart3, color: "#ec4899" },
];

const conceito = {
  titulo: "Lead Time",
  def: "Tempo total entre o início e a conclusão de um processo logístico — desde o pedido ao cliente até a entrega final.",
  uso: "Utilizado para medir eficiência da cadeia. Meta: ≤ 5 dias para entregas nacionais.",
  formula: "Lead Time = Tempo Processo + Tempo Espera + Tempo Transporte",
};

function KpiCard({ kpi }: { kpi: typeof kpis[0] }) {
  const Icon = kpi.icon;
  return (
    <div className="p-4 rounded-xl flex items-center gap-4 transition-transform duration-200 hover:-translate-y-0.5"
      style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: kpi.color + "18" }}>
        <Icon size={18} style={{ color: kpi.color }} />
      </div>
      <div className="min-w-0">
        <div className="text-white" style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{kpi.value}</div>
        <div className="text-slate-500" style={{ fontSize: "11px" }}>{kpi.label}</div>
        <div className="flex items-center gap-1 mt-0.5">
          {kpi.up ? <ArrowUp size={10} color="#10b981" /> : <ArrowDown size={10} color="#f97316" />}
          <span style={{ fontSize: "10px", color: kpi.up ? "#10b981" : "#f97316" }}>{kpi.delta}</span>
        </div>
      </div>
    </div>
  );
}

const tipoColor: Record<string, string> = {
  recebimento: "#06b6d4",
  producao: "#f97316",
  expedicao: "#8b5cf6",
  reuniao: "#3b82f6",
  manutencao: "#f59e0b",
};

export function Dashboard() {
  const [flowActive, setFlowActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFlowActive(p => (p + 1) % flowNodes.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6" style={{ minHeight: "100%" }}>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Centro de Operações</h1>
          <p className="text-slate-500 text-sm mt-0.5">Turno A · LogiTech Indústria · Linha de Produção 1–4</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Todos os sistemas operacionais
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        {kpis.map(k => <KpiCard key={k.label} kpi={k} />)}
      </div>

      {/* Row: Alertas + Atividades */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Alertas */}
        <div className="p-5 rounded-xl flex flex-col gap-4"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <div className="flex items-center justify-between">
            <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Painel de Alertas</h3>
            <span className="px-2 py-0.5 rounded-full text-xs"
              style={{ background: "rgba(239,68,68,0.15)", color: "#fca5a5" }}>
              {alertas.filter(a => a.tipo === "critical").length} críticos
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {alertas.map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: a.tipo === "critical" ? "rgba(239,68,68,0.08)" : a.tipo === "warning" ? "rgba(249,115,22,0.08)" : "rgba(59,130,246,0.08)" }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 animate-pulse"
                  style={{ background: a.tipo === "critical" ? "#ef4444" : a.tipo === "warning" ? "#f97316" : "#3b82f6" }} />
                <div className="min-w-0">
                  <p className="text-slate-300 text-xs leading-snug">{a.msg}</p>
                  <p className="text-slate-600 text-xs mt-0.5">{a.modulo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atividades */}
        <div className="lg:col-span-2 p-5 rounded-xl flex flex-col gap-4"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Atividades Recentes</h3>
          <div className="flex flex-col gap-1 relative">
            <div className="absolute left-[23px] top-4 bottom-4 w-px" style={{ background: "rgba(59,130,246,0.15)" }} />
            {atividades.map((a, i) => (
              <div key={i} className="flex items-start gap-4 py-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10"
                  style={{ background: a.ok ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${a.ok ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)"}` }}>
                  {a.ok
                    ? <CheckCircle size={14} color="#10b981" />
                    : <AlertTriangle size={14} color="#ef4444" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-slate-300 text-xs leading-snug">{a.evento}</p>
                  <div className="flex gap-2 mt-0.5">
                    <span className="text-slate-600 text-xs">{a.hora}</span>
                    <span className="text-slate-700 text-xs">·</span>
                    <span className="text-blue-500 text-xs">{a.modulo}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Produção semanal */}
        <div className="lg:col-span-2 p-5 rounded-xl"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Produção Semanal</h3>
            <span className="text-slate-500 text-xs">unidades/dia</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={prodData}>
              <defs>
                <linearGradient id="gProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(59,130,246,0.07)" />
              <XAxis dataKey="d" tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
              <Area dataKey="meta" stroke="#1d4ed8" strokeWidth={1} strokeDasharray="4 2" fill="none" dot={false} name="Meta" />
              <Area dataKey="prod" stroke="#3b82f6" strokeWidth={2} fill="url(#gProd)" dot={{ fill: "#3b82f6", r: 3 }} name="Produção" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição por categoria */}
        <div className="p-5 rounded-xl flex flex-col gap-4"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Estoque por Categoria</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={40} outerRadius={65} paddingAngle={3}>
                {pieData.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5">
            {pieData.map(e => (
              <div key={e.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: e.color }} />
                  <span className="text-slate-400 text-xs">{e.name}</span>
                </div>
                <span className="text-slate-300 text-xs" style={{ fontFamily: "var(--font-mono)" }}>{e.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row: Movimentação Estoque + Agenda + Fluxo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Entradas/Saídas */}
        <div className="p-5 rounded-xl"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Movimentação</h3>
            <span className="text-slate-500 text-xs">últimos 6 meses</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={estoqueData} barSize={8}>
              <CartesianGrid stroke="rgba(59,130,246,0.07)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "#6b82a0", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b82a0", fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
              <Bar dataKey="entrada" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Entradas" />
              <Bar dataKey="saida" fill="#10b981" radius={[4, 4, 0, 0]} name="Saídas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Agenda */}
        <div className="p-5 rounded-xl flex flex-col gap-4"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Agenda de Hoje</h3>
          <div className="flex flex-col gap-2">
            {agenda.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-xs shrink-0" style={{ color: "#6b82a0", fontFamily: "var(--font-mono)", width: "38px" }}>{item.hora}</div>
                <div className="h-6 w-0.5 rounded-full shrink-0" style={{ background: tipoColor[item.tipo] ?? "#6b82a0" }} />
                <p className="text-slate-300 text-xs leading-snug">{item.atividade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fluxo animado */}
        <div className="p-5 rounded-xl flex flex-col gap-4"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Fluxo Logístico</h3>
          <div className="flex flex-col gap-1.5">
            {flowNodes.map((n, i) => {
              const Icon = n.icon;
              const isActive = flowActive === i;
              const isPast = flowActive > i;
              return (
                <div key={n.label}>
                  <div className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-400"
                    style={{ background: isActive ? `${n.color}18` : "transparent", border: `1px solid ${isActive ? n.color + "30" : "transparent"}` }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: isActive ? n.color : isPast ? n.color + "30" : "rgba(255,255,255,0.05)" }}>
                      <Icon size={13} color={isActive ? "white" : isPast ? n.color : "#4b5563"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: "12px", color: isActive ? "#e8edf5" : isPast ? "#94a3b8" : "#4b5563", fontWeight: isActive ? 600 : 400 }}>
                        {n.label}
                      </div>
                      <div style={{ fontSize: "10px", color: "#4b5563" }}>{n.sub}</div>
                    </div>
                    {isPast && <CheckCircle size={12} color="#10b981" />}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: n.color }} />}
                  </div>
                  {i < flowNodes.length - 1 && (
                    <div className="flex justify-start ml-[23px] my-0.5">
                      <div className="h-3 border-l" style={{ borderColor: flowActive > i ? n.color + "50" : "#1e3a5f", borderStyle: "dashed" }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Conceito do dia */}
      <div className="p-5 rounded-xl flex flex-col md:flex-row gap-6 items-start"
        style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(37,99,235,0.2)" }}>
          <Zap size={18} color="#60a5fa" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-blue-400 text-xs uppercase tracking-widest" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial do Dia</p>
            <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: "rgba(59,130,246,0.15)", color: "#93c5fd" }}>KPI</span>
          </div>
          <h4 className="text-white mb-1" style={{ fontWeight: 600 }}>{conceito.titulo}</h4>
          <p className="text-slate-400 text-sm mb-2 leading-relaxed">{conceito.def}</p>
          <p className="text-slate-500 text-xs mb-3">{conceito.uso}</p>
          <div className="px-3 py-2 rounded-lg text-xs" style={{ background: "rgba(0,0,0,0.3)", color: "#93c5fd", fontFamily: "var(--font-mono)" }}>
            {conceito.formula}
          </div>
        </div>
      </div>
    </div>
  );
}
