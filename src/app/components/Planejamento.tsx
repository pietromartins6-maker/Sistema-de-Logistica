import { BarChart3, Calendar, TrendingUp, Settings, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const semanas = [
  { sem: "S20", plan: 2200, real: 2100 },
  { sem: "S21", plan: 2400, real: 2380 },
  { sem: "S22", plan: 2200, real: 2050 },
  { sem: "S23", plan: 2600, real: 2590 },
  { sem: "S24", plan: 2800, real: 0 },
  { sem: "S25", plan: 2500, real: 0 },
];

const suprimentos = [
  { material: "Capacitor 470µF", atual: 12, min: 50, pedido: "Em andamento", entrega: "20/06" },
  { material: "MCU ATmega328P", atual: 87, min: 30, pedido: "—", entrega: "—" },
  { material: "Placa PCB CLP-500", atual: 45, min: 20, pedido: "—", entrega: "—" },
  { material: "Transistor BC547", atual: 210, min: 80, pedido: "—", entrega: "—" },
  { material: "Caixa Gabinete PVC", atual: 68, min: 25, pedido: "Solicitado", entrega: "22/06" },
];

const cronograma = [
  { atividade: "Recebimento Altamira", tipo: "recebimento", dia: "18/06", hora: "08:00" },
  { atividade: "OP-2849 — CLP-500 (50 un)", tipo: "producao", dia: "18/06", hora: "10:00" },
  { atividade: "Recebimento Tech Components", tipo: "recebimento", dia: "19/06", hora: "09:00" },
  { atividade: "OP-2850 — SEN-400 (120 un)", tipo: "producao", dia: "19/06", hora: "13:00" },
  { atividade: "Expedição pedidos 9919/9920", tipo: "expedicao", dia: "19/06", hora: "15:00" },
  { atividade: "Manutenção preventiva CNC-01", tipo: "manutencao", dia: "20/06", hora: "08:00" },
];

const tipoColor: Record<string, string> = {
  recebimento: "#06b6d4",
  producao: "#f97316",
  expedicao: "#8b5cf6",
  manutencao: "#f59e0b",
};

const capacidadeLinhas = [
  { linha: "Linha 1", cap: 87 },
  { linha: "Linha 2", cap: 72 },
  { linha: "Linha 3", cap: 94 },
  { linha: "Linha 4", cap: 61 },
];

export function Planejamento() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Planejamento Logístico</h1>
          <p className="text-slate-500 text-sm mt-0.5">PPCP · MRP · Suprimentos · Distribuição</p>
        </div>
        <div className="flex gap-3">
          {[["Semana Atual", "S24"], ["Meta S24", "2.800 un"], ["Cobertura", "4.2 dias"]].map(([l, v]) => (
            <div key={l} className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <div className="text-white text-lg" style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>{v}</div>
              <div className="text-slate-500 text-xs">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Planejamento produção */}
        <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Planejamento de Produção — 6 Semanas</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={semanas}>
              <CartesianGrid stroke="rgba(59,130,246,0.07)" vertical={false} />
              <XAxis dataKey="sem" tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
              <Bar dataKey="plan" fill="#1d4ed8" radius={[3, 3, 0, 0]} name="Planejado" />
              <Bar dataKey="real" fill="#10b981" radius={[3, 3, 0, 0]} name="Realizado" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Capacidade das linhas */}
        <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Capacidade das Linhas</h3>
          <div className="flex flex-col gap-4">
            {capacidadeLinhas.map(l => (
              <div key={l.linha}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-slate-300">{l.linha}</span>
                  <span style={{ color: l.cap > 90 ? "#ef4444" : l.cap > 70 ? "#f97316" : "#10b981", fontFamily: "var(--font-mono)" }}>{l.cap}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                  <div className="h-full rounded-full" style={{
                    width: `${l.cap}%`,
                    background: l.cap > 90 ? "linear-gradient(90deg,#f97316,#ef4444)" : l.cap > 70 ? "#f97316" : "#10b981"
                  }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-lg text-xs" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", color: "#fb923c" }}>
            ⚠ Linha 3 em nível crítico de capacidade (94%). Considere redistribuição.
          </div>
        </div>
      </div>

      {/* Suprimentos */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
        <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Planejamento de Suprimentos — MRP</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
            <thead>
              <tr className="text-slate-600 text-xs uppercase" style={{ letterSpacing: "0.08em" }}>
                {["Material", "Estoque Atual", "Estoque Mín.", "Status Pedido", "Previsão Entrega"].map(h => (
                  <th key={h} className="text-left px-3 py-2" style={{ borderBottom: "1px solid rgba(59,130,246,0.06)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {suprimentos.map((s, i) => (
                <tr key={i} className="hover:bg-slate-800 transition-colors">
                  <td className="px-3 py-3 text-slate-300">{s.material}</td>
                  <td className="px-3 py-3">
                    <span style={{ color: s.atual < s.min ? "#ef4444" : "#10b981", fontFamily: "var(--font-mono)", fontWeight: 600 }}>{s.atual}</span>
                  </td>
                  <td className="px-3 py-3 text-slate-500" style={{ fontFamily: "var(--font-mono)" }}>{s.min}</td>
                  <td className="px-3 py-3">
                    {s.pedido !== "—" ? (
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: s.pedido === "Em andamento" ? "rgba(59,130,246,0.15)" : "rgba(249,115,22,0.12)", color: s.pedido === "Em andamento" ? "#93c5fd" : "#fb923c" }}>
                        {s.pedido}
                      </span>
                    ) : <span className="text-slate-600 text-xs">—</span>}
                  </td>
                  <td className="px-3 py-3 text-slate-500 text-xs">{s.entrega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cronograma */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
        <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Cronograma Operacional — Próximos 3 Dias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cronograma.map((c, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${tipoColor[c.tipo]}15` }}>
              <div className="w-1 h-10 rounded-full shrink-0" style={{ background: tipoColor[c.tipo] }} />
              <div className="flex-1">
                <p className="text-slate-300 text-sm">{c.atividade}</p>
                <p className="text-slate-600 text-xs mt-0.5">{c.dia} às {c.hora}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs capitalize" style={{ background: tipoColor[c.tipo] + "15", color: tipoColor[c.tipo] }}>
                {c.tipo}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Aplicação Industrial */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <p className="text-blue-400 text-xs uppercase tracking-widest mb-3" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { t: "MRP", d: "Material Requirements Planning. Calcula automaticamente quando e quanto comprar com base na demanda de produção e estoque disponível." },
            { t: "PPCP", d: "Planejamento, Programação e Controle da Produção. Organiza ordens, recursos e prazos para maximizar eficiência da fábrica." },
            { t: "S&OP", d: "Sales and Operations Planning. Alinha vendas, produção e logística em um plano único, garantindo equilíbrio entre demanda e oferta." },
          ].map(item => (
            <div key={item.t}>
              <h4 className="text-white mb-1" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{item.t}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
