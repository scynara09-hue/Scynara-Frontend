import SaleRow from "./SaleRow";

export default function SalesTable({ sales, onView, onCancel, readOnly = false }) {
  return (
    <div className="sales-table-wrap">
      <table className="sales-table">
        <thead>
          <tr>
            <th style={{ width: 80  }}>ID</th>
            <th>Cliente</th>
            <th style={{ width: 110 }}>Fecha y Hora</th>
            <th style={{ width: 100 }}>Vendedor</th>
            <th style={{ width: 100 }}>Método</th>
            <th style={{ width: 100 }}>Total</th>
            <th style={{ width: 110 }}>Estado</th>
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
                readOnly={readOnly}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="table-empty">
                No se encontraron ventas
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
