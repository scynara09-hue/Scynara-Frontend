import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const links = [
  { name: "Inicio", id: "inicio" },
  { name: "Características", id: "Características" },
  { name: "¿Cómo funciona?", id: "¿Cómo funciona?" },
  { name: "Testimonios", id: "Testimonios" },
];

export default function Navbar() {
  const [active, setActive] = useState("Inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleScroll = (id, name) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActive(name);
      setMenuOpen(false);
    }
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">

        <h2 className="logo" onClick={() => navigate("/")}>
          SCYNARA
        </h2>

        {/* Links escritorio */}
        <ul className="nav-links">
          {links.map((link) => (
            <li
              key={link.name}
              className={active === link.name ? "active" : ""}
              onClick={() => handleScroll(link.id, link.name)}
            >
              {link.name}
            </li>
          ))}
        </ul>

        <div className="nav-right">
          {user ? (
            <button className="btn-login" onClick={handleLogout}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <button className="btn-login" onClick={handleLogin}>
                Iniciar sesión
              </button>
              <button className="btn-register" onClick={handleRegister}>
                Registrarse
              </button>
            </>
          )}

          {/* Hamburguesa */}
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {links.map((link) => (
              <button
                key={link.name}
                className={`mobile-link ${active === link.name ? "active" : ""}`}
                onClick={() => handleScroll(link.id, link.name)}
              >
                {link.name}
              </button>
            ))}

            <div className="mobile-divider" />

            {user ? (
              <button
                className="btn-login-mobile"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            ) : (
              <>
                <button
                  className="btn-login-mobile"
                  onClick={handleLogin}
                >
                  Iniciar sesión
                </button>
                <button
                  className="btn-register-mobile"
                  onClick={handleRegister}
                >
                  Registrarse
                </button>
              </>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}