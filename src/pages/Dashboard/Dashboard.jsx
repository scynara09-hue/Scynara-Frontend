import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProfileRequest } from "../../services/authService";

import { useVentas } from "../../context/VentaContext";
import { useCustomers } from "../../context/CustomersContext";
import { useProducts } from "../../context/ProductContext";

import Sidebar from "../../components/sidebar/Sidebar";
import StatCards from "../../components/dashboard/StatCards/StatCards";
import ModuleCards from "../../components/dashboard/ModuleCards/ModuleCards";
import RecentSales from "../../components/dashboard/RecentSales/RecentSales";
import AlertsPanel from "../../components/dashboard/AlertsPanel/AlertsPanel";
import SettingsModal from "../../components/dashboard/SettingsModal/SettingsModal";

import "./Dashboard.css";


const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" width="18" height="18">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 10.91 3H11a2 2 0 1 1 4 0h-.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 21 10.91V11a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);


function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 19) return "Buenas tardes";
  return "Buenas noches";
}

function formatDate() {
  return new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}


export default function Dashboard() {
  const { user } = useAuth();

  const { ventas, getVentas } = useVentas();
  const { customers, getCustomers } = useCustomers();
  const { products, loadProducts } = useProducts();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [profileData, setProfileData] = useState(null);

useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileRequest();
        setProfileData(res.data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };
    
    fetchProfile();
    getVentas();
    getCustomers();
    loadProducts();
  }, []); // <--- ARREGLO VACÍO: Solo se ejecuta 1 vez al montar el componente
  return (
    <div className="dash">
      {sidebarOpen && <div className="sb-overlay" onClick={() => setSidebarOpen(false)} />}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="dash-main">
        <div className="dash-topbar">
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <button className="sb-menu-btn" onClick={() => setSidebarOpen(true)}>
              <IconMenu />
            </button>
            <div className="dash-greeting">
              <h1>{getGreeting()}, <span>{profileData?.nombre || user?.nombre || 'Usuario'}</span> 👋</h1>
              <p style={{ textTransform: "capitalize" }}>{formatDate()}</p>
            </div>
          </div>

          <div className="dash-topbar-right">
            <button className="settings-btn" onClick={() => setOpenSettings(true)}>
              <IconSettings />
            </button>
          </div>
        </div>

        <StatCards ventas={ventas} customers={customers} products={products} />
        <ModuleCards />

        <div className="dash-bottom">
          <RecentSales ventas={ventas} />
          <AlertsPanel products={products} />
        </div>
      </main>

      <SettingsModal open={openSettings} onClose={() => setOpenSettings(false)} />
    </div>
  );
}
