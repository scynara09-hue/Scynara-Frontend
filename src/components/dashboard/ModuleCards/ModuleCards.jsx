import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";


const IconLock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const IconDollar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);

const IconTruck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" rx="2"/>
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8">
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.8">
    <line x1="18" y1="20" x2="18" y2="10"/>
  </svg>
);


const MODULES = [
  {
    label: "Ventas",
    path: "/sales",
    desc: "Registra una transacción y revisa el historial de tu sucursal.",
    tag: "Ventas",
    bgClass: "si-green",
    roles: ["EMPLEADO", "ADMINISTRADOR"], 
    icon: IconDollar
  },
  {
    label: "Inventario",
    path: "/inventory",
    desc: "Consulta stock actual, precios y productos próximos a caducar.",
    tag: "Inventario",
    bgClass: "si-purple",
    roles: ["EMPLEADO", "ADMINISTRADOR"],
    icon: IconHome
  },
  {
    label: "Clientes",
    path: "/customers",
    desc: "Busca clientes e historial de compras.",
    tag: "Clientes",
    bgClass: "si-blue",
    roles: ["EMPLEADO", "ADMINISTRADOR"],
    icon: IconUsers
  },
  {
    label: "Proveedores",
    path: "/suppliers",
    desc: "Consulta y gestiona los proveedores de la sucursal.",
    tag: "Proveedores",
    bgClass: "si-amber",
    roles: ["EMPLEADO", "ADMINISTRADOR"],
    icon: IconTruck
  },
  {
    label: "Empleados",
    path: "/employees",
    desc: "Gestión de empleados y cuentas de acceso.",
    tag: "Solo admin",
    bgClass: "si-gray",
    roles: ["ADMINISTRADOR"], 
    icon: IconUser
  },
  {
    label: "Reportes",
    path: "/reports",
    desc: "Análisis de ingresos y desempeño de la tienda.",
    tag: "Solo admin",
    bgClass: "si-gray",
    roles: ["ADMINISTRADOR"], 
    icon: IconChart
  }
];


export default function ModuleCards() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="dash-section-title">Accesos rápidos</div>

      <div className="dash-modules">
        {MODULES.map((mod) => {
          
          const userRole = user?.rol?.toUpperCase();
          const allowed = mod.roles.includes(userRole);
          const Icon = mod.icon;

          return (
            <div
              key={mod.label}
              className={`mod-card ${!allowed ? "locked" : ""}`}
              onClick={() => allowed && navigate(mod.path)}
              style={{ cursor: allowed ? "pointer" : "not-allowed" }}
            >
              <div className="mod-card-top">
                <div
                  className={`mod-icon ${allowed ? mod.bgClass : ""}`}
                  style={!allowed ? { background: "rgba(255,255,255,0.05)" } : {}}
                >
                  <Icon />
                </div>

                {!allowed && (
                  <div className="mod-lock">
                    <IconLock />
                  </div>
                )}
              </div>

              <h3>{mod.label}</h3>
              <p>{mod.desc}</p>
              <span className="mod-tag" style={!allowed ? { backgroundColor: "#f1f5f9", color: "#94a3b8" } : {}}>
                {mod.tag}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}