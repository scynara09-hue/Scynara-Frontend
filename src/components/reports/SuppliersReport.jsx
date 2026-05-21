import KpiCard from "./KpiCard";
import ReportChart from "./ReportChart";
import { Truck, Package, DollarSign, CheckCircle } from "lucide-react";

const RANK_CLASS = ["gold", "silver", "bronze"];

const gastoPorProveedor = [
  { name: "La Paloma",   gasto: 12400 },
  { name: "Beb. Norte",  gasto: 8200 },
  { name: "Lác. Jalisco",gasto: 5100 },
  { name: "Limp. Total", gasto: 3900 },
  { name: "Masc. Exp.",  gasto: 2800 },
];

const topProveedores = [
  { nombre: "Distribuidora La Paloma", categoria: "Abarrotes",  pedidos: 8, gasto: 12400 },
  { nombre: "Bebidas del Norte",       categoria: "Bebidas",     pedidos: 6, gasto: 8200 },
  { nombre: "Lácteos Jalisco",         categoria: "Lácteos",     pedidos: 5, gasto: 5100 },
  { nombre: "Limpieza Total S.A.",     categoria: "Limpieza",    pedidos: 3, gasto: 3900 },
  { nombre: "Mascotas Express",        categoria: "Mascotas",    pedidos: 2, gasto: 2800 },
];

export default function SuppliersReport() {
  const totalGasto = topProveedores.reduce((a, p) => a + p.gasto, 0);

  return (
    <>
      <div className="kpi-grid">
        <KpiCard
          icon={<Truck size={16} />}
          iconBg="rgba(14,165,233,0.12)" iconColor="#0ea5e9"
          num="5"
          label="Proveedores activos"
          sub="Con pedidos en el período"
        />
        <KpiCard
          icon={<DollarSign size={16} />}
          iconBg="rgba(16,185,129,0.12)" iconColor="#10b981"
          num={`$${totalGasto.toLocaleString("es-MX")}`}
          label="Gasto total en compras"
          sub="A proveedores"
        />
        <KpiCard
          icon={<Package size={16} />}
          iconBg="rgba(245,158,11,0.12)" iconColor="#f59e0b"
          num="24"
          label="Pedidos realizados"
          sub="Este período"
        />
        <KpiCard
          icon={<CheckCircle size={16} />}
          iconBg="rgba(52,211,153,0.12)" iconColor="#34d399"
          num="96%"
          label="Tasa de entrega"
          sub="Pedidos recibidos OK"
          badge="+2%" badgeType="up"
        />
      </div>

      <ReportChart
        title="Gasto por proveedor"
        sub="Total de compras en el período"
        data={gastoPorProveedor}
        dataKey="gasto"
        color="#0ea5e9"
        prefix="$"
      />

      <div className="chart-card">
        <div className="chart-card-header">
          <div>
            <div className="chart-card-title">Detalle por proveedor</div>
            <div className="chart-card-sub">Pedidos y gasto acumulado</div>
          </div>
        </div>
        <div className="r-table-wrap">
          <table className="r-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Proveedor</th>
                <th>Categoría</th>
                <th>Pedidos</th>
                <th>Gasto total</th>
              </tr>
            </thead>
            <tbody>
              {topProveedores.map((p, i) => (
                <tr key={i}>
                  <td><span className={`r-rank ${RANK_CLASS[i] || ""}`}>{i + 1}</span></td>
                  <td className="num">{p.nombre}</td>
                  <td className="muted">{p.categoria}</td>
                  <td>{p.pedidos}</td>
                  <td className="num">${p.gasto.toLocaleString("es-MX")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}