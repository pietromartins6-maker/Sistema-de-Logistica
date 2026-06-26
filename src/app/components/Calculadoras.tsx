import { useState } from "react";
import { Calculator, Package, Truck, Clock, TrendingUp } from "lucide-react";

type CalcTab = "cubagem" | "frete" | "lec" | "leadtime" | "cobertura";

const tabs: { id: CalcTab; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "cubagem", label: "Cubagem / Volume", icon: Package, desc: "Calcule volume e peso cubado de cargas" },
  { id: "frete", label: "Estimativa de Frete", icon: Truck, desc: "Calcule o custo estimado de transporte" },
  { id: "lec", label: "Lote Econômico (LEC)", icon: Calculator, desc: "Quantidade ideal de compra por pedido" },
  { id: "leadtime", label: "Lead Time", icon: Clock, desc: "Tempo total do ciclo logístico" },
  { id: "cobertura", label: "Cobertura de Estoque", icon: TrendingUp, desc: "Dias de estoque disponível" },
];

function FieldRow({ label, value, onChange, unit }: { label: string; value: string; onChange: (v: string) => void; unit?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-slate-400 text-xs">{label}</label>
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.15)" }}>
        <input type="number" value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white text-sm"
          style={{ fontFamily: "var(--font-mono)" }} />
        {unit && <span className="text-slate-500 text-xs shrink-0">{unit}</span>}
      </div>
    </div>
  );
}

function ResultBox({ label, value, formula }: { label: string; value: string; formula?: string }) {
  return (
    <div className="p-4 rounded-xl" style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(59,130,246,0.25)" }}>
      <p className="text-slate-500 text-xs mb-1">{label}</p>
      <p className="text-blue-300" style={{ fontSize: "1.5rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{value}</p>
      {formula && <p className="text-slate-600 text-xs mt-2" style={{ fontFamily: "var(--font-mono)" }}>{formula}</p>}
    </div>
  );
}

function CubagemCalc() {
  const [comp, setComp] = useState("1.2");
  const [larg, setLarg] = useState("0.8");
  const [alt, setAlt] = useState("0.9");
  const [pesoBruto, setPesoBruto] = useState("15");
  const [qtd, setQtd] = useState("10");
  const [fatorCub, setFatorCub] = useState("300");

  const vol = parseFloat(comp) * parseFloat(larg) * parseFloat(alt);
  const volTotal = vol * parseFloat(qtd);
  const pesoCubado = (volTotal * 1000000) / parseFloat(fatorCub);
  const pesoCobrado = Math.max(pesoCubado, parseFloat(pesoBruto) * parseFloat(qtd));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <FieldRow label="Comprimento (m)" value={comp} onChange={setComp} unit="m" />
        <FieldRow label="Largura (m)" value={larg} onChange={setLarg} unit="m" />
        <FieldRow label="Altura (m)" value={alt} onChange={setAlt} unit="m" />
        <FieldRow label="Peso Bruto por Vol." value={pesoBruto} onChange={setPesoBruto} unit="kg" />
        <FieldRow label="Quantidade de Volumes" value={qtd} onChange={setQtd} unit="un" />
        <FieldRow label="Fator de Cubagem" value={fatorCub} onChange={setFatorCub} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ResultBox label="Volume por Volume" value={`${vol.toFixed(3)} m³`} />
        <ResultBox label="Volume Total" value={`${volTotal.toFixed(3)} m³`} />
        <ResultBox label="Peso Cubado" value={`${pesoCubado.toFixed(1)} kg`} />
        <ResultBox label="Peso de Cobrança" value={`${pesoCobrado.toFixed(1)} kg`} formula="= maior entre peso real e cubado" />
      </div>
      <div className="p-3 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.03)", color: "#6b82a0" }}>
        <strong className="text-slate-400">Uso Industrial:</strong> A cubagem é usada para calcular o espaço ocupado na carroceria e o peso que a transportadora irá cobrar. Fator 300 é o mais comum no modal rodoviário.
      </div>
    </div>
  );
}

function FreteCalc() {
  const [peso, setPeso] = useState("150");
  const [dist, setDist] = useState("850");
  const [tarifa, setTarifa] = useState("0.85");
  const [gris, setGris] = useState("0.3");
  const [valNF, setValNF] = useState("15000");

  const freteBase = parseFloat(peso) * parseFloat(tarifa);
  const grisVal = (parseFloat(valNF) * parseFloat(gris)) / 100;
  const pedagio = parseFloat(dist) * 0.015;
  const total = freteBase + grisVal + pedagio + 25;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <FieldRow label="Peso Cobrado (kg)" value={peso} onChange={setPeso} unit="kg" />
        <FieldRow label="Distância (km)" value={dist} onChange={setDist} unit="km" />
        <FieldRow label="Tarifa (R$/kg)" value={tarifa} onChange={setTarifa} unit="R$" />
        <FieldRow label="GRIS (%)" value={gris} onChange={setGris} unit="%" />
        <FieldRow label="Valor da NF (R$)" value={valNF} onChange={setValNF} unit="R$" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <ResultBox label="Frete Base" value={`R$ ${freteBase.toFixed(2)}`} />
        <ResultBox label="GRIS" value={`R$ ${grisVal.toFixed(2)}`} />
        <ResultBox label="Pedágio estimado" value={`R$ ${pedagio.toFixed(2)}`} />
        <ResultBox label="Total Estimado" value={`R$ ${total.toFixed(2)}`} formula="Base + GRIS + Pedagio + Taxa Admin" />
      </div>
      <div className="p-3 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.03)", color: "#6b82a0" }}>
        <strong className="text-slate-400">Uso Industrial:</strong> GRIS (Gerenciamento de Risco) é cobrado sobre o valor da NF. O resultado é uma estimativa; valores reais variam por transportadora e contrato.
      </div>
    </div>
  );
}

function LecCalc() {
  const [dem, setDem] = useState("1200");
  const [pedido, setPedido] = useState("250");
  const [armazen, setArmazen] = useState("8");

  const D = parseFloat(dem);
  const Cp = parseFloat(pedido);
  const Ca = parseFloat(armazen) / 100;
  const lec = Math.sqrt((2 * D * Cp) / Ca);
  const numPedidos = D / lec;
  const estoqueM = lec / 2;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <FieldRow label="Demanda Anual (un)" value={dem} onChange={setDem} unit="un/ano" />
        <FieldRow label="Custo por Pedido (R$)" value={pedido} onChange={setPedido} unit="R$" />
        <FieldRow label="Taxa de Armazenagem (%aa)" value={armazen} onChange={setArmazen} unit="%" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <ResultBox label="LEC (Qtd. ideal)" value={`${lec.toFixed(0)} un`} formula="√(2 × D × Cp / Ca)" />
        <ResultBox label="Nº Pedidos/Ano" value={`${numPedidos.toFixed(1)} pedidos`} />
        <ResultBox label="Estoque Médio" value={`${estoqueM.toFixed(0)} un`} />
      </div>
      <div className="p-3 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.03)", color: "#6b82a0" }}>
        <strong className="text-slate-400">Uso Industrial:</strong> O LEC (Lote Econômico de Compra) minimiza o custo total de pedido e armazenagem, definindo a quantidade ótima de compra.
      </div>
    </div>
  );
}

function LeadTimeCalc() {
  const [proc, setProc] = useState("1.5");
  const [fabr, setFabr] = useState("2.0");
  const [transp, setTransp] = useState("1.5");
  const [esp, setEsp] = useState("0.5");

  const total = parseFloat(proc) + parseFloat(fabr) + parseFloat(transp) + parseFloat(esp);
  const partes = [
    { label: "Processamento do Pedido", val: parseFloat(proc), color: "#3b82f6" },
    { label: "Fabricação / Separação", val: parseFloat(fabr), color: "#10b981" },
    { label: "Transporte", val: parseFloat(transp), color: "#f97316" },
    { label: "Espera / Fila", val: parseFloat(esp), color: "#8b5cf6" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <FieldRow label="Processamento (d)" value={proc} onChange={setProc} unit="dias" />
        <FieldRow label="Fabricação / Sep. (d)" value={fabr} onChange={setFabr} unit="dias" />
        <FieldRow label="Transporte (d)" value={transp} onChange={setTransp} unit="dias" />
        <FieldRow label="Espera / Fila (d)" value={esp} onChange={setEsp} unit="dias" />
      </div>
      <ResultBox label="Lead Time Total" value={`${total.toFixed(1)} dias`} formula="Processamento + Fabricação + Transporte + Espera" />
      <div className="flex flex-col gap-2">
        {partes.map(p => (
          <div key={p.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{p.label}</span>
              <span style={{ color: p.color, fontFamily: "var(--font-mono)" }}>{p.val}d ({((p.val / total) * 100).toFixed(0)}%)</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1e3a5f" }}>
              <div className="h-full rounded-full" style={{ width: `${(p.val / total) * 100}%`, background: p.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CoberturaCalc() {
  const [estoque, setEstoque] = useState("450");
  const [consumo, setConsumo] = useState("80");

  const cobertura = parseFloat(estoque) / parseFloat(consumo);
  const semanas = cobertura / 5;

  const nivel = cobertura <= 5 ? "Crítico" : cobertura <= 10 ? "Baixo" : cobertura <= 20 ? "Normal" : "Alto";
  const nivelColor = cobertura <= 5 ? "#ef4444" : cobertura <= 10 ? "#f97316" : cobertura <= 20 ? "#10b981" : "#3b82f6";

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <FieldRow label="Estoque Atual (un)" value={estoque} onChange={setEstoque} unit="un" />
        <FieldRow label="Consumo Médio Diário (un/dia)" value={consumo} onChange={setConsumo} unit="un/dia" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <ResultBox label="Cobertura de Estoque" value={`${cobertura.toFixed(1)} dias`} formula="Estoque / Consumo Diário" />
        <ResultBox label="Em Semanas" value={`${semanas.toFixed(1)} sem`} />
        <div className="p-4 rounded-xl" style={{ background: "rgba(37,99,235,0.1)", border: `1px solid ${nivelColor}40` }}>
          <p className="text-slate-500 text-xs mb-1">Nível de Cobertura</p>
          <p style={{ fontSize: "1.5rem", fontWeight: 700, color: nivelColor, fontFamily: "var(--font-mono)" }}>{nivel}</p>
          <p className="text-slate-600 text-xs mt-1">{cobertura <= 5 ? "Compra urgente necessária!" : cobertura <= 10 ? "Verificar reposição em breve" : "Nível adequado"}</p>
        </div>
      </div>
    </div>
  );
}

const calcComponents: Record<CalcTab, React.ComponentType> = {
  cubagem: CubagemCalc,
  frete: FreteCalc,
  lec: LecCalc,
  leadtime: LeadTimeCalc,
  cobertura: CoberturaCalc,
};

export function Calculadoras() {
  const [aba, setAba] = useState<CalcTab>("cubagem");
  const ActiveCalc = calcComponents[aba];
  const activeTab = tabs.find(t => t.id === aba)!;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div>
        <h1 className="text-white" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Calculadoras Logísticas</h1>
        <p className="text-slate-500 text-sm mt-0.5">Ferramentas de apoio operacional e planejamento</p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setAba(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer transition-all"
              style={{
                background: aba === t.id ? "#2563eb" : "rgba(13,22,40,0.8)",
                color: aba === t.id ? "white" : "#6b82a0",
                border: `1px solid ${aba === t.id ? "#3b82f6" : "rgba(59,130,246,0.1)"}`,
              }}>
              <Icon size={14} />
              <span className="text-sm">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active calculator */}
      <div className="p-6 rounded-xl" style={{ background: "rgba(13,22,40,0.8)", border: "1px solid rgba(59,130,246,0.1)" }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(37,99,235,0.15)" }}>
            <Calculator size={20} color="#3b82f6" />
          </div>
          <div>
            <h2 className="text-white" style={{ fontWeight: 600, fontSize: "1.0625rem" }}>{activeTab.label}</h2>
            <p className="text-slate-500 text-xs">{activeTab.desc}</p>
          </div>
        </div>
        <ActiveCalc />
      </div>
    </div>
  );
}
