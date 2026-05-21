const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="15" height="15">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="15" height="15">
    <circle cx="12" cy="8" r="4"/>
    <path d="M20 21a8 8 0 0 0-16 0"/>
  </svg>
);

export default function RoleBanner({ rol }) {
  const isAdmin = rol === "administrador";
  return (
    <div className={`role-banner ${isAdmin ? "admin-view" : "emp-view"}`}>
      {isAdmin ? <IconShield /> : <IconUser />}
      {isAdmin
        ? "Vista de administrador — puedes gestionar todos los empleados"
        : "Solo puedes ver y editar tu propio perfil"}
    </div>
  );
}