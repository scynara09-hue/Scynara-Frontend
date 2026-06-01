import AppRouter from "./routes/AppRouter";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/shared/ErrorBoundary";

import { ProductProvider } from "./context/ProductContext";
import { ProveedorProvider } from "./context/ProveedorContext";
import { VentaProvider } from "./context/VentaContext";
import { CustomersProvider } from "./context/CustomersContext";


function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
        <ProductProvider>
          <ProveedorProvider>
            <VentaProvider>
              <CustomersProvider>
                <AppRouter />
              </CustomersProvider>
            </VentaProvider>
          </ProveedorProvider>
        </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;