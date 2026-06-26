import { useState } from "react";
import { FileText, Download, BarChart3, Package, Truck, Factory, Globe, TrendingUp } from "lucide-react";

const relatorios = [
  {
    id: "REL001", titulo: "Recebimento Mensal", modulo: "Recebimento", icone: Truck,
    desc: "Relatório completo de todas as entradas de materiais no período. Inclui NF-e, fornecedores, quantidades e divergências.",
    periodos: ["Diário", "Semanal", "Mensal"],
    cor: "#06b6d4",
    dados: [
      { label: "Total de NF-e", val: "142" }, { label: "Itens recebidos", val: "8.420 un" },
      { label: "Divergências", val: "3 (2.1%)" }, { label: "Tempo médio descarga", val: "47 min" },
    ],
  },
  {
    id: "REL002", titulo: "Posição de Estoque", modulo: "Estoque", icone: Package,
    desc: "Inventário completo do armazém com quantidades, localizações, curva ABC e produtos críticos.",
    periodos: ["Semanal", "Mensal", "Inventário"],
    cor: "#10b981",
    dados: [
      { label: "Total SKUs", val: "248" }, { label: "Total unidades", val: "12.450" },
      { label: "Valor em estoque", val: "R$ 284.200" }, { label: "Itens críticos", val: "4" },
    ],
  },
  {
    id: "REL003", titulo: "Ordens de Produção", modulo: "Produção", icone: Factory,
    desc: "Acompanhamento de todas as OPs abertas, concluídas e com atraso. Eficiência por linha e turno.",
    periodos: ["Diário", "Semanal", "Mensal"],
    cor: "#f97316",
    dados: [
      { label: "OPs Concluídas", val: "142" }, { label: "Total produzido", val: "38.400 un" },
      { label: "Eficiência média", val: "87%" }, { label: "OPs com atraso", val: "2" },
    ],
  },
  {
    id: "REL004", titulo: "Expedição e Distribuição", modulo: "Expedição", icone: Globe,
    desc: "Pedidos expedidos, transportadoras utilizadas, OTIF e rastreamento de entregas no período.",
    periodos: ["Diário", "Semanal", "Mensal"],
    cor: "#8b5cf6",
    dados: [
      { label: "Pedidos expedidos", val: "340" }, { label: "OTIF", val: "94.2%" },
      { label: "Entregas no prazo", val: "320" }, { label: "Ocorrências", val: "8" },
    ],
  },
  {
    id: "REL005", titulo: "Indicadores Gerenciais", modulo: "Controle", icone: TrendingUp,
    desc: "Dashboard executivo com todos os KPIs logísticos, comparativos mensais e tendências.",
    periodos: ["Mensal", "Trimestral", "Anual"],
    cor: "#3b82f6",
    dados: [
      { label: "Lead Time médio", val: "4.2 dias" }, { label: "Custo logístico", val: "7.5% receita" },
      { label: "Giro de estoque", val: "8.4x/ano" }, { label: "Acuracidade", val: "98.1%" },
    ],
  },
];

export function Relatorios() {
  const [selecionado, setSelecionado] = useState<typeof relatorios[0] | null>(null);
  const [periodo, setPeriodo] = useState("Mensal");
  const [gerado, setGerado] = useState(false);
  const [gerando, setGerando] = useState(false);

  const gerar = () => {
    setGerando(true);
    setTimeout(() => { setGerando(false); setGerado(true); }, 1500);
  };

  const reset = () => { setGerado(false); setSelecionado(null); };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Relatórios Operacionais</h1>
          <p className="text-slate-500 text-sm mt-0.5">Geração de relatórios por módulo e período</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lista de relatórios */}
        <div className="flex flex-col gap-3">
          <p className="text-slate-500 text-xs uppercase" style={{ letterSpacing: "0.1em" }}>Tipos de Relatório</p>
          {relatorios.map(r => {
            const Icon = r.icone;
            return (
              <button key={r.id} onClick={() => { setSelecionado(r); setGerado(false); setPeriodo("Mensal"); }}
                className="p-4 rounded-xl text-left cursor-pointer transition-all w-full"
                style={{ background: selecionado?.id === r.id ? `${r.cor}12` : "rgba(13,22,40,0.8)", border: `1px solid ${selecionado?.id === r.id ? r.cor + "30" : "rgba(59,130,246,0.08)"}` }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: r.cor + "18" }}>
                    <Icon size={16} style={{ color: r.cor }} />
                  </div>
                  <div>
                    <p className="text-white text-sm" style={{ fontWeight: 600 }}>{r.titulo}</p>
                    <p className="text-slate-600 text-xs">{r.modulo}</p>
                  </div>
                </div>
                <p className="text-slate-500 text-xs leading-snug">{r.desc.substring(0, 80)}...</p>
              </button>
            );
          })}
        </div>

        {/* Config + Preview */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {selecionado ? (
            <>
              <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: selecionado.cor + "18" }}>
                    <selecionado.icone size={20} style={{ color: selecionado.cor }} />
                  </div>
                  <div>
                    <h2 className="text-white" style={{ fontWeight: 700 }}>{selecionado.titulo}</h2>
                    <p className="text-slate-400 text-xs mt-0.5">{selecionado.desc}</p>
                  </div>
                </div>

                {/* Período */}
                <div className="mb-4">
                  <p className="text-slate-500 text-xs mb-2">Período</p>
                  <div className="flex gap-2">
                    {selecionado.periodos.map(p => (
                      <button key={p} onClick={() => setPeriodo(p)}
                        className="px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all"
                        style={{ background: periodo === p ? "#2563eb" : "rgba(255,255,255,0.05)", color: periodo === p ? "white" : "#6b82a0", border: `1px solid ${periodo === p ? "#3b82f6" : "rgba(59,130,246,0.08)"}` }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={gerar} disabled={gerando}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white cursor-pointer transition-all"
                  style={{ background: gerando ? "#1e3a5f" : "#2563eb" }}>
                  {gerando ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-blue-300 border-t-transparent animate-spin" />Gerando...</>
                  ) : (
                    <><BarChart3 size={16} />Gerar Relatório</>
                  )}
                </button>
              </div>

              {/* Preview do relatório */}
              {gerado && (
                <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-emerald-400 text-xs mb-1">✓ Relatório gerado com sucesso</p>
                      <h3 className="text-white" style={{ fontWeight: 700 }}>{selecionado.titulo} — {periodo}</h3>
                      <p className="text-slate-500 text-xs">Gerado em: {new Date().toLocaleString("pt-BR")} · Referência: Jun/2024</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-blue-400 cursor-pointer hover:bg-blue-950 transition-colors"
                      style={{ border: "1px solid rgba(59,130,246,0.3)" }}>
                      <Download size={14} />
                      <span className="text-sm">Exportar</span>
                    </button>
                  </div>

                  {/* Resumo */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                    {selecionado.dados.map(d => (
                      <div key={d.label} className="p-3 rounded-xl text-center" style={{ background: `${selecionado.cor}08`, border: `1px solid ${selecionado.cor}15` }}>
                        <div className="text-white mb-0.5" style={{ fontSize: "1.125rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{d.val}</div>
                        <div className="text-slate-500 text-xs">{d.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tabela simulada */}
                  <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(59,130,246,0.08)" }}>
                    <div className="px-4 py-2 text-xs text-slate-600 uppercase" style={{ letterSpacing: "0.08em", borderBottom: "1px solid rgba(59,130,246,0.06)", background: "rgba(0,0,0,0.2)" }}>
                      Detalhamento do Período
                    </div>
                    {["Semana 1", "Semana 2", "Semana 3", "Semana 4"].map((sem, i) => (
                      <div key={sem} className="flex items-center justify-between px-4 py-2.5 text-sm"
                        style={{ borderTop: i > 0 ? "1px solid rgba(59,130,246,0.04)" : "none" }}>
                        <span className="text-slate-400">{sem} — Jun/2024</span>
                        <div className="flex gap-6 text-xs">
                          <span className="text-slate-500">{Math.floor(Math.random() * 20 + 30)} operações</span>
                          <span className="text-emerald-400">{(Math.random() * 5 + 90).toFixed(1)}% eficiência</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-64 rounded-xl flex flex-col items-center justify-center gap-3"
              style={{ background: "rgba(13,22,40,0.8)", border: "1px dashed rgba(59,130,246,0.15)" }}>
              <FileText size={32} color="#1e3a5f" />
              <p className="text-slate-600 text-sm">Selecione um tipo de relatório para configurar e gerar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
