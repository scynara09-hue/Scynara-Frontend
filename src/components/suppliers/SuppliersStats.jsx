import { Truck, CheckCircle, PauseCircle } from "lucide-react";

export default function SuppliersStats({ suppliers }) {
  // Aseguramos la comparación convirtiendo a mayúsculas, así empatamos con la BD
  const activos = suppliers.filter(s => s.estado?.toUpperCase() === "ACTIVO").length;
  
  // Los inactivos son simplemente el total menos los activos
  const inactivos = suppliers.length - activos;

  const stats = [
    { 
      icon: <Truck size={16} />,        
      color: "#0ea5e9", 
      bg: "rgba(14,165,233,0.12)",  
      num: suppliers.length, 
      label: "Total proveedores" 
    },
    { 
      icon: <CheckCircle size={16} />,   
      color: "#34d399", 
      bg: "rgba(52,211,153,0.12)",  
      num: activos,           
      label: "Activos" 
    },
    { 
      icon: <PauseCircle size={16} />,   
      color: "#f59e0b", 
      bg: "rgba(245,158,11,0.12)",  
      num: inactivos,         
      label: "Inactivos / Pausados" 
    }
  ];

  return (
    <div className="suppliers-stats">
      {stats.map((s, i) => (
        <div className="s-stat" key={i}>
          <div className="s-stat-icon" style={{ background: s.bg, color: s.color }}>
            {s.icon}
          </div>
          <div>
            <div className="s-stat-num">{s.num}</div>
            <div className="s-stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}