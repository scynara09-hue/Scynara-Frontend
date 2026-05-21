import NotFoundIllustration from "../../components/notfound/NotFoundIllustration";
import NotFoundActions from "../../components/notfound/NotFoundActions";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="nf-wrapper">

      {/* Fondo decorativo */}
      <div className="nf-bg">
        <div className="nf-orb orb-1" />
        <div className="nf-orb orb-2" />
      </div>

      <div className="nf-container">

        <NotFoundIllustration />

        <div className="nf-content">
          <h1>Página no encontrada</h1>
          <p>
            La página que buscas no existe, fue movida o nunca estuvo aquí.
          </p>

          <NotFoundActions />
        </div>

      </div>
    </div>
  );
}