import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ReportsTopbar from "../../components/reports/ReportsTopbar";
import ReportsDateFilter from "../../components/reports/ReportsDateFilter";
import ReportsTabs from "../../components/reports/ReportsTabs";
import SalesReport from "../../components/reports/SalesReport";
import InventoryReport from "../../components/reports/InventoryReport";
import ClientsReport from "../../components/reports/ClientsReport";
import SuppliersReport from "../../components/reports/SuppliersReport";
import Toast from "../../components/inventory/Toast";
import "./Reports.css";

export default function Reports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("ventas");
  const [period, setPeriod] = useState("week");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [toast, setToast] = useState("");

  const handleExport = () => {
    setToast("Exportando reporte…");
  };

  return (
    <div className="dash">
      {sidebarOpen && (
        <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="reports-main">
        <div className="reports-scroll">
          <ReportsTopbar onExport={handleExport} />

          <ReportsDateFilter
            period={period} onPeriod={setPeriod}
            dateFrom={dateFrom} onDateFrom={setDateFrom}
            dateTo={dateTo}   onDateTo={setDateTo}
          />

          <ReportsTabs active={tab} onChange={setTab} />

          {tab === "ventas"      && <SalesReport     period={period} />}
          {tab === "inventario"  && <InventoryReport  period={period} />}
          {tab === "clientes"    && <ClientsReport    period={period} />}
          {tab === "proveedores" && <SuppliersReport  period={period} />}
        </div>
      </div>

      <Toast message={toast} onHide={() => setToast("")} />
    </div>
  );
}