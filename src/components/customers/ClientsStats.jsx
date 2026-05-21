function totalCompras(client) {
  return client.compras
    .filter(c => c.estado === "completada")
    .reduce((a, c) => a + c.total, 0);
}

export default function ClientsStats({ clients }) {
  const total     = clients.length;
  const conRFC    = clients.filter(c => c.RFC).length;
  const facturado = clients.reduce((a, c) => a + totalCompras(c), 0);

  const stats = [
    {
      num: total, label: "Total clientes",
      iconBg: "rgba(139,92,246,0.12)", icon: <IconUsers color="#a78bfa" />,
    },
    {
      num: conRFC, label: "Con RFC",
      iconBg: "rgba(52,211,153,0.12)", icon: <IconCheck color="#34d399" />,
    },
    {
      num: `$${facturado.toLocaleString("es-MX", { minimumFractionDigits: 2 })}`,
      label: "Total facturado",
      iconBg: "rgba(96,165,250,0.12)", icon: <IconDollar color="#60a5fa" />,
    },
  ];

  return (
    <div className="clients-stats">
      {stats.map((s, i) => (
        <div key={i} className="c-stat">
          <div className="c-stat-icon" style={{ background: s.iconBg }}>
            {s.icon}
          </div>
          <div>
            <div className="c-stat-num">{s.num}</div>
            <div className="c-stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const IconUsers  = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);
const IconCheck  = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <path d="M9 11l3 3L22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);
const IconDollar = ({ color }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" width="18" height="18">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);