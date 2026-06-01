
function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr) - new Date();
  return Math.ceil(d / (1000 * 60 * 60 * 24));
}

export function getStockLevel(cantidad) {
  if (cantidad <= 5) return "critical";
  if (cantidad <= 15) return "low";
  return "ok";
}

export default function InventoryStats({ products }) {
  const total = products.length;
  const ok = products.filter(p => getStockLevel(p.cantidad) === "ok").length;
  const low = products.filter(p => getStockLevel(p.cantidad) !== "ok").length;

  const exp = products.filter(p => {
    
    const d = daysUntil(p.fecha_caducidad);
    
    return d !== null && d >= 0 && d <= 7;
  }).length;

  const stats = [
    { num: total, label: "Total productos", icon: <IconBox />, bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
    { num: ok, label: "En buen stock", icon: <IconCheck />, bg: "rgba(52,211,153,0.15)", color: "#34d399" },
    { num: low, label: "Stock bajo", icon: <IconWarn />, bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
    { num: exp, label: "Por caducar (7d)", icon: <IconAlert />, bg: "rgba(239,68,68,0.12)", color: "#f87171" },
  ];

  return (
    <div className="inv-stats">
      {stats.map((s, i) => (
        <div key={i} className="inv-stat">
          <div className="inv-stat-icon" style={{ background: s.bg }}>
            {s.icon}
          </div>
          <div>
            <div className="inv-stat-num">{s.num}</div>
            <div className="inv-stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


const IconBox = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconWarn = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8" strokeLinecap="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.8" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);