import { useState, useMemo, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ClientsTopbar from "../../components/customers/ClientsTopbar";
import ClientsStats from "../../components/customers/ClientsStats";
import ClientsToolbar from "../../components/customers/ClientsToolbar";
import ClientsGrid from "../../components/customers/ClientsGrid";
import ClientDetailPanel from "../../components/customers/ClientDetailPanel";
import ClientModal from "../../components/customers/ClientModal";
import Toast from "../../components/inventory/Toast";

import { useCustomers } from "../../context/CustomersContext"; 

import "./Customers.css";

const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);


function totalCompras(client) {
  const compras = client.compras || [];
  return compras
    .filter((c) => c.estado === "completada")
    .reduce((a, c) => a + c.total, 0);
}

export default function Customers() {
  
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

  
  useEffect(() => {
    
    getCustomers().catch(() => setToast("Error al cargar la lista de clientes"));
    
  }, []);

  
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

      
      const possibleErrors = res?.errors || res?.data?.errors;
      if (possibleErrors) {
        const msg = res?.message || res?.data?.message || "Revisa los campos marcados en rojo";
        setToast(msg);
        return { success: false, errors: possibleErrors };
      }

      setToast(data.id_cliente ? "Cliente actualizado" : "Cliente agregado correctamente");
      
      
      getCustomers();
      
      if (data.id_cliente && selectedId === data.id_cliente) {
        setSelectedId(data.id_cliente);
      }
      
      return { success: true }; 

    } catch (error) {
      
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
          {}
          <div className="clients-left">
            
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
                <ClientsTopbar
                  onAdd={() => {
                    setEditing(null);
                    setModalOpen(true);
                  }}
                />
              </div>
            </div>

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

          {}
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