import { TrendingUp, TrendingDown } from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from "recharts";

const kpisMensais = [
  { kpi: "OTIF", atual: 94.2, meta: 95, unid: "%", ok: false },
  { kpi: "Lead Time", atual: 4.2, meta: 5.0, unid: "dias", ok: true },
  { kpi: "Acuracidade Estoque", atual: 98.1, meta: 98, unid: "%", ok: true },
  { kpi: "Giro de Estoque", atual: 8.4, meta: 8, unid: "x/ano", ok: true },
  { kpi: "Custo de Armazenagem", atual: 3.2, meta: 3.5, unid: "%/mês", ok: true },
  { kpi: "Pedidos no Prazo", atual: 91, meta: 95, unid: "%", ok: false },
];

const otifData = [
  { mes: "Jan", otif: 91.2 }, { mes: "Fev", otif: 92.8 }, { mes: "Mar", otif: 90.1 },
  { mes: "Abr", otif: 93.5 }, { mes: "Mai", otif: 92.0 }, { mes: "Jun", otif: 94.2 },
];

const custosData = [
  { mes: "Jan", armaz: 3.8, transp: 5.2, total: 9.0 },
  { mes: "Fev", armaz: 3.5, transp: 5.0, total: 8.5 },
  { mes: "Mar", armaz: 3.6, transp: 4.8, total: 8.4 },
  { mes: "Abr", armaz: 3.3, transp: 4.6, total: 7.9 },
  { mes: "Mai", armaz: 3.4, transp: 4.5, total: 7.9 },
  { mes: "Jun", armaz: 3.2, transp: 4.3, total: 7.5 },
];

const radarData = [
  { metrica: "OTIF", val: 94 },
  { metrica: "Lead Time", val: 84 },
  { metrica: "Acuracidade", val: 98 },
  { metrica: "Giro", val: 84 },
  { metrica: "Custo", val: 91 },
  { metrica: "Satisfação", val: 89 },
];

const comparativo = [
  { indicador: "OTIF (%)", jan: 91.2, fev: 92.8, mar: 90.1, abr: 93.5, mai: 92.0, jun: 94.2, meta: 95 },
  { indicador: "Lead Time (d)", jan: 5.1, fev: 4.9, mar: 5.2, abr: 4.7, mai: 4.4, jun: 4.2, meta: 5.0 },
  { indicador: "Acuracidade (%)", jan: 97.2, fev: 97.8, mar: 98.1, abr: 97.9, mai: 98.3, jun: 98.1, meta: 98 },
  { indicador: "Giro (x/ano)", jan: 7.8, fev: 8.0, mar: 7.9, abr: 8.2, mai: 8.3, jun: 8.4, meta: 8.0 },
];

export function Controle() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Controle de Desempenho</h1>
          <p className="text-slate-500 text-sm mt-0.5">KPIs, indicadores e análise gerencial</p>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}>
          Junho 2024 — Dados em tempo real
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpisMensais.map(k => (
          <div key={k.kpi} className="p-4 rounded-xl"
            style={{ background: "rgba(13,22,40,0.8)", border: `1px solid ${k.ok ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)"}` }}>
            <p className="text-slate-500 text-xs mb-2">{k.kpi}</p>
            <div className="flex items-end gap-1 mb-1">
              <span className="text-white" style={{ fontSize: "1.375rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{k.atual}</span>
              <span className="text-slate-500 text-xs mb-0.5">{k.unid}</span>
            </div>
            <div className="flex items-center gap-1">
              {k.ok ? <TrendingUp size={11} color="#10b981" /> : <TrendingDown size={11} color="#ef4444" />}
              <span className="text-xs" style={{ color: k.ok ? "#10b981" : "#ef4444" }}>
                Meta: {k.meta}{k.unid}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* OTIF evolução */}
        <div className="lg:col-span-2 p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Evolução OTIF — 6 Meses</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-0.5 bg-blue-500" />
              <span className="text-slate-500 text-xs">OTIF Real</span>
              <div className="w-2 h-0.5 bg-emerald-500 ml-2 border-dashed" />
              <span className="text-slate-500 text-xs">Meta 95%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={otifData}>
              <CartesianGrid stroke="rgba(59,130,246,0.07)" />
              <XAxis dataKey="mes" tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} domain={[88, 97]} width={30} />
              <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
              <Line type="monotone" dataKey="otif" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 4 }} name="OTIF %" />
              {/* Reference line at 95 */}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Performance Geral</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(59,130,246,0.15)" />
              <PolarAngleAxis dataKey="metrica" tick={{ fill: "#6b82a0", fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Custos logísticos */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
        <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Custos Logísticos — % sobre Receita</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={custosData} barSize={12}>
            <CartesianGrid stroke="rgba(59,130,246,0.07)" vertical={false} />
            <XAxis dataKey="mes" tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} width={25} />
            <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
            <Bar dataKey="armaz" fill="#3b82f6" radius={[3, 3, 0, 0]} name="Armazenagem %" stackId="a" />
            <Bar dataKey="transp" fill="#8b5cf6" radius={[3, 3, 0, 0]} name="Transporte %" stackId="a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela comparativa */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
        <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Histórico Comparativo de Indicadores</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-slate-600 uppercase" style={{ letterSpacing: "0.08em" }}>
                {["Indicador", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Meta"].map(h => (
                  <th key={h} className="text-left px-3 py-2" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparativo.map((row, i) => (
                <tr key={i} className="hover:bg-slate-800 transition-colors">
                  <td className="px-3 py-2.5 text-slate-300">{row.indicador}</td>
                  {[row.jan, row.fev, row.mar, row.abr, row.mai].map((v, vi) => (
                    <td key={vi} className="px-3 py-2.5 text-slate-500" style={{ fontFamily: "var(--font-mono)" }}>{v}</td>
                  ))}
                  <td className="px-3 py-2.5" style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "#e8edf5" }}>{row.jun}</td>
                  <td className="px-3 py-2.5 text-blue-400" style={{ fontFamily: "var(--font-mono)" }}>{row.meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aplicação Industrial */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <p className="text-blue-400 text-xs uppercase tracking-widest mb-3" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { t: "OTIF", f: "Pedidos no prazo / Total × 100" },
            { t: "Lead Time", f: "Dt. Entrega − Dt. Pedido (dias úteis)" },
            { t: "Acuracidade", f: "Contagem Real / Saldo Sistema × 100" },
            { t: "Giro de Estoque", f: "CMV Anual / Estoque Médio" },
          ].map(item => (
            <div key={item.t}>
              <p className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>{item.t}</p>
              <div className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,0,0,0.3)", color: "#93c5fd", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                {item.f}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
