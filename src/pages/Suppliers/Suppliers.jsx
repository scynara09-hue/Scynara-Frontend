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

/* ───────────── 💡 1. AGREGAMOS EL ICONO DEL MENÚ ───────────── */
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Suppliers() {
  const {
    proveedores,
    categorias,
    getProveedores,
    getCategorias,
    createProveedor,
    updateProveedor,
    deleteProveedor
  } = useProveedores();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("nombre_az");
  const [filterCategoria, setFilterCategoria] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getProveedores();
    getCategorias();
  }, []);

  const categoriasNombres = useMemo(() => {
    return categorias.map(c => c.categoria).sort();
  }, [categorias]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    let list = proveedores.filter(s => {
      const matchSearch = !q ||
        s.nombre.toLowerCase().includes(q) ||
        s.correo?.toLowerCase().includes(q) ||
        s.telefono?.includes(q);

      const matchCategoria = !filterCategoria || s.nombre_categoria === filterCategoria;

      return matchSearch && matchCategoria;
    });

    list = [...list].sort((a, b) => {
      if (sort === "nombre_az") {
        return a.nombre.localeCompare(b.nombre);
      }
      if (sort === "nombre_za") {
        return b.nombre.localeCompare(a.nombre);
      }
      if (sort === "categoria") {
        const catA = a.nombre_categoria || "";
        const catB = b.nombre_categoria || "";
        return catA.localeCompare(catB);
      }
      if (sort === "recientes") {
        return b.id_proveedor - a.id_proveedor;
      }
      return 0;
    });

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
            
            {/* ───────────── 💡 2. ENVOLVEMOS EL TOPBAR Y AGREGAMOS EL BOTÓN ───────────── */}
            <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
              <button 
                className="sb-menu-btn" 
                onClick={() => setSidebarOpen(true)}
                title="Abrir menú"
              >
                <IconMenu />
              </button>
              
              <div style={{ flex: 1, width: "100%" }}>
                <SuppliersTopbar onAdd={() => { setEditing(null); setModalOpen(true); }} />
              </div>
            </div>

            <SuppliersStats suppliers={proveedores} />
            <SuppliersToolbar
              search={search} onSearch={setSearch}
              sort={sort} onSort={setSort}
              filterCategoria={filterCategoria} onFilterCategoria={setFilterCategoria}
              categorias={categoriasNombres}
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
        categorias={categorias}
        onClose={() => { setModalOpen(false); setEditing(null); }}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}