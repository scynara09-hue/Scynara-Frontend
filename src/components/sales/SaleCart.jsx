import { useVentas } from "../../context/VentaContext";

const IconMinus  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="12" height="12"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconPlus2  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconTrash  = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="11" height="11">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
  </svg>
);

export default function SaleCart({ products }) {
  // 💡 Consumimos la lógica directamente del contexto
  const { carrito, totalCarrito, agregarAlCarrito, quitarDelCarrito, errors } = useVentas();

  const handleAdd = () => {
    const sel = document.getElementById("cart-prod-select");
    const opt = sel.options[sel.selectedIndex];
    if (!opt.value) return;
    
    // Adaptamos el objeto a la estructura que espera la función agregarAlCarrito en el Contexto
    agregarAlCarrito({
      id_producto: Number(opt.value),
      nombre: opt.text.split(" — ")[0],
      precio_unitario: parseFloat(opt.dataset.price),
    }, 1); // 1 es la cantidad inicial
    
    sel.value = ""; // Reiniciamos el select
  };

  return (
    <>
      <div className="cart-add-row">
        <select className="m-input" id="cart-prod-select">
          <option value="">Selecciona un producto...</option>
          {products?.map(p => (
            <option key={p.id_producto} value={p.id_producto} data-price={p.precio_unitario}>
              {p.nombre} — ${Number(p.precio_unitario).toFixed(2)}
            </option>
          ))}
        </select>
        <button className="cart-add-btn" onClick={handleAdd}>
          + Agregar
        </button>
      </div>

      {/* 💡 Mostramos si hay un error global en los detalles del carrito (ej. desde Zod) */}
      {errors?.detalles && (
         <div style={{ color: "#ef4444", fontSize: "0.85rem", marginBottom: "10px" }}>{errors.detalles}</div>
      )}

      <div className="cart-items">
        {carrito.length === 0 ? (
          <div className="cart-empty">Agrega productos para comenzar</div>
        ) : (
          carrito.map((item, index) => {
            // Buscamos si este producto específico tiene un error (ej. "detalles.0.cantidad": "Stock insuficiente")
            const itemError = errors && Object.keys(errors).find(k => k.startsWith(`detalles.${index}`));
            
            return (
              <div key={item.id_producto} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div className={`cart-item ${itemError ? 'cart-item-error' : ''}`}>
                  <span className="cart-item-name">{item.nombre}</span>
                  <div className="cart-item-qty">
                    <button className="cart-qty-btn" onClick={() => agregarAlCarrito(item, -1)}>
                      <IconMinus />
                    </button>
                    <span className="cart-qty-num">{item.cantidad}</span>
                    <button className="cart-qty-btn" onClick={() => agregarAlCarrito(item, 1)}>
                      <IconPlus2 />
                    </button>
                  </div>
                  <span className="cart-item-price">
                    ${(item.precio_unitario_venta * item.cantidad).toFixed(2)}
                  </span>
                  <button className="cart-item-del" onClick={() => quitarDelCarrito(item.id_producto)}>
                    <IconTrash />
                  </button>
                </div>
                {itemError && <span style={{ color: "#ef4444", fontSize: "0.8rem", textAlign: "right" }}>{errors[itemError]}</span>}
              </div>
            );
          })
        )}
      </div>

      <div className="cart-total">
        <span className="cart-total-label">Total de la venta</span>
        <span className="cart-total-amount">${totalCarrito.toFixed(2)}</span>
      </div>
    </>
  );
}