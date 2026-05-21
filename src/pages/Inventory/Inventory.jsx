import { useState, useMemo, useEffect } from "react";
// 1. Importar el hook de nuestro contexto
import { useProducts } from "../../context/ProductContext";

import Sidebar from "../../components/sidebar/Sidebar";
import InventoryTopbar from "../../components/inventory/InventoryTopbar";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryToolbar from "../../components/inventory/InventoryToolbar";
import ProductGrid from "../../components/inventory/ProductGrid";
import ProductModal from "../../components/inventory/ProductModal";
import Toast from "../../components/inventory/Toast";
import "./Inventory.css";

export default function Inventory() {
  // 2. Extraer el estado y funciones del contexto
  const {
    products,
    loading,
    error,
    loadProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const [search, setSearch] = useState("");
  const [activeCategory, setCategory] = useState("Todas");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 3. Cargar productos desde la Base de Datos al entrar a la vista
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Mostrar errores en el toast si ocurren en el contexto
  useEffect(() => {
    if (error) setToast(error);
  }, [error]);

  // 4. Filtrado reactivo actualizado a las claves de la Base de Datos
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      // Usamos 'categoria_nombre' que nos devuelve el backend en el JOIN
      const matchCat = activeCategory === "Todas" || p.categoria_nombre === activeCategory;
      const matchQ = (p.nombre || "").toLowerCase().includes(q) ||
        (p.proveedor_nombre || "").toLowerCase().includes(q); // Usamos 'proveedor_nombre'
      return matchCat && matchQ;
    });
  }, [products, search, activeCategory]);

  const handleAdd = () => { setEditing(null); setModalOpen(true); };

  const handleEdit = (product) => { setEditing(product); setModalOpen(true); };

  // 5. Manejadores CRUD usando las funciones del backend
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
      // En tu backend, la clave primaria es 'id_producto' (singular)
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
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="inv-main">
        <InventoryTopbar onAdd={handleAdd} />

        {/* Si está cargando, puedes mostrar un mensaje o un spinner simple */}
        {loading ? (
          <p style={{ textAlign: "center", padding: "2rem" }}>Cargando inventario...</p>
        ) : (
          <>
            <InventoryStats products={products} />
            <InventoryToolbar
              search={search} onSearch={setSearch}
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

      {/* Usamos una 'key' para forzar que el modal se reinicie entre creaciones y ediciones */}
      <ProductModal
        key={editing ? editing.id_producto : 'new'}
        open={modalOpen}
        product={editing}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}