import { Globe, Truck, Package, CheckCircle, Clock, MapPin } from "lucide-react";

const pedidos = [
  {
    id: "PED-9915", cliente: "AutoParts Brasil", destino: "São Paulo/SP",
    etapas: [
      { label: "Pedido Recebido", data: "15/06 09:00", ok: true },
      { label: "Em Preparação", data: "15/06 11:00", ok: true },
      { label: "Expedido", data: "15/06 17:00", ok: true },
      { label: "Centro de Distribuição", data: "16/06 08:30", ok: true },
      { label: "Saiu para Entrega", data: "17/06 07:00", ok: true },
      { label: "Entregue", data: "17/06 10:25", ok: true },
    ],
    status: "Entregue",
  },
  {
    id: "PED-9916", cliente: "Eletro Industrial", destino: "Rio de Janeiro/RJ",
    etapas: [
      { label: "Pedido Recebido", data: "15/06 14:00", ok: true },
      { label: "Em Preparação", data: "15/06 16:00", ok: true },
      { label: "Expedido", data: "16/06 18:30", ok: true },
      { label: "Centro de Distribuição", data: "17/06 06:00", ok: true },
      { label: "Saiu para Entrega", data: "17/06 09:00", ok: true },
      { label: "Entregue", data: "—", ok: false },
    ],
    status: "Saiu para Entrega",
  },
  {
    id: "PED-9917", cliente: "TechFab Componentes", destino: "Salvador/BA",
    etapas: [
      { label: "Pedido Recebido", data: "16/06 08:00", ok: true },
      { label: "Em Preparação", data: "16/06 10:00", ok: true },
      { label: "Expedido", data: "16/06 17:00", ok: true },
      { label: "Centro de Distribuição", data: "—", ok: false },
      { label: "Saiu para Entrega", data: "—", ok: false },
      { label: "Entregue", data: "—", ok: false },
    ],
    status: "Em Trânsito",
  },
  {
    id: "PED-9918", cliente: "Indústria Ferreira ME", destino: "Campinas/SP",
    etapas: [
      { label: "Pedido Recebido", data: "17/06 08:00", ok: true },
      { label: "Em Preparação", data: "17/06 08:30", ok: true },
      { label: "Expedido", data: "—", ok: false },
      { label: "Centro de Distribuição", data: "—", ok: false },
      { label: "Saiu para Entrega", data: "—", ok: false },
      { label: "Entregue", data: "—", ok: false },
    ],
    status: "Em Separação",
  },
];

const statusColor: Record<string, string> = {
  "Entregue": "#10b981",
  "Saiu para Entrega": "#3b82f6",
  "Em Trânsito": "#f97316",
  "Em Separação": "#8b5cf6",
};

const etapaIcons = [Package, Clock, Truck, MapPin, Truck, CheckCircle];

const cds = [
  { nome: "CD São Paulo", cidade: "SP", pedidos: 142, capacidade: 78 },
  { nome: "CD Rio de Janeiro", cidade: "RJ", pedidos: 96, capacidade: 65 },
  { nome: "CD Curitiba", cidade: "PR", pedidos: 58, capacidade: 42 },
  { nome: "CD Porto Alegre", cidade: "RS", pedidos: 44, capacidade: 55 },
];

export function Distribuicao() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Distribuição e Rastreamento</h1>
          <p className="text-slate-500 text-sm mt-0.5">Acompanhe pedidos do armazém ao cliente final</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "Em Trânsito", val: "3", color: "#3b82f6" },
            { label: "Entregues hoje", val: "14", color: "#10b981" },
            { label: "OTIF", val: "94.2%", color: "#10b981" },
          ].map(s => (
            <div key={s.label} className="px-4 py-2 rounded-xl text-center" style={{ background: "rgba(13,22,40,0.8)", border: `1px solid ${s.color}20` }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 700, color: s.color, fontFamily: "var(--font-mono)" }}>{s.val}</div>
              <div className="text-slate-500 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rastreamento */}
      <div className="flex flex-col gap-4">
        <h3 className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Rastreamento em Tempo Real</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pedidos.map(ped => {
            const atualStep = ped.etapas.filter(e => e.ok).length - 1;
            return (
              <div key={ped.id} className="p-5 rounded-xl"
                style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-blue-400 text-sm" style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{ped.id}</span>
                    <p className="text-slate-400 text-xs mt-0.5">{ped.cliente} · {ped.destino}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full text-xs" style={{ background: statusColor[ped.status] + "18", color: statusColor[ped.status] }}>
                    {ped.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-1 mb-4">
                  {ped.etapas.map((_, i) => (
                    <div key={i} className="flex-1 h-1.5 rounded-full" style={{
                      background: i <= atualStep ? statusColor[ped.status] : "#1e3a5f"
                    }} />
                  ))}
                </div>

                {/* Timeline */}
                <div className="flex flex-col gap-2 relative">
                  <div className="absolute left-[11px] top-3 bottom-3 w-px" style={{ background: "rgba(59,130,246,0.1)" }} />
                  {ped.etapas.map((etapa, i) => {
                    const Icon = etapaIcons[i];
                    const isActive = i === atualStep && ped.status !== "Entregue";
                    return (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 z-10"
                          style={{
                            background: etapa.ok ? (isActive ? statusColor[ped.status] : "#10b981") : "#1e3a5f",
                            width: "22px", height: "22px"
                          }}>
                          {etapa.ok
                            ? <CheckCircle size={11} color="white" />
                            : <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span className="text-xs" style={{ color: etapa.ok ? (isActive ? "#e8edf5" : "#94a3b8") : "#374151" }}>
                            {etapa.label}
                            {isActive && <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: statusColor[ped.status] }} />}
                          </span>
                          {etapa.ok && <span className="text-xs text-slate-600" style={{ fontFamily: "var(--font-mono)" }}>{etapa.data}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centros de Distribuição */}
      <div>
        <h3 className="text-white mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>Centros de Distribuição</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cds.map(cd => (
            <div key={cd.nome} className="p-5 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,99,235,0.15)" }}>
                  <Globe size={16} color="#3b82f6" />
                </div>
                <div>
                  <p className="text-white text-sm" style={{ fontWeight: 600 }}>{cd.nome}</p>
                  <p className="text-slate-500 text-xs">{cd.cidade}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Pedidos ativos</span>
                  <span className="text-white" style={{ fontFamily: "var(--font-mono)" }}>{cd.pedidos}</span>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Capacidade</span>
                    <span style={{ color: cd.capacidade > 70 ? "#f97316" : "#10b981", fontFamily: "var(--font-mono)" }}>{cd.capacidade}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
                    <div className="h-full rounded-full" style={{ width: `${cd.capacidade}%`, background: cd.capacidade > 70 ? "#f97316" : "#10b981" }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Aplicação Industrial */}
      <div className="p-5 rounded-xl" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(59,130,246,0.12)" }}>
        <p className="text-blue-400 text-xs uppercase tracking-widest mb-2" style={{ letterSpacing: "0.15em" }}>Aplicação Industrial</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { titulo: "Milk Run", desc: "Coleta programada de materiais em múltiplos fornecedores em uma única viagem, reduzindo fretes e tempo de espera." },
            { titulo: "Cross-docking", desc: "Transferência direta de cargas da doca de recebimento para a doca de expedição, sem armazenagem intermediária." },
            { titulo: "Last Mile", desc: "Última etapa da entrega ao cliente final. Crítica para o OTIF e satisfação do cliente. Monitorada em tempo real." },
          ].map(c => (
            <div key={c.titulo}>
              <h4 className="text-white mb-1" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{c.titulo}</h4>
              <p className="text-slate-400 text-xs leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
