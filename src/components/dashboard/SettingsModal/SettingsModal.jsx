import { useState, useEffect } from "react";
import "./SettingsModal.css";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";
import { updateUserRequest } from "../../../services/authService";

/* ───────────── NAVEGACIÓN ───────────── */
const NAV_ITEMS = [
  {
    id: "general",
    label: "General",
    subtitle: "Preferencias de apariencia",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.41 1.41M11.37 11.37l1.41 1.41M3.22 12.78l1.41-1.41M11.37 4.63l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: "cuenta",
    label: "Cuenta",
    subtitle: "Información de tu perfil",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="3" />
        <path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6" />
      </svg>
    ),
  },
];

/* ───────────── COMPONENTES DE UI ───────────── */
function SettingRow({ label, description, children }) {
  return (
    <div className="sm-row">
      <div className="sm-row-info">
        <span className="sm-row-label">{label}</span>
        {description && <span className="sm-row-desc">{description}</span>}
      </div>
      <div className="sm-row-control">{children}</div>
    </div>
  );
}

/* ───────────── PANEL GENERAL ───────────── */
function PanelGeneral({ theme, changeTheme }) {
  const themeMap = { light: "Claro", dark: "Oscuro", system: "Sistema" };
  const currentModeText = themeMap[theme] || "Oscuro";

  function handleTheme(modeText) {
    if (modeText === "Claro") changeTheme("light");
    if (modeText === "Oscuro") changeTheme("dark");
    if (modeText === "Sistema") changeTheme("system");
  }

  return (
    <div className="sm-section">
      <div className="sm-section-label">Apariencia</div>
      <SettingRow label="Tema" description="Cambia entre modo claro y oscuro">
        <div className="sm-pills">
          {["Claro", "Oscuro", "Sistema"].map((m) => (
            <button
              key={m}
              className={`sm-pill${currentModeText === m ? " active" : ""}`}
              onClick={() => handleTheme(m)}
              type="button" 
            >
              {m}
            </button>
          ))}
        </div>
      </SettingRow>
    </div>
  );
}

/* ───────────── PANEL DE CUENTA (Funcional para Update) ───────────── */
function PanelCuenta({ user, isSubmitting, setIsSubmitting }) {
  // 1. Estados locales para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    telefono: ""
  });
  const [feedback, setFeedback] = useState(null);

  // 2. Cargamos los datos del usuario cuando el componente se monta
  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        correo: user.correo || "",
        telefono: user.telefono || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFeedback(null); // Limpiamos mensajes al escribir
  };

  const getInitials = (nombreCompleto) => {
    if (!nombreCompleto) return "U";
    const partes = nombreCompleto.trim().split(" ");
    if (partes.length >= 2) return `${partes[0].charAt(0)}${partes[1].charAt(0)}`.toUpperCase();
    return nombreCompleto.substring(0, 2).toUpperCase();
  };

  // 3. Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // 💡 AQUÍ CONECTAS TU BACKEND
      // await updateUserRequest(user.id_usuario, formData);
      
      // 💡 Simulamos el tiempo de petición (Bórralo cuando conectes tu API real)
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      setFeedback({ type: "success", msg: "Perfil actualizado correctamente." });
      
      // 💡 OPCIONAL: Aquí puedes llamar a una función de tu AuthContext para recargar los datos
      // refreshUser(); 
    } catch (error) {
      setFeedback({ 
        type: "error", 
        msg: error.response?.data?.message || "Ocurrió un error al actualizar." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="form-cuenta" onSubmit={handleSubmit} className="sm-section">
      <div className="sm-section-label">Perfil de Usuario</div>
      
      {/* Mensaje de retroalimentación (Éxito o Error) */}
      {feedback && (
        <div style={{ 
          padding: "10px", 
          marginBottom: "15px", 
          borderRadius: "6px", 
          fontSize: "0.9rem",
          backgroundColor: feedback.type === "success" ? "#ecfdf5" : "#fef2f2",
          color: feedback.type === "success" ? "#059669" : "#dc2626",
          border: `1px solid ${feedback.type === "success" ? "#a7f3d0" : "#fecaca"}`
        }}>
          {feedback.msg}
        </div>
      )}

      <div className="sm-avatar-row">
        <div className="sm-avatar">
          {getInitials(formData.nombre)}
        </div>
        <div className="sm-avatar-info">
          <span className="sm-avatar-name">{formData.nombre || "Usuario"}</span>
          <span className="sm-avatar-email">{user?.rol || "EMPLEADO"}</span>
        </div>
      </div>

      <SettingRow label="Nombre completo">
        <input
          className="sm-input"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </SettingRow>
      
      <SettingRow label="Correo electrónico">
        <input
          className="sm-input"
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </SettingRow>

      <SettingRow label="Teléfono">
        <input
          className="sm-input"
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />
      </SettingRow>

      <SettingRow label="Rol en la sucursal" description="Solo modificable por el administrador global">
        <input
          className="sm-input"
          type="text"
          value={user?.rol || "EMPLEADO"}
          disabled
          style={{ backgroundColor: "#f3f4f6", color: "#9ca3af", cursor: "not-allowed" }}
        />
      </SettingRow>
    </form>
  );
}

/* ───────────── MAPEO DE PANELES ───────────── */
const PANELS = {
  general: PanelGeneral,
  cuenta: PanelCuenta,
};

/* ───────────── COMPONENTE PRINCIPAL ───────────── */
export default function SettingsModal({ open, onClose }) {
  const { theme, changeTheme } = useTheme();
  const { user } = useAuth(); 
  
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para bloquear botones

  if (!open) return null;

  const activeNav = NAV_ITEMS.find((n) => n.id === activeTab);
  const ActivePanel = PANELS[activeTab];

  return (
    <div className="sm-overlay" onClick={(e) => { if(e.target === e.currentTarget && !isSubmitting) onClose(); }}>
      <div className="sm-modal" role="dialog" aria-modal="true" aria-label="Configuración">
        
        {/* Sidebar */}
        <aside className="sm-sidebar">
          <span className="sm-sidebar-title">Ajustes</span>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sm-nav-btn${activeTab === item.id ? " active" : ""}`}
              onClick={() => !isSubmitting && setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <div className="sm-main">
          <div className="sm-header">
            <div>
              <h2 className="sm-header-title">{activeNav.label}</h2>
              <p className="sm-header-sub">{activeNav.subtitle}</p>
            </div>
            <button className="sm-close-btn" onClick={onClose} disabled={isSubmitting}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>

          <div className="sm-body">
            <ActivePanel
              theme={theme}
              changeTheme={changeTheme}
              user={user}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>

          <div className="sm-footer" style={{ justifyContent: 'flex-end', gap: '10px' }}>
            <button className="sm-btn-cancel" onClick={onClose} disabled={isSubmitting}>
              {activeTab === "cuenta" ? "Cancelar" : "Cerrar"}
            </button>

            {/* 💡 Este botón solo aparece en la pestaña de cuenta y dispara el formulario */}
            {activeTab === "cuenta" && (
              <button 
                className="sm-btn-save" 
                type="submit" 
                form="form-cuenta"
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.6 : 1 }}
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}