import { useState, useEffect } from "react";
import "./SettingsModal.css";
import { useTheme } from "../../../context/ThemeContext";
import { useAuth } from "../../../context/AuthContext";

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
  {
    id: "feedback",
    label: "Evaluar Scynara",
    subtitle: "Danos tu opinión sobre el sistema",
    adminOnly: true, // 💡 Bandera para ocultarlo a empleados
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

/* ───────────── PANEL DE CUENTA ───────────── */
function PanelCuenta({ user, isSubmitting, setIsSubmitting, updateUser }) {
  const [formData, setFormData] = useState({ nombre: "", correo: "", telefono: "" });
  const [feedback, setFeedback] = useState(null);

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
    setFeedback(null);
  };

  const getInitials = (nombreCompleto) => {
    if (!nombreCompleto) return "U";
    const partes = nombreCompleto.trim().split(" ");
    if (partes.length >= 2) return `${partes[0].charAt(0)}${partes[1].charAt(0)}`.toUpperCase();
    return nombreCompleto.substring(0, 2).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      if (updateUser && user) {
        await updateUser(user.id_usuario, formData);
      }
      setFeedback({ type: "success", msg: "Perfil actualizado correctamente." });
    } catch (error) {
      setFeedback({ type: "error", msg: error.message || "Ocurrió un error al actualizar." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="form-cuenta" onSubmit={handleSubmit} className="sm-section">
      <div className="sm-section-label">Perfil de Usuario</div>
      
      {feedback && (
        <div style={{ 
          padding: "10px", marginBottom: "15px", borderRadius: "6px", fontSize: "0.9rem",
          backgroundColor: feedback.type === "success" ? "#ecfdf5" : "#fef2f2",
          color: feedback.type === "success" ? "#059669" : "#dc2626",
          border: `1px solid ${feedback.type === "success" ? "#a7f3d0" : "#fecaca"}`
        }}>
          {feedback.msg}
        </div>
      )}

      <div className="sm-avatar-row">
        <div className="sm-avatar">{getInitials(formData.nombre)}</div>
        <div className="sm-avatar-info">
          <span className="sm-avatar-name">{formData.nombre || "Usuario"}</span>
          <span className="sm-avatar-email">{user?.rol || "EMPLEADO"}</span>
        </div>
      </div>

      <SettingRow label="Nombre completo">
        <input className="sm-input" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </SettingRow>
      
      <SettingRow label="Correo electrónico">
        <input className="sm-input" type="email" name="correo" value={formData.correo} onChange={handleChange} required />
      </SettingRow>

      <SettingRow label="Teléfono">
        <input className="sm-input" type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
      </SettingRow>

      <SettingRow label="Rol en la sucursal" description="Solo modificable por el administrador global">
        <input className="sm-input" type="text" value={user?.rol || "EMPLEADO"} disabled style={{ backgroundColor: "#f3f4f6", color: "#9ca3af", cursor: "not-allowed" }} />
      </SettingRow>
    </form>
  );
}

/* ───────────── NUEVO: PANEL DE FEEDBACK ───────────── */
function PanelFeedback({ isSubmitting, setIsSubmitting, sendEvaluation }) {
  const [rating, setRating] = useState(5); // Por defecto 5 estrellas
  const [hoverRating, setHoverRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      // 💡 Consumimos la función de nuestro AuthContext
      await sendEvaluation({ calificacion: rating, comentario });
      setFeedback({ type: "success", msg: "¡Gracias! Tu evaluación ha sido enviada con éxito." });
      setComentario(""); // Limpiamos el texto
      setRating(5);
    } catch (error) {
      setFeedback({ type: "error", msg: error.message || "No se pudo enviar la evaluación." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="form-feedback" onSubmit={handleSubmit} className="sm-section">
      <div className="sm-section-label">Cuéntanos tu experiencia</div>
      
      {feedback && (
        <div style={{ 
          padding: "10px", marginBottom: "15px", borderRadius: "6px", fontSize: "0.9rem",
          backgroundColor: feedback.type === "success" ? "#ecfdf5" : "#fef2f2",
          color: feedback.type === "success" ? "#059669" : "#dc2626",
          border: `1px solid ${feedback.type === "success" ? "#a7f3d0" : "#fecaca"}`
        }}>
          {feedback.msg}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        
        {/* Estrellas Interactivas */}
        <div>
          <span className="sm-row-label" style={{ display: "block", marginBottom: "8px" }}>Calificación</span>
          <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                width="32" height="32" viewBox="0 0 24 24" 
                fill={star <= (hoverRating || rating) ? "#fbbf24" : "transparent"} 
                stroke={star <= (hoverRating || rating) ? "#fbbf24" : "var(--color-text-tertiary)"}
                strokeWidth="1.5"
                style={{ transition: "all 0.2s" }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div>
          <span className="sm-row-label" style={{ display: "block", marginBottom: "8px" }}>Comentario (Aparecerá en la página principal)</span>
          <textarea
            className="sm-input"
            rows="4"
            placeholder="Ej: Antes llevaba todo en Excel y era un desastre. Con Scynara ahora..."
            value={comentario}
            onChange={(e) => {
              setComentario(e.target.value);
              setFeedback(null);
            }}
            required
            minLength="10"
            maxLength="1000"
            style={{ resize: "vertical", width: "100%" }}
          ></textarea>
        </div>

      </div>
    </form>
  );
}

/* ───────────── MAPEO DE PANELES ───────────── */
const PANELS = {
  general: PanelGeneral,
  cuenta: PanelCuenta,
  feedback: PanelFeedback,
};

/* ───────────── COMPONENTE PRINCIPAL ───────────── */
export default function SettingsModal({ open, onClose }) {
  const { theme, changeTheme } = useTheme();
  // 💡 Traemos sendEvaluation y updateUser del contexto
  const { user, sendEvaluation, updateUser } = useAuth(); 
  
  const [activeTab, setActiveTab] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  // 💡 Filtramos las pestañas de navegación según el rol
  const visibleNavItems = NAV_ITEMS.filter(item => !item.adminOnly || user?.rol === 'ADMINISTRADOR');

  const activeNav = visibleNavItems.find((n) => n.id === activeTab) || visibleNavItems[0];
  const ActivePanel = PANELS[activeNav.id];

  return (
    <div className="sm-overlay" onClick={(e) => { if(e.target === e.currentTarget && !isSubmitting) onClose(); }}>
      <div className="sm-modal" role="dialog" aria-modal="true" aria-label="Configuración">
        
        {/* Sidebar */}
        <aside className="sm-sidebar">
          <span className="sm-sidebar-title">Ajustes</span>
          {visibleNavItems.map((item) => (
            <button
              key={item.id}
              className={`sm-nav-btn${activeNav.id === item.id ? " active" : ""}`}
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
              updateUser={updateUser}
              sendEvaluation={sendEvaluation}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </div>

          <div className="sm-footer" style={{ justifyContent: 'flex-end', gap: '10px' }}>
            <button className="sm-btn-cancel" onClick={onClose} disabled={isSubmitting}>
              {activeTab === "general" ? "Cerrar" : "Cancelar"}
            </button>

            {/* Botón de Guardar Perfil */}
            {activeTab === "cuenta" && (
              <button className="sm-btn-save" type="submit" form="form-cuenta" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1 }}>
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </button>
            )}

            {/* Botón de Enviar Testimonio */}
            {activeTab === "feedback" && (
              <button className="sm-btn-save" type="submit" form="form-feedback" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1, backgroundColor: "var(--color-text-info)" }}>
                {isSubmitting ? "Enviando..." : "Enviar evaluación"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}