import { Search, ArrowUpDown, Filter } from "lucide-react";

export default function SuppliersToolbar({ search, onSearch, sort, onSort, filterCategoria, onFilterCategoria, categorias, count }) {
  return (
    <div className="suppliers-toolbar">
      <div className="s-search">
        <span className="s-search-icon"><Search size={14} /></span>
        <input
          placeholder="Buscar por nombre, correo o teléfono..."
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

      <div className="s-filter">
        <Filter size={13} />
        <select value={filterCategoria} onChange={e => onFilterCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="s-filter">
        <ArrowUpDown size={13} />
        <select value={sort} onChange={e => onSort(e.target.value)}>
          <option value="nombre_az">Nombre (A - Z)</option>
          <option value="nombre_za">Nombre (Z - A)</option>
          <option value="categoria">Categoría</option>
          <option value="recientes">Más recientes</option>
        </select>
      </div>

      <span className="s-count">{count} proveedor{count !== 1 ? "es" : ""}</span>
    </div>
  );
}