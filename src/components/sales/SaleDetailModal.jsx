import { useState, useEffect } from "react";
import { getVentaByIdRequest } from "../../services/ventasService"; 

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
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
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    if (open && sale?.id_venta) {
      setLoading(true);
      getVentaByIdRequest(sale.id_venta)
        .then(res => {
          if (isMounted) {
            setDetalles(res.data.detalles || []);
          }
        })
        .catch(err => {
          if (isMounted) {
            setDetalles([]);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    } else {
      setDetalles([]);
    }
    
    return () => {
      isMounted = false;
    };
  }, [open, sale]);

  if (!open || !sale) return null;

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  const dateObj = sale.fecha_hora ? new Date(sale.fecha_hora) : new Date();
  const fechaCompleta = `${dateObj.toLocaleDateString()} a las ${dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  
  const estadoNormalizado = sale.estado ? sale.estado.toLowerCase() : "completada";

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>Detalle de venta</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="modal-body">
          {[
            ["ID de venta",   `V-${sale.id_venta}`],
            ["Cliente",       sale.cliente_nombre || "Público General"],
            ["Vendedor",      sale.vendedor_nombre || "Desconocido"],
            ["Fecha y Hora",  fechaCompleta],
            ["Método de Pago", sale.metodo_pago], 
            ["Estado",        STATUS_LABELS[estadoNormalizado] || "Completada"], 
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
            {loading ? (
              <div style={{ textAlign: "center", padding: "15px", color: "#6b7280" }}>
                Cargando productos...
              </div>
            ) : detalles.length > 0 ? (
              detalles.map((p) => (
                <div key={p.id_detalle} className="detail-prod-row">
                  <span>{p.producto_nombre} × {p.cantidad}</span>
                  <span>${Number(p.subtotal).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "15px", color: "#6b7280" }}>
                No hay productos en esta venta.
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}