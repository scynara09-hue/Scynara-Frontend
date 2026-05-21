import KpiCard from "./KpiCard";
import ReportChart from "./ReportChart";
import { Package, AlertTriangle, Boxes, ArrowDownCircle } from "lucide-react";

const stockBajo = [
  { nombre: "Aceite 1L",        stock: 3,  min: 20, color: "#f87171" },
  { nombre: "Detergente 1kg",   stock: 7,  min: 20, color: "#f87171" },
  { nombre: "Queso Oaxaca",     stock: 12, min: 20, color: "#f59e0b" },
  { nombre: "Pedigree 4kg",     stock: 15, min: 20, color: "#f59e0b" },
  { nombre: "Shampoo Head&S",   stock: 18, min: 20, color: "#f59e0b" },
];

const valorPorCategoria = [
  { name: "Abarrotes", valor: 8400 },
  { name: "Bebidas",   valor: 5200 },
  { name: "Limpieza",  valor: 3800 },
  { name: "Lácteos",   valor: 2100 },
  { name: "Mascotas",  valor: 1900 },
];

export default function InventoryReport() {
  return (
    <>
      <div className="kpi-grid">
        <KpiCard
          icon={<Package size={16} />}
          iconBg="rgba(245,158,11,0.12)" iconColor="#f59e0b"
          num="347"
          label="Productos en catálogo"
          sub="SKUs activos"
        />
        <KpiCard
          icon={<Boxes size={16} />}
          iconBg="rgba(16,185,129,0.12)" iconColor="#10b981"
          num="$42,380"
          label="Valor total inventario"
          sub="Precio de costo"
        />
        <KpiCard
          icon={<AlertTriangle size={16} />}
          iconBg="rgba(248,113,113,0.12)" iconColor="#f87171"
          num="5"
          label="Bajo stock crítico"
          sub="Requieren reorden"
          badge="Atención" badgeType="down"
        />
        <KpiCard
          icon={<ArrowDownCircle size={16} />}
          iconBg="rgba(99,102,241,0.12)" iconColor="#6366f1"
          num="23"
          label="Sin movimiento"
          sub="Últimos 30 días"
        />
      </div>

      <div className="report-grid-2">
        {/* Stock bajo */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">⚠ Productos con bajo stock</div>
              <div className="chart-card-sub">Requieren reabastecimiento</div>
            </div>
          </div>
          {stockBajo.map((p, i) => {
            const pct = Math.round((p.stock / p.min) * 100);
            const cls = pct < 40 ? "stock-critical" : pct < 80 ? "stock-warning" : "stock-ok";
            return (
              <div className="stock-alert-row" key={i}>
                <span className="stock-name">{p.nombre}</span>
                <div className="stock-bar-wrap">
                  <div className="stock-bar" style={{ width: `${pct}%`, background: p.color }} />
                </div>
                <span className={`stock-count ${cls}`}>{p.stock} uds.</span>
              </div>
            );
          })}
        </div>

        {/* Valor por categoría */}
        <ReportChart
          title="Valor por categoría"
          sub="Distribución del inventario en $"
          data={valorPorCategoria}
          dataKey="valor"
          color="#f59e0b"
          prefix="$"
          allowToggle={false}
        />
      </div>
    </>
  );
}