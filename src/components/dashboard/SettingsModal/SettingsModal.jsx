import { useState } from "react";
import "./SettingsModal.css";
import { useTheme } from "../../../context/ThemeContext";

const NAV_ITEMS = [
  {
    id: "general",
    label: "General",
    subtitle: "Preferencias generales de la aplicación",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="8" r="3"/>
        <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.41 1.41M11.37 11.37l1.41 1.41M3.22 12.78l1.41-1.41M11.37 4.63l1.41-1.41"/>
      </svg>
    ),
  },
  {
    id: "cuenta",
    label: "Cuenta",
    subtitle: "Información y perfil de usuario",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="8" cy="5" r="3"/>
        <path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6"/>
      </svg>
    ),
  },
  {
    id: "notificaciones",
    label: "Notificaciones",
    subtitle: "Configura cómo te avisamos",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 1a5 5 0 0 1 5 5v3l1 2H2l1-2V6a5 5 0 0 1 5-5z"/>
        <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
      </svg>
    ),
  },
  {
    id: "seguridad",
    label: "Seguridad",
    subtitle: "Contraseña y acceso a la cuenta",
    icon: (
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 2L3 4.5V9c0 3 2.5 5 5 6 2.5-1 5-3 5-6V4.5L8 2z"/>
      </svg>
    ),
  },
];

function Toggle({ checked, onChange }) {
  return (
    <label className="sm-toggle">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="sm-track" />
      <span className="sm-thumb" />
    </label>
  );
}

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

function PanelGeneral({ theme, toggleTheme }) {
  const [themeMode, setThemeMode] = useState(theme === "dark" ? "Oscuro" : "Claro");
  const [compactSidebar, setCompactSidebar] = useState(false);
  const [animations, setAnimations] = useState(true);

  function handleTheme(mode) {
    setThemeMode(mode);
    if (mode === "Oscuro" && theme !== "dark") toggleTheme();
    if (mode === "Claro" && theme === "dark") toggleTheme();
  }

  return (
    <>
      <div className="sm-section">
        <div className="sm-section-label">Apariencia</div>
        <SettingRow label="Tema" description="Cambia entre modo claro y oscuro">
          <div className="sm-pills">
            {["Claro", "Oscuro", "Sistema"].map((m) => (
              <button
                key={m}
                className={`sm-pill${themeMode === m ? " active" : ""}`}
                onClick={() => handleTheme(m)}
              >
                {m}
              </button>
            ))}
          </div>
        </SettingRow>
        <SettingRow label="Idioma" description="Idioma de la interfaz">
          <select className="sm-select">
            <option>Español</option>
            <option>English</option>
            <option>Français</option>
          </select>
        </SettingRow>
        <SettingRow label="Zona horaria" description="Usada para reportes y fechas">
          <select className="sm-select">
            <option>UTC−6 (CDMX)</option>
            <option>UTC−5 (EST)</option>
            <option>UTC+0 (GMT)</option>
          </select>
        </SettingRow>
      </div>

      <div className="sm-section">
        <div className="sm-section-label">Comportamiento</div>
        <SettingRow label="Barra lateral compacta" description="Minimiza el menú lateral por defecto">
          <Toggle checked={compactSidebar} onChange={(e) => setCompactSidebar(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Animaciones" description="Efectos de transición en la UI">
          <Toggle checked={animations} onChange={(e) => setAnimations(e.target.checked)} />
        </SettingRow>
      </div>
    </>
  );
}

function PanelCuenta() {
  return (
    <>
      <div className="sm-section">
        <div className="sm-section-label">Perfil</div>
        <div className="sm-avatar-row">
          <div className="sm-avatar">JD</div>
          <div className="sm-avatar-info">
            <span className="sm-avatar-name">Juan Díaz</span>
            <span className="sm-avatar-email">juan@empresa.com</span>
          </div>
          <button className="sm-ghost-btn">Cambiar foto</button>
        </div>
        <SettingRow label="Nombre completo">
          <input className="sm-input" type="text" defaultValue="Juan Díaz" />
        </SettingRow>
        <SettingRow label="Correo electrónico">
          <input className="sm-input" type="email" defaultValue="juan@empresa.com" />
        </SettingRow>
        <SettingRow label="Rol" description="Asignado por el administrador">
          <span className="sm-badge">Admin</span>
        </SettingRow>
      </div>

      <div className="sm-section">
        <div className="sm-section-label">Zona de peligro</div>
        <div className="sm-danger-zone">
          <div className="sm-danger-row">
            <div>
              <div className="sm-danger-label">Cerrar sesión en todos los dispositivos</div>
              <div className="sm-danger-desc">Invalida todas las sesiones activas</div>
            </div>
            <button className="sm-danger-btn">Cerrar sesiones</button>
          </div>
        </div>
      </div>
    </>
  );
}

function PanelNotificaciones() {
  const [email, setEmail] = useState(true);
  const [inApp, setInApp] = useState(true);
  const [push, setPush] = useState(false);

  return (
    <>
      <div className="sm-section">
        <div className="sm-section-label">Canales</div>
        <SettingRow label="Notificaciones por correo" description="Resúmenes y alertas importantes">
          <Toggle checked={email} onChange={(e) => setEmail(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Notificaciones en app" description="Alertas en tiempo real">
          <Toggle checked={inApp} onChange={(e) => setInApp(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Notificaciones push" description="En dispositivos móviles">
          <Toggle checked={push} onChange={(e) => setPush(e.target.checked)} />
        </SettingRow>
      </div>
      <div className="sm-section">
        <div className="sm-section-label">Frecuencia de resúmenes</div>
        <SettingRow label="Resumen diario">
          <select className="sm-select">
            <option>08:00 AM</option>
            <option>12:00 PM</option>
            <option>06:00 PM</option>
            <option>Desactivado</option>
          </select>
        </SettingRow>
      </div>
    </>
  );
}

function PanelSeguridad() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <>
      <div className="sm-section">
        <div className="sm-section-label">Acceso</div>
        <SettingRow label="Autenticación de dos factores" description="Aumenta la seguridad de tu cuenta">
          <Toggle checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
        </SettingRow>
        <SettingRow label="Sesión activa" description="Chrome · CDMX · hace 2 min">
          <span className="sm-badge sm-badge--green">Actual</span>
        </SettingRow>
        <SettingRow label="Cambiar contraseña">
          <button className="sm-ghost-btn">Actualizar</button>
        </SettingRow>
      </div>

      <div className="sm-section">
        <div className="sm-section-label">Zona de peligro</div>
        <div className="sm-danger-zone">
          <div className="sm-danger-row">
            <div>
              <div className="sm-danger-label">Eliminar cuenta</div>
              <div className="sm-danger-desc">Acción permanente e irreversible</div>
            </div>
            <button className="sm-danger-btn">Eliminar</button>
          </div>
        </div>
      </div>
    </>
  );
}

const PANELS = {
  general: PanelGeneral,
  cuenta: PanelCuenta,
  notificaciones: PanelNotificaciones,
  seguridad: PanelSeguridad,
};

export default function SettingsModal({ open, onClose }) {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");

  if (!open) return null;

  const activeNav = NAV_ITEMS.find((n) => n.id === activeTab);
  const ActivePanel = PANELS[activeTab];

  return (
    <div className="sm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sm-modal" role="dialog" aria-modal="true" aria-label="Configuración">

        {/* Sidebar */}
        <aside className="sm-sidebar">
          <span className="sm-sidebar-title">Ajustes</span>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sm-nav-btn${activeTab === item.id ? " active" : ""}`}
              onClick={() => setActiveTab(item.id)}
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
            <button className="sm-close-btn" onClick={onClose} aria-label="Cerrar">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M1 1l10 10M11 1L1 11"/>
              </svg>
            </button>
          </div>

          <div className="sm-body">
            <ActivePanel theme={theme} toggleTheme={toggleTheme} />
          </div>

          <div className="sm-footer">
            <button className="sm-btn-cancel" onClick={onClose}>Cancelar</button>
            <button className="sm-btn-save">Guardar cambios</button>
          </div>
        </div>

      </div>
    </div>
  );
}