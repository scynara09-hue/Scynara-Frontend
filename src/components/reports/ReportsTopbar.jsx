import { BarChart2, Download } from "lucide-react";

export default function ReportsTopbar({ onExport }) {
  return (
    <div className="reports-topbar">
      <div className="reports-title">
        <h1>Reportes</h1>
        <p>Analiza el desempeño de tu tienda en tiempo real</p>
      </div>
      <div className="reports-topbar-right">
        <button className="reports-export-btn" onClick={onExport}>
          <Download size={14} />
          Exportar
        </button>
      </div>
    </div>
  );
}