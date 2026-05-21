import "./CTA.css";

export default function CTA() {
  return (
    <section className="cta">
      <div className="cta-bg" />
      <div className="cta-blob cta-blob--1" />

      <div className="cta-inner">
        <div className="cta-badge">
          <span className="cta-badge__dot" />
          Sin tarjeta de crédito
        </div>
        <h2>Tu tienda merece un<br />sistema <span>inteligente</span></h2>
        <p>Deja las hojas de cálculo atrás. Empieza hoy y ten tu inventario, ventas y proveedores bajo control desde el primer día.</p>
        <div className="cta-btns">
          <button className="cta-btn-primary">Comenzar gratis ahora</button>
          <button className="cta-btn-secondary">Ver demostración →</button>
        </div>
        <p className="cta-note">Configuración en menos de 10 minutos · Soporte 24/7 incluido</p>
      </div>
    </section>
  );
}