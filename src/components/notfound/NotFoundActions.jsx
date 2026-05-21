import { useNavigate } from "react-router-dom";

export default function NotFoundActions() {
  const navigate = useNavigate();

  return (
    <div className="nf-actions">
      <button
        className="btn-primary"
        onClick={() => navigate("/")}
      >
        Ir al Dashboard
      </button>

      <button
        className="btn-outline"
        onClick={() => navigate(-1)}
      >
        Regresar
      </button>
    </div>
  );
}