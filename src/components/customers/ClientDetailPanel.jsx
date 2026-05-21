const COLORS = [
  { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
  { bg: "rgba(45,212,191,0.15)",  color: "#2dd4bf" },
];

const STATUS_DOT = {
  completada: "dot-green",
  cancelada:  "dot-red",
  pendiente:  "dot-amber",
};

// ── Iconos info ──────────────────────────────────────
const IconMail  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconPhone = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const IconLoc   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconDoc   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="13" height="13"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconEdit  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IconTrash = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>;
const IconUser  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width="40" height="40"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;

function InfoRow({ bg, color, icon, label, value }) {
  return (
    <div className="detail-info-row">
      <div className="detail-info-icon" style={{ background: bg, color }}>
        {icon}
      </div>
      <div>
        <div className="detail-info-label">{label}</div>
        <div className="detail-info-val">{value || "—"}</div>
      </div>
    </div>
  );
}

export default function ClientDetailPanel({ client, clientIndex, onEdit, onDelete }) {
  if (!client) {
    return (
      <div className="client-detail-panel">
        <div className="panel-empty">
          <IconUser />
          <p>Selecciona un cliente<br />para ver sus detalles</p>
        </div>
      </div>
    );
  }

  const av       = COLORS[clientIndex % COLORS.length];
  const initials = (client.nombre[0] + (client.apellidos[0] || "")).toUpperCase();
  const total    = client.compras
    .filter(c => c.estado === "completada")
    .reduce((a, c) => a + c.total, 0);

  return (
    <div className="client-detail-panel">
      {/* Header */}
      <div className="detail-header">
        <div className="detail-avatar-row">
          <div className="detail-avatar" style={{ background: av.bg, color: av.color }}>
            {initials}
          </div>
          <div>
            <div className="detail-name">{client.nombre} {client.apellidos}</div>
            <div className="detail-id">ID #{client.id_C} · {client.compras.length} compras</div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="detail-btn detail-btn-edit" onClick={() => onEdit(client.id_C)}>
            <IconEdit /> Editar
          </button>
          <button className="detail-btn detail-btn-del" onClick={() => onDelete(client.id_C)}>
            <IconTrash /> Eliminar
          </button>
        </div>
      </div>

      <div className="detail-divider" />

      {/* Info */}
      <div className="detail-section">
        <div className="detail-section-title">Información de contacto</div>
        <InfoRow bg="rgba(139,92,246,0.12)" color="#a78bfa" icon={<IconMail />}  label="Correo"    value={client.correo}    />
        <InfoRow bg="rgba(52,211,153,0.12)"  color="#34d399" icon={<IconPhone />} label="Teléfono"  value={client.telefono}  />
        <InfoRow bg="rgba(96,165,250,0.12)"  color="#60a5fa" icon={<IconLoc />}   label="Dirección" value={client.direccion} />
        {client.RFC && (
          <InfoRow bg="rgba(251,191,36,0.12)" color="#fbbf24" icon={<IconDoc />} label="RFC" value={client.RFC} />
        )}
      </div>

      <div className="detail-divider" />

      {/* Historial */}
      <div className="detail-section">
        <div className="detail-section-title">Historial de compras</div>
        {client.compras.length === 0 ? (
          <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", padding: "12px 0" }}>
            Sin compras registradas
          </p>
        ) : (
          client.compras.map((v, i) => (
            <div key={i} className="history-item">
              <span className={`history-dot ${STATUS_DOT[v.estado] || "dot-amber"}`} />
              <div className="history-info">
                <p>{v.id_venta} — {v.productos}</p>
                <span>{v.fecha}</span>
              </div>
              <span className="history-amount">${v.total.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      {/* Resumen */}
      <div className="detail-summary">
        <div className="summary-row">
          <span className="summary-label">Completadas</span>
          <span>{client.compras.filter(c => c.estado === "completada").length}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Canceladas</span>
          <span>{client.compras.filter(c => c.estado === "cancelada").length}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Total facturado</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}