import { useState } from "react";
import { Package, Search, Filter, ArrowUp, ArrowDown, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const produtos = [
  { cod: "CAP-470", desc: "Capacitor Eletrolítico 470µF 25V", cat: "Eletrônica", qtd: 12, min: 50, max: 500, loc: "A-01-01", curva: "A", und: "un" },
  { cod: "RES-10K", desc: "Resistor 10kΩ 1/4W", cat: "Eletrônica", qtd: 340, min: 100, max: 1000, loc: "A-01-02", curva: "A", und: "un" },
  { cod: "MCU-328", desc: "Microcontrolador ATmega328P", cat: "Eletrônica", qtd: 87, min: 30, max: 200, loc: "A-02-01", curva: "A", und: "un" },
  { cod: "TRN-NPN", desc: "Transistor BC547 NPN", cat: "Eletrônica", qtd: 210, min: 80, max: 800, loc: "A-02-02", curva: "B", und: "un" },
  { cod: "CLP-PCB", desc: "Placa PCB CLP-200 Nua", cat: "Mecânica", qtd: 45, min: 20, max: 150, loc: "B-01-01", curva: "A", und: "un" },
  { cod: "ENC-PVC", desc: "Caixa Gabinete PVC ABS", cat: "Embalagem", qtd: 68, min: 25, max: 200, loc: "C-01-01", curva: "B", und: "un" },
  { cod: "CAB-USB", desc: "Cabo USB-C 1m Blindado", cat: "MRO", qtd: 130, min: 40, max: 400, loc: "C-02-01", curva: "C", und: "un" },
  { cod: "PAR-M3", desc: "Parafuso M3x8 Cabeça Chata", cat: "MRO", qtd: 2400, min: 500, max: 5000, loc: "B-03-01", curva: "C", und: "pç" },
];

const movimentacoes = [
  { data: "17/06 08:42", tipo: "Entrada", cod: "CAP-470", qtd: 20, origem: "Recebimento NF-001849" },
  { data: "17/06 07:30", tipo: "Saída", cod: "MCU-328", qtd: 8, origem: "OP-2845 Produção" },
  { data: "16/06 16:00", tipo: "Entrada", cod: "RES-10K", qtd: 100, origem: "Recebimento NF-001847" },
  { data: "16/06 14:00", tipo: "Saída", cod: "CLP-PCB", qtd: 15, origem: "OP-2844 Produção" },
  { data: "16/06 11:30", tipo: "Saída", cod: "TRN-NPN", qtd: 50, origem: "OP-2843 Produção" },
];

const estoqueGraf = [
  { mes: "Jan", nivel: 11200 }, { mes: "Fev", nivel: 12800 }, { mes: "Mar", nivel: 11900 },
  { mes: "Abr", nivel: 13400 }, { mes: "Mai", nivel: 12100 }, { mes: "Jun", nivel: 12450 },
];

const catGraf = [
  { cat: "Eletrônica", qtd: 649 },
  { cat: "Mecânica", qtd: 113 },
  { cat: "Embalagem", qtd: 198 },
  { cat: "MRO", qtd: 2530 },
];

export function Estoque() {
  const [busca, setBusca] = useState("");
  const [catFiltro, setCatFiltro] = useState("Todos");
  const [abaSelecionada, setAbaSelecionada] = useState<"lista" | "mapa" | "abc">("lista");

  const categorias = ["Todos", "Eletrônica", "Mecânica", "Embalagem", "MRO"];

  const filtrados = produtos.filter(p => {
    const matchBusca = p.cod.toLowerCase().includes(busca.toLowerCase()) || p.desc.toLowerCase().includes(busca.toLowerCase());
    const matchCat = catFiltro === "Todos" || p.cat === catFiltro;
    return matchBusca && matchCat;
  });

  const criticos = produtos.filter(p => p.qtd < p.min);

  const nivelPct = (p: typeof produtos[0]) => Math.min(100, Math.round((p.qtd / p.max) * 100));
  const corNivel = (pct: number) => pct <= 20 ? "#ef4444" : pct <= 40 ? "#f97316" : "#10b981";

  const mapaGrades: Record<string, typeof produtos[0][]> = {};
  produtos.forEach(p => {
    const bloco = p.loc.split("-")[0];
    if (!mapaGrades[bloco]) mapaGrades[bloco] = [];
    mapaGrades[bloco].push(p);
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gestão de Estoque</h1>
          <p className="text-slate-500 text-sm mt-0.5">WMS — Controle de posições e movimentações</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Total Itens", val: produtos.reduce((a, p) => a + p.qtd, 0).toLocaleString("pt-BR"), color: "#3b82f6" },
            { label: "SKUs", val: produtos.length, color: "#10b981" },
            { label: "Críticos", val: criticos.length, color: "#ef4444" },
          ].map(s => (
            <div key={s.label} className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: `1px solid ${s.color}20` }}>
              <div className="text-lg" style={{ fontWeight: 700, color: s.color, fontFamily: "var(--font-mono)" }}>{s.val}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas críticos */}
      {criticos.length > 0 && (
        <div className="p-4 rounded-xl flex items-start gap-3"
          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <AlertTriangle size={18} color="#ef4444" className="shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 text-sm" style={{ fontWeight: 600 }}>Produtos com estoque abaixo do mínimo</p>
            <p className="text-slate-400 text-xs mt-1">{criticos.map(p => p.cod).join(" · ")}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "rgba(13,22,40,0.8)" }}>
        {(["lista", "mapa", "abc"] as const).map(aba => (
          <button key={aba} onClick={() => setAbaSelecionada(aba)}
            className="px-4 py-1.5 rounded-lg text-sm cursor-pointer capitalize transition-all"
            style={{
              background: abaSelecionada === aba ? "#2563eb" : "transparent",
              color: abaSelecionada === aba ? "white" : "#6b82a0",
              fontWeight: abaSelecionada === aba ? 600 : 400
            }}>
            {aba === "lista" ? "Lista" : aba === "mapa" ? "Mapa do Armazém" : "Curva ABC"}
          </button>
        ))}
      </div>

      {abaSelecionada === "lista" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Filtros */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-[200px]"
                style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.15)" }}>
                <Search size={14} color="#6b82a0" />
                <input value={busca} onChange={e => setBusca(e.target.value)}
                  placeholder="Buscar produto ou código..."
                  className="bg-transparent border-none outline-none text-slate-300 text-sm flex-1" />
              </div>
              <div className="flex gap-1">
                {categorias.map(c => (
                  <button key={c} onClick={() => setCatFiltro(c)}
                    className="px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all"
                    style={{ background: catFiltro === c ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)", color: catFiltro === c ? "#93c5fd" : "#6b82a0", border: `1px solid ${catFiltro === c ? "rgba(59,130,246,0.3)" : "transparent"}` }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabela */}
            <div className="rounded-xl overflow-hidden" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <div className="grid text-xs text-slate-600 px-4 py-2.5 uppercase" style={{ gridTemplateColumns: "90px 1fr 80px 80px 60px 60px 60px", letterSpacing: "0.08em", borderBottom: "1px solid rgba(59,130,246,0.06)" }}>
                <span>Código</span><span>Descrição</span><span>Localização</span><span>Qtd</span><span>Mín</span><span>Curva</span><span>Nível</span>
              </div>
              {filtrados.map((p, i) => {
                const pct = nivelPct(p);
                const cor = corNivel(pct);
                return (
                  <div key={p.cod} className="grid items-center px-4 py-3 text-sm hover:bg-slate-800 transition-colors"
                    style={{ gridTemplateColumns: "90px 1fr 80px 80px 60px 60px 60px", borderTop: i > 0 ? "1px solid rgba(59,130,246,0.04)" : "none" }}>
                    <span className="text-blue-400" style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>{p.cod}</span>
                    <span className="text-slate-300 truncate pr-2">{p.desc}</span>
                    <span className="text-slate-500" style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>{p.loc}</span>
                    <span className="text-white" style={{ fontWeight: 600, fontFamily: "var(--font-mono)" }}>{p.qtd}</span>
                    <span className="text-slate-600" style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>{p.min}</span>
                    <span className="px-1.5 py-0.5 rounded text-xs w-fit" style={{ background: p.curva === "A" ? "rgba(59,130,246,0.15)" : p.curva === "B" ? "rgba(249,115,22,0.1)" : "rgba(107,130,160,0.1)", color: p.curva === "A" ? "#93c5fd" : p.curva === "B" ? "#fb923c" : "#6b82a0" }}>
                      {p.curva}
                    </span>
                    <div className="w-12">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cor }} />
                      </div>
                      <span style={{ fontSize: "10px", color: cor }}>{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Movimentações + Gráfico */}
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Movimentações Recentes</h3>
              <div className="flex flex-col gap-2">
                {movimentacoes.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: m.tipo === "Entrada" ? "rgba(16,185,129,0.15)" : "rgba(249,115,22,0.12)" }}>
                      {m.tipo === "Entrada" ? <ArrowDown size={12} color="#10b981" /> : <ArrowUp size={12} color="#f97316" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-slate-300 text-xs">{m.cod} <span className="text-slate-600">·</span> {m.qtd} un.</p>
                      <p className="text-slate-600 text-xs truncate">{m.origem}</p>
                      <p className="text-slate-700 text-xs">{m.data}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <h3 className="text-white mb-3" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Evolução do Estoque</h3>
              <ResponsiveContainer width="100%" height={130}>
                <LineChart data={estoqueGraf}>
                  <CartesianGrid stroke="rgba(59,130,246,0.06)" />
                  <XAxis dataKey="mes" tick={{ fill: "#6b82a0", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b82a0", fontSize: 10 }} axisLine={false} tickLine={false} width={35} />
                  <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
                  <Line dataKey="nivel" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6", r: 3 }} name="Total" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {abaSelecionada === "mapa" && (
        <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Mapa do Armazém — Planta Baixa Simplificada</h3>
          <div className="flex flex-col gap-6">
            {Object.entries(mapaGrades).map(([bloco, itens]) => (
              <div key={bloco}>
                <p className="text-blue-400 text-xs mb-3 uppercase" style={{ letterSpacing: "0.15em" }}>Bloco {bloco}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {itens.map(p => {
                    const pct = nivelPct(p);
                    const cor = corNivel(pct);
                    return (
                      <div key={p.cod} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${cor}30` }}>
                        <div className="flex justify-between mb-2">
                          <span className="text-blue-400 text-xs" style={{ fontFamily: "var(--font-mono)" }}>{p.loc}</span>
                          <span className="text-xs" style={{ color: cor, fontFamily: "var(--font-mono)" }}>{pct}%</span>
                        </div>
                        <p className="text-slate-400 text-xs leading-tight mb-2">{p.cod}</p>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, background: cor }} />
                        </div>
                        <p className="text-slate-600 text-xs mt-1">{p.qtd}/{p.max} {p.und}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {abaSelecionada === "abc" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Curva ABC — Giro de Estoque</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={catGraf}>
                <CartesianGrid stroke="rgba(59,130,246,0.07)" vertical={false} />
                <XAxis dataKey="cat" tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b82a0", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
                <Bar dataKey="qtd" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Classificação por Curva</h3>
            <div className="flex flex-col gap-3">
              {(["A", "B", "C"] as const).map(curva => {
                const itens = produtos.filter(p => p.curva === curva);
                const cores = { A: "#3b82f6", B: "#f97316", C: "#6b82a0" };
                const descs = { A: "Alta rotatividade — 20% dos itens, 80% do giro", B: "Rotatividade média — 30% dos itens, 15% do giro", C: "Baixa rotatividade — 50% dos itens, 5% do giro" };
                return (
                  <div key={curva} className="p-4 rounded-xl" style={{ background: `${cores[curva]}08`, border: `1px solid ${cores[curva]}20` }}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                        style={{ background: cores[curva] + "20", color: cores[curva], fontWeight: 700 }}>
                        {curva}
                      </div>
                      <div>
                        <p className="text-white text-sm" style={{ fontWeight: 600 }}>Curva {curva} — {itens.length} SKUs</p>
                        <p className="text-slate-500 text-xs">{descs[curva]}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {itens.map(p => (
                        <span key={p.cod} className="px-2 py-0.5 rounded text-xs" style={{ background: cores[curva] + "15", color: cores[curva], fontFamily: "var(--font-mono)" }}>{p.cod}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
