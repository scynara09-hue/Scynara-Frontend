import { Truck } from "lucide-react";
import SupplierCard from "./SupplierCard";

export default function SuppliersGrid({ suppliers, selectedId, onSelect, onEdit }) {
  if (!suppliers.length) {
    return (
      <div className="suppliers-empty">
        <Truck size={32} strokeWidth={1.5} />
        <p>No se encontraron proveedores</p>
      </div>
    );
  }

  return (
    <div className="suppliers-grid">
      {suppliers.map(s => (
        <SupplierCard
          key={s.id_proveedor}
          supplier={s}
          selected={s.id_proveedor === selectedId}
          onSelect={() => onSelect(s.id_proveedor)}
          onEdit={() => onEdit(s.id_proveedor)}
        />
      ))}
    </div>
  );
}