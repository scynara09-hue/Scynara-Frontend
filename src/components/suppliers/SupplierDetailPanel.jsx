import { Truck, Mail, Phone, MapPin, FileText, Pencil, Trash2, Package } from "lucide-react";

function initials(nombre) {
  return nombre?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
}

const COLORS = [
  { bg: "rgba(14,165,233,0.12)", color: "#0ea5e9" },
  { bg: "rgba(52,211,153,0.12)", color: "#34d399" },
  { bg: "rgba(167,139,250,0.12)", color: "#a78bfa" },
  { bg: "rgba(245,158,11,0.12)", color: "#f59e0b" },
  { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
];

export default function SupplierDetailPanel({ supplier, onEdit, onDelete }) {
  if (!supplier) {
    return (
      <div className="supplier-detail-panel">
        <div className="sp-empty">
          <Truck size={32} strokeWidth={1.5} />
          <p>Selecciona un proveedor para ver sus detalles</p>
        </div>
      </div>
    );
  }

  // Usamos el id_proveedor para el color cíclico
  const col = COLORS[supplier.id_proveedor % COLORS.length];

  const infoRows = [
    { icon: <Mail size={13} />, label: "Correo", val: supplier.correo || "—", bg: "rgba(14,165,233,0.1)", color: "#0ea5e9" },
    { icon: <Phone size={13} />, label: "Teléfono", val: supplier.telefono || "—", bg: "rgba(52,211,153,0.1)", color: "#34d399" },
    { icon: <MapPin size={13} />, label: "Dirección", val: supplier.direccion || "—", bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
    { icon: <Truck size={13} />, label: "Entrega", val: supplier.tiempo_entregas || "No especificado", bg: "rgba(167,139,250,0.1)", color: "#a78bfa" },
  ];

  return (
    <div className="supplier-detail-panel">
      <div className="sp-header">
        <div className="sp-avatar-row">
          <div className="sp-avatar" style={{ background: col.bg, color: col.color }}>
            {initials(supplier.nombre)}
          </div>
          <div>
            <div className="sp-name">{supplier.nombre}</div>
            <div className="sp-id">ID #{supplier.id_proveedor}</div>
          </div>
        </div>

        <div className="sp-actions">
          <button className="sp-btn sp-btn-edit" onClick={() => onEdit(supplier.id_proveedor)}>
            <Pencil size={13} /> Editar
          </button>
          <button className="sp-btn sp-btn-del" onClick={() => onDelete(supplier.id_proveedor)}>
            <Trash2 size={13} /> Eliminar
          </button>
        </div>
      </div>

      <div className="sp-divider" />

      {/* Info general */}
      <div className="sp-section">
        <div className="sp-section-title">Información de Contacto</div>
        {infoRows.map((row, i) => (
          <div className="sp-info-row" key={i}>
            <div className="sp-info-icon" style={{ background: row.bg, color: row.color }}>
              {row.icon}
            </div>
            <div>
              <div className="sp-info-label">{row.label}</div>
              <div className="sp-info-val">{row.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sp-divider" />

      {/* Productos */}
      <div className="sp-section">
        <div className="sp-section-title">
          <Package size={11} style={{ display: "inline", marginRight: 4 }} />
          Productos
        </div>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>
          Sección conectada a inventario disponible próximamente.
        </p>
      </div>
    </div>
  );
}