import React from "react";

const IconStock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
    <line x1="16" y1="8" x2="2" y2="22"/>
    <line x1="17.5" y1="15" x2="9" y2="6.5"/>
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

export default function AlertsPanel({ products = [] }) {
  const hoy = new Date();
  const limite = new Date();
  limite.setDate(hoy.getDate() + 30);

  // 💡 Filtramos los productos problemáticos
  const alertas = products.reduce((acc, p) => {
    // 1. Verificar stock bajo (menor o igual a 5)
    if (Number(p.cantidad) <= 5) {
      acc.push({
        id: `stock-${p.id_producto}`,
        tipo: "stock",
        mensaje: `¡Stock bajo de ${p.nombre}!`,
        detalle: `Solo quedan ${p.cantidad} unidades.`,
      });
    }

    // 2. Verificar caducidad (próximos 30 días)
    if (p.fecha_caducidad) {
      const [year, month, day] = p.fecha_caducidad.split('T')[0].split('-');
      const caducidad = new Date(year, month - 1, day);
      
      if (caducidad >= hoy && caducidad <= limite) {
        acc.push({
          id: `caducidad-${p.id_producto}`,
          tipo: "caducidad",
          mensaje: `${p.nombre} por caducar`,
          detalle: `Vence el ${caducidad.toLocaleDateString('es-MX')}.`,
        });
      }
    }
    return acc;
  }, []);

  return (
    <div className="dash-panel">
      <div className="panel-title">Alertas de Inventario</div>
      
      {alertas.length === 0 ? (
        <p style={{ color: "#6b7280", fontSize: "0.9rem", textAlign: "center", padding: "20px 0" }}>
          Todo en orden. No hay alertas pendientes.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "10px" }}>
          {alertas.map(alerta => (
            <div 
              key={alerta.id} 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "12px", 
                padding: "10px", 
                borderRadius: "8px", 
                backgroundColor: alerta.tipo === "stock" ? "#fef2f2" : "#fffbeb",
                border: `1px solid ${alerta.tipo === "stock" ? "#fee2e2" : "#fef3c7"}`
              }}
            >
              <div style={{ 
                padding: "8px", 
                borderRadius: "6px", 
                backgroundColor: alerta.tipo === "stock" ? "#fee2e2" : "#fef3c7" 
              }}>
                {alerta.tipo === "stock" ? <IconStock /> : <IconCalendar />}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600, color: "#374151" }}>
                  {alerta.mensaje}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#6b7280" }}>
                  {alerta.detalle}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}