export default function SalesStats({ sales }) {
  const today = new Date().toISOString().slice(0, 10);
  const todaySales = sales.filter(s => s.fecha === today && s.estado !== "cancelada");
  const total      = todaySales.reduce((a, s) => a + s.total, 0);
  const clients    = new Set(todaySales.map(s => s.id_cliente)).size;
  const cancelled  = sales.filter(s => s.fecha === today && s.estado === "cancelada").length;

  const stats = [
    {
      num: `$${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`,
      label: "Total del día", trend: "+12%", trendUp: true,
      iconBg: "var(--color-background-success)",
      icon: <IconDollar color="var(--color-text-success)" />,
    },
    {
      num: todaySales.length, label: "Ventas registradas",
      iconBg: "var(--color-background-info)",
      icon: <IconActivity color="var(--color-text-info)" />,
    },
    {
      num: clients, label: "Clientes atendidos",
      iconBg: "var(--color-background-warning)",
      icon: <IconUsers color="var(--color-text-warning)" />,
    },
    {
      num: cancelled, label: "Canceladas",
      iconBg: "var(--color-background-danger)",
      icon: <IconX color="var(--color-text-danger)" />,
    },
  ];

  return (
    <div className="sales-stats">
      {stats.map((s, i) => (
        <div key={i} className="s-stat">
          <div className="s-stat-icon" style={{ background: s.iconBg }}>
            {s.icon}
          </div>
          <div>
            <div className="s-stat-num">{s.num}</div>
            <div className="s-stat-label">{s.label}</div>
            {s.trend && (
              <span className={`s-trend ${s.trendUp ? "trend-up" : "trend-dn"}`}>
                {s.trend}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const IconDollar   = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);
const IconActivity = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconUsers    = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);
const IconX        = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);