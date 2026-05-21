const COLORS = [
  { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
  { bg: "rgba(45,212,191,0.15)",  color: "#2dd4bf" },
];

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="12" height="12">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12"/>
  </svg>
);
const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="12" height="12">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="12" height="12">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

export default function ClientCard({ client, index, selected, onSelect, onEdit }) {
  const av      = COLORS[index % COLORS.length];
  const initials = (client.nombre[0] + (client.apellidos[0] || "")).toUpperCase();
  const total   = client.compras
    .filter(c => c.estado === "completada")
    .reduce((a, c) => a + c.total, 0);

  return (
    <div
      className={`client-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(client.id_C)}
    >
      <div className="cc-top">
        <div className="cc-avatar" style={{ background: av.bg, color: av.color }}>
          {initials}
        </div>
        <div className="cc-info">
          <p>{client.nombre} {client.apellidos}</p>
          <span>{client.correo}</span>
          <div className={`cc-rfc ${client.RFC ? "has" : "no"}`}>
            {client.RFC ? "● Con RFC" : "○ Sin RFC"}
          </div>
        </div>
      </div>

      <div className="cc-divider" />

      <div className="cc-detail">
        <div className="cc-row">
          <IconPhone />
          {client.telefono}
        </div>
        <div className="cc-row">
          <IconMap />
          {client.direccion?.split(",")[0] || "—"}
        </div>
      </div>

      <div className="cc-footer">
        <div className="cc-compras">
          <span>{client.compras.length}</span> compras · ${total.toFixed(2)}
        </div>
        <button
          className="cc-edit-btn"
          onClick={e => { e.stopPropagation(); onEdit(client.id_C); }}
        >
          <IconEdit />
        </button>
      </div>
    </div>
  );
}