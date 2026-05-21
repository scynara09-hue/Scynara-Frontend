import { useState, useEffect } from "react";

// Convertimos las categorías a objetos con ID para que coincidan con la BD.
// (Asumiendo que estos son los IDs de tu tabla Categoria. Ajusta los números si son diferentes).
const CATEGORIES = [
  { id: 1, name: "Comestibles" },
  { id: 2, name: "Perecederos" },
  { id: 3, name: "Bebidas" },
  { id: 4, name: "Limpieza" },
  { id: 5, name: "Higiene personal" },
  { id: 6, name: "Botanas" },
  { id: 7, name: "Mascotas" },
];

const EMPTY = {
  nombre: "",
  id_categoria: "",
  precio_unitario: "",
  precio_caja: "",
  cantidad: "",
  id_proveedor: "",
  fecha_caducidad: "",
};

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="15" height="15">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Helper para asegurar que la fecha que viene de SQL se vea bien en el input
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return dateString.split("T")[0]; // Corta el "T00:00:00.000Z"
};

export default function ProductModal({ open, product, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    if (!open) return;

    setForm(product ? {
      nombre: product.nombre || "",
      id_categoria: product.id_categoria || "",
      precio_unitario: product.precio_unitario || "",
      precio_caja: product.precio_caja || "",
      cantidad: product.cantidad || "",
      id_proveedor: product.id_proveedor || "",
      fecha_caducidad: formatDateForInput(product.fecha_caducidad) || "",
    } : EMPTY);
  }, [product, open]);

  if (!open) return null;

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.nombre) return;

    // Preparamos la data exactamente como Zod y SQL la esperan
    const dataToSend = {
      // Si estamos editando, mantenemos el ID original
      ...(product && { id_producto: product.id_producto }),
      nombre: form.nombre.trim(),
      id_categoria: form.id_categoria ? parseInt(form.id_categoria) : null,
      id_proveedor: form.id_proveedor ? parseInt(form.id_proveedor) : null,
      precio_unitario: parseFloat(form.precio_unitario) || 0,
      precio_caja: parseFloat(form.precio_caja) || 0,
      cantidad: parseInt(form.cantidad) || 0,
      fecha_caducidad: form.fecha_caducidad || null, // Enviamos null si está vacío
    };

    onSave(dataToSend);
  };

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>{product ? "Editar producto" : "Agregar producto"}</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Nombre</label>
            <input className="m-input" type="text" placeholder="Ej: Leche entera"
              value={form.nombre} onChange={set("nombre")} />
          </div>
          <div className="m-field">
            <label>Categoría</label>
            <select className="m-input" value={form.id_categoria} onChange={set("id_categoria")}>
              <option value="">Selecciona...</option>
              {CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Precio unitario</label>
            <input className="m-input" type="number" placeholder="0.00" min="0" step="0.01"
              value={form.precio_unitario} onChange={set("precio_unitario")} />
          </div>
          <div className="m-field">
            <label>Precio por caja</label>
            <input className="m-input" type="number" placeholder="0.00" min="0" step="0.01"
              value={form.precio_caja} onChange={set("precio_caja")} />
          </div>
        </div>

        <div className="m-row">
          <div className="m-field">
            <label>Cantidad en stock</label>
            <input className="m-input" type="number" placeholder="0" min="0"
              value={form.cantidad} onChange={set("cantidad")} />
          </div>
          <div className="m-field">
            <label>Proveedor (ID)</label>
            <input className="m-input" type="number" placeholder="ID del proveedor" min="1"
              value={form.id_proveedor} onChange={set("id_proveedor")} />
          </div>
        </div>

        <div className="m-row">
          <div className="m-field" style={{ width: '100%' }}>
            <label>Fecha de caducidad</label>
            <input className="m-input" type="date"
              value={form.fecha_caducidad} onChange={set("fecha_caducidad")} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button
            className="m-btn-save"
            onClick={handleSave}
            disabled={!form.nombre}
            style={{ opacity: form.nombre ? 1 : 0.5 }}
          >
            Guardar producto
          </button>
        </div>
      </div>
    </div>
  );
}