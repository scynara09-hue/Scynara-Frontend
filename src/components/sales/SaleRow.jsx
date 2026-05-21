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
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="13" height="13">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconCancel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="13" height="13">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9"  y1="9" x2="15" y2="15"/>
  </svg>
);

export default function SaleRow({ sale, index, onView, onCancel }) {
  const initials = sale.cliente.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const av       = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const badge    = STATUS_MAP[sale.estado] || STATUS_MAP.pendiente;

  return (
    <tr>
      <td><span className="sale-id">{sale.id_venta}</span></td>
      <td>
        <div className="sale-client">
          <div className="sale-avatar" style={{ background: av.bg, color: av.color }}>
            {initials}
          </div>
          <div>
            <div className="sale-name">{sale.cliente}</div>
            <div className="sale-email">{sale.empleado}</div>
          </div>
        </div>
      </td>
      <td className="sale-date">{sale.fecha}</td>
      <td className="sale-emp">{sale.empleado}</td>
      <td><span className="sale-amount">${Number(sale.total).toFixed(2)}</span></td>
      <td><span className={`sale-badge ${badge.cls}`}>{badge.txt}</span></td>
      <td>
        <div className="sale-actions">
          <button className="sale-action-btn btn-view" onClick={() => onView(sale)}>
            <IconEye />
          </button>
          {sale.estado !== "cancelada" && (
            <button className="sale-action-btn btn-cancel" onClick={() => onCancel(sale.id_venta)}>
              <IconCancel />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}