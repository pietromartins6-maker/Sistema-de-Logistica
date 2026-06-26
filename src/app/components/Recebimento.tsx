import { useState } from "react";
import { Truck, CheckCircle, AlertTriangle, FileText, Package, Clock, ChevronRight, X, Check } from "lucide-react";

const fornecedores = [
  { id: "F001", nome: "Altamira Componentes Ltda", cnpj: "12.345.678/0001-90", cidade: "São Paulo", prazo: "3 dias" },
  { id: "F002", nome: "Tech Components Brasil", cnpj: "23.456.789/0001-12", cidade: "Campinas", prazo: "2 dias" },
  { id: "F003", nome: "Eletrônica Sul Distribuidora", cnpj: "34.567.890/0001-34", cidade: "Porto Alegre", prazo: "5 dias" },
  { id: "F004", nome: "MRO Industrial Supplies", cnpj: "45.678.901/0001-56", cidade: "Curitiba", prazo: "4 dias" },
];

const enderecos = ["A-01-01", "A-01-02", "A-02-01", "B-01-03", "B-02-01", "C-01-01", "C-03-02"];

const historico = [
  { data: "17/06", nf: "001849", forn: "Altamira", itens: 48, status: "OK", hora: "08:42" },
  { data: "17/06", nf: "001848", forn: "Tech Components", itens: 120, status: "Divergência", hora: "07:15" },
  { data: "16/06", nf: "001847", forn: "Eletrônica Sul", itens: 35, status: "OK", hora: "14:30" },
  { data: "16/06", nf: "001846", forn: "MRO Industrial", itens: 60, status: "OK", hora: "11:00" },
  { data: "15/06", nf: "001845", forn: "Altamira", itens: 90, status: "OK", hora: "09:20" },
];

const checklistItems = [
  "Identificação do veículo e motorista",
  "Conferência do CTRC (Conhecimento de Transporte)",
  "Conferência da Nota Fiscal eletrônica",
  "Verificação da quantidade de volumes",
  "Inspeção das embalagens (avarias/umidade)",
  "Conferência dos lotes e validades",
  "Conferência das especificações técnicas",
  "Registro fotográfico dos itens",
];

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const stepLabels = [
  "Chegada do Veículo",
  "Selecionar Fornecedor",
  "Conferir NF-e",
  "Conferir Quantidades",
  "Conferir Embalagens",
  "Registrar Divergências",
  "Endereçamento",
  "Atualizar Estoque",
  "Comprovante",
];

export function Recebimento() {
  const [step, setStep] = useState<Step>(0);
  const [forn, setForn] = useState<typeof fornecedores[0] | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(Array(checklistItems.length).fill(false));
  const [qtdOk, setQtdOk] = useState<boolean | null>(null);
  const [divergencia, setDivergencia] = useState("");
  const [endereco, setEndereco] = useState("");
  const [concluido, setConcluido] = useState(false);
  const [showComprovante, setShowComprovante] = useState(false);

  const toggleCheck = (i: number) => setChecklist(c => c.map((v, idx) => idx === i ? !v : v));
  const allChecked = checklist.every(Boolean);

  const reset = () => {
    setStep(0); setForn(null);
    setChecklist(Array(checklistItems.length).fill(false));
    setQtdOk(null); setDivergencia(""); setEndereco(""); setConcluido(false); setShowComprovante(false);
  };

  const nfNum = forn ? `00185${fornecedores.indexOf(forn) + 0}` : "—";

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Recebimento de Materiais</h1>
          <p className="text-slate-500 text-sm mt-0.5">Conferência, registro e endereçamento de insumos</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <div className="text-white text-lg" style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>3</div>
            <div className="text-slate-500 text-xs">Receb. hoje</div>
          </div>
          <div className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <div className="text-white text-lg" style={{ fontWeight: 700, fontFamily: "var(--font-mono)" }}>248</div>
            <div className="text-slate-500 text-xs">Itens recebidos</div>
          </div>
          <div className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(249,115,22,0.15)" }}>
            <div style={{ color: "#f97316", fontSize: "1.125rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>1</div>
            <div className="text-slate-500 text-xs">Divergências</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Wizard */}
        <div className="lg:col-span-2 p-5 rounded-xl flex flex-col gap-5"
          style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
          {/* Stepper */}
          <div className="flex gap-1 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center gap-1 shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                    style={{
                      background: step > i ? "#10b981" : step === i ? "#2563eb" : "rgba(255,255,255,0.05)",
                      color: step >= i ? "white" : "#4b5563",
                      fontWeight: 600,
                      fontSize: "11px"
                    }}>
                    {step > i ? <Check size={12} /> : i + 1}
                  </div>
                  <span style={{ fontSize: "9px", color: step === i ? "#93c5fd" : "#4b5563", whiteSpace: "nowrap" }}>{label}</span>
                </div>
                {i < stepLabels.length - 1 && <div className="w-4 h-px mt-0 mb-4 shrink-0" style={{ background: step > i ? "#10b981" : "#1e3a5f" }} />}
              </div>
            ))}
          </div>

          {/* Step content */}
          <div className="flex-1">
            {step === 0 && (
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl flex items-center gap-4"
                  style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <Truck size={32} color="#10b981" />
                  <div>
                    <p className="text-white" style={{ fontWeight: 600 }}>Veículo na Doca 2</p>
                    <p className="text-slate-400 text-sm">Placa: PKL-3849 · Motorista: João Silva · Chegada: 08:35</p>
                  </div>
                  <div className="ml-auto w-2 h-2 rounded-full animate-pulse bg-emerald-400" />
                </div>
                <p className="text-slate-400 text-sm">Um veículo chegou à doca de recebimento. Realize a conferência dos documentos e inicie o processo de recebimento.</p>
                <button onClick={() => setStep(1)}
                  className="self-start flex items-center gap-2 px-5 py-2.5 rounded-xl text-white cursor-pointer transition-all hover:scale-105"
                  style={{ background: "#2563eb" }}>
                  Iniciar Recebimento <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 1 && (
              <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-sm">Selecione o fornecedor responsável pela entrega:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fornecedores.map(f => (
                    <button key={f.id} onClick={() => setForn(f)}
                      className="p-4 rounded-xl text-left cursor-pointer transition-all"
                      style={{
                        background: forn?.id === f.id ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${forn?.id === f.id ? "#3b82f6" : "rgba(59,130,246,0.1)"}`,
                      }}>
                      <p className="text-white text-sm" style={{ fontWeight: 600 }}>{f.nome}</p>
                      <p className="text-slate-500 text-xs mt-1">{f.cnpj} · {f.cidade}</p>
                      <p className="text-blue-400 text-xs mt-0.5">Prazo médio: {f.prazo}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(0)} className="px-4 py-2 rounded-lg text-slate-400 cursor-pointer hover:bg-slate-800" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Voltar</button>
                  <button onClick={() => forn && setStep(2)} disabled={!forn}
                    className="px-5 py-2 rounded-lg text-white cursor-pointer transition-all" style={{ background: forn ? "#2563eb" : "#1e3a5f", opacity: forn ? 1 : 0.5 }}>
                    Confirmar Fornecedor <ChevronRight size={14} className="inline" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.1)" }}>
                  <p className="text-blue-400 text-xs uppercase mb-3" style={{ letterSpacing: "0.1em" }}>Nota Fiscal Eletrônica</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[["NF-e nº", nfNum], ["Emissão", "17/06/2024"], ["Fornecedor", forn?.nome ?? ""], ["CNPJ", forn?.cnpj ?? ""], ["Valor Total", "R$ 47.820,00"], ["Itens", "48 unidades"]].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-slate-600 text-xs">{k}</p>
                        <p className="text-slate-300 text-sm" style={{ fontWeight: 500 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg text-slate-400 cursor-pointer hover:bg-slate-800" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Voltar</button>
                  <button onClick={() => setStep(3)} className="px-5 py-2 rounded-lg text-white cursor-pointer" style={{ background: "#2563eb" }}>
                    NF Conferida ✓ <ChevronRight size={14} className="inline" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-sm">Confira cada item do checklist de recebimento:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {checklistItems.map((item, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-slate-800"
                      style={{ background: checklist[i] ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${checklist[i] ? "rgba(16,185,129,0.2)" : "rgba(59,130,246,0.08)"}` }}>
                      <input type="checkbox" checked={checklist[i]} onChange={() => toggleCheck(i)} className="accent-emerald-400 w-4 h-4" />
                      <span className="text-slate-300 text-xs leading-snug">{item}</span>
                    </label>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${(checklist.filter(Boolean).length / checklistItems.length) * 100}%`, background: "#10b981" }} />
                  </div>
                  <span className="text-slate-400 text-xs">{checklist.filter(Boolean).length}/{checklistItems.length}</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg text-slate-400 cursor-pointer hover:bg-slate-800" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Voltar</button>
                  <button onClick={() => allChecked && setStep(4)} disabled={!allChecked}
                    className="px-5 py-2 rounded-lg text-white cursor-pointer" style={{ background: allChecked ? "#2563eb" : "#1e3a5f", opacity: allChecked ? 1 : 0.5 }}>
                    Checklist Concluído <ChevronRight size={14} className="inline" />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-sm">Confirme as quantidades recebidas:</p>
                <div className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.1)" }}>
                  <div className="grid grid-cols-3 gap-3 text-xs text-slate-500 mb-3 uppercase" style={{ letterSpacing: "0.08em" }}>
                    <span>Item</span><span>Pedido</span><span>Recebido</span>
                  </div>
                  {[["Capacitor 470µF", "20", "20"], ["Resistor 10kΩ", "15", "15"], ["Microcontrolador ATM328", "8", "7"], ["Transistor NPN", "5", "5"]].map(([n, p, r]) => (
                    <div key={n} className="grid grid-cols-3 gap-3 py-2" style={{ borderTop: "1px solid rgba(59,130,246,0.06)" }}>
                      <span className="text-slate-300 text-sm">{n}</span>
                      <span className="text-slate-400 text-sm">{p}</span>
                      <span className="text-sm" style={{ color: p === r ? "#10b981" : "#ef4444", fontWeight: 600 }}>{r} {p !== r && "⚠"}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setQtdOk(false); setStep(5); }}
                    className="px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2" style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", border: "1px solid rgba(249,115,22,0.3)" }}>
                    <AlertTriangle size={14} /> Registrar Divergência
                  </button>
                  <button onClick={() => { setQtdOk(true); setStep(6); }}
                    className="px-5 py-2 rounded-lg text-white cursor-pointer" style={{ background: "#2563eb" }}>
                    Qtd. OK <ChevronRight size={14} className="inline" />
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-sm">Registre as divergências encontradas:</p>
                <textarea value={divergencia} onChange={e => setDivergencia(e.target.value)}
                  rows={4} placeholder="Descreva as divergências: item, quantidade esperada x recebida, condição das embalagens..."
                  className="w-full rounded-xl p-3 text-slate-300 text-sm resize-none outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.15)", fontFamily: "var(--font-sans)" }} />
                <button onClick={() => setStep(6)} className="self-start px-5 py-2 rounded-lg text-white cursor-pointer" style={{ background: "#f97316" }}>
                  Registrar e Continuar <ChevronRight size={14} className="inline" />
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="flex flex-col gap-4">
                <p className="text-slate-400 text-sm">Selecione o endereço de armazenagem no armazém:</p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {enderecos.map(e => (
                    <button key={e} onClick={() => setEndereco(e)}
                      className="p-3 rounded-xl text-center cursor-pointer transition-all"
                      style={{
                        background: endereco === e ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${endereco === e ? "#3b82f6" : "rgba(59,130,246,0.1)"}`,
                        color: endereco === e ? "#93c5fd" : "#6b82a0",
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px"
                      }}>
                      {e}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(qtdOk === false ? 5 : 4)} className="px-4 py-2 rounded-lg text-slate-400 cursor-pointer hover:bg-slate-800" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Voltar</button>
                  <button onClick={() => endereco && setStep(7)} disabled={!endereco}
                    className="px-5 py-2 rounded-lg text-white cursor-pointer" style={{ background: endereco ? "#2563eb" : "#1e3a5f", opacity: endereco ? 1 : 0.5 }}>
                    Confirmar Endereço <ChevronRight size={14} className="inline" />
                  </button>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="flex flex-col gap-4 items-center text-center py-4">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}>
                  <Package size={32} color="#10b981" />
                </div>
                <div>
                  <p className="text-white" style={{ fontWeight: 700, fontSize: "1.125rem" }}>Estoque Atualizado!</p>
                  <p className="text-slate-400 text-sm mt-1">48 itens adicionados ao endereço <span className="text-blue-400" style={{ fontFamily: "var(--font-mono)" }}>{endereco}</span></p>
                  <p className="text-slate-500 text-xs mt-1">Dashboard e indicadores atualizados automaticamente.</p>
                </div>
                <button onClick={() => setStep(8)} className="px-6 py-2.5 rounded-xl text-white cursor-pointer" style={{ background: "#2563eb" }}>
                  Emitir Comprovante <FileText size={14} className="inline ml-1" />
                </button>
              </div>
            )}

            {step === 8 && (
              <div className="flex flex-col gap-4">
                <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(59,130,246,0.3)" }}>
                  <div className="text-center mb-4">
                    <p className="text-blue-400 text-xs tracking-widest uppercase mb-1">LogiTech Indústria</p>
                    <p className="text-white" style={{ fontWeight: 700 }}>Comprovante de Recebimento</p>
                    <p className="text-slate-500 text-xs">Nº REC-{nfNum} · {new Date().toLocaleString("pt-BR")}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[["Fornecedor", forn?.nome ?? ""], ["NF-e", nfNum], ["Itens recebidos", "48 un."], ["Endereço", endereco], ["Conferente", "Assistente Logística"], ["Status", divergencia ? "Divergência registrada" : "Recebimento OK"]].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-slate-600 text-xs">{k}</p>
                        <p className="text-slate-300 text-sm" style={{ fontWeight: 500 }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 justify-center">
                  <button className="px-5 py-2 rounded-lg cursor-pointer flex items-center gap-2 text-blue-400" style={{ border: "1px solid rgba(59,130,246,0.3)" }}>
                    <FileText size={14} /> Imprimir
                  </button>
                  <button onClick={reset} className="px-5 py-2 rounded-lg text-white cursor-pointer" style={{ background: "#10b981" }}>
                    Novo Recebimento
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar info */}
        <div className="flex flex-col gap-4">
          {/* Histórico */}
          <div className="p-5 rounded-xl"
            style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Histórico Recente</h3>
            <div className="flex flex-col gap-3">
              {historico.map((h, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: h.status === "OK" ? "#10b981" : "#f97316" }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-300 text-xs">NF {h.nf} · {h.forn}</p>
                    <div className="flex gap-2">
                      <span className="text-slate-600 text-xs">{h.hora}</span>
                      <span className="text-xs" style={{ color: h.status === "OK" ? "#10b981" : "#f97316" }}>{h.status}</span>
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs shrink-0">{h.itens}it</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aplicação Industrial */}
          <div className="p-5 rounded-xl"
            style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
            <p className="text-blue-400 text-xs uppercase tracking-widest mb-3" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial</p>
            <h4 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Recebimento Fiscal</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-3">O recebimento é a porta de entrada da cadeia logística. Qualquer divergência não registrada gera perdas e impacta toda a produção.</p>
            <div className="flex flex-col gap-1.5">
              {["NF-e (Nota Fiscal Eletrônica)", "CTRC (Conhecimento de Transporte)", "Romaneio de Entrega", "Laudo de Avaria"].map(doc => (
                <div key={doc} className="flex items-center gap-2">
                  <FileText size={11} color="#6b82a0" />
                  <span className="text-slate-500 text-xs">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
