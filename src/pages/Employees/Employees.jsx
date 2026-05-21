import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import RoleBanner from "../../components/employees/RoleBanner";
import EmployeesTopbar from "../../components/employees/EmployeesTopbar";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import Toast from "../../components/inventory/Toast";
import { useAuth } from "../../context/AuthContext";
// Importamos la petición de registro directamente para crear nuevos usuarios
import { createUserRequest } from "../../services/authService"; 
import "./Employees.css";

export default function Employees() {
  const { user, getUsers, updateUser, deleteUser } = useAuth();
  const isAdmin = user?.rol?.toLowerCase() === "administrador";

  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ─── CARGAR EMPLEADOS DESDE EL BACKEND ───
  const loadEmployees = async () => {
    if (isAdmin) {
      const data = await getUsers();
      if (data) {
        // Formateamos los datos para generar el "numero" (ej. E-001) basado en el ID
        const formattedData = data.map(emp => ({
          ...emp,
          numero: `E-${String(emp.id_usuario).padStart(3, '0')}`
        }));
        setEmployees(formattedData);
      }
    }
  };

  useEffect(() => {
    loadEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  // Filtrado directo: Si es admin ve todos, si es empleado ve solo su perfil mapeado desde el AuthContext
  const filtered = useMemo(() => {
    if (!isAdmin) {
      // Intentamos usar el id_usuario (o id si viene resumido)
      const currentId = user?.id_usuario || user?.id;
      const myProfileInList = employees.find((e) => e.id_usuario === currentId);

      if (myProfileInList) return [myProfileInList];

      // Si no hay lista cargada, armamos la fila con los datos en vivo del Contexto
      return [{
        id_usuario: currentId,
        numero: `E-${String(currentId || 0).padStart(3, '0')}`,
        nombre: user?.nombre,
        apellidos: user?.apellidos || "",
        correo: user?.email || user?.correo,
        telefono: user?.telefono || "No registrado",
        horario_entrada: user?.horario_entrada || "N/A",
        horario_salida: user?.horario_salida || "N/A",
        tipo_jornada: user?.tipo_jornada || "N/A",
        estado: user?.estado || "ACTIVO",
      }];
    }

    return employees;
  }, [employees, isAdmin, user]);

  // Identificador de perfil propio para el modal
  const isOwnProfile = editing?.id_usuario === (user?.id_usuario || user?.id);

  // ─── MANEJADORES DE ACCIONES (CRUD) ───
  const handleEdit = (id) => {
    const empToEdit = filtered.find((e) => e.id_usuario === id) || null;
    setEditing(empToEdit);
    setModalOpen(true);
  };

  const handleToggle = async (id) => {
    const empToToggle = employees.find((e) => e.id_usuario === id);
    if (!empToToggle) return;

    // Calculamos el siguiente estado
    const currentStatus = empToToggle.estado?.toUpperCase() || "ACTIVO";
    const nextStatusMap = { ACTIVO: "INACTIVO", INACTIVO: "ACTIVO", BAJA: "BAJA" };
    const newStatus = nextStatusMap[currentStatus];

    // Actualizamos en la base de datos
    const success = await updateUser(id, { estado: newStatus });
    
    if (success) {  
      setToast("Estado actualizado correctamente");
      loadEmployees(); // Refrescamos la lista
    } else {
      setToast("Error al actualizar el estado");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este empleado de forma permanente?")) return;

    const success = await deleteUser(id);
    if (success) {
      setToast("Empleado eliminado");
      loadEmployees();
    } else {
      setToast("Error al eliminar");
    }
  };

  const handleSave = async (data) => {
    if (data.id_usuario) {
      // ─── ACTUALIZAR ───
      const success = await updateUser(data.id_usuario, data);
      if (success) {
        setToast("Perfil actualizado correctamente");
        loadEmployees();
      } else {
        setToast("Hubo un error al actualizar");
      }
    } else {
      // ─── CREAR NUEVO EMPLEADO ───
      try {
        // CAMBIA registerRequest POR createUserRequest AQUÍ
        await createUserRequest(data);
        setToast("Empleado agregado con éxito");
        loadEmployees();
      } catch (error) {
        setToast(error.response?.data?.message || "Error al crear el empleado");
      }
    }

    setModalOpen(false);
    setEditing(null);
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />  

      <main className="emp-main">
        <EmployeesTopbar
          rol={user?.rol}
          onAdd={() => {
            setEditing(null);
            setModalOpen(true);
          }}
        />

        <RoleBanner rol={user?.rol} />

        <EmployeeTable
          employees={filtered} 
          currentUserId={user?.id_usuario || user?.id}
          isAdmin={isAdmin}
          onEdit={handleEdit}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </main>

      <EmployeeModal
        open={modalOpen}
        employee={editing}
        isAdmin={isAdmin}
        isOwnProfile={isOwnProfile}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}