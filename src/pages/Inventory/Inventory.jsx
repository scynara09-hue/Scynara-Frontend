import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import { useProveedores } from "../../context/ProveedorContext";
import Sidebar from "../../components/sidebar/Sidebar";
import InventoryTopbar from "../../components/inventory/InventoryTopbar";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryToolbar from "../../components/inventory/InventoryToolbar";
import ProductGrid from "../../components/inventory/ProductGrid";
import ProductModal from "../../components/inventory/ProductModal";
import Toast from "../../components/inventory/Toast";
import "./Inventory.css";


const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Inventory() {
  const {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const { 
    proveedores, 
    categorias, 
    getProveedores, 
    getCategorias 
  } = useProveedores();

  const [search, setSearch] = useState("");
  const [activeCategory, setCategory] = useState("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadProducts();
    getProveedores(); 
    getCategorias();
  }, [loadProducts, getProveedores, getCategorias]); 

  useEffect(() => {
    if (error) setToast(error);
  }, [error]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchCat = activeCategory === "Todas" || p.categoria_nombre === activeCategory;
      const matchQ = (p.nombre || "").toLowerCase().includes(q) ||
        (p.proveedor_nombre || "").toLowerCase().includes(q); 
      return matchCat && matchQ;
    });
  }, [products, search, activeCategory]);

  const handleAdd = () => { setEditing(null); setModalOpen(true); };

  const handleEdit = (product) => { setEditing(product); setModalOpen(true); };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setToast("Producto eliminado");
    } catch (err) {
      setToast("Error al eliminar el producto");
    }
  };

  const handleSave = async (data) => {
    try {
      if (data.id_producto) {
        await updateProduct(data.id_producto, data);
        setToast("Producto actualizado correctamente");
      } else {
        await addProduct(data);
        setToast("Producto agregado correctamente");
      }
      setModalOpen(false);
    } catch (err) {
      setToast(err.response?.data?.message || "Error al guardar el producto");
    }
  };

  return (
    <div className="dash">
      {}
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="inv-main">
        
        {}
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          
          <button 
            className="sb-menu-btn" 
            onClick={() => setSidebarOpen(true)}
            title="Abrir menú"
          >
            <IconMenu />
          </button>
          
          {}
          <div style={{ flex: 1, width: "100%" }}>
            <InventoryTopbar onAdd={handleAdd} />
          </div>

        </div>

        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>Cargando inventario...</p>
        ) : (
          <>
            <InventoryStats products={products} />
            <InventoryToolbar
              search={search} onSearch={setSearch}
              categorias={categorias}
              activeCategory={activeCategory} onCategory={setCategory}
            />
            <ProductGrid
              products={filtered}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      <ProductModal
        key={editing ? editing.id_producto : 'new'}
        open={modalOpen}
        product={editing}
        categorias={categorias}
        proveedores={proveedores} 
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}