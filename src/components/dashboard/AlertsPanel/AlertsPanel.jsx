const sales = [
  { initials: "MR", avatarClass: "va-p", name: "María Ramírez",  time: "hace 12 min · 4 productos", amount: "$342" },
  { initials: "JL", avatarClass: "va-g", name: "Jorge López",    time: "hace 38 min · 2 productos", amount: "$89"  },
  { initials: "AG", avatarClass: "va-b", name: "Ana Gutiérrez",  time: "hace 1h · 7 productos",     amount: "$670" },
  { initials: "RM", avatarClass: "va-a", name: "Roberto M.",     time: "hace 2h · 1 producto",      amount: "$55"  },
];

export default function RecentSales() {
  return (
    <div className="dash-panel">
      <div className="panel-title">Últimas ventas del día</div>
      {sales.map((s, i) => (
        <div key={i} className="venta-row">
          <div className={`venta-avatar ${s.avatarClass}`}>{s.initials}</div>
          <div className="venta-info">
            <p>{s.name}</p>
            <span>{s.time}</span>
          </div>
          <div className="venta-amount">{s.amount}</div>
        </div>
      ))}
    </div>
  );
}