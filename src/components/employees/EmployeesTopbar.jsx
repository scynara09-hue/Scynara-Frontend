
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" width="15" height="15">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);


export default function EmployeesTopbar({ onAdd, readOnly = false }) {
  return (
    <div className="emp-topbar">

      <div className="emp-title">
        <h1>Empleados</h1>
        <p>Gestiona el equipo de tu tienda</p>
      </div>

      {!readOnly && (
        <button className="emp-add-btn" onClick={onAdd}>
          <IconPlus />
          Agregar empleado
        </button>
      )}

    </div>
  );
}
