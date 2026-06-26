import { useState } from "react";
import { Send, Package, Truck, FileText, CheckCircle, ChevronRight, Check, MapPin } from "lucide-react";

const pedidos = [
  { id: "PED-9918", cliente: "AutoParts Brasil Ltda", cidade: "Belo Horizonte/MG", itens: 24, valor: "R$ 18.200,00", prazo: "18/06", status: "Separação" },
  { id: "PED-9919", cliente: "Eletro Industrial S/A", cidade: "Curitiba/PR", itens: 12, valor: "R$ 9.600,00", prazo: "19/06", status: "Aguardando" },
  { id: "PED-9920", cliente: "TechFab Componentes", cidade: "Porto Alegre/RS", itens: 36, valor: "R$ 27.400,00", prazo: "18/06", status: "Aguardando" },
  { id: "PED-9921", cliente: "Indústria Ferreira ME", cidade: "Campinas/SP", itens: 8, valor: "R$ 6.400,00", prazo: "17/06", status: "Aguardando" },
];

const transportadoras = [
  { nome: "LogFlex Express", prazo: "1-2 dias úteis", frete: "R$ 280,00", modal: "Rodoviário" },
  { nome: "TransBrasil Cargo", prazo: "2-3 dias úteis", frete: "R$ 195,00", modal: "Rodoviário" },
  { nome: "SpeedLog Premium", prazo: "24h úteis", frete: "R$ 420,00", modal: "Expresso" },
  { nome: "CargoCerta Ltda", prazo: "3-5 dias úteis", frete: "R$ 145,00", modal: "Rodoviário" },
];

const historico = [
  { data: "17/06 06:45", pedido: "PED-9915", dest: "São Paulo/SP", status: "Entregue" },
  { data: "16/06 18:30", pedido: "PED-9916", dest: "Rio de Janeiro/RJ", status: "Em Trânsito" },
  { data: "16/06 17:00", pedido: "PED-9917", dest: "Salvador/BA", status: "Em Trânsito" },
  { data: "15/06 15:00", pedido: "PED-9914", dest: "Brasília/DF", status: "Entregue" },
];

const stepLabels = ["Selecionar Pedido", "Separação", "Conferência", "Romaneio", "Transportadora", "Carregamento", "Saída do Veículo"];

export function Expedicao() {
  const [step, setStep] = useState(0);
  const [pedido, setPedido] = useState<typeof pedidos[0] | null>(null);
  const [transp, setTransp] = useState<typeof transportadoras[0] | null>(null);
  const [concluido, setConcluido] = useState(false);

  const reset = () => { setStep(0); setPedido(null); setTransp(null); setConcluido(false); };

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Expedição</h1>
          <p className="text-slate-500 text-sm mt-0.5">Separação, conferência e carregamento de pedidos</p>
        </div>
        <div className="flex gap-3">
          {[
            { label: "Pedidos hoje", val: "18", color: "#3b82f6" },
            { label: "Aguardando", val: "4", color: "#f97316" },
            { label: "OTIF", val: "94%", color: "#10b981" },
          ].map(s => (
            <div key={s.label} className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: `1px solid ${s.color}20` }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: s.color, fontFamily: "var(--font-mono)" }}>{s.val}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Wizard expedição */}
        <div className="lg:col-span-2 p-5 rounded-xl flex flex-col gap-5"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          {/* Stepper */}
          <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{ background: step > i ? "#10b981" : step === i ? "#2563eb" : "rgba(255,255,255,0.05)", color: step >= i ? "white" : "#4b5563", fontWeight: 600, fontSize: "11px" }}>
                    {step > i ? <Check size={12} /> : i + 1}
                  </div>
                  <span style={{ fontSize: "9px", color: step === i ? "#93c5fd" : "#4b5563", whiteSpace: "nowrap" }}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && <div className="w-4 h-px mt-0 mb-4 shrink-0" style={{ background: step > i ? "#10b981" : "#1e3a5f" }} />}
              </div>
            ))}
          </div>

          {/* Steps */}
          {step === 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-slate-400 text-sm">Selecione o pedido para expedição:</p>
              <div className="flex flex-col gap-2">
                {pedidos.filter(p => p.status === "Aguardando").map(p => (
                  <button key={p.id} onClick={() => setPedido(p)}
                    className="p-4 rounded-xl text-left cursor-pointer transition-all"
                    style={{ background: pedido?.id === p.id ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${pedido?.id === p.id ? "#3b82f6" : "rgba(59,130,246,0.08)"}` }}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-blue-400 text-sm" style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{p.id}</span>
                      <span className="text-xs" style={{ color: p.prazo === "17/06" ? "#ef4444" : "#f97316" }}>Prazo: {p.prazo}</span>
                    </div>
                    <p className="text-slate-300 text-sm" style={{ fontWeight: 500 }}>{p.cliente}</p>
                    <div className="flex gap-4 mt-1 text-xs text-slate-500">
                      <span><MapPin size={10} className="inline" /> {p.cidade}</span>
                      <span>{p.itens} itens</span>
                      <span>{p.valor}</span>
                    </div>
                  </button>
                ))}
              </div>
              <button onClick={() => pedido && setStep(1)} disabled={!pedido}
                className="self-start px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: pedido ? "#2563eb" : "#1e3a5f", opacity: pedido ? 1 : 0.5 }}>
                Iniciar Separação <ChevronRight size={14} className="inline" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="p-3 rounded-lg text-xs" style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}>
                <p className="text-blue-400 mb-1">Pedido: {pedido?.id} · {pedido?.cliente}</p>
                <p className="text-slate-400">{pedido?.itens} itens a separar · Localização: A-02-01, B-01-01</p>
              </div>
              <div className="flex flex-col gap-2">
                {["CLP-200 (x8) — Endereço A-02-01", "SEN-400 (x12) — Endereço A-03-02", "Cabos USB-C (x4) — Endereço C-02-01"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}>
                    <CheckCircle size={14} color="#10b981" />
                    <span className="text-slate-300 text-sm">{item}</span>
                    <span className="ml-auto text-emerald-400 text-xs">Separado</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="self-start px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: "#2563eb" }}>
                Separação Concluída <ChevronRight size={14} className="inline" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <p className="text-slate-400 text-sm">Conferência dos itens separados:</p>
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(59,130,246,0.1)" }}>
                <div className="grid text-xs text-slate-600 px-4 py-2" style={{ gridTemplateColumns: "1fr 60px 60px 60px", borderBottom: "1px solid rgba(59,130,246,0.06)" }}>
                  <span>Produto</span><span>Pedido</span><span>Separado</span><span>Status</span>
                </div>
                {[["CLP-200", "8", "8", "✓"], ["SEN-400", "12", "12", "✓"], ["Cabo USB-C", "4", "4", "✓"]].map(([n, p, s, st]) => (
                  <div key={n} className="grid items-center px-4 py-2.5 text-sm" style={{ gridTemplateColumns: "1fr 60px 60px 60px", borderTop: "1px solid rgba(59,130,246,0.04)" }}>
                    <span className="text-slate-300">{n}</span>
                    <span className="text-slate-400">{p}</span>
                    <span className="text-slate-400">{s}</span>
                    <span className="text-emerald-400">{st}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="self-start px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: "#2563eb" }}>
                Conferência OK <ChevronRight size={14} className="inline" />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(59,130,246,0.3)" }}>
                <p className="text-blue-400 text-xs mb-3 uppercase" style={{ letterSpacing: "0.1em" }}>Romaneio de Expedição</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[["Pedido", pedido?.id], ["Cliente", pedido?.cliente], ["Destino", pedido?.cidade], ["Itens", `${pedido?.itens} volumes`], ["Valor NF", pedido?.valor], ["Data", "17/06/2024"]].map(([k, v]) => (
                    <div key={k as string}><p className="text-slate-600 text-xs">{k}</p><p className="text-slate-300 text-sm">{v}</p></div>
                  ))}
                </div>
              </div>
              <button onClick={() => setStep(4)} className="self-start px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: "#2563eb" }}>
                Romaneio Emitido <ChevronRight size={14} className="inline" />
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-3">
              <p className="text-slate-400 text-sm">Selecione a transportadora:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {transportadoras.map(t => (
                  <button key={t.nome} onClick={() => setTransp(t)}
                    className="p-4 rounded-xl text-left cursor-pointer transition-all"
                    style={{ background: transp?.nome === t.nome ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${transp?.nome === t.nome ? "#3b82f6" : "rgba(59,130,246,0.08)"}` }}>
                    <p className="text-white text-sm" style={{ fontWeight: 600 }}>{t.nome}</p>
                    <p className="text-slate-500 text-xs mt-1">{t.modal} · {t.prazo}</p>
                    <p className="text-blue-400 text-xs mt-0.5">{t.frete}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => transp && setStep(5)} disabled={!transp}
                className="self-start px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: transp ? "#2563eb" : "#1e3a5f", opacity: transp ? 1 : 0.5 }}>
                Confirmar Transportadora <ChevronRight size={14} className="inline" />
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-4 text-center py-4">
              <Truck size={40} color="#3b82f6" className="mx-auto" />
              <p className="text-white" style={{ fontWeight: 700 }}>Carregamento em Andamento</p>
              <p className="text-slate-400 text-sm">Veículo: PLK-3849 · {transp?.nome}</p>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                <div className="h-full rounded-full" style={{ width: "100%", background: "#3b82f6", transition: "all 0.5s" }} />
              </div>
              <button onClick={() => setStep(6)} className="mx-auto px-5 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: "#2563eb" }}>
                Carregamento Concluído <ChevronRight size={14} className="inline" />
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="flex flex-col gap-4 text-center py-4">
              <CheckCircle size={48} color="#10b981" className="mx-auto" />
              <div>
                <p className="text-white" style={{ fontWeight: 700, fontSize: "1.125rem" }}>Veículo em Rota!</p>
                <p className="text-slate-400 text-sm mt-1">Pedido {pedido?.id} expedido para {pedido?.cidade}</p>
                <p className="text-blue-400 text-xs mt-1">Rastreamento ativo · Código: TRK-{pedido?.id}</p>
              </div>
              <button onClick={reset} className="mx-auto px-6 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: "#10b981" }}>
                Nova Expedição
              </button>
            </div>
          )}
        </div>

        {/* Histórico + Info */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Últimas Expedições</h3>
            <div className="flex flex-col gap-3">
              {historico.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: h.status === "Entregue" ? "#10b981" : "#3b82f6" }} />
                  <div>
                    <p className="text-slate-300 text-xs" style={{ fontWeight: 500 }}>{h.pedido}</p>
                    <p className="text-slate-600 text-xs">{h.dest}</p>
                    <div className="flex gap-2 items-center mt-0.5">
                      <span className="text-xs" style={{ color: h.status === "Entregue" ? "#10b981" : "#3b82f6" }}>{h.status}</span>
                      <span className="text-slate-700 text-xs">{h.data}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
            <p className="text-blue-400 text-xs uppercase tracking-widest mb-2" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial</p>
            <h4 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "0.875rem" }}>OTIF</h4>
            <p className="text-slate-400 text-xs leading-relaxed">On Time In Full — Percentual de pedidos entregues no prazo correto e com quantidade correta. Meta: ≥ 95%.</p>
            <div className="mt-3 p-2 rounded-lg text-xs" style={{ background: "rgba(0,0,0,0.3)", color: "#93c5fd", fontFamily: "var(--font-mono)" }}>
              OTIF = (Entregues no prazo e completos / Total) × 100
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
