const IconMinus  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="12" height="12"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconPlus2  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" width="12" height="12"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IconTrash  = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="11" height="11">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
  </svg>
);

export default function SaleCart({ items, onAdd, onChangeQty, onRemove, products }) {
  const total = items.reduce((a, c) => a + c.precio * c.qty, 0);

  return (
    <>
      <div className="cart-add-row">
        <select className="m-input" id="cart-prod-select">
          <option value="">Selecciona un producto...</option>
          {products.map(p => (
            <option key={p.id_productos} value={p.id_productos} data-price={p.precio_unitario}>
              {p.nombre} — ${Number(p.precio_unitario).toFixed(2)}
            </option>
          ))}
        </select>
        <button
          className="cart-add-btn"
          onClick={() => {
            const sel = document.getElementById("cart-prod-select");
            const opt = sel.options[sel.selectedIndex];
            if (!opt.value) return;
            onAdd({
              id:     opt.value,
              nombre: opt.text.split(" — ")[0],
              precio: parseFloat(opt.dataset.price),
            });
            sel.value = "";
          }}
        >
          + Agregar
        </button>
      </div>

      <div className="cart-items">
        {items.length === 0 ? (
          <div className="cart-empty">Agrega productos para comenzar</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item">
              <span className="cart-item-name">{item.nombre}</span>
              <div className="cart-item-qty">
                <button className="cart-qty-btn" onClick={() => onChangeQty(item.id, -1)}>
                  <IconMinus />
                </button>
                <span className="cart-qty-num">{item.qty}</span>
                <button className="cart-qty-btn" onClick={() => onChangeQty(item.id, 1)}>
                  <IconPlus2 />
                </button>
              </div>
              <span className="cart-item-price">
                ${(item.precio * item.qty).toFixed(2)}
              </span>
              <button className="cart-item-del" onClick={() => onRemove(item.id)}>
                <IconTrash />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-total">
        <span className="cart-total-label">Total de la venta</span>
        <span className="cart-total-amount">${total.toFixed(2)}</span>
      </div>
    </>
  );
}