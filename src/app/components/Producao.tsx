import { useState } from "react";
import { Factory, Play, CheckCircle, Clock, User, Wrench, BarChart3, AlertTriangle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ordens = [
  { id: "OP-2845", produto: "Controlador CLP-200", qtd: 380, linha: "Linha 1", op: "Carlos Melo", maquina: "CNC-01", inicio: "06:00", fim: "14:00", progresso: 100, status: "Concluída" },
  { id: "OP-2846", produto: "Sensor Industrial SEN-400", qtd: 120, linha: "Linha 2", op: "Ana Paula", maquina: "SMT-02", inicio: "07:00", fim: "15:00", progresso: 75, status: "Em Andamento" },
  { id: "OP-2847", produto: "Inversor de Frequência INV-150", qtd: 60, linha: "Linha 3", op: "Marcos Lima", maquina: "TST-01", inicio: "08:00", fim: "16:00", progresso: 42, status: "Em Andamento" },
  { id: "OP-2848", produto: "Módulo de Comunicação COM-100", qtd: 200, linha: "Linha 4", op: "Juliana Costa", maquina: "CNC-02", inicio: "10:00", fim: "18:00", progresso: 18, status: "Em Andamento" },
  { id: "OP-2849", produto: "Controlador CLP-500", qtd: 50, linha: "Linha 1", op: "—", maquina: "CNC-01", inicio: "14:00", fim: "22:00", progresso: 0, status: "Aguardando" },
];

const eficienciaData = [
  { hora: "06h", efic: 82 }, { hora: "07h", efic: 88 }, { hora: "08h", efic: 91 },
  { hora: "09h", efic: 87 }, { hora: "10h", efic: 93 }, { hora: "11h", efic: 89 },
  { hora: "12h", efic: 74 }, { hora: "13h", efic: 85 }, { hora: "14h", efic: 90 },
];

const etapasProducao = [
  "Ordem Selecionada",
  "Materiais Reservados",
  "Enviado à Produção",
  "Operador Designado",
  "Máquina Selecionada",
  "Produção Iniciada",
  "Inspeção de Qualidade",
  "Produção Concluída",
  "Enviado ao Estoque",
];

type WizardStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

const operadores = ["Carlos Melo", "Ana Paula", "Marcos Lima", "Juliana Costa", "Roberto Alves"];
const maquinas = ["CNC-01", "CNC-02", "SMT-01", "SMT-02", "TST-01", "TST-02"];

const statusColor: Record<string, string> = {
  "Concluída": "#10b981",
  "Em Andamento": "#3b82f6",
  "Aguardando": "#f97316",
};

export function Producao() {
  const [wizardStep, setWizardStep] = useState<WizardStep>(0);
  const [ordemSel, setOrdemSel] = useState<typeof ordens[0] | null>(null);
  const [operador, setOperador] = useState("");
  const [maquina, setMaquina] = useState("");
  const [inspecaoPassed, setInspecaoPassed] = useState<boolean | null>(null);

  const resetWizard = () => {
    setWizardStep(0); setOrdemSel(null); setOperador(""); setMaquina(""); setInspecaoPassed(null);
  };

  const aguardando = ordens.filter(o => o.status === "Aguardando");

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gestão da Produção</h1>
          <p className="text-slate-500 text-sm mt-0.5">Ordens de fabricação e controle de linhas</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "OPs Ativas", val: ordens.filter(o => o.status === "Em Andamento").length, color: "#3b82f6" },
            { label: "Concluídas hoje", val: ordens.filter(o => o.status === "Concluída").length, color: "#10b981" },
            { label: "Aguardando", val: aguardando.length, color: "#f97316" },
          ].map(s => (
            <div key={s.label} className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: `1px solid ${s.color}20` }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: s.color, fontFamily: "var(--font-mono)" }}>{s.val}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ordens ativas */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Ordens de Produção — Turno Atual</h3>
            <div className="flex flex-col gap-3">
              {ordens.map(op => (
                <div key={op.id} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${statusColor[op.status]}20` }}>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-400 text-sm" style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{op.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: statusColor[op.status] + "18", color: statusColor[op.status] }}>
                        {op.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><User size={11} /> {op.op}</span>
                      <span className="flex items-center gap-1"><Wrench size={11} /> {op.maquina}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {op.inicio}–{op.fim}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-2" style={{ fontWeight: 500 }}>{op.produto}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${op.progresso}%`, background: statusColor[op.status] }} />
                    </div>
                    <span className="text-xs shrink-0" style={{ color: statusColor[op.status], fontFamily: "var(--font-mono)" }}>{op.progresso}%</span>
                    <span className="text-slate-600 text-xs shrink-0">{Math.round(op.qtd * op.progresso / 100)}/{op.qtd} un</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eficiência */}
          <div className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Eficiência Produtiva — Hoje</h3>
              <span className="text-emerald-400 text-sm" style={{ fontWeight: 600, fontFamily: "var(--font-mono)" }}>Média: 87%</span>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <AreaChart data={eficienciaData}>
                <defs>
                  <linearGradient id="gEfic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(59,130,246,0.07)" />
                <XAxis dataKey="hora" tick={{ fill: "#6b82a0", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b82a0", fontSize: 10 }} axisLine={false} tickLine={false} domain={[60, 100]} width={30} />
                <Tooltip contentStyle={{ background: "#0d1628", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "8px", color: "#e8edf5", fontSize: "12px" }} />
                <Area dataKey="efic" stroke="#10b981" strokeWidth={2} fill="url(#gEfic)" dot={{ fill: "#10b981", r: 3 }} name="Eficiência %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Wizard simulação */}
        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-xl flex flex-col gap-4"
            style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <div className="flex items-center justify-between">
              <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Iniciar Nova OP</h3>
              <span className="text-slate-500 text-xs">{wizardStep + 1}/9</span>
            </div>

            {/* Mini stepper */}
            <div className="flex gap-1">
              {etapasProducao.map((_, i) => (
                <div key={i} className="h-1 flex-1 rounded-full" style={{ background: wizardStep > i ? "#10b981" : wizardStep === i ? "#2563eb" : "#1e3a5f" }} />
              ))}
            </div>
            <p className="text-blue-400 text-xs">{etapasProducao[wizardStep]}</p>

            {wizardStep === 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-400 text-xs">Selecione a ordem aguardando execução:</p>
                {aguardando.map(op => (
                  <button key={op.id} onClick={() => setOrdemSel(op)}
                    className="p-3 rounded-xl text-left cursor-pointer transition-all"
                    style={{ background: ordemSel?.id === op.id ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)", border: `1px solid ${ordemSel?.id === op.id ? "#3b82f6" : "rgba(59,130,246,0.08)"}` }}>
                    <p className="text-blue-400 text-xs" style={{ fontFamily: "var(--font-mono)" }}>{op.id}</p>
                    <p className="text-slate-300 text-xs mt-0.5">{op.produto}</p>
                    <p className="text-slate-600 text-xs">{op.qtd} un · {op.linha}</p>
                  </button>
                ))}
                <button onClick={() => ordemSel && setWizardStep(1)} disabled={!ordemSel}
                  className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: ordemSel ? "#2563eb" : "#1e3a5f", opacity: ordemSel ? 1 : 0.5 }}>
                  Selecionar →
                </button>
              </div>
            )}

            {wizardStep === 1 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-400 text-xs">Verificando disponibilidade de materiais...</p>
                <div className="flex flex-col gap-1.5">
                  {["Capacitor 470µF", "MCU ATmega328P", "PCB CLP-500", "Gabinete PVC"].map(mat => (
                    <div key={mat} className="flex items-center gap-2 text-xs">
                      <CheckCircle size={12} color="#10b981" />
                      <span className="text-slate-400">{mat}</span>
                      <span className="ml-auto text-emerald-400">✓ Disponível</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setWizardStep(2)} className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: "#10b981" }}>
                  Reservar Materiais →
                </button>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-400 text-xs">Materiais reservados. Enviar para produção?</p>
                <div className="p-3 rounded-lg text-xs" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p className="text-emerald-400">✓ 4 itens reservados no estoque</p>
                  <p className="text-slate-400 mt-0.5">Endereços: A-01-01, A-02-01, B-01-01, C-01-01</p>
                </div>
                <button onClick={() => setWizardStep(3)} className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: "#2563eb" }}>
                  Enviar para Produção →
                </button>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-400 text-xs">Selecione o operador responsável:</p>
                <div className="flex flex-col gap-1">
                  {operadores.map(op => (
                    <button key={op} onClick={() => setOperador(op)}
                      className="px-3 py-2 rounded-lg text-sm text-left cursor-pointer transition-all"
                      style={{ background: operador === op ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)", color: operador === op ? "#93c5fd" : "#6b82a0", border: `1px solid ${operador === op ? "rgba(59,130,246,0.3)" : "transparent"}` }}>
                      {op}
                    </button>
                  ))}
                </div>
                <button onClick={() => operador && setWizardStep(4)} disabled={!operador}
                  className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: operador ? "#2563eb" : "#1e3a5f", opacity: operador ? 1 : 0.5 }}>
                  Confirmar →
                </button>
              </div>
            )}

            {wizardStep === 4 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-400 text-xs">Selecione a máquina disponível:</p>
                <div className="grid grid-cols-2 gap-2">
                  {maquinas.map(m => (
                    <button key={m} onClick={() => setMaquina(m)}
                      className="px-3 py-2 rounded-lg text-sm cursor-pointer transition-all"
                      style={{ background: maquina === m ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.03)", color: maquina === m ? "#93c5fd" : "#6b82a0", fontFamily: "var(--font-mono)", fontSize: "12px", border: `1px solid ${maquina === m ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.06)"}` }}>
                      {m}
                    </button>
                  ))}
                </div>
                <button onClick={() => maquina && setWizardStep(5)} disabled={!maquina}
                  className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: maquina ? "#2563eb" : "#1e3a5f", opacity: maquina ? 1 : 0.5 }}>
                  Confirmar →
                </button>
              </div>
            )}

            {wizardStep === 5 && (
              <div className="flex flex-col gap-3 text-center py-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto"
                  style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)" }}>
                  <Play size={24} color="#3b82f6" />
                </div>
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>Produção Iniciada!</p>
                <p className="text-slate-400 text-xs">{ordemSel?.id} · {operador} · {maquina}</p>
                <button onClick={() => setWizardStep(6)} className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: "#2563eb" }}>
                  Avançar para Inspeção →
                </button>
              </div>
            )}

            {wizardStep === 6 && (
              <div className="flex flex-col gap-3">
                <p className="text-slate-400 text-xs">Inspeção de qualidade:</p>
                <div className="flex gap-2">
                  <button onClick={() => { setInspecaoPassed(true); setWizardStep(7); }}
                    className="flex-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex items-center justify-center gap-2" style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>
                    <CheckCircle size={14} /> Aprovado
                  </button>
                  <button onClick={() => { setInspecaoPassed(false); setWizardStep(7); }}
                    className="flex-1 px-3 py-2 rounded-lg text-sm cursor-pointer flex items-center justify-center gap-2" style={{ background: "rgba(239,68,68,0.12)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <AlertTriangle size={14} /> Reprovado
                  </button>
                </div>
              </div>
            )}

            {wizardStep === 7 && (
              <div className="flex flex-col gap-3 text-center py-2">
                <CheckCircle size={32} color="#10b981" className="mx-auto" />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>
                  {inspecaoPassed ? "Produção Concluída!" : "Retrabalho Registrado"}
                </p>
                <p className="text-slate-400 text-xs">{ordemSel?.qtd} unidades · {inspecaoPassed ? "Aprovadas" : "Em retrabalho"}</p>
                <button onClick={() => setWizardStep(8)} className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: "#10b981" }}>
                  Enviar ao Estoque →
                </button>
              </div>
            )}

            {wizardStep === 8 && (
              <div className="flex flex-col gap-3 text-center py-2">
                <Factory size={32} color="#3b82f6" className="mx-auto" />
                <p className="text-white text-sm" style={{ fontWeight: 600 }}>Processo Finalizado!</p>
                <p className="text-slate-400 text-xs">{ordemSel?.qtd} unidades enviadas ao estoque de produto acabado.</p>
                <button onClick={resetWizard} className="px-4 py-2 rounded-lg text-white text-sm cursor-pointer" style={{ background: "#2563eb" }}>
                  Nova Ordem
                </button>
              </div>
            )}
          </div>

          {/* Aplicação Industrial */}
          <div className="p-5 rounded-xl" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
            <p className="text-blue-400 text-xs uppercase tracking-widest mb-2" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial</p>
            <h4 className="text-white mb-2" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Ordem de Produção (OP)</h4>
            <p className="text-slate-400 text-xs leading-relaxed">Documento que autoriza e controla a fabricação de produtos. Define: produto, quantidade, prazo, materiais, operador e máquina.</p>
            <div className="mt-3 flex flex-col gap-1">
              {["MRP — Planejamento de Materiais", "PPCP — Planejamento e Controle", "OEE — Eficiência Geral do Equipamento"].map(c => (
                <div key={c} className="flex items-center gap-2">
                  <BarChart3 size={11} color="#6b82a0" />
                  <span className="text-slate-500 text-xs">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
