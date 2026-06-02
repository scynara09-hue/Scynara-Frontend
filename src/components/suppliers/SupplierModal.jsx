import { useState, useEffect } from "react";
import { X, MapPin, AlertCircle } from "lucide-react";


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
  telefono: "",
  correo: "",
  direccion: "",
  id_categoria: "", 
  tiempo_entregas: "",
  estado: "ACTIVO",
};


function MapClickHandler({ setDireccion }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();

        if (data && data.display_name) {
          setDireccion(data.display_name);
        }
      } catch (error) {      }
    },
  });

  return position === null ? null : <Marker position={position} />;
}


export default function SupplierModal({ open, supplier, categorias = [], onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({}); 
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setForm(supplier ? { ...supplier } : EMPTY);
    setErrors({}); 
    if (!open) setShowMap(false);
  }, [supplier, open]);

  if (!open) return null;

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: null }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio.";
    
    if (!form.telefono.trim()) {
      newErrors.telefono = "El teléfono es obligatorio.";
    } else if (form.telefono.replace(/\D/g, "").length < 10) {
      newErrors.telefono = "Debe tener al menos 10 dígitos.";
    }

    if (!form.correo.trim()) {
      newErrors.correo = "El correo es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
      newErrors.correo = "Ingresa un correo válido.";
    }

    if (!form.direccion.trim()) newErrors.direccion = "La dirección es obligatoria.";
    if (!form.tiempo_entregas) newErrors.tiempo_entregas = "Selecciona un tiempo de entrega.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSave = async () => {
    const isFrontendValid = validateForm();
    if (isFrontendValid) {
      try {
        await onSave(form);
        onClose(); 
      } catch (backendError) {
        if (backendError?.details) {
          const formattedErrors = {};
          for (const key in backendError.details) {
            formattedErrors[key] = backendError.details[key][0];
          }   
          setErrors(prev => ({ ...prev, ...formattedErrors }));
          
        } else if (backendError?.mensaje) {
          alert(`Error: ${backendError.mensaje}`);
        }
      }
    } 
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
              <input 
                className={`sup-input ${errors.nombre ? "input-error" : ""}`} 
                placeholder="Distribuidora XYZ" 
                value={form.nombre} 
                onChange={e => set("nombre", e.target.value)} 
              />
              {errors.nombre && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.nombre}</span>}
            </div>
            
            <div className="sup-field">
              <label>Teléfono *</label>
              <input 
                className={`sup-input ${errors.telefono ? "input-error" : ""}`} 
                placeholder="55 1234 5678" 
                value={form.telefono} 
                onChange={e => set("telefono", e.target.value)} 
              />
              {errors.telefono && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.telefono}</span>}
            </div>
          </div>

          <div className="sup-row2">
            <div className="sup-field">
              <label>Correo *</label>
              <input 
                className={`sup-input ${errors.correo ? "input-error" : ""}`} 
                type="email" 
                placeholder="contacto@empresa.com" 
                value={form.correo} 
                onChange={e => set("correo", e.target.value.toLowerCase())} 
              />
              {errors.correo && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.correo}</span>}
            </div>

            <div className="sup-field">
              <label>Categoría</label>
              <select 
                className={`sup-input sup-select ${errors.id_categoria ? "input-error" : ""}`} 
                value={form.id_categoria || ""} 
                onChange={e => set("id_categoria", e.target.value ? parseInt(e.target.value) : "")}
              >
                <option value="">Selecciona una categoría...</option>
                {categorias.map(cat => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.categoria}
                  </option>
                ))}
              </select>
              {errors.id_categoria && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.id_categoria}</span>}
            </div>
          </div>

          <div className="sup-section-sep">Logística y Ubicación</div>

          <div className="sup-field">
            <label>Dirección *</label>
            <input 
              className={`sup-input ${errors.direccion ? "input-error" : ""}`} 
              placeholder="Haz clic en el mapa o escribe aquí..." 
              value={form.direccion} 
              onChange={e => set("direccion", e.target.value)} 
            />
            {errors.direccion && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.direccion}</span>}
            
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              style={{
                marginTop: "8px", fontSize: "12px", background: "none", border: "none",
                color: "var(--accent, #7c3aed)", cursor: "pointer", display: "inline-flex",
                alignItems: "center", gap: "6px", padding: "4px 0", width: "fit-content", fontWeight: "500"
              }}
            >
              <MapPin size={14} />
              {showMap ? "Ocultar mapa" : "Seleccionar ubicación en el mapa"}
            </button>
          </div>

          {showMap && (
            <div
              style={{
                height: "220px", width: "100%", marginBottom: "16px", borderRadius: "10px",
                overflow: "hidden", border: "1px solid var(--border)",
              }}
            >
              <MapContainer center={[19.4326, -99.1332]} zoom={13} style={{ height: "100%", width: "100%", zIndex: 0 }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler setDireccion={(dir) => set("direccion", dir)} />
              </MapContainer>
            </div>
          )}

          {}
          <div className={supplier ? "sup-row2" : ""}>
            <div className="sup-field">
              <label>Tiempo de entrega (Horas) *</label>
              <select 
                className={`sup-input sup-select ${errors.tiempo_entregas ? "input-error" : ""}`} 
                value={form.tiempo_entregas} 
                onChange={e => set("tiempo_entregas", e.target.value)}
              >
                <option value="">Selecciona una opción...</option>
                <option value="12">Mismo día (12 horas)</option>
                <option value="24">Al día siguiente (24 horas)</option>
                <option value="48">2 días (48 horas)</option>
                <option value="72">3 días (72 horas)</option>
                <option value="120">5 días (120 horas)</option>
                <option value="168">1 semana (168 horas)</option>
              </select>
              {errors.tiempo_entregas && <span className="sup-error-msg"><AlertCircle size={10}/> {errors.tiempo_entregas}</span>}
            </div>

            {}
            {supplier && (
              <div className="sup-field">
                <label>Estado del proveedor</label>
                <select 
                  className="sup-input sup-select" 
                  value={form.estado || "ACTIVO"} 
                  onChange={e => set("estado", e.target.value)}
                >
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
              </div>
            )}
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
