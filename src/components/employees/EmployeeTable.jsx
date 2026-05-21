import EmployeeRow from "./EmployeeRow";

export default function EmployeeTable({
  employees, currentUserId, isAdmin,
  onEdit, onToggle, onDelete,
}) {
  return (
    <div className="emp-table-wrap">
      <table className="emp-table">
        <thead>
          <tr>
            <th style={{ width: 80  }}>N°</th>
            <th>Empleado</th>
            <th style={{ width: 100 }}>Jornada</th>
            <th style={{ width: 120 }}>Horario</th>
            <th style={{ width: 110 }}>Estado</th>
            <th style={{ width: 90  }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.length ? (
            employees.map((emp, i) => (
              <EmployeeRow
                key={emp.id_usuario}
                employee={emp}
                index={i}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                onEdit={onEdit}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="table-empty">
                No se encontraron empleados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}