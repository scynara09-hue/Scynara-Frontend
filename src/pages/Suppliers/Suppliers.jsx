import { useState, useMemo, useEffect } from "react";
import { useProveedores } from "../../context/ProveedorContext";
import Sidebar from "../../components/sidebar/Sidebar";
import SuppliersTopbar from "../../components/suppliers/SuppliersTopbar";
import SuppliersStats from "../../components/suppliers/SuppliersStats";
import SuppliersToolbar from "../../components/suppliers/SuppliersToolbar";
import SuppliersGrid from "../../components/suppliers/SuppliersGrid";
import SupplierDetailPanel from "../../components/suppliers/SupplierDetailPanel";
import SupplierModal from "../../components/suppliers/SupplierModal";
import Toast from "../../components/inventory/Toast";
import "./Suppliers.css";

export default function Suppliers() {
  // 💡 Conectamos con el contexto real
  const { proveedores, getProveedores, createProveedor, updateProveedor, deleteProveedor } = useProveedores();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nombre");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cargar datos al iniciar
  useEffect(() => {
    getProveedores();
  }, []);

  // Extraer categorías únicas (nota: ahora usamos la data de la BD)
  const categorias = useMemo(() => {
    return [...new Set(proveedores.map(s => s.categoria).filter(Boolean))].sort();
  }, [proveedores]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let list = proveedores.filter(s =>
      (!q || s.nombre.toLowerCase().includes(q) ||
        s.correo?.toLowerCase().includes(q)) &&
      (!filterCategoria || s.categoria === filterCategoria)
    );

    if (sort === "nombre") list = [...list].sort((a, b) => a.nombre.localeCompare(b.nombre));
    return list;
  }, [proveedores, search, sort, filterCategoria]);

  const selectedSupplier = proveedores.find(s => s.id_proveedor === selectedId) || null;

  const handleEdit = (id) => {
    setEditing(proveedores.find(s => s.id_proveedor === id));
    setModalOpen(true);
  };

  const handleSave = async (data) => {
    if (data.id_proveedor) {
      await updateProveedor(data.id_proveedor, data);
      setToast("Proveedor actualizado");
    } else {
      await createProveedor(data);
      setToast("Proveedor agregado correctamente");
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await deleteProveedor(id);
    if (selectedId === id) setSelectedId(null);
    setToast("Proveedor eliminado");
  };

  return (
    <div className="dash">
      {sidebarOpen && <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="suppliers-main">
        <div className="suppliers-body">
          <div className="suppliers-left">
            <SuppliersTopbar onAdd={() => { setEditing(null); setModalOpen(true); }} />
            <SuppliersStats suppliers={proveedores} />
            <SuppliersToolbar
              search={search} onSearch={setSearch}
              sort={sort} onSort={setSort}
              filterCategoria={filterCategoria} onFilterCategoria={setFilterCategoria}
              categorias={categorias}
              count={filtered.length}
            />
            <SuppliersGrid
              suppliers={filtered}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onEdit={handleEdit}
            />
          </div>

          <SupplierDetailPanel
            supplier={selectedSupplier}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <SupplierModal
        open={modalOpen}
        supplier={editing}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}