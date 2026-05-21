import { useState, useEffect } from "react";

const EMPTY = {
  nombre: "", apellidos: "", correo: "",
  telefono: "", RFC: "", direccion: "",
};

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" width="13" height="13">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

export default function ClientModal({ open, client, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(client ? {
      nombre:    client.nombre    || "",
      apellidos: client.apellidos || "",
      correo:    client.correo    || "",
      telefono:  client.telefono  || "",
      RFC:       client.RFC       || "",
      direccion: client.direccion || "",
    } : EMPTY);
  }, [client, open]);

  if (!open) return null;

  const set = field => e => setForm(p => ({ ...p, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.nombre || !form.apellidos) return;
    onSave({ ...client, ...form });
  };

  const handleOverlay = e => { if (e.target === e.currentTarget) onClose(); };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal">
        <div className="modal-header">
          <h2>{client ? "Editar cliente" : "Agregar cliente"}</h2>
          <button className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="modal-body">
          <div className="m-row2">
            <div className="m-field">
              <label>Nombre(s)</label>
              <input className="m-input" placeholder="María"
                value={form.nombre} onChange={set("nombre")} />
            </div>
            <div className="m-field">
              <label>Apellidos</label>
              <input className="m-input" placeholder="Ramírez López"
                value={form.apellidos} onChange={set("apellidos")} />
            </div>
          </div>

          <div className="m-field">
            <label>Correo electrónico</label>
            <input className="m-input" type="email" placeholder="maria@ejemplo.com"
              value={form.correo} onChange={set("correo")} />
          </div>

          <div className="m-row2">
            <div className="m-field">
              <label>Teléfono</label>
              <input className="m-input" type="tel" placeholder="55 1234 5678"
                value={form.telefono} onChange={set("telefono")} />
            </div>
            <div className="m-field">
              <label>RFC <span className="m-optional">(opcional)</span></label>
              <input className="m-input" placeholder="RAMM850101ABC"
                value={form.RFC} onChange={set("RFC")} />
              <span className="m-hint">Solo si solicita facturación</span>
            </div>
          </div>

          <div className="m-field">
            <label>Dirección</label>
            <input className="m-input" placeholder="Calle, número, colonia, ciudad"
              value={form.direccion} onChange={set("direccion")} />
          </div>
        </div>

        <div className="modal-footer">
          <button className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button
            className="m-btn-save"
            onClick={handleSave}
            disabled={!form.nombre || !form.apellidos}
            style={{ opacity: form.nombre && form.apellidos ? 1 : 0.5 }}
          >
            Guardar cliente
          </button>
        </div>
      </div>
    </div>
  );
}