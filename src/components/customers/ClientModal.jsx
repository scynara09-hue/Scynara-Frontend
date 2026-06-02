import { useState, useEffect } from "react";
import { sanitizeAddress, sanitizeCoordinates } from "../../utils/sanitize";
import { fetchAddressFromCoordinates } from "../../utils/nominatimLimiter";


import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const EMPTY = {
  nombre: "", 
  apellidos: "", 
  correo: "",
  telefono: "", 
  RFC: "", 
  direccion: "",
};


const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="13" height="13">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6"  y1="6" x2="18" y2="18"/>
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconMapPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" width="14" height="14">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);


function MapClickHandler({ setDireccion }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      try {
        const { latitude, longitude } = sanitizeCoordinates(lat, lng);
        const address = await fetchAddressFromCoordinates(latitude, longitude);
        if (address) {
          setDireccion(sanitizeAddress(address));
        }
      } catch (error) {
        // Silently fail - user can enter address manually
      }
    },
  });

  return position === null ? null : <Marker position={position} />;
}


export default function ClientModal({ open, client, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showMap, setShowMap] = useState(false);
  const isEditing = !!client;

  useEffect(() => {
    if (!open) {
      setShowMap(false);
      return;
    }
    setErrors({});
    
    if (client) {
      const nameParts = (client.nombre || "").trim().split(" ");
      let nombre = "";
      let apellidos = "";

      if (nameParts.length > 1) {
        apellidos = nameParts.pop();
        nombre = nameParts.join(" ");
      } else {
        nombre = nameParts[0] || "";
      }

      setForm({
        id_cliente: client.id_cliente,
        nombre,
        apellidos,
        correo: client.correo || client.email || "",
        telefono: client.telefono || "",
        RFC: client.RFC || "",
        direccion: client.direccion || "",
      });
    } else {
      setForm(EMPTY);
    }
  }, [client, open]);

  if (!open) return null;

  const set = field => e => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    } else if (form.nombre.trim().length < 2) {
      newErrors.nombre = "Mínimo 2 caracteres";
    }

    if (!form.apellidos.trim()) {
      newErrors.apellidos = "Los apellidos son obligatorios";
    } else if (form.apellidos.trim().length < 2) {
      newErrors.apellidos = "Mínimo 2 caracteres";
    }
    
    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Ingresa un correo electrónico válido";
    }

    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio";
    } else if (!/^\d{10}$/.test(form.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "El teléfono debe contener exactamente 10 dígitos";
    }

    if (!form.direccion.trim() || form.direccion.length < 5) {
      newErrors.direccion = "Ingresa una dirección válida";
    }

    if (form.RFC && !/^[A-Z&Ññ]{3,4}\d{6}[A-V1-9][A-Z1-9]\d$/i.test(form.RFC.trim())) {
      newErrors.RFC = "Formato de RFC inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!validateForm()) return;

    const payload = {
      ...(isEditing && { id_cliente: form.id_cliente }),
      nombre: `${form.nombre.trim()} ${form.apellidos.trim()}`, 
      email: form.correo.trim(), 
      telefono: form.telefono.trim().replace(/\s/g, ""),
      direccion: form.direccion.trim(),
      RFC: form.RFC.trim().toUpperCase() || null,
    };

    const result = await onSave(payload);

    if (result && result.success === false && result.errors) {
      const mappedErrors = {};
      for (const key in result.errors) {
        const frontendField = key === "email" ? "correo" : key;
        const msg = Array.isArray(result.errors[key]) ? result.errors[key][0] : result.errors[key];
        mappedErrors[frontendField] = msg;
        if (key === "nombre") mappedErrors.apellidos = msg; 
      }
      setErrors(mappedErrors);
    } else if (result && result.success === true) {
      onClose();
    }
  };

  const handleOverlay = e => { 
    if (e.target === e.currentTarget && Object.keys(errors).length === 0) onClose(); 
  };

  return (
    <div className="modal-overlay" onClick={handleOverlay}>
      <div className="modal" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <div className="modal-header">
          <h2>{isEditing ? "Editar cliente" : "Agregar cliente"}</h2>
          <button type="button" className="modal-close" onClick={onClose}><IconClose /></button>
        </div>

        <div className="modal-body">
          <div className="m-row2">
            <div className="m-field">
              <label>Nombre(s)</label>
              <input 
                className={`m-input ${errors.nombre ? "m-input-error" : ""}`}
                placeholder="María"
                value={form.nombre} 
                onChange={set("nombre")} 
              />
              {errors.nombre && <span className="m-error-text">{errors.nombre}</span>}
            </div>
            <div className="m-field">
              <label>Apellidos</label>
              <input 
                className={`m-input ${errors.apellidos ? "m-input-error" : ""}`}
                placeholder="Ramírez López"
                value={form.apellidos} 
                onChange={set("apellidos")} 
              />
              {errors.apellidos && <span className="m-error-text">{errors.apellidos}</span>}
            </div>
          </div>

          <div className="m-field">
            <label>Correo electrónico</label>
            <input 
              className={`m-input ${errors.correo ? "m-input-error" : ""}`}
              type="email" 
              placeholder="maria@ejemplo.com"
              value={form.correo} 
              onChange={set("correo")} 
            />
            {errors.correo && <span className="m-error-text">{errors.correo}</span>}
          </div>

          <div className="m-row2">
            <div className="m-field">
              <label>Teléfono</label>
              <input 
                className={`m-input ${errors.telefono ? "m-input-error" : ""}`}
                type="tel" 
                placeholder="55 1234 5678"
                value={form.telefono} 
                onChange={set("telefono")} 
              />
              {errors.telefono && <span className="m-error-text">{errors.telefono}</span>}
            </div>
            <div className="m-field">
              <label>RFC <span className="m-optional"></span></label>
              <input 
                className={`m-input ${errors.RFC ? "m-input-error" : ""}`}
                placeholder="RAMM850101ABC"
                value={form.RFC} 
                onChange={set("RFC")} 
                style={{ textTransform: "uppercase" }}
              />
              {errors.RFC ? (
                <span className="m-error-text">{errors.RFC}</span>
              ) : (
                <span className="m-hint">Solo si solicita facturación</span>
              )}
            </div>
          </div>

          {}
          <div className="m-field">
            <label>Dirección</label>
            <input 
              className={`m-input ${errors.direccion ? "m-input-error" : ""}`}
              placeholder="Calle, número, colonia, ciudad"
              value={form.direccion} 
              onChange={set("direccion")} 
            />
            {errors.direccion && <span className="m-error-text">{errors.direccion}</span>}
            
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              style={{
                marginTop: "8px",
                fontSize: "13px",
                background: "none",
                border: "none",
                color: "var(--color-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                padding: 0
              }}
            >
              <IconMapPin />
              {showMap ? "Ocultar mapa" : "Seleccionar ubicación exacta en el mapa"}
            </button>
            
            {showMap && (
              <div style={{ marginTop: '12px', borderRadius: '8px', overflow: 'hidden', height: '200px', background: 'var(--color-background-alt)', border: "1px solid var(--color-border)" }}>
                <MapContainer
                  center={[19.6018, -99.0395]} 
                  zoom={14}
                  style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <MapClickHandler
                    setDireccion={(dir) => setForm((prev) => ({ ...prev, direccion: dir }))}
                  />
                </MapContainer>
              </div>
            )}
          </div>
        </div>

        {errors.general && <div className="m-error-text" style={{ padding: "0 24px", textAlign: "center" }}>{errors.general}</div>}

        <div className="modal-footer">
          <button type="button" className="m-btn-cancel" onClick={onClose}>Cancelar</button>
          <button
            type="button"
            className="m-btn-save"
            onClick={handleSave}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            <IconSave />
            {isEditing ? "Guardar cambios" : "Registrar cliente"}
          </button>
        </div>
      </div>
    </div>
  );
}
