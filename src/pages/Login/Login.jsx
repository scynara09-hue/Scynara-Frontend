import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoginAlert from "../../components/login/LoginAlert";
import PolicyModal from "../../components/shared/PolicyModal";

import "./Login.css";


const IconMail = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconLock = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="16"
    height="16"
  >
    {open ? (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ) : (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const IconBack = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="18"
    height="18"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);


function validate({ email, password }) {
  const formErrors = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    formErrors.email = "Ingresa un correo válido";
  if (!password) formErrors.password = "Ingresa tu contraseña";
  return formErrors;
}


export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [form, setForm] = useState({ email: "", password: "" });
  const rol = "empleado";
  const [formErrors, setFormErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setFormErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setAlert({ type: "", message: "" });

    try {
      const success = await login({ ...form, rol });

      if (success) {
        setAlert({
          type: "success",
          message: "¡Sesión iniciada correctamente! Redirigiendo...",
        });
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        setAlert({ type: "error", message: "Correo o contraseña incorrectos." });
      }
    } catch (error) {
      if (error?.response?.status === 429) {
        setAlert({
          type: "error",
          message: "Demasiados intentos de inicio de sesión. Intenta más tarde.",
        });
      } else {
        setAlert({
          type: "error",
          message: error?.message || "Error al iniciar sesión. Intenta de nuevo.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => navigate("/");

  return (
    <div className="login-page">
      <div className="reg-bg" />
      <div className="reg-blob reg-blob--1" />
      <div className="reg-blob reg-blob--2" />
      <button className="back-button" onClick={handleBack}>
        <IconBack />
      </button>
      <div className="login-card">
        <div className="reg-logo">SCYNARA</div>

        <div className="login-header">
          <h2>Bienvenido de vuelta</h2>
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
          </p>
        </div>

        <LoginAlert type={alert.type} message={alert.message} />

        <form onSubmit={handleSubmit} noValidate>
          <div className="reg-field">
            <label htmlFor="email">CORREO ELECTRÓNICO</label>
            <div className="reg-input-wrap">
              <input
                id="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={form.email}
                onChange={set("email")}
                className={`reg-input ${formErrors.email ? "error" : ""}`}
              />
              <span className="reg-input-icon">
                <IconMail />
              </span>
            </div>
            {formErrors.email && (
              <span className="reg-error">{formErrors.email}</span>
            )}
          </div>
          <div className="reg-field">
            <label htmlFor="password">CONTRASEÑA</label>
            <div className="reg-input-wrap">
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                placeholder="Tu contraseña"
                value={form.password}
                onChange={set("password")}
                className={`reg-input ${formErrors.password ? "error" : ""}`}
              />
              <span className="reg-input-icon">
                <IconLock />
              </span>
              <button
                type="button"
                className="reg-eye"
                onClick={() => setShowPwd(!showPwd)}
              >
                <IconEye open={showPwd} />
              </button>
            </div>
            {formErrors.password && (
              <span className="reg-error">{formErrors.password}</span>
            )}
          </div>

          <div className="login-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>

          <button type="submit" className="reg-submit" disabled={loading}>
            {loading && <span className="reg-spinner" />}
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <PolicyModal
          isOpen={isPolicyOpen}
          onClose={() => setIsPolicyOpen(false)}
        />
        <p className="reg-terms">
          Protegido con cifrado de extremo a extremo.{" "}
          <button
            type="button" className="reg-link"
            onClick={() => setIsPolicyOpen(true)}
          >
            Política de privacidad
          </button>
        </p>
      </div>
    </div>
  );
}
