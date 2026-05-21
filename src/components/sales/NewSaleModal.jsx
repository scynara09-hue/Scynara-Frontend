import { useState } from "react";
import SaleCart from "./SaleCart";

const CLIENTS = [
  { id_C: 1, nombre: "María Ramírez"  },
  { id_C: 2, nombre: "Jorge López"    },
  { id_C: 3, nombre: "Ana Gutiérrez"  },
  { id_C: 4, nombre: "Roberto Mendoza"},
];

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="14" height="14">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

export default function NewSaleModal({ open, products, onClose, onSave }) {
  const [cart,     setCart]     = useState([]);
  const [clienteId, setCliente] = useState("");
  const [fecha,    setFecha]    = useState(new Date().toISOString().slice(0, 10));

  if (!open) return null;

  const handleAdd = ({ id, nombre, precio }) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === id);
      if (ex) return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { id, nombre, precio, qty: 1 }];
    });
  };

  const handleChangeQty = (id, delta) => {
    setCart(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, qty: c.qty + delta } : c);
      return updated.filter(c => c.qty > 0);
    });
  };

  const handleRemove = (id) => setCart(prev => prev.filter(c => c.id !== id));

  const handleSave = () => {
    if (!cart.length) return;
    const total   = cart.reduce((a, c) => a + c.precio * c.qty, 0);
    const cliente = clienteId
      ? CLIENTS.find(c => String(c.id_C) === clienteId)?.nombre || "Mostrador"
      : "Mostrador";
    onSave({ clienteId, cliente, fecha, total, productos: cart });
    setCart([]);
    setCliente("");
    setFecha(new Date().toISOString().slice(0, 10));
  };

  const handleOverlay = (e) => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>Registrar nueva venta</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="modal-body">
          <div className="m-row2">
            <div className="m-field">
              <label>Cliente</label>
              <select className="m-input" value={clienteId} onChange={e => setCliente(e.target.value)}>
                <option value="">Sin cliente (mostrador)</option>
                {CLIENTS.map(c => (
                  <option key={c.id_C} value={c.id_C}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="m-field">
              <label>Fecha</label>
              <input className="m-input" type="date"
                value={fecha} onChange={e => setFecha(e.target.value)} />
            </div>
          </div>

          <div className="m-divider" />
          <div className="m-section">Productos</div>

          <SaleCart
            items={cart}
            products={products}
            onAdd={handleAdd}
            onChangeQty={handleChangeQty}
            onRemove={handleRemove}
          />
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="m-btn-save" onClick={handleSave}
            disabled={!cart.length} style={{ opacity: cart.length ? 1 : 0.5 }}>
            Registrar venta
          </button>
        </div>
      </div>
    </div>
  );
}