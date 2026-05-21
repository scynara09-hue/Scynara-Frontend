import SaleRow from "./SaleRow";

export default function SalesTable({ sales, onView, onCancel }) {
  return (
    <div className="sales-table-wrap">
      <table className="sales-table">
        <thead>
          <tr>
            <th style={{ width: 80  }}>ID</th>
            <th>Cliente</th>
            <th style={{ width: 120 }}>Fecha</th>
            <th style={{ width: 100 }}>Empleado</th>
            <th style={{ width: 100 }}>Total</th>
            <th style={{ width: 120 }}>Estado</th>
            <th style={{ width: 80  }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.length ? (
            sales.map((s, i) => (
              <SaleRow
                key={s.id_venta}
                sale={s}
                index={i}
                onView={onView}
                onCancel={onCancel}
              />
            ))
          ) : (
            <tr>
              <td colSpan={7} className="table-empty">
                No se encontraron ventas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}