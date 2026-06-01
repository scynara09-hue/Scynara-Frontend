import { useState, useEffect } from "react";
import SaleCart from "./SaleCart";
import { useVentas } from "../../context/VentaContext";
import { useCustomers } from "../../context/CustomersContext";

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

export default function NewSaleModal({ open, products, onClose, onSuccess }) {
  const { carrito, procesarVenta, limpiarCarrito, errors, setErrors } = useVentas();
  const { customers } = useCustomers(); 
  
  const [clienteId, setClienteId] = useState("");
  const [metodoPago, setMetodoPago] = useState("EFECTIVO");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      limpiarCarrito();
      setClienteId("");
      setMetodoPago("EFECTIVO");
      setIsSubmitting(false);
      setErrors(null); 
    }
  }, [open]);

  if (!open) return null;

  const handleSave = async () => {
    
    let valid = true;
    const localErrors = {};

    if (!clienteId) {
      localErrors.id_cliente = "Selecciona un cliente para la venta";
      valid = false;
    }

    if (carrito.length === 0) {
      localErrors.general = "Agrega al menos un producto al carrito";
      valid = false;
    }

    if (!valid) {
      setErrors(localErrors);
      return; 
    }

    
    setIsSubmitting(true);
    try {
      const response = await procesarVenta(clienteId, metodoPago);
      onSuccess(response.id_venta); 
    } catch (error) {
      
      setIsSubmitting(false);
    }
  };

  const handleOverlay = (e) => { 
    if (e.target === e.currentTarget && !isSubmitting) onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>Registrar nueva venta</h2>
          <button className="modal-close" onClick={onClose} disabled={isSubmitting}>
            <IconClose />
          </button>
        </div>

        <div className="modal-body">
          {}
          {errors?.general && (
            <div style={{ color: "#ef4444", backgroundColor: "#fef2f2", padding: "10px", borderRadius: "5px", marginBottom: "15px", fontSize: "0.9rem", border: "1px solid #f87171" }}>
              {errors.general}
            </div>
          )}

          <div className="m-row2">
            <div className="m-field">
              <label>Cliente <span style={{color: "red"}}>*</span></label>
              <select 
                className={`m-input ${errors?.id_cliente ? 'input-error' : ''}`} 
                style={errors?.id_cliente ? { borderColor: '#ef4444' } : {}}
                value={clienteId} 
                onChange={e => {
                  setClienteId(e.target.value);
                  
                  if (errors?.id_cliente) setErrors(prev => ({...prev, id_cliente: null}));
                }}
              >
                <option value="">Selecciona un cliente...</option>
                {customers?.map(c => (
                  <option key={c.id_cliente} value={c.id_cliente}>
                    {c.nombre} {c.apellidos || ""}
                  </option>
                ))}
              </select>
              {}
              {errors?.id_cliente && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.id_cliente}</span>}
            </div>

            <div className="m-field">
              <label>Método de Pago <span style={{color: "red"}}>*</span></label>
              <select 
                className={`m-input ${errors?.metodo_pago ? 'input-error' : ''}`} 
                style={errors?.metodo_pago ? { borderColor: '#ef4444' } : {}}
                value={metodoPago} 
                onChange={e => {
                  setMetodoPago(e.target.value);
                  
                  if (errors?.metodo_pago) setErrors(prev => ({...prev, metodo_pago: null}));
                }}
              >
                <option value="EFECTIVO">Efectivo</option>
                <option value="TARJETA">Tarjeta</option>
                <option value="TRANSFERENCIA">Transferencia</option>
              </select>
              {errors?.metodo_pago && <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "4px" }}>{errors.metodo_pago}</span>}
            </div>
          </div>

          <div className="m-divider" />
          <div className="m-section">Productos</div>

          <SaleCart products={products} />

        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose} disabled={isSubmitting}>
            Cancelar
          </button>
          <button 
            className="m-btn-save" 
            onClick={handleSave}
            disabled={isSubmitting} 
            style={{ opacity: isSubmitting ? 0.6 : 1 }}
          >
            {isSubmitting ? "Procesando..." : "Registrar venta"}
          </button>
        </div>
      </div>
    </div>
  );
}