const AVATAR_COLORS = [
  { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
];

const STATUS_MAP = {
  completada: { cls: "badge-completed", txt: "● Completada" },
  cancelada:  { cls: "badge-cancelled", txt: "✕ Cancelada"  },
  pendiente:  { cls: "badge-pending",   txt: "◌ Pendiente"  },
};

const IconEye = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconCancel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9"  y1="9" x2="15" y2="15"/>
  </svg>
);

export default function SaleRow({ sale, index, onView, onCancel, readOnly = false }) {
  const clienteNombre = sale.cliente_nombre || "Público General";
  const vendedorNombre = sale.vendedor_nombre || "Desconocido";
  const initials = clienteNombre.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const av = AVATAR_COLORS[index % AVATAR_COLORS.length];
  
  
  const estadoNormalizado = sale.estado ? sale.estado.toLowerCase() : "completada";
  const badge = STATUS_MAP[estadoNormalizado] || STATUS_MAP.completada;

  const dateObj = sale.fecha_hora ? new Date(sale.fecha_hora) : new Date();
  const fechaStr = dateObj.toLocaleDateString();
  const horaStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <tr>
      <td><span className="sale-id">V-{sale.id_venta}</span></td>
      <td>
        <div className="sale-client">
          <div className="sale-avatar" style={{ background: av.bg, color: av.color }}>
            {initials}
          </div>
          <div>
            <div className="sale-name">{clienteNombre}</div>
            <div className="sale-email" style={{ fontSize: "0.75rem", color: "#6b7280" }}>
              Cliente de la sucursal
            </div>
          </div>
        </div>
      </td>
      <td className="sale-date">
        <div style={{ fontWeight: 500 }}>{fechaStr}</div>
        <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>{horaStr}</div>
      </td>
      <td className="sale-emp">{vendedorNombre}</td>
      <td>
        <span style={{ fontSize: "0.8rem", padding: "2px 6px", background: "#f3f4f6", borderRadius: "4px", color: "#374151", fontWeight: 500 }}>
          {sale.metodo_pago}
        </span>
      </td>
      <td><span className="sale-amount">${Number(sale.total).toFixed(2)}</span></td>
      
      {}
      <td><span className={`sale-badge ${badge.cls}`}>{badge.txt}</span></td>
      
      <td>
        <div className="sale-actions">
          <button className="sale-action-btn btn-view" onClick={() => onView(sale)}>
            <IconEye />
          </button>
          
          {}
          {!readOnly && estadoNormalizado !== "cancelada" && (
            <button className="sale-action-btn btn-cancel" onClick={() => onCancel(sale.id_venta)}>
              <IconCancel />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
