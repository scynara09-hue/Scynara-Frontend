import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";


import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import RegisterInput from "../../components/Register/RegisterInput";
import PasswordStrength from "../../components/Register/PasswordStrength";
import RegisterAlert from "../../components/Register/RegisterAlert";
import PolicyModal from "../../components/shared/PolicyModal";

import "./Register.css";


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;


const IconBack = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="18"
    height="18"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
const IconUser = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhone = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconLock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconShield = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);
const IconEye = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);


const IconStore = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <path d="M3 3h18v4H3z" />
    <path d="M4 7v14h16V7" />
    <path d="M12 11v10" />
  </svg>
);
const IconMapPin = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
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
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
        );
        const data = await response.json();

        if (data && data.display_name) {
          setDireccion(data.display_name);
        }
      } catch (error) {
        console.error("Error al obtener la dirección:", error);
      }
    },
  });

  return position === null ? null : <Marker position={position} />;
}


function validate(fields) {
  const errors = {};

  
  if (!fields.nombreTienda.trim())
    errors.nombreTienda = "El nombre de la tienda es requerido";

  
  if (!fields.direccionTienda.trim())
    errors.direccionTienda = "La dirección de la tienda es requerida";

  
  if (!fields.nombre.trim()) errors.nombre = "El nombre es requerido";
  if (!fields.apellido.trim()) errors.apellido = "El apellido es requerido";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Correo no válido";
  if (fields.telefono.replace(/\D/g, "").length < 10)
    errors.telefono = "Mínimo 10 dígitos";
  if (!fields.rol) errors.rol = "Selecciona un rol";
  if (fields.password.length < 8) errors.password = "Mínimo 8 caracteres";
  if (fields.password !== fields.confirm)
    errors.confirm = "Las contraseñas no coinciden";

  return errors;
}


export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  
  const [showMap, setShowMap] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const [formErrors, setFormErrors] = useState({});
  const [form, setForm] = useState({
    nombreTienda: "",
    direccionTienda: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    confirm: "",
    rol: "ADMINISTRADOR",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setAlert({ type: "", message: "" });
    try {
      await registerRequest({
        nombre_tienda: form.nombreTienda,
        direccion_tienda: form.direccionTienda,
        nombre: form.nombre,
        apellidos: form.apellido,
        email: form.email,
        telefono: form.telefono,
        rol: form.rol,
        password: form.password,
      });

      setAlert({
        type: "success",
        message: "¡Cuenta y Tienda creadas correctamente! Redirigiendo...",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setFormErrors(err.response.data.errors);
        setAlert({
          type: "error",
          message: "Revisa los campos marcados en rojo.",
        });
      } else {
        setAlert({
          type: "error",
          message:
            err?.response?.data?.message ||
            "Error al registrar. Intenta de nuevo.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="register-page">
      <div className="reg-bg" />
      <div className="reg-blob reg-blob--1" />
      <div className="reg-blob reg-blob--2" />
      <button className="back-button" onClick={handleBack}>
        <IconBack />
      </button>
      <div className="register-card">
        <div className="reg-logo">SCYNARA</div>

        <div className="reg-header">
          <h2>Crea tu cuenta</h2>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>

        <RegisterAlert type={alert.type} message={alert.message} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="reg-divider">
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              DATOS DEL ADMINISTRADOR
            </span>
          </div>

          <div className="reg-row">
            <RegisterInput
              id="nombre"
              label="NOMBRE"
              placeholder="Juan"
              value={form.nombre}
              onChange={set("nombre")}
              error={formErrors.nombre}
              icon={<IconUser />}
            />
            <RegisterInput
              id="apellido"
              label="APELLIDO"
              placeholder="Pérez"
              value={form.apellido}
              onChange={set("apellido")}
              error={formErrors.apellido || formErrors.apellidos}
              icon={<IconUser />}
            />
          </div>

          <RegisterInput
            id="email"
            label="CORREO ELECTRÓNICO"
            type="email"
            placeholder="juan@ejemplo.com"
            value={form.email}
            onChange={set("email")}
            error={formErrors.email}
            icon={<IconMail />}
          />

          <RegisterInput
            id="telefono"
            label="TELÉFONO"
            type="tel"
            placeholder="55 1234 5678"
            value={form.telefono}
            onChange={set("telefono")}
            error={formErrors.telefono}
            icon={<IconPhone />}
          />

          <div className="reg-divider">
            <span style={{ fontSize: "12px", color: "#6b7280" }}>
              DATOS DE LA SUCURSAL
            </span>
          </div>

          <RegisterInput
            id="nombreTienda"
            label="NOMBRE DE LA TIENDA"
            placeholder="Ej: Abarrotes San Juan"
            value={form.nombreTienda}
            onChange={set("nombreTienda")}
            error={formErrors.nombreTienda}
            icon={<IconStore />}
          />

          {}
          <div className="reg-field" style={{ marginBottom: "15px" }}>
            <RegisterInput
              id="direccionTienda"
              label="DIRECCIÓN DE LA TIENDA"
              placeholder="Haz clic en el mapa o escribe aquí..."
              value={form.direccionTienda}
              onChange={set("direccionTienda")}
              error={formErrors.direccionTienda}
              icon={<IconMapPin />}
            />

            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              style={{
                marginTop: "8px",
                fontSize: "13px",
                background: "none",
                border: "none",
                color: "#3b82f6",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <IconMapPin />
              {showMap ? "Ocultar mapa" : "Seleccionar ubicación en el mapa"}
            </button>
          </div>

          {}
          {showMap && (
            <div
              style={{
                height: "250px",
                width: "100%",
                marginBottom: "20px",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
              }}
            >
              <MapContainer
                center={[19.4326, -99.1332]} 
                zoom={13}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MapClickHandler
                  setDireccion={(dir) =>
                    setForm((prev) => ({ ...prev, direccionTienda: dir }))
                  }
                />
              </MapContainer>
            </div>
          )}

          <div className="reg-field">
            <label htmlFor="rol">ROL</label>
            <div className="reg-input-wrap">
              <select
                id="rol"
                className={`reg-select ${formErrors.rol ? "error" : ""}`}
                value={form.rol}
                onChange={set("rol")}
                disabled
              >
                <option value="ADMINISTRADOR">Administrador</option>
              </select>
              <span className="reg-input-icon">
                <IconShield />
              </span>
            </div>
            {formErrors.rol && (
              <span className="reg-error">{formErrors.rol}</span>
            )}
          </div>

          <div className="reg-field">
            <label htmlFor="password">CONTRASEÑA</label>
            <div className="reg-input-wrap">
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                value={form.password}
                onChange={set("password")}
                className={`reg-input ${formErrors.password ? "error" : ""}`}
              />
              <span className="reg-input-icon">
                <IconLock />
              </span>
              <button
                type="button"
                className="reg-eye"
                onClick={() => setShowPwd(!showPwd)}
              >
                <IconEye open={showPwd} />
              </button>
            </div>
            <PasswordStrength password={form.password} />
            {formErrors.password && (
              <span className="reg-error">{formErrors.password}</span>
            )}
          </div>

          <div className="reg-field">
            <label htmlFor="confirm">CONFIRMAR CONTRASEÑA</label>
            <div className="reg-input-wrap">
              <input
                id="confirm"
                type={showCfm ? "text" : "password"}
                placeholder="Repite tu contraseña"
                value={form.confirm}
                onChange={set("confirm")}
                className={`reg-input ${formErrors.confirm ? "error" : ""}`}
              />
              <span className="reg-input-icon">
                <IconLock />
              </span>
              <button
                type="button"
                className="reg-eye"
                onClick={() => setShowCfm(!showCfm)}
              >
                <IconEye open={showCfm} />
              </button>
            </div>
            {formErrors.confirm && (
              <span className="reg-error">{formErrors.confirm}</span>
            )}
          </div>

          <button type="submit" className="reg-submit" disabled={loading}>
            {loading && <span className="reg-spinner" />}
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <PolicyModal
                  isOpen={isPolicyOpen}
                  onClose={() => setIsPolicyOpen(false)}
                />

        <p className="reg-terms">
          Al registrarte aceptas nuestros <button
            type="button" className="reg-link"
            onClick={() => setIsPolicyOpen(true)}
          >
            Política de privacidad
          </button> y{" "}
          <button
            type="button" className="reg-link"
            onClick={() => setIsPolicyOpen(true)}
          >
            Términos de servicio
          </button>
        </p>
      </div>
    </div>
  );
}
