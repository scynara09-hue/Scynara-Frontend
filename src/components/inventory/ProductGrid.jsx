import ProductCard from "./ProductCard";

const IconEmpty = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.5" strokeLinecap="round" width="48" height="48">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export default function ProductGrid({ products, onEdit, onDelete, readOnly = false }) {
  if (!products.length) {
    return (
      <div className="inv-empty">
        <IconEmpty />
        <p>No se encontraron productos</p>
      </div>
    );
  }

  return (
    <div className="inv-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id_producto} 
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
}
