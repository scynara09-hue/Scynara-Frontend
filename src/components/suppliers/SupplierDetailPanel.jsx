import { useState, useEffect } from "react";
import { Truck, Mail, Phone, MapPin, Pencil, Trash2, Package, Tag, Activity, Check, X } from "lucide-react";

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

export default function SupplierDetailPanel({ supplier, onEdit, onDelete, readOnly = false }) {
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setShowConfirm(false);
  }, [supplier]);

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

  const col = COLORS[(supplier.id_proveedor || 0) % COLORS.length];

  const infoRows = [
    { icon: <Activity size={13} />, label: "Estado", val: supplier.estado || "ACTIVO", bg: "rgba(52,211,153,0.1)", color: "#34d399" },
    { icon: <Tag size={13} />, label: "Categoría", val: supplier.nombre_categoria || "Sin categoría", bg: "rgba(167,139,250,0.1)", color: "#a78bfa" },
    { icon: <Mail size={13} />, label: "Correo", val: supplier.correo || "—", bg: "rgba(14,165,233,0.1)", color: "#0ea5e9" },
    { icon: <Phone size={13} />, label: "Teléfono", val: supplier.telefono || "—", bg: "rgba(52,211,153,0.1)", color: "#34d399" },
    { icon: <MapPin size={13} />, label: "Dirección", val: supplier.direccion || "—", bg: "rgba(245,158,11,0.1)", color: "#f59e0b" },
    { icon: <Truck size={13} />, label: "Tiempo de entrega", val: supplier.tiempo_entregas ? `${supplier.tiempo_entregas} horas` : "No especificado", bg: "rgba(248,113,113,0.1)", color: "#f87171" },
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

        {!readOnly && (
        <div className="sp-actions">
          {!showConfirm ? (
            <>
              <button className="sp-btn sp-btn-edit" onClick={() => onEdit(supplier.id_proveedor)}>
                <Pencil size={13} /> Editar
              </button>
              <button className="sp-btn sp-btn-del" onClick={() => setShowConfirm(true)}>
                <Trash2 size={13} /> Eliminar
              </button>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(248,113,113,0.1)", padding: "4px 8px", borderRadius: "6px" }}>
              <span style={{ fontSize: "12px", color: "var(--color-text-primary)", fontWeight: "500", marginRight: "4px" }}>
                ¿Eliminar?
              </span>
              <button 
                className="sp-btn sp-btn-del" 
                style={{ padding: "4px 8px" }}
                onClick={() => {
                  onDelete(supplier.id_proveedor);
                  setShowConfirm(false);
                }}
              >
                <Check size={13} /> Sí
              </button>
              <button 
                className="sp-btn" 
                style={{ padding: "4px 8px" }}
                onClick={() => setShowConfirm(false)}
              >
                <X size={13} /> No
              </button>
            </div>
          )}
        </div>
        )}
      </div>

      <div className="sp-divider" />

      <div className="sp-section">
        <div className="sp-section-title">Información General</div>
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
