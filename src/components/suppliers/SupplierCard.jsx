import { Mail, Phone, MapPin, Pencil } from "lucide-react";

const COLORS = [
  { bg: "rgba(14,165,233,0.12)",  color: "#0ea5e9" },
  { bg: "rgba(52,211,153,0.12)",  color: "#34d399" },
  { bg: "rgba(167,139,250,0.12)", color: "#a78bfa" },
  { bg: "rgba(245,158,11,0.12)",  color: "#f59e0b" },
  { bg: "rgba(248,113,113,0.12)", color: "#f87171" },
];

function initials(nombre) {
  return nombre?.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase() || "?";
}

export default function SupplierCard({ supplier, selected, onSelect, onEdit }) {
  const col = COLORS[supplier.id_S % COLORS.length];
  const estadoClass = supplier.estado === "activo" ? "activo" : supplier.estado === "pausado" ? "pausado" : "inactivo";

  return (
    <div
      className={`supplier-card${selected ? " selected" : ""}`}
      onClick={() => onSelect(supplier.id_S)}
    >
      <div className="sc-top">
        <div className="sc-avatar" style={{ background: col.bg, color: col.color }}>
          {initials(supplier.nombre)}
        </div>
        <div className="sc-info">
          <p>{supplier.nombre}</p>
          <span>{supplier.contacto}</span>
          <div>
            <span className="sc-categoria">{supplier.categoria}</span>
          </div>
          <div>
            <span className={`sc-status ${estadoClass}`}>
              {supplier.estado.charAt(0).toUpperCase() + supplier.estado.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="sc-divider" />

      <div className="sc-detail">
        {supplier.correo && (
          <div className="sc-row"><Mail size={12} />{supplier.correo}</div>
        )}
        {supplier.telefono && (
          <div className="sc-row"><Phone size={12} />{supplier.telefono}</div>
        )}
        {supplier.ciudad && (
          <div className="sc-row"><MapPin size={12} />{supplier.ciudad}</div>
        )}
      </div>

      <div className="sc-footer">
        <div className="sc-productos">
          <span>{supplier.productos?.length || 0}</span> productos
        </div>
        <button
          className="sc-edit-btn"
          onClick={e => { e.stopPropagation(); onEdit(supplier.id_S); }}
        >
          <Pencil size={12} />
        </button>
      </div>
    </div>
  );
}