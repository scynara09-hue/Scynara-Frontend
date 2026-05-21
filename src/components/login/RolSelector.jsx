const roles = [
  { id: "empleado",      label: "Empleado",      sub: "Acceso estándar",  icon: "👤" },
  { id: "administrador", label: "Administrador",  sub: "Acceso completo",  icon: "🛡" },
];

export default function RolSelector({ value, onChange }) {
  return (
    <div className="login-rol-hint">
      {roles.map((rol) => (
        <button
          key={rol.id}
          type="button"
          className={`rol-chip ${value === rol.id ? "active" : ""}`}
          onClick={() => onChange(rol.id)}
        >
          <div className="rol-chip-icon">{rol.icon}</div>
          <p>{rol.label}</p>
          <span>{rol.sub}</span>
        </button>
      ))}
    </div>
  );
}