import { useState } from "react";
import { Check, X } from "lucide-react";

function getDynamicColor(name) {
  if (!name) return { bg: "rgba(156,163,175,0.15)", color: "#9ca3af" };
  
  const colors = [
    { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
    { bg: "rgba(52,211,153,0.15)", color: "#34d399" },
    { bg: "rgba(96,165,250,0.15)", color: "#60a5fa" },
    { bg: "rgba(45,212,191,0.15)", color: "#2dd4bf" },
    { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
    { bg: "rgba(251,191,36,0.15)", color: "#fbbf24" },
    { bg: "rgba(168,85,247,0.15)", color: "#c084fc" },
    { bg: "rgba(248,113,113,0.15)", color: "#f87171" },
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
}

function getStockLevel(q) {
  if (q <= 5)  return "critical";
  if (q <= 15) return "low";
  return "ok";
}

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="13" height="13">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const IconDelete = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="13" height="13">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
  </svg>
);

const formatMXN = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(Number(value) || 0);
};

export default function ProductCard({ product, onEdit, onDelete, readOnly = false }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const { 
    id_producto, 
    nombre, 
    categoria_nombre, 
    precio_unitario, 
    precio_caja, 
    cantidad, 
    proveedor_nombre, 
    fecha_caducidad 
  } = product;

  const cc = getDynamicColor(categoria_nombre);
  const level = getStockLevel(cantidad);
  const days = daysUntil(fecha_caducidad);
  
  const stockW = Math.min(100, Math.round((cantidad / 150) * 100));
  const barColor = level === "ok" ? "#34d399" : level === "low" ? "#f59e0b" : "#f87171";
  
  let expClass = "prod-exp";
  let expTxt = "Sin caducidad";
  if (days !== null) {
    expClass = days <= 7 && days >= 0 ? "prod-exp near" : "prod-exp";
    expTxt = days < 0 ? "Caducado" : days === 0 ? "Caduca hoy" : `Cad. en ${days}d`;
  }

  return (
    <div className="prod-card">
      <div className="prod-card-top">
        <span className="prod-cat-badge" style={{ background: cc.bg, color: cc.color }}>
          {categoria_nombre || "Sin categoría"}
        </span>
        
        {!readOnly && (
        <div className="prod-actions" style={{ opacity: showConfirm ? 1 : undefined }}>
          {!showConfirm ? (
            <>
              <button className="prod-action-btn btn-edit" onClick={() => onEdit(product)}>
                <IconEdit />
              </button>
              <button className="prod-action-btn btn-del" onClick={() => setShowConfirm(true)}>
                <IconDelete />
              </button>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "rgba(248,113,113,0.1)", padding: "2px 4px", borderRadius: "8px" }}>
              <button 
                className="prod-action-btn btn-del" 
                onClick={() => {
                  onDelete(id_producto);
                  setShowConfirm(false);
                }}
              >
                <Check size={14} />
              </button>
              <button 
                className="prod-action-btn" 
                style={{ background: "var(--color-background-secondary)", color: "var(--color-text-secondary)" }}
                onClick={() => setShowConfirm(false)}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
        )}
      </div>

      <div>
        <div className="prod-name">{nombre}</div>
        <div className="prod-provider">Proveedor: {proveedor_nombre || "N/A"}</div>
      </div>

      <div className="prod-prices">
        <span className="prod-price-main">{formatMXN(precio_unitario)}</span>
        <span className="prod-price-box">· Caja {formatMXN(precio_caja)}</span>
      </div>

      <div className="stock-bar">
        <div className="stock-bar-fill" style={{ width: `${stockW}%`, background: barColor }} />
      </div>

      <div className="prod-footer">
        <span className={expClass}>{expTxt}</span>
      </div>
    </div>
  );
}
