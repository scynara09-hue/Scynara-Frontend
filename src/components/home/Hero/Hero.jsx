import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg-dots" />
      <div className="hero-blob hero-blob--1" />
      <div className="hero-blob hero-blob--2" />

      <div className="hero-container">
        <div className="hero-text">
          <span className="hero-badge">
            <span className="hero-badge__dot" />
            Sistema de gestión moderno
          </span>

          <h1>
            Gestiona tu tienda<br />
            de forma <span className="hero-accent">inteligente</span>
          </h1>

          <p>
            Controla <strong>ventas, inventario, clientes</strong> y proveedores
            en un solo sistema. Optimiza tu negocio con tecnología moderna.
          </p>

          <div className="hero-btn-row">
            <button className="btn-primary">Comenzar ahora</button>
            <button className="btn-secondary">Ver demo →</button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat__num">+1,200</span>
              <span className="hero-stat__label">Tiendas activas</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__num">98%</span>
              <span className="hero-stat__label">Satisfacción</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__num">24/7</span>
              <span className="hero-stat__label">Soporte incluido</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-chip hero-chip--1">
            <span className="chip-dot chip-dot--green" /> +12 ventas hoy
          </div>
          <div className="hero-chip hero-chip--2">
            <span className="chip-dot chip-dot--blue" /> Inventario al día
          </div>
          <div className="hero-chip hero-chip--3">
            <span className="chip-dot chip-dot--purple" /> 3 proveedores nuevos
          </div>

          <div className="hero-card">
            <div className="hero-card__glow" />
            <div className="hero-card__floor" />
            <img src="/images/cat.png" alt="Mascota Scynara" />
          </div>
        </div>
      </div>
    </section>
  );
}