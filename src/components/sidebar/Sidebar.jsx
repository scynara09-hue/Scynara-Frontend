import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* ───────────── Iconos ───────────── */
const IconGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconDollar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
  </svg>
);

const IconLogout = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

/* ───────────── NAV ITEMS ───────────── */
// Los roles aquí se compararán ignorando mayúsculas/minúsculas más adelante
const NAV_ITEMS = [
  {
    section: "Principal",
    items: [
      { label: "Dashboard", path: "/dashboard", icon: IconGrid, roles: ["empleado", "administrador"] },
      { label: "Inventario", path: "/inventory", icon: IconHome, roles: ["empleado", "administrador"], badge: "12" },
      { label: "Ventas", path: "/sales", icon: IconDollar, roles: ["empleado", "administrador"] },
      // { label: "Clientes", path: "/customers", icon: IconUsers, roles: ["empleado", "administrador"] },
    ],
  },
  {
    section: "Gestión",
    items: [
      { label: "Proveedores", path: "/suppliers", icon: IconTruck, roles: ["empleado", "administrador"] },
      // { label: "Reportes", path: "/reports", icon: IconChart, roles: ["administrador"] },
    ],
  },
  {
    section: "Administración",
    items: [
      { label: "Empleados", path: "/employees", icon: IconUser, roles: ["administrador"] },
    ],
  },
];

/* ───────────── COMPONENTE ───────────── */
export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.nombre
    ? user.nombre.slice(0, 1).toUpperCase()
    : "U";

  // Estandarizamos el rol del usuario a minúsculas para compararlo fácilmente
  const userRole = user?.rol?.toLowerCase() || "";

  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sb-logo">SCYNARA</div>

      {/* Usuario */}
      <div className="sb-user">
        <div className="sb-avatar">{initials}</div>
        <div className="sb-user-info">
          <div className={`sb-rol ${userRole}`}>
            ● {userRole === "administrador" ? "Administrador" : "Empleado"}
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="sb-nav">
        {NAV_ITEMS.map(({ section, items }) => {
          // 1. Filtramos los items que el usuario actual SÍ tiene permitido ver
          const allowedItems = items.filter((item) => item.roles.includes(userRole));

          // 2. Si después de filtrar, la sección se queda vacía, no renderizamos nada (ni el título)
          if (allowedItems.length === 0) return null;

          return (
            <div key={section}>
              <div className="sb-section">{section}</div>

              {/* 3. Mapeamos solo los items permitidos */}
              {allowedItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sb-item ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon />
                    {item.label}
                    {item.badge && <span className="sb-badge">{item.badge}</span>}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sb-footer">
        <button className="sb-logout" onClick={handleLogout}>
          <IconLogout />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}