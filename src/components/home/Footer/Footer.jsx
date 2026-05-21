import "./Footer.css";

const navLinks = {
  Producto:  ["Inventario", "Ventas", "Proveedores", "Clientes", "Reportes"],
  Empresa:   ["Acerca de", "Blog", "Carreras", "Contacto"],
  Soporte:   ["Documentación", "Tutoriales", "Estado del sistema", "Centro de ayuda"],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <div className="footer-logo">SCYNARA</div>
          <p>Sistema de gestión moderno para tiendas de abarrotes. Ventas, inventario, clientes y proveedores en un solo lugar.</p>
          <div className="footer-social">
            <SocialBtn icon={<IconTwitter />} />
            <SocialBtn icon={<IconLinkedin />} />
            <SocialBtn icon={<IconGithub />} />
          </div>
        </div>

        {Object.entries(navLinks).map(([title, links]) => (
          <div key={title} className="footer-col">
            <h4>{title}</h4>
            <ul>
              {links.map((link) => (
                <li key={link}><a href="#">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      <div className="footer-bottom">
        <p>© 2026 Scynara. Todos los derechos reservados.</p>
        <div className="footer-badge">
          <span className="footer-badge-dot" />
          Todos los sistemas operativos
        </div>
        <div className="footer-bottom-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

const SocialBtn = ({ icon }) => (
  <div className="social-btn">{icon}</div>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="#64748b">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.53 4.53 0 0 0-.61 2.27c0 1.57.8 2.95 2.01 3.76a4.5 4.5 0 0 1-2.05-.57v.06c0 2.19 1.56 4.02 3.63 4.43a4.5 4.5 0 0 1-2.04.08 4.53 4.53 0 0 0 4.22 3.14A9.06 9.06 0 0 1 0 19.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z"/>
  </svg>
);

const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="#64748b">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const IconGithub = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="#64748b">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);