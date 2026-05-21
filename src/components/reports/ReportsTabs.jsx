import { TrendingUp, Package, Users, Truck } from "lucide-react";

const TABS = [
  { key: "ventas",      label: "Ventas",      icon: <TrendingUp size={14} />,  color: "#10b981" },
  { key: "inventario",  label: "Inventario",  icon: <Package size={14} />,     color: "#f59e0b" },
  { key: "clientes",    label: "Clientes",    icon: <Users size={14} />,       color: "#7c3aed" },
  { key: "proveedores", label: "Proveedores", icon: <Truck size={14} />,       color: "#0ea5e9" },
];

export default function ReportsTabs({ active, onChange }) {
  return (
    <div className="reports-tabs">
      {TABS.map(t => (
        <button
          key={t.key}
          className={`r-tab${active === t.key ? " active" : ""}`}
          onClick={() => onChange(t.key)}
        >
          <span className="r-tab-dot" style={{ background: active === t.key ? t.color : "var(--color-border-tertiary)" }} />
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}