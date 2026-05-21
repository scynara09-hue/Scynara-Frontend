
import KpiCard from "./KpiCard";
import ReportChart from "./ReportChart";
import { DollarSign, ShoppingCart, TrendingUp, Receipt } from "lucide-react";

const RANK_CLASS = ["gold", "silver", "bronze"];

// Datos de ejemplo — reemplaza con tu API
const ventasPorDia = [
  { name: "Lun", total: 1200 }, { name: "Mar", total: 980 },
  { name: "Mié", total: 1540 }, { name: "Jue", total: 870 },
  { name: "Vie", total: 2100 }, { name: "Sáb", total: 2800 },
  { name: "Dom", total: 1600 },
];

const topProductos = [
  { nombre: "Coca-Cola 600ml", ventas: 142, total: 1988 },
  { nombre: "Leche entera 1L", ventas: 98,  total: 1764 },
  { nombre: "Arroz 1kg",       ventas: 87,  total: 1914 },
  { nombre: "Agua 1.5L",       ventas: 76,  total: 684 },
  { nombre: "Detergente Ariel",ventas: 54,  total: 2970 },
];

export default function SalesReport() {
  const totalVentas = ventasPorDia.reduce((a, d) => a + d.total, 0);

  return (
    <>
      <div className="kpi-grid">
        <KpiCard
          icon={<DollarSign size={16} />}
          iconBg="rgba(16,185,129,0.12)" iconColor="#10b981"
          num={`$${totalVentas.toLocaleString("es-MX")}`}
          label="Ingresos totales"
          sub="Período seleccionado"
          badge="+12.4%" badgeType="up"
        />
        <KpiCard
          icon={<ShoppingCart size={16} />}
          iconBg="rgba(99,102,241,0.12)" iconColor="#6366f1"
          num="538"
          label="Ventas realizadas"
          sub="Tickets procesados"
          badge="+8%" badgeType="up"
        />
        <KpiCard
          icon={<TrendingUp size={16} />}
          iconBg="rgba(245,158,11,0.12)" iconColor="#f59e0b"
          num="$209.30"
          label="Ticket promedio"
          sub="Por venta"
          badge="+3.1%" badgeType="up"
        />
        <KpiCard
          icon={<Receipt size={16} />}
          iconBg="rgba(248,113,113,0.12)" iconColor="#f87171"
          num="14"
          label="Ventas canceladas"
          sub="Este período"
          badge="2.6%" badgeType="neu"
        />
      </div>

      <ReportChart
        title="Ventas por día"
        sub="Ingresos totales por día de la semana"
        data={ventasPorDia}
        dataKey="total"
        color="#10b981"
        prefix="$"
      />

      <div className="chart-card">
        <div className="chart-card-header">
          <div>
            <div className="chart-card-title">Productos más vendidos</div>
            <div className="chart-card-sub">Por unidades en el período</div>
          </div>
        </div>
        <div className="r-table-wrap">
          <table className="r-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Unidades</th>
                <th>Total generado</th>
              </tr>
            </thead>
            <tbody>
              {topProductos.map((p, i) => (
                <tr key={i}>
                  <td><span className={`r-rank ${RANK_CLASS[i] || ""}`}>{i + 1}</span></td>
                  <td className="num">{p.nombre}</td>
                  <td>{p.ventas} uds.</td>
                  <td className="num">${p.total.toLocaleString("es-MX")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}