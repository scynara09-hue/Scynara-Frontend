import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ClientsTopbar from "../../components/customers/ClientsTopbar";
import ClientsStats from "../../components/customers/ClientsStats";
import ClientsToolbar from "../../components/customers/ClientsToolbar";
import ClientsGrid from "../../components/customers/ClientsGrid";
import ClientDetailPanel from "../../components/customers/ClientDetailPanel";
import ClientModal from "../../components/customers/ClientModal";
import Toast from "../../components/inventory/Toast";

// ─── Importamos el Hook del Contexto ───
import { useCustomers } from "../../context/CustomersContext"; 

import "./Customers.css";

// ─── Función auxiliar segura ───
function totalCompras(client) {
  const compras = client.compras || [];
  return compras
    .filter((c) => c.estado === "completada")
    .reduce((a, c) => a + c.total, 0);
}

export default function Customers() {
  // ─── Extraemos el estado y las funciones del Contexto ───
  const { 
    customers, 
    getCustomers, 
    createCustomer, 
    updateCustomer, 
    deleteCustomer 
  } = useCustomers();
  
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nombre");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ─── CARGAR CLIENTES ───
  useEffect(() => {
    // getCustomers ya maneja el loading y los errores internamente en el contexto
    getCustomers().catch(() => setToast("Error al cargar la lista de clientes"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── FILTRADO Y ORDENADO DINÁMICO ───
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = customers.filter(
      (c) =>
        !q ||
        `${c.nombre} ${c.apellidos || ''}`.toLowerCase().includes(q) ||
        (c.correo || "").toLowerCase().includes(q) ||
        (c.RFC || "").toLowerCase().includes(q)
    );
    
    if (sort === "nombre") {
      list = [...list].sort((a, b) =>
        `${a.nombre}${a.apellidos || ''}`.localeCompare(`${b.nombre}${b.apellidos || ''}`)
      );
    }
    if (sort === "compras") {
      list = [...list].sort((a, b) => (b.compras?.length || 0) - (a.compras?.length || 0));
    }
    if (sort === "total") {
      list = [...list].sort((a, b) => totalCompras(b) - totalCompras(a));
    }
    
    return list;
  }, [customers, search, sort]);

  const selectedClient = customers.find((c) => c.id_cliente === selectedId) || null;
  const selectedIndex = selectedClient ? customers.indexOf(selectedClient) : 0;

  // ─── MANEJADORES DE EVENTOS (CRUD) ───
  const handleEdit = (id) => {
    setEditing(customers.find((c) => c.id_cliente === id));
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    try {
      let res;
      
      if (data.id_cliente) {
        res = await updateCustomer(data.id_cliente, data);
      } else {
        res = await createCustomer(data);
      }

      // Interceptor por si tu backend responde 200 con { errors: {...} } en lugar de 400
      const possibleErrors = res?.errors || res?.data?.errors;
      if (possibleErrors) {
        const msg = res?.message || res?.data?.message || "Revisa los campos marcados en rojo";
        setToast(msg);
        return { success: false, errors: possibleErrors };
      }

      setToast(data.id_cliente ? "Cliente actualizado" : "Cliente agregado correctamente");
      
      // Refrescamos la lista global
      getCustomers();
      
      if (data.id_cliente && selectedId === data.id_cliente) {
        setSelectedId(data.id_cliente);
      }
      
      return { success: true }; 

    } catch (error) {
      // El contexto lanza el error de Axios (ej. 400), lo atrapamos aquí
      const backendErrors = error.response?.data?.errors || { general: "Error al guardar" };
      setToast(error.response?.data?.message || "Revisa los campos marcados en rojo");
      return { success: false, errors: backendErrors }; 
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCustomer(id);
      if (selectedId === id) setSelectedId(null);
      setToast("Cliente eliminado exitosamente");
      getCustomers();
    } catch (error) {
      setToast(error.response?.data?.message || "Error al eliminar el cliente");
    }
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="clients-main">
        <div className="clients-body">
          {/* Columna izquierda */}
          <div className="clients-left">
            <ClientsTopbar
              onAdd={() => {
                setEditing(null);
                setModalOpen(true);
              }}
            />
            <ClientsStats clients={customers} />
            <ClientsToolbar
              search={search}
              onSearch={(v) => setSearch(v)}
              sort={sort}
              onSort={(v) => setSort(v)}
              count={filtered.length}
            />
            <ClientsGrid
              clients={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={handleEdit}
            />
          </div>

          {/* Panel lateral */}
          <ClientDetailPanel
            client={selectedClient}
            clientIndex={selectedIndex}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <ClientModal
        open={modalOpen}
        client={editing}
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