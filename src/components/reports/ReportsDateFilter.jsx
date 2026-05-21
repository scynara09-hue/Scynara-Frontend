const PERIODS = [
  { key: "today",  label: "Hoy" },
  { key: "week",   label: "Esta semana" },
  { key: "month",  label: "Este mes" },
  { key: "year",   label: "Este año" },
  { key: "custom", label: "Personalizado" },
];

export default function ReportsDateFilter({ period, onPeriod, dateFrom, dateTo, onDateFrom, onDateTo }) {
  return (
    <div className="reports-date-filter">
      {PERIODS.map(p => (
        <button
          key={p.key}
          className={`rdf-btn${period === p.key ? " active" : ""}`}
          onClick={() => onPeriod(p.key)}
        >
          {p.label}
        </button>
      ))}

      {period === "custom" && (
        <>
          <div className="rdf-separator" />
          <div className="rdf-custom">
            <input
              type="date"
              className="rdf-date-input"
              value={dateFrom}
              onChange={e => onDateFrom(e.target.value)}
            />
            <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>—</span>
            <input
              type="date"
              className="rdf-date-input"
              value={dateTo}
              onChange={e => onDateTo(e.target.value)}
            />
          </div>
        </>
      )}
    </div>
  );
}