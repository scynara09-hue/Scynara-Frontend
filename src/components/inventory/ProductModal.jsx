import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";

const EMPTY = {
  nombre: "",
  id_categoria: "",
  precio_unitario: "",
  precio_caja: "",
  cantidad: "",
  id_proveedor: "",
  fecha_caducidad: "",
};


const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  return dateString.split("T")[0]; 
};


export default function ProductModal({ open, product, categorias = [], proveedores = [], onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    setErrors({}); 

    setForm(product ? {
      ...product,
      id_categoria: product.id_categoria || "",
      precio_unitario: product.precio_unitario || "",
      precio_caja: product.precio_caja || "",
      cantidad: product.cantidad || "",
      id_proveedor: product.id_proveedor || "",
      fecha_caducidad: formatDateForInput(product.fecha_caducidad) || "",
    } : EMPTY);
  }, [product, open]);

  if (!open) return null;

  const set = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  
  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    if (!form.id_categoria) newErrors.id_categoria = "Selecciona una categoría.";
    if (form.precio_unitario === "" || parseFloat(form.precio_unitario) < 0) newErrors.precio_unitario = "Ingresa un precio válido.";
    if (form.precio_caja === "" || parseFloat(form.precio_caja) < 0) newErrors.precio_caja = "Ingresa un precio válido.";
    if (form.cantidad === "" || parseInt(form.cantidad) < 0) newErrors.cantidad = "Ingresa una cantidad válida.";
    if (!form.id_proveedor) newErrors.id_proveedor = "Selecciona un proveedor.";

    
    if (form.fecha_caducidad) {
      
      const todayStr = new Date().toISOString().split('T')[0];
      if (form.fecha_caducidad < todayStr) {
        newErrors.fecha_caducidad = "La fecha de caducidad no puede estar en el pasado.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const isFrontendValid = validateForm();
    
    if (isFrontendValid) {
      const dataToSend = {
        ...(product && { id_producto: product.id_producto }),
        nombre: form.nombre.trim(),
        id_categoria: form.id_categoria ? parseInt(form.id_categoria) : null,
        id_proveedor: form.id_proveedor ? parseInt(form.id_proveedor) : null,
        precio_unitario: parseFloat(form.precio_unitario) || 0,
        precio_caja: parseFloat(form.precio_caja) || 0,
        cantidad: parseInt(form.cantidad) || 0,
        fecha_caducidad: form.fecha_caducidad || null, 
      };

      onSave(dataToSend);
    }
  };

  return (
    <div className="inv-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="inv-modal">
        <div className="inv-modal-header">
          <h2>{product ? "Editar producto" : "Nuevo producto"}</h2>
          <button className="inv-modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="inv-modal-body">
          <div className="m-section-sep">Información General</div>
          
          <div className="m-field">
            <label>Nombre del producto *</label>
            <input 
              className={`m-input ${errors.nombre ? "input-error" : ""}`} 
              type="text" 
              placeholder="Ej: Leche entera 1L"
              value={form.nombre} 
              onChange={set("nombre")} 
            />
            {errors.nombre && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.nombre}</span>}
          </div>

          <div className="m-row">
            <div className="m-field">
              <label>Categoría *</label>
              <select 
                className={`m-input ${errors.id_categoria ? "input-error" : ""}`} 
                value={form.id_categoria} 
                onChange={set("id_categoria")}
              >
                <option value="">Selecciona...</option>
                {}
                {categorias.map(c => (
                  <option key={c.id_categoria} value={c.id_categoria}>
                    {c.categoria}
                  </option>
                ))}
              </select>
              {errors.id_categoria && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.id_categoria}</span>}
            </div>

            <div className="m-field">
              <label>Proveedor *</label>
              {}
              <select 
                className={`m-input ${errors.id_proveedor ? "input-error" : ""}`} 
                value={form.id_proveedor} 
                onChange={set("id_proveedor")}
              >
                <option value="">Selecciona un proveedor...</option>
                {proveedores.map(p => (
                  <option key={p.id_proveedor} value={p.id_proveedor}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              {errors.id_proveedor && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.id_proveedor}</span>}
            </div>
          </div>

          <div className="m-section-sep" style={{ marginTop: "12px" }}>Precios y Stock</div>

          <div className="m-row">
            <div className="m-field">
              <label>Precio unitario ($ MXN) *</label>
              <input 
                className={`m-input ${errors.precio_unitario ? "input-error" : ""}`} 
                type="number" 
                placeholder="0.00" min="0" step="0.01"
                value={form.precio_unitario} 
                onChange={set("precio_unitario")} 
              />
              {errors.precio_unitario && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.precio_unitario}</span>}
            </div>
            <div className="m-field">
              <label>Precio por caja ($ MXN) *</label>
              <input 
                className={`m-input ${errors.precio_caja ? "input-error" : ""}`} 
                type="number" 
                placeholder="0.00" min="0" step="0.01"
                value={form.precio_caja} 
                onChange={set("precio_caja")} 
              />
              {errors.precio_caja && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.precio_caja}</span>}
            </div>
          </div>

          <div className="m-row">
            <div className="m-field">
              <label>Cantidad en stock *</label>
              <input 
                className={`m-input ${errors.cantidad ? "input-error" : ""}`} 
                type="number" 
                placeholder="0" min="0"
                value={form.cantidad} 
                onChange={set("cantidad")} 
              />
              {errors.cantidad && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.cantidad}</span>}
            </div>
            <div className="m-field">
              <label>Fecha de caducidad</label>
              <input 
                className={`m-input ${errors.fecha_caducidad ? "input-error" : ""}`} 
                type="date"
                value={form.fecha_caducidad} 
                onChange={set("fecha_caducidad")} 
              />
              {}
              {errors.fecha_caducidad && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.fecha_caducidad}</span>}
            </div>
          </div>
        </div>

        <div className="inv-modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="m-btn-save" onClick={handleSave}>
            {product ? "Guardar cambios" : "Agregar producto"}
          </button>
        </div>
      </div>
    </div>
  );
}