import { useState, useMemo } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SalesTopbar from "../../components/sales/SalesTopbar";
import SalesStats from "../../components/sales/SalesStats";
import SalesToolbar from "../../components/sales/SalesToolbar";
import SalesTable from "../../components/sales/SalesTable";
import SalesPagination from "../../components/sales/SalesPagination";
import NewSaleModal from "../../components/sales/NewSaleModal";
import SaleDetailModal from "../../components/sales/SaleDetailModal";
import Toast from "../../components/inventory/Toast";
import { useAuth } from "../../context/AuthContext";
import "./Sales.css";

const INITIAL_SALES = [
  { id_venta: "V-001", cliente: "María Ramírez", empleado: "Niv", fecha: "2026-04-20", total: 342, estado: "completada", productos: [{ nombre: "Leche entera", qty: 3, precio: 22.5 }, { nombre: "Coca-Cola", qty: 2, precio: 18 }] },
  { id_venta: "V-002", cliente: "Jorge López", empleado: "Niv", fecha: "2026-04-20", total: 89, estado: "completada", productos: [{ nombre: "Arroz Morena", qty: 2, precio: 28 }, { nombre: "Detergente", qty: 1, precio: 55 }] },
  { id_venta: "V-003", cliente: "Mostrador", empleado: "Niv", fecha: "2026-04-20", total: 54, estado: "cancelada", productos: [{ nombre: "Coca-Cola", qty: 3, precio: 18 }] },
  { id_venta: "V-004", cliente: "Ana Gutiérrez", empleado: "Niv", fecha: "2026-04-20", total: 670, estado: "completada", productos: [{ nombre: "Pedigree", qty: 5, precio: 85 }] },
  { id_venta: "V-005", cliente: "Mostrador", empleado: "Niv", fecha: "2026-04-19", total: 120, estado: "completada", productos: [{ nombre: "Leche entera", qty: 2, precio: 22.5 }] },
  { id_venta: "V-006", cliente: "Roberto Mendoza", empleado: "Niv", fecha: "2026-04-19", total: 55, estado: "completada", productos: [{ nombre: "Detergente", qty: 1, precio: 55 }] },
  { id_venta: "V-007", cliente: "Mostrador", empleado: "Niv", fecha: "2026-04-18", total: 200, estado: "pendiente", productos: [{ nombre: "Pedigree", qty: 2, precio: 85 }] },
];

// Productos de ejemplo — reemplaza con tu fetch a la API
const PRODUCTS = [
  { id_productos: "1", nombre: "Leche entera", precio_unitario: 22.5 },
  { id_productos: "2", nombre: "Arroz Morena 1kg", precio_unitario: 28 },
  { id_productos: "3", nombre: "Coca-Cola 600ml", precio_unitario: 18 },
  { id_productos: "4", nombre: "Detergente Ariel", precio_unitario: 55 },
  { id_productos: "5", nombre: "Doritos Nacho", precio_unitario: 24 },
  { id_productos: "6", nombre: "Alimento Pedigree", precio_unitario: 85 },
];

const PER_PAGE = 5;
let counter = 8;

export default function Sales() {
  const { user } = useAuth();
  const [sales, setSales] = useState(INITIAL_SALES);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [page, setPage] = useState(1);
  const [newOpen, setNewOpen] = useState(false);
  const [detailSale, setDetailSale] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filtrado
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const today = new Date().toISOString().slice(0, 10);
    return sales.filter(s => {
      const matchQ = !q || s.cliente.toLowerCase().includes(q) ||
        s.id_venta.toLowerCase().includes(q) ||
        s.empleado.toLowerCase().includes(q);
      const matchSt = status === "all" || s.estado === status;
      let matchDt = true;
      if (dateRange === "today") matchDt = s.fecha === today;
      if (dateRange === "week") matchDt = new Date(s.fecha) >= new Date(Date.now() - 7 * 864e5);
      if (dateRange === "month") matchDt = new Date(s.fecha) >= new Date(Date.now() - 30 * 864e5);
      return matchQ && matchSt && matchDt;
    });
  }, [sales, search, status, dateRange]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleCancel = (id) => {
    setSales(prev => prev.map(s => s.id_venta === id ? { ...s, estado: "cancelada" } : s));
    setToast("Venta cancelada");
  };

  const handleSave = (data) => {
    const id = `V-00${counter++}`;
    setSales(prev => [{
      id_venta: id,
      cliente: data.cliente,
      empleado: user?.nombre || "Empleado",
      fecha: data.fecha,
      total: data.total,
      estado: "completada",
      productos: data.productos.map(p => ({
        nombre: p.nombre, qty: p.qty, precio: p.precio,
      })),
    }, ...prev]);
    setNewOpen(false);
    setToast(`Venta registrada: ${id}`);
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="sales-main">
        <SalesTopbar onNew={() => setNewOpen(true)} />
        <SalesStats sales={sales} />
        <SalesToolbar
          search={search} onSearch={v => { setSearch(v); setPage(1); }}
          status={status} onStatus={v => { setStatus(v); setPage(1); }}
          dateRange={dateRange} onDateRange={v => { setDateRange(v); setPage(1); }}
        />
        <SalesTable
          sales={paginated}
          onView={sale => setDetailSale(sale)}
          onCancel={handleCancel}
        />
        <SalesPagination
          total={filtered.length}
          page={page}
          perPage={PER_PAGE}
          onPage={setPage}
        />
      </main>

      <NewSaleModal
        open={newOpen}
        products={PRODUCTS}
        onClose={() => setNewOpen(false)}
        onSave={handleSave}
      />

      <SaleDetailModal
        open={!!detailSale}
        sale={detailSale}
        onClose={() => setDetailSale(null)}
      />

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}