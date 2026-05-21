import KpiCard from "./KpiCard";
import ReportChart from "./ReportChart";
import { Users, UserCheck, Star, CreditCard } from "lucide-react";

const RANK_CLASS = ["gold", "silver", "bronze"];

const topClientes = [
  { nombre: "María Ramírez",  compras: 12, total: 3420, ticket: 285 },
  { nombre: "Ana Gutiérrez",  compras: 9,  total: 2890, ticket: 321 },
  { nombre: "Carlos Flores",  compras: 8,  total: 2310, ticket: 289 },
  { nombre: "Laura Vázquez",  compras: 7,  total: 1980, ticket: 283 },
  { nombre: "Jorge López",    compras: 5,  total: 1540, ticket: 308 },
];

const comprasPorMes = [
  { name: "Ene", compras: 42 }, { name: "Feb", compras: 58 },
  { name: "Mar", compras: 71 }, { name: "Abr", compras: 63 },
];

export default function ClientsReport() {
  return (
    <>
      <div className="kpi-grid">
        <KpiCard
          icon={<Users size={16} />}
          iconBg="rgba(124,58,237,0.12)" iconColor="#7c3aed"
          num="6"
          label="Clientes registrados"
          sub="Total en base de datos"
        />
        <KpiCard
          icon={<UserCheck size={16} />}
          iconBg="rgba(16,185,129,0.12)" iconColor="#10b981"
          num="4"
          label="Clientes activos"
          sub="Con compra este mes"
          badge="+1" badgeType="up"
        />
        <KpiCard
          icon={<CreditCard size={16} />}
          iconBg="rgba(245,158,11,0.12)" iconColor="#f59e0b"
          num="$297"
          label="Ticket promedio"
          sub="Por cliente"
        />
        <KpiCard
          icon={<Star size={16} />}
          iconBg="rgba(248,113,113,0.12)" iconColor="#f87171"
          num="2.4"
          label="Compras promedio"
          sub="Por cliente / mes"
        />
      </div>

      <ReportChart
        title="Compras por mes"
        sub="Número de tickets por mes"
        data={comprasPorMes}
        dataKey="compras"
        color="#7c3aed"
      />

      <div className="chart-card">
        <div className="chart-card-header">
          <div>
            <div className="chart-card-title">Top clientes</div>
            <div className="chart-card-sub">Por gasto total en el período</div>
          </div>
        </div>
        <div className="r-table-wrap">
          <table className="r-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Compras</th>
                <th>Ticket prom.</th>
                <th>Total gastado</th>
              </tr>
            </thead>
            <tbody>
              {topClientes.map((c, i) => (
                <tr key={i}>
                  <td><span className={`r-rank ${RANK_CLASS[i] || ""}`}>{i + 1}</span></td>
                  <td className="num">{c.nombre}</td>
                  <td className="muted">{c.compras} compras</td>
                  <td>${c.ticket}</td>
                  <td className="num">${c.total.toLocaleString("es-MX")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}