import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log to console in development only
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div
            style={{
              maxWidth: '600px',
              backgroundColor: 'white',
              padding: '40px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                marginBottom: '20px',
              }}
            >
              ⚠️
            </div>

            <h1 style={{ margin: '0 0 15px 0', color: '#1f2937' }}>
              Algo salió mal
            </h1>

            <p
              style={{
                margin: '0 0 25px 0',
                color: '#6b7280',
                lineHeight: '1.5',
              }}
            >
              Lamentamos el inconveniente. Un error inesperado ocurrió en la
              aplicación. Por favor intenta recargar la página.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details
                style={{
                  marginBottom: '25px',
                  textAlign: 'left',
                  backgroundColor: '#fee',
                  padding: '15px',
                  borderRadius: '4px',
                  border: '1px solid #fcc',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Detalles del error (solo en desarrollo)
                </summary>
                <pre
                  style={{
                    marginTop: '10px',
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '200px',
                    color: '#666',
                  }}
                >
                  {this.state.error.toString()}
                  {'\n\n'}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={this.resetError}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563eb')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#3b82f6')}
              >
                Intentar de nuevo
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#e5e7eb',
                  color: '#1f2937',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#d1d5db')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#e5e7eb')}
              >
                Ir a inicio
              </button>
            </div>

            {this.state.errorCount > 2 && (
              <p
                style={{
                  marginTop: '20px',
                  fontSize: '12px',
                  color: '#f59e0b',
                }}
              >
                ⚡ Se han detectado múltiples errores. Si el problema persiste, contacta con soporte.
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
