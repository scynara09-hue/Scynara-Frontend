const CAT_COLORS = {
  Comestibles:        { bg: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  Perecederos:        { bg: "rgba(52,211,153,0.15)",  color: "#34d399" },
  Bebidas:            { bg: "rgba(96,165,250,0.15)",  color: "#60a5fa" },
  Limpieza:           { bg: "rgba(45,212,191,0.15)",  color: "#2dd4bf" },
  "Higiene personal": { bg: "rgba(244,114,182,0.15)", color: "#f472b6" },
  Botanas:            { bg: "rgba(251,191,36,0.15)",  color: "#fbbf24" },
  Mascotas:           { bg: "rgba(168,85,247,0.15)",  color: "#c084fc" },
};

function daysUntil(dateStr) {
  if (!dateStr) return null; // Retorna null si no hay fecha de caducidad
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

export default function ProductCard({ product, onEdit, onDelete }) {
  // ACTUALIZADO: Leemos las propiedades exactas que manda el backend
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

  // Si no encuentra el color, asigna un gris genérico
  const cc = CAT_COLORS[categoria_nombre] || { bg: "rgba(156,163,175,0.15)", color: "#9ca3af" };
  const level = getStockLevel(cantidad);
  const days = daysUntil(fecha_caducidad);
  
  const stockW = Math.min(100, Math.round((cantidad / 150) * 100));
  const barColor = level === "ok" ? "#34d399" : level === "low" ? "#f59e0b" : "#f87171";

  const stockClass = `prod-stock ${level === "ok" ? "stock-ok" : level === "low" ? "stock-low" : "stock-critical"}`;
  
  // Lógica para renderizar la caducidad solo si existe
  let expClass = "prod-exp";
  let expTxt = "Sin caducidad";
  if (days !== null) {
    expClass = days <= 7 && days >= 0 ? "prod-exp near" : "prod-exp";
    expTxt = days < 0 ? "Caducado" : days === 0 ? "Caduca hoy" : `Cad. en ${days}d`;
  }

  const stockIcon = level === "ok" ? "●" : level === "low" ? "▲" : "▼";

  return (
    <div className="prod-card">
      <div className="prod-card-top">
        <span className="prod-cat-badge" style={{ background: cc.bg, color: cc.color }}>
          {categoria_nombre || "Sin categoría"}
        </span>
        <div className="prod-actions">
          <button className="prod-action-btn btn-edit" onClick={() => onEdit(product)}>
            <IconEdit />
          </button>
          <button className="prod-action-btn btn-del" onClick={() => onDelete(id_producto)}>
            <IconDelete />
          </button>
        </div>
      </div>

      <div>
        <div className="prod-name">{nombre}</div>
        <div className="prod-provider">Proveedor: {proveedor_nombre || "N/A"}</div>
      </div>

      <div className="prod-prices">
        {/* Usamos precio_unitario en lugar de precio y protegemos con Number() */}
        <span className="prod-price-main">${Number(precio_unitario || 0).toFixed(2)}</span>
        <span className="prod-price-box">· Caja ${Number(precio_caja || 0).toFixed(2)}</span>
      </div>

      <div className="stock-bar">
        <div className="stock-bar-fill" style={{ width: `${stockW}%`, background: barColor }} />
      </div>

      <div className="prod-footer">
        <span className={stockClass}>{stockIcon} {cantidad} uds</span>
        <span className={expClass}>{expTxt}</span>
      </div>
    </div>
  );
}