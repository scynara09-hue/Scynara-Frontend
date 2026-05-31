import { useState, useMemo, useEffect } from "react";
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
import { useVentas } from "../../context/VentaContext"; 
import { useCustomers } from "../../context/CustomersContext"; 
import { useProducts } from "../../context/ProductContext";     
import "./Sales.css";

const PER_PAGE = 5;

export default function Sales() {
  const { user } = useAuth();
  
  // 💡 Extraemos cancelarVenta del contexto
  const { ventas, getVentas, cancelarVenta } = useVentas(); 
  const { customers, getCustomers } = useCustomers(); 
  const { products, loadProducts } = useProducts();   

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("today");
  const [page, setPage] = useState(1);
  const [newOpen, setNewOpen] = useState(false);
  const [detailSale, setDetailSale] = useState(null);
  const [toast, setToast] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getVentas();
    getCustomers(); 
    loadProducts(); 
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const today = new Date().toLocaleDateString('en-CA'); 

    return ventas.filter(s => {
      const matchQ = !q || 
        (s.cliente_nombre && s.cliente_nombre.toLowerCase().includes(q)) ||
        String(s.id_venta).includes(q) ||
        (s.vendedor_nombre && s.vendedor_nombre.toLowerCase().includes(q));
      
      const matchSt = status === "all" || s.estado === status;
      
      let matchDt = true;
      const ventaDate = s.fecha_hora ? s.fecha_hora.slice(0, 10) : ""; 
      const ventaTimeObj = new Date(s.fecha_hora);

      if (dateRange === "today") matchDt = ventaDate === today;
      if (dateRange === "week") matchDt = ventaTimeObj >= new Date(Date.now() - 7 * 864e5);
      if (dateRange === "month") matchDt = ventaTimeObj >= new Date(Date.now() - 30 * 864e5);
      
      return matchQ && matchSt && matchDt;
    });
  }, [ventas, search, status, dateRange]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // 💡 LÓGICA DE CANCELACIÓN REAL
 const handleCancel = async (id) => {
    try {
      // Ejecutamos la cancelación de inmediato
      await cancelarVenta(id);
      
      // Avisamos del éxito con tu Toast
      setToast(`Venta V-${id} cancelada. Inventario restaurado.`);
      
      // Recargamos los productos para reflejar el stock devuelto
      loadProducts(); 
    } catch (error) {
      // Si el backend nos manda un error, lo pintamos en el Toast
      setToast(error.response?.data?.message || "Error al cancelar la venta");
    }
  };

  const handleSaleSuccess = (idVenta) => {
    setNewOpen(false);
    setToast(`Venta registrada exitosamente: V-${idVenta}`);
    getVentas(); 
    loadProducts(); 
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="sales-main">
        <SalesTopbar onNew={() => setNewOpen(true)} />
        <SalesStats sales={filtered} /> 
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
        onClose={() => setNewOpen(false)}
        onSuccess={handleSaleSuccess}
        products={products} 
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