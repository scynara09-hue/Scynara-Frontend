import React from "react";

const IconDollar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);

const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
  </svg>
);

export default function StatCards({ ventas = [], customers = [], products = [] }) {
  
  const today = new Date().toLocaleDateString('en-CA');
  const ventasHoy = ventas.filter(v => {
    const ventaDate = v.fecha_hora ? v.fecha_hora.slice(0, 10) : "";
    return ventaDate === today && v.estado !== "CANCELADA";
  });
  
  const totalVentas = ventasHoy.reduce((acc, v) => acc + Number(v.total), 0);

  const stockTotal = products.reduce((acc, p) => acc + Number(p.cantidad), 0);

  const totalClientes = customers.length;

  const hoy = new Date();
  const limite = new Date();
  limite.setDate(hoy.getDate() + 30); 

  const porCaducar = products.filter(p => {
    if (!p.fecha_caducidad) return false;
    
    const [year, month, day] = p.fecha_caducidad.split('T')[0].split('-');
    const caducidad = new Date(year, month - 1, day);
    
    return caducidad >= hoy && caducidad <= limite;
  }).length;

  const stats = [
    {
      label: "Ventas de hoy",
      value: `$${totalVentas.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`,
      bgClass: "si-green",
      icon: IconDollar,
    },
    {
      label: "Unidades en stock",
      value: stockTotal.toLocaleString("es-MX"),
      bgClass: "si-purple",
      icon: IconBox,
    },
    {
      label: "Clientes registrados",
      value: totalClientes,
      bgClass: "si-blue",
      icon: IconUsers,
    },
    {
      label: "Por caducar (30 días)",
      value: porCaducar,
      bgClass: "si-amber",
      icon: IconAlert,
    },
  ];

  return (
    <div className="dash-stats">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <div key={i} className="stat-card">
            <div className="stat-card-top">
              <div className={`stat-icon ${s.bgClass}`}>
                <Icon />
              </div>
            </div>
            <div className="stat-num">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}