import { useState } from "react";
import {
  LayoutDashboard, Truck, Package, Factory, Send, Globe,
  BarChart3, TrendingUp, Calculator, Users, ShoppingCart,
  FileText, Settings, Bell, Search, ChevronLeft,
  Home, LogOut, Menu, X, Activity
} from "lucide-react";
import { Dashboard } from "./Dashboard";
import { Recebimento } from "./Recebimento";
import { Estoque } from "./Estoque";
import { Producao } from "./Producao";
import { Expedicao } from "./Expedicao";
import { Distribuicao } from "./Distribuicao";
import { Planejamento } from "./Planejamento";
import { Controle } from "./Controle";
import { Calculadoras } from "./Calculadoras";
import { Fornecedores } from "./Fornecedores";
import { Relatorios } from "./Relatorios";

interface SystemLayoutProps {
  onGoHome: () => void;
}

type ModuleId =
  | "dashboard" | "recebimento" | "estoque" | "producao"
  | "expedicao" | "distribuicao" | "planejamento" | "controle"
  | "calculadoras" | "fornecedores" | "relatorios";

const navGroups = [
  {
    label: "Operações",
    items: [
      { id: "dashboard" as ModuleId, label: "Dashboard", icon: LayoutDashboard },
      { id: "recebimento" as ModuleId, label: "Recebimento", icon: Truck },
      { id: "estoque" as ModuleId, label: "Estoque", icon: Package },
      { id: "producao" as ModuleId, label: "Produção", icon: Factory },
      { id: "expedicao" as ModuleId, label: "Expedição", icon: Send },
      { id: "distribuicao" as ModuleId, label: "Distribuição", icon: Globe },
    ],
  },
  {
    label: "Gestão",
    items: [
      { id: "planejamento" as ModuleId, label: "Planejamento", icon: BarChart3 },
      { id: "controle" as ModuleId, label: "Controle", icon: TrendingUp },
      { id: "fornecedores" as ModuleId, label: "Fornecedores", icon: Users },
      { id: "relatorios" as ModuleId, label: "Relatórios", icon: FileText },
    ],
  },
  {
    label: "Ferramentas",
    items: [
      { id: "calculadoras" as ModuleId, label: "Calculadoras", icon: Calculator },
    ],
  },
];

const moduleComponents: Record<ModuleId, React.ComponentType> = {
  dashboard: Dashboard,
  recebimento: Recebimento,
  estoque: Estoque,
  producao: Producao,
  expedicao: Expedicao,
  distribuicao: Distribuicao,
  planejamento: Planejamento,
  controle: Controle,
  calculadoras: Calculadoras,
  fornecedores: Fornecedores,
  relatorios: Relatorios,
};

const now = new Date();
const greet = () => {
  const h = now.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
};
const dateStr = now.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" });

export function SystemLayout({ onGoHome }: SystemLayoutProps) {
  const [active, setActive] = useState<ModuleId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifications] = useState(4);

  const ActiveComponent = moduleComponents[active];

  return (
    <div className="size-full flex overflow-hidden" style={{ background: "#070d1a", color: "#e8edf5" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-300 overflow-hidden"
        style={{
          width: sidebarOpen ? "240px" : "64px",
          background: "#080f1f",
          borderRight: "1px solid rgba(59,130,246,0.08)",
        }}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 shrink-0"
          style={{ borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg,#1d4ed8,#2563eb)", boxShadow: "0 0 12px rgba(37,99,235,0.4)" }}>
            <Activity size={16} color="white" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <div className="text-white text-sm" style={{ fontWeight: 700 }}>LogiTech</div>
              <div className="text-blue-400" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>INDÚSTRIA</div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-4"
          style={{ scrollbarWidth: "none" }}>
          {navGroups.map(group => (
            <div key={group.label}>
              {sidebarOpen && (
                <div className="px-2 mb-2 text-slate-600" style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {group.label}
                </div>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActive(item.id)}
                      title={!sidebarOpen ? item.label : undefined}
                      className="flex items-center gap-3 px-2 py-2.5 rounded-lg w-full text-left cursor-pointer transition-all duration-150"
                      style={{
                        background: isActive ? "rgba(37,99,235,0.2)" : "transparent",
                        color: isActive ? "#93c5fd" : "#6b82a0",
                        borderLeft: isActive ? "2px solid #3b82f6" : "2px solid transparent",
                      }}>
                      <Icon size={16} className="shrink-0" />
                      {sidebarOpen && <span style={{ fontSize: "13px", fontWeight: isActive ? 600 : 400 }}>{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-2 py-4 flex flex-col gap-1 shrink-0"
          style={{ borderTop: "1px solid rgba(59,130,246,0.08)" }}>
          <button onClick={onGoHome}
            className="flex items-center gap-3 px-2 py-2.5 rounded-lg w-full cursor-pointer transition-all duration-150 hover:bg-slate-800"
            style={{ color: "#6b82a0", fontSize: "13px" }}>
            <Home size={16} className="shrink-0" />
            {sidebarOpen && <span>Início</span>}
          </button>
          <button className="flex items-center gap-3 px-2 py-2.5 rounded-lg w-full cursor-pointer transition-all duration-150 hover:bg-slate-800"
            style={{ color: "#6b82a0", fontSize: "13px" }}>
            <Settings size={16} className="shrink-0" />
            {sidebarOpen && <span>Configurações</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-4 px-6 py-3 shrink-0"
          style={{ background: "#080f1f", borderBottom: "1px solid rgba(59,130,246,0.08)" }}>
          <button onClick={() => setSidebarOpen(o => !o)}
            className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-slate-800"
            style={{ color: "#6b82a0" }}>
            {sidebarOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
          </button>

          <div className="flex-1 min-w-0">
            <div className="text-slate-400 text-xs">
              {greet()}, <span className="text-blue-400">Assistente de Logística</span> &nbsp;·&nbsp; {dateStr}
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.1)" }}>
            <Search size={13} style={{ color: "#6b82a0" }} />
            <input placeholder="Pesquisar módulo..." className="bg-transparent border-none outline-none text-slate-400 text-xs w-32"
              style={{ fontFamily: "var(--font-sans)" }} />
          </div>

          {/* Notifications */}
          <button className="relative w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:bg-slate-800"
            style={{ color: "#6b82a0" }}>
            <Bell size={16} />
            {notifications > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{ background: "#ef4444", fontSize: "9px", fontWeight: 700 }}>
                {notifications}
              </span>
            )}
          </button>

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs text-white"
              style={{ background: "linear-gradient(135deg,#1d4ed8,#7c3aed)", fontWeight: 700 }}>
              AL
            </div>
            {sidebarOpen && <span className="text-slate-400 text-xs hidden lg:block">Assist. Logística</span>}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "#1e3a5f #070d1a" }}>
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}
