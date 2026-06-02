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
import { canWrite } from "../../utils/roles";
import "./Sales.css";

const PER_PAGE = 5;


const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default function Sales() {
  const { user } = useAuth();
  const readOnly = !canWrite(user?.rol);
  
  
  const { ventas, getVentas, cancelarVenta } = useVentas(); 
  const { getCustomers } = useCustomers(); 
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
    
    
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    return ventas.filter(s => {
      const matchQ = !q || 
        (s.cliente_nombre && s.cliente_nombre.toLowerCase().includes(q)) ||
        String(s.id_venta).includes(q) ||
        (s.vendedor_nombre && s.vendedor_nombre.toLowerCase().includes(q));
      
      const matchSt = status === "all" || (s.estado && s.estado.toUpperCase() === status.toUpperCase());
      
      let matchDt = true;
      const ventaTimeObj = s.fecha_hora ? new Date(s.fecha_hora) : new Date();

      
      if (dateRange === "today") matchDt = ventaTimeObj >= todayStart;
      if (dateRange === "week") matchDt = ventaTimeObj >= new Date(Date.now() - 7 * 864e5);
      if (dateRange === "month") matchDt = ventaTimeObj >= new Date(Date.now() - 30 * 864e5);
      
      return matchQ && matchSt && matchDt;
    });
  }, [ventas, search, status, dateRange]);

  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  
  
  const handleCancel = async (id) => {
    if (readOnly) return setToast("Tu cuenta de invitado solo tiene permisos de lectura.");
    try {
      
      await cancelarVenta(id);
      
      
      setToast(`Venta V-${id} cancelada. Inventario restaurado.`);
      
      
      loadProducts(); 
    } catch (error) {
      
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
            <SalesTopbar onNew={() => setNewOpen(true)} readOnly={readOnly} />
          </div>
        </div>

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
          readOnly={readOnly}
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
