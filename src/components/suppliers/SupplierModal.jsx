import { useState, useEffect } from "react";

const EMPTY = {
  nombre: "",
  telefono: "",
  correo: "",
  direccion: "",
  tiempo_entregas: "",
};

export default function SupplierModal({ open, supplier, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    // Si hay supplier, cargamos sus datos, si no, reiniciamos a vacío
    setForm(supplier ? { ...supplier } : EMPTY);
  }, [supplier, open]);

  if (!open) return null;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.nombre.trim()) return;
    onSave(form);
  };

  return (
    <div className="sup-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="sup-modal">
        <div className="sup-modal-header">
          <h2>{supplier ? "Editar proveedor" : "Nuevo proveedor"}</h2>
          <button className="sup-modal-close" onClick={onClose}><X size={14} /></button>
        </div>

        <div className="sup-modal-body">
          <div className="sup-section-sep">Datos generales</div>

          <div className="sup-row2">
            <div className="sup-field">
              <label>Nombre empresa *</label>
              <input className="sup-input" placeholder="Distribuidora XYZ" value={form.nombre} onChange={e => set("nombre", e.target.value)} />
            </div>
            <div className="sup-field">
              <label>Teléfono <span className="sup-optional">(opcional)</span></label>
              <input className="sup-input" placeholder="55 1234 5678" value={form.telefono} onChange={e => set("telefono", e.target.value)} />
            </div>
          </div>

          <div className="sup-field">
            <label>Correo <span className="sup-optional">(opcional)</span></label>
            <input className="sup-input" type="email" placeholder="contacto@empresa.com" value={form.correo} onChange={e => set("correo", e.target.value)} />
          </div>

          <div className="sup-section-sep">Logística y Ubicación</div>

          <div className="sup-field">
            <label>Dirección <span className="sup-optional">(opcional)</span></label>
            <input className="sup-input" placeholder="Calle, No., Col." value={form.direccion} onChange={e => set("direccion", e.target.value)} />
          </div>

          <div className="sup-field">
            <label>Tiempo de entrega (ej: 24h, 48h) <span className="sup-optional">(opcional)</span></label>
            <input className="sup-input" placeholder="Ej: 24 horas" value={form.tiempo_entregas} onChange={e => set("tiempo_entregas", e.target.value)} />
          </div>
        </div>

        <div className="sup-modal-footer">
          <button className="sup-btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="sup-btn-save" onClick={handleSave}>
            {supplier ? "Guardar cambios" : "Agregar proveedor"}
          </button>
        </div>
      </div>
    </div>
  );
}