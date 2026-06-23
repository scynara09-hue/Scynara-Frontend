import { useEffect, useMemo, useState } from "react";
import {
  Boxes,
  Database,
  LayoutDashboard,
  PackageSearch,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import InventoryTopbar from "../../components/inventory/InventoryTopbar";
import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryToolbar from "../../components/inventory/InventoryToolbar";
import ProductGrid from "../../components/inventory/ProductGrid";
import ProductModal from "../../components/inventory/ProductModal";
import Toast from "../../components/inventory/Toast";
import "../Inventory/Inventory.css";
import "./LocalCrud.css";

const STORAGE_KEY = "scynara_crud_productos";

const categorias = [
  { id_categoria: 1, categoria: "Abarrotes" },
  { id_categoria: 2, categoria: "Bebidas" },
  { id_categoria: 3, categoria: "Lácteos" },
  { id_categoria: 4, categoria: "Limpieza" },
  { id_categoria: 5, categoria: "Mascotas" },
];

const proveedores = [
  { id_proveedor: 1, nombre: "Distribuidora La Paloma" },
  { id_proveedor: 2, nombre: "Bebidas del Centro" },
  { id_proveedor: 3, nombre: "Lácteos del Valle" },
  { id_proveedor: 4, nombre: "Hogar Limpio MX" },
  { id_proveedor: 5, nombre: "Mascotas Felices" },
];

const futureDate = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

const initialProducts = [
  {
    id_producto: 1,
    nombre: "Arroz Morelos 1 kg",
    id_categoria: 1,
    id_proveedor: 1,
    precio_unitario: 28,
    precio_caja: 320,
    cantidad: 34,
    fecha_caducidad: null,
  },
  {
    id_producto: 2,
    nombre: "Refresco cola 600 ml",
    id_categoria: 2,
    id_proveedor: 2,
    precio_unitario: 18,
    precio_caja: 290,
    cantidad: 46,
    fecha_caducidad: null,
  },
  {
    id_producto: 3,
    nombre: "Leche entera 1 l",
    id_categoria: 3,
    id_proveedor: 3,
    precio_unitario: 27,
    precio_caja: 265,
    cantidad: 20,
    fecha_caducidad: futureDate(6),
  },
  {
    id_producto: 4,
    nombre: "Cloro 1 l",
    id_categoria: 4,
    id_proveedor: 4,
    precio_unitario: 19,
    precio_caja: 180,
    cantidad: 4,
    fecha_caducidad: null,
  },
  {
    id_producto: 5,
    nombre: "Alimento para perro 2 kg",
    id_categoria: 5,
    id_proveedor: 5,
    precio_unitario: 98,
    precio_caja: 890,
    cantidad: 11,
    fecha_caducidad: null,
  },
];

const readProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialProducts;
  } catch {
    return initialProducts;
  }
};

const enrichProduct = (product) => ({
  ...product,
  categoria_nombre:
    categorias.find(
      (category) => category.id_categoria === Number(product.id_categoria)
    )?.categoria || "Sin categoría",
  proveedor_nombre:
    proveedores.find(
      (provider) => provider.id_proveedor === Number(product.id_proveedor)
    )?.nombre || "Sin proveedor",
});

export default function LocalCrud() {
  const [products, setProducts] = useState(readProducts);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  const enrichedProducts = useMemo(
    () => products.map(enrichProduct),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return enrichedProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "Todas" ||
        product.categoria_nombre === activeCategory;
      const matchesSearch =
        product.nombre.toLowerCase().includes(query) ||
        product.proveedor_nombre.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, enrichedProducts, search]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const saveProduct = (data) => {
    if (data.id_producto) {
      setProducts((current) =>
        current.map((product) =>
          product.id_producto === data.id_producto
            ? { ...product, ...data }
            : product
        )
      );
      setToast("Producto actualizado correctamente");
    } else {
      const nextId =
        products.reduce(
          (highest, product) => Math.max(highest, product.id_producto),
          0
        ) + 1;
      setProducts((current) => [
        { ...data, id_producto: nextId },
        ...current,
      ]);
      setToast("Producto agregado correctamente");
    }

    setModalOpen(false);
    setEditing(null);
  };

  const deleteProduct = (id) => {
    setProducts((current) =>
      current.filter((product) => product.id_producto !== id)
    );
    setToast("Producto eliminado correctamente");
  };

  const restoreDemo = () => {
    setProducts(initialProducts);
    setSearch("");
    setActiveCategory("Todas");
    setToast("Datos de ejemplo restaurados");
  };

  return (
    <div className="local-crud">
      <aside className="local-sidebar">
        <div className="local-brand">SCYNARA</div>

        <div className="local-profile">
          <div className="local-avatar">AD</div>
          <div>
            <strong>Administrador</strong>
            <span><ShieldCheck size={11} /> Modo local</span>
          </div>
        </div>

        <p className="local-menu-label">MENÚ PRINCIPAL</p>
        <div className="local-menu-item">
          <LayoutDashboard size={17} />
          Dashboard
        </div>
        <div className="local-menu-item active">
          <Boxes size={17} />
          Inventario
        </div>
        <div className="local-menu-item">
          <PackageSearch size={17} />
          Consulta de productos
        </div>

        <div className="local-storage-card">
          <Database size={18} />
          <div>
            <strong>Base de datos local</strong>
            <span>Los cambios se guardan en este navegador.</span>
          </div>
        </div>
      </aside>

      <main className="inv-main local-main">
        <div className="local-page-note">
          <div>
            <span>PROYECTO CRUD</span>
            <p>Altas, consultas, modificaciones y bajas con localStorage</p>
          </div>
          <button type="button" onClick={restoreDemo}>
            <RefreshCcw size={14} />
            Restaurar datos
          </button>
        </div>

        <InventoryTopbar onAdd={openCreate} />
        <InventoryStats products={enrichedProducts} />
        <InventoryToolbar
          search={search}
          onSearch={setSearch}
          categorias={categorias}
          activeCategory={activeCategory}
          onCategory={setActiveCategory}
        />
        <ProductGrid
          products={filteredProducts}
          onEdit={openEdit}
          onDelete={deleteProduct}
        />
      </main>

      <ProductModal
        key={editing?.id_producto || "new"}
        open={modalOpen}
        product={editing}
        categorias={categorias}
        proveedores={proveedores}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        onSave={saveProduct}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}
