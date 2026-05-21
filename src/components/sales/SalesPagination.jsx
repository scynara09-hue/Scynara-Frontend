export default function SalesPagination({ total, page, perPage, onPage }) {
  const pages  = Math.ceil(total / perPage) || 1;
  const showing = Math.min(perPage, total - (page - 1) * perPage);

  return (
    <div className="sales-pagination">
      <span className="pag-info">
        Mostrando {showing} de {total} ventas
      </span>
      <div className="pag-btns">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`pag-btn ${page === i + 1 ? "active" : ""}`}
            onClick={() => onPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}