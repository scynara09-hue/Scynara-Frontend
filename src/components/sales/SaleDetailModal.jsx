const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

const STATUS_LABELS = {
  completada: "Completada",
  cancelada:  "Cancelada",
  pendiente:  "Pendiente",
};

export default function SaleDetailModal({ open, sale, onClose }) {
  if (!open || !sale) return null;

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>Detalle de venta</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="modal-body">
          {[
            ["ID de venta",   sale.id_venta],
            ["Cliente",       sale.cliente],
            ["Empleado",      sale.empleado],
            ["Fecha",         sale.fecha],
            ["Estado",        STATUS_LABELS[sale.estado] || sale.estado],
            ["Total",         `$${Number(sale.total).toFixed(2)}`],
          ].map(([label, val]) => (
            <div key={label} className="detail-row">
              <span className="detail-label">{label}</span>
              <span className="detail-val">{val}</span>
            </div>
          ))}

          <div className="m-section" style={{ marginTop: 18, marginBottom: 10 }}>
            Productos
          </div>

          <div className="detail-products">
            {sale.productos?.map((p, i) => (
              <div key={i} className="detail-prod-row">
                <span>{p.nombre} × {p.qty}</span>
                <span>${(p.precio * p.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}