import { useState } from "react";
import { Users, Star, Clock, Package, TrendingUp, Search } from "lucide-react";

const fornecedores = [
  { id: "F001", nome: "Altamira Componentes Ltda", cnpj: "12.345.678/0001-90", cidade: "São Paulo/SP", categoria: "Eletrônica", prazo: 3, avaliacao: 4.8, pedidos: 42, pontualidade: 96, produtos: ["Capacitor 470µF", "Resistor 10kΩ", "LED 5mm"], status: "Ativo" },
  { id: "F002", nome: "Tech Components Brasil", cnpj: "23.456.789/0001-12", cidade: "Campinas/SP", categoria: "Eletrônica", prazo: 2, avaliacao: 4.6, pedidos: 38, pontualidade: 94, produtos: ["MCU ATmega328P", "Transistor BC547", "Diodo 1N4007"], status: "Ativo" },
  { id: "F003", nome: "Eletrônica Sul Distribuidora", cnpj: "34.567.890/0001-34", cidade: "Porto Alegre/RS", categoria: "Eletrônica", prazo: 5, avaliacao: 4.2, pedidos: 19, pontualidade: 88, produtos: ["Transformador 12V", "Fusível 5A", "Relé 24V"], status: "Ativo" },
  { id: "F004", nome: "MRO Industrial Supplies", cnpj: "45.678.901/0001-56", cidade: "Curitiba/PR", categoria: "MRO", prazo: 4, avaliacao: 4.5, pedidos: 27, pontualidade: 91, produtos: ["Parafuso M3", "Arruela", "Cabo USB-C"], status: "Ativo" },
  { id: "F005", nome: "PackBrasil Embalagens", cnpj: "56.789.012/0001-78", cidade: "São Paulo/SP", categoria: "Embalagem", prazo: 2, avaliacao: 4.7, pedidos: 15, pontualidade: 97, produtos: ["Caixa Gabinete PVC", "Espuma protetora", "Lacre plástico"], status: "Ativo" },
  { id: "F006", nome: "Mecaplas Indústria", cnpj: "67.890.123/0001-90", cidade: "Joinville/SC", categoria: "Mecânica", prazo: 6, avaliacao: 3.8, pedidos: 8, pontualidade: 79, produtos: ["PCB CLP-200 Nua", "Placa de alumínio"], status: "Irregular" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? "#f59e0b" : "none"} color={i <= Math.round(rating) ? "#f59e0b" : "#374151"} />
      ))}
    </div>
  );
}

export function Fornecedores() {
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<typeof fornecedores[0] | null>(null);
  const [catFiltro, setCatFiltro] = useState("Todos");

  const cats = ["Todos", "Eletrônica", "Mecânica", "MRO", "Embalagem"];

  const filtrados = fornecedores.filter(f => {
    const matchBusca = f.nome.toLowerCase().includes(busca.toLowerCase()) || f.id.toLowerCase().includes(busca.toLowerCase());
    const matchCat = catFiltro === "Todos" || f.categoria === catFiltro;
    return matchBusca && matchCat;
  });

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gestão de Fornecedores</h1>
          <p className="text-slate-500 text-sm mt-0.5">Cadastro, consulta e avaliação de fornecedores</p>
        </div>
        <div className="flex gap-3">
          {[["Total Ativos", fornecedores.filter(f => f.status === "Ativo").length, "#10b981"], ["Irregular", fornecedores.filter(f => f.status === "Irregular").length, "#f97316"]].map(([l, v, c]) => (
            <div key={l as string} className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: `1px solid ${c}20` }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: c as string, fontFamily: "var(--font-mono)" }}>{v}</div>
              <div className="text-slate-500 text-xs">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lista */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.15)" }}>
              <Search size={13} color="#6b82a0" />
              <input value={busca} onChange={e => setBusca(e.target.value)}
                placeholder="Buscar fornecedor..."
                className="bg-transparent border-none outline-none text-slate-300 text-sm flex-1" />
            </div>
            <div className="flex flex-wrap gap-1">
              {cats.map(c => (
                <button key={c} onClick={() => setCatFiltro(c)}
                  className="px-3 py-1 rounded-full text-xs cursor-pointer transition-all"
                  style={{ background: catFiltro === c ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)", color: catFiltro === c ? "#93c5fd" : "#6b82a0", border: `1px solid ${catFiltro === c ? "rgba(59,130,246,0.3)" : "transparent"}` }}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {filtrados.map(f => (
              <button key={f.id} onClick={() => setSelecionado(f)}
                className="p-4 rounded-xl text-left cursor-pointer transition-all w-full"
                style={{ background: selecionado?.id === f.id ? "rgba(37,99,235,0.15)" : "rgba(13,22,40,0.8)", border: `1px solid ${selecionado?.id === f.id ? "#3b82f6" : "rgba(59,130,246,0.08)"}` }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-blue-400 text-xs" style={{ fontFamily: "var(--font-mono)" }}>{f.id}</span>
                  <span className="px-1.5 py-0.5 rounded-full text-xs" style={{ background: f.status === "Ativo" ? "rgba(16,185,129,0.12)" : "rgba(249,115,22,0.12)", color: f.status === "Ativo" ? "#10b981" : "#f97316" }}>{f.status}</span>
                </div>
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>{f.nome}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Stars rating={f.avaliacao} />
                  <span className="text-slate-500 text-xs">{f.avaliacao}</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">{f.cidade} · {f.categoria}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes */}
        <div className="lg:col-span-2">
          {selecionado ? (
            <div className="flex flex-col gap-4">
              <div className="p-6 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-blue-400 text-xs mb-1" style={{ fontFamily: "var(--font-mono)" }}>{selecionado.id}</p>
                    <h2 className="text-white" style={{ fontWeight: 700, fontSize: "1.125rem" }}>{selecionado.nome}</h2>
                    <p className="text-slate-400 text-sm mt-1">{selecionado.cnpj}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm" style={{ background: selecionado.status === "Ativo" ? "rgba(16,185,129,0.12)" : "rgba(249,115,22,0.12)", color: selecionado.status === "Ativo" ? "#10b981" : "#f97316" }}>{selecionado.status}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { icon: Clock, label: "Prazo Médio", val: `${selecionado.prazo} dias`, color: "#3b82f6" },
                    { icon: TrendingUp, label: "Pontualidade", val: `${selecionado.pontualidade}%`, color: selecionado.pontualidade >= 90 ? "#10b981" : "#f97316" },
                    { icon: Package, label: "Pedidos Realizados", val: selecionado.pedidos, color: "#8b5cf6" },
                    { icon: Star, label: "Avaliação", val: `${selecionado.avaliacao}/5.0`, color: "#f59e0b" },
                  ].map(stat => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="p-4 rounded-xl" style={{ background: `${stat.color}0d`, border: `1px solid ${stat.color}20` }}>
                        <Icon size={16} style={{ color: stat.color }} className="mb-2" />
                        <div className="text-white" style={{ fontSize: "1.125rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{stat.val}</div>
                        <div className="text-slate-500 text-xs mt-0.5">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-500 text-xs mb-2 uppercase" style={{ letterSpacing: "0.1em" }}>Informações</p>
                    <div className="flex flex-col gap-2">
                      {[["Localização", selecionado.cidade], ["Categoria", selecionado.categoria], ["CNPJ", selecionado.cnpj]].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-slate-600 text-xs">{k}</p>
                          <p className="text-slate-300 text-sm">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-2 uppercase" style={{ letterSpacing: "0.1em" }}>Materiais Fornecidos</p>
                    <div className="flex flex-col gap-1.5">
                      {selecionado.produtos.map(p => (
                        <div key={p} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          <span className="text-slate-400 text-sm">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Avaliação visual */}
                <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>
                  <p className="text-slate-500 text-xs mb-3 uppercase" style={{ letterSpacing: "0.1em" }}>Avaliação por Critério</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { crit: "Qualidade", val: 90 },
                      { crit: "Pontualidade", val: selecionado.pontualidade },
                      { crit: "Atendimento", val: 88 },
                      { crit: "Preço", val: 82 },
                    ].map(c => (
                      <div key={c.crit}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{c.crit}</span>
                          <span style={{ color: c.val >= 90 ? "#10b981" : "#f97316", fontFamily: "var(--font-mono)" }}>{c.val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                          <div className="h-full rounded-full" style={{ width: `${c.val}%`, background: c.val >= 90 ? "#10b981" : "#f97316" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-xl flex flex-col items-center justify-center gap-3"
              style={{ background: "rgba(13,22,40,0.8)", border: "1px dashed rgba(59,130,246,0.15)" }}>
              <Users size={32} color="#1e3a5f" />
              <p className="text-slate-600 text-sm">Selecione um fornecedor para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
