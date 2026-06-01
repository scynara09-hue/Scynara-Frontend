import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import RoleBanner from "../../components/employees/RoleBanner";
import EmployeesTopbar from "../../components/employees/EmployeesTopbar";
import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import Toast from "../../components/inventory/Toast";
import { useAuth } from "../../context/AuthContext";
import "./Employees.css";


const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Employees() {
  const { user, getUsers, updateUser, deleteUser, createUser } = useAuth();
  const isAdmin = user?.rol?.toLowerCase() === "administrador";

  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  
  const loadEmployees = async () => {
    if (isAdmin) {
      const data = await getUsers();
      if (data) {
        
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
    
  }, [isAdmin]);

  
  const filtered = useMemo(() => {
    const currentUserId = user?.id_usuario || user?.id;

    if (!isAdmin) {
      const myProfile = employees.find((e) => e.id_usuario === currentUserId) || {
        id_usuario: currentUserId,
        numero: `E-${String(currentUserId || 0).padStart(3, '0')}`,
        nombre: user?.nombre,
        apellidos: user?.apellidos || "",
        correo: user?.email || user?.correo,
        telefono: user?.telefono || "No registrado",
        horario_entrada: user?.horario_entrada || "N/A",
        horario_salida: user?.horario_salida || "N/A",
        tipo_jornada: user?.tipo_jornada || "N/A",
        estado: user?.estado || "ACTIVO",
      };
      return [myProfile];
    }

    return employees.filter((e) => e.id_usuario !== currentUserId);
  }, [employees, isAdmin, user]);

  const isOwnProfile = editing?.id_usuario === (user?.id_usuario || user?.id);

  
  const handleEdit = (id) => {
    const empToEdit = filtered.find((e) => e.id_usuario === id) || null;
    setEditing(empToEdit);
    setModalOpen(true);
  };

  const handleToggle = async (id) => {
    const empToToggle = employees.find((e) => e.id_usuario === id);
    if (!empToToggle) return;

    const currentStatus = empToToggle.estado?.toUpperCase() || "ACTIVO";
    const nextStatusMap = { ACTIVO: "INACTIVO", INACTIVO: "ACTIVO", BAJA: "BAJA" };
    const newStatus = nextStatusMap[currentStatus];

    const success = await updateUser(id, { estado: newStatus });
    
    if (success) {  
      setToast("Estado actualizado correctamente");
      loadEmployees(); 
    } else {
      setToast("Error al actualizar el estado");
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteUser(id);
    
    if (success) {
      setToast("Empleado eliminado exitosamente");
      loadEmployees();
    } else {
      setToast("Error al eliminar el empleado");
    }
  };

  const handleSave = async (data) => {
    try {
      if (data.id_usuario) {
        await updateUser(data.id_usuario, data);
        setToast("Perfil actualizado correctamente");
      } else {
        await createUser(data);
        setToast("Empleado agregado con éxito");
      }
      loadEmployees();
      
    } catch (error) {
      const backendErrors = error.response?.data?.errors || { general: "Error al guardar" };
      setToast(error.response?.data?.message || "Revisa los campos marcados en rojo");
      
      throw error; 
    }
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />  

      <main className="emp-main">
        
        {}
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <button 
            className="sb-menu-btn" 
            onClick={() => setSidebarOpen(true)}
            title="Abrir menú"
          >
            <IconMenu />
          </button>
          
          <div style={{ flex: 1, width: "100%" }}>
            <EmployeesTopbar
              rol={user?.rol}
              onAdd={() => {
                setEditing(null);
                setModalOpen(true);
              }}
            />
          </div>
        </div>

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