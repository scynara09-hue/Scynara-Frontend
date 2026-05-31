import React from "react";

const AVATAR_CLASSES = ["va-p", "va-g", "va-b", "va-a"];

function getTimeAgo(dateString) {
  if (!dateString) return "hace un momento";
  const diffMs = new Date() - new Date(dateString);
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "hace un momento";
  if (diffMins < 60) return `hace ${diffMins} min`;
  
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `hace ${diffHrs} h`;
  
  const diffDays = Math.floor(diffHrs / 24);
  return `hace ${diffDays} d`;
}

export default function RecentSales({ ventas = [] }) {
  const latestSales = ventas
    .filter(v => v.estado !== "CANCELADA")
    .slice(0, 5);

  return (
    <div className="dash-panel">
      <div className="panel-title">Últimas ventas</div>
      
      {latestSales.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", padding: "20px 0" }}>
          No hay ventas recientes.
        </p>
      ) : (
        latestSales.map((s, i) => {
          const clientName = s.cliente_nombre || "Público General";
          const initials = clientName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
          const avatarClass = AVATAR_CLASSES[i % AVATAR_CLASSES.length];
          const timeAgo = getTimeAgo(s.fecha_hora);

          return (
            <div key={s.id_venta} className="venta-row">
              <div className={`venta-avatar ${avatarClass}`}>{initials}</div>
              <div className="venta-info">
                <p>{clientName}</p>
                <span>{timeAgo} · {s.metodo_pago}</span>
              </div>
              <div className="venta-amount">${Number(s.total).toFixed(2)}</div>
            </div>
          );
        })
      )}
    </div>
  );
}