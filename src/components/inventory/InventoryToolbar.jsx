const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" width="15" height="15">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function InventoryToolbar({ search, onSearch, activeCategory, onCategory, categorias = [] }) {
  

  
  const listaSegura = Array.isArray(categorias) ? categorias : [];

  
  const categoryNames = [
    "Todas", 
    ...listaSegura.filter(c => c && c.categoria).map(c => c.categoria)
  ];

  return (
    <div className="inv-toolbar">
      <div className="inv-search">
        <span className="inv-search-icon"><IconSearch /></span>
        <input
          type="text"
          placeholder="Buscar por nombre o proveedor..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="cat-chips">
        {categoryNames.map((cat) => (
          <button
            key={cat}
            className={`cat-chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}