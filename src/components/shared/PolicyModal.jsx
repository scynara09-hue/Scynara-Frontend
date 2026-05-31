import React, { useState } from 'react';
import './PolicyModal.css';

export default function PolicyModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('privacy');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content fade-in-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabecera del Modal */}
        <div className="modal-header">
          <h2>Términos y Privacidad</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Pestañas de Navegación */}
        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Política de Privacidad
          </button>
          <button 
            className={`modal-tab ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            Términos de Servicio
          </button>
        </div>

        {/* Cuerpo desplazable */}
        <div className="modal-body">
          {activeTab === 'privacy' && (
            <div className="tab-content fade-in">
              <h3>1. Información que recopilamos</h3>
              <p>Para brindar nuestros servicios, recopilamos tu nombre, apellidos, correo electrónico, número de teléfono y contraseñas (cifradas de extremo a extremo). Si registras una sucursal, también almacenamos el nombre y la ubicación geográfica de la misma.</p>

              <h3>2. Uso de la información</h3>
              <p>Utilizamos tus datos exclusivamente para autenticar tu acceso, gestionar tu rol dentro de la plataforma y vincular tu perfil a la sucursal correspondiente.</p>

              <h3>3. Privacidad y Seguridad</h3>
              <p>SCYNARA no vende ni comparte tus datos personales. Implementamos protocolos de seguridad robustos (como cifrado avanzado con Argon2) para proteger tu información.</p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="tab-content fade-in">
              <h3>1. Aceptación y Servicio</h3>
              <p>Al utilizar SCYNARA, aceptas estos términos. Nuestra plataforma es una herramienta de gestión para establecimientos, permitiendo a los Administradores registrar tiendas y empleados.</p>

              <h3>2. Responsabilidades de la Cuenta</h3>
              <p>Eres responsable de mantener la confidencialidad de tu contraseña. Los Administradores son responsables de los datos de su sucursal y de los accesos que otorguen a sus Empleados.</p>

              <h3>3. Uso Aceptable y Suspensión</h3>
              <p>Te comprometes a proporcionar información veraz. Nos reservamos el derecho de suspender cuentas si detectamos actividades ilícitas o un uso indebido que comprometa la seguridad del sistema.</p>
            </div>
          )}
        </div>
        
        {/* Pie del Modal */}
        <div className="modal-footer">
          <button className="modal-accept-btn" onClick={onClose}>
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}