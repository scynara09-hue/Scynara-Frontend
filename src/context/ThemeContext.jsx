import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Guardamos la preferencia exacta del usuario: "light", "dark" o "system"
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    // Media query para detectar el tema del sistema operativo
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let resolvedTheme = theme;

      // Si la preferencia es sistema, resolvemos cuál es el tema actual del SO
      if (theme === "system") {
        resolvedTheme = mediaQuery.matches ? "dark" : "light";
      }

      // Aplicamos al DOM
      document.documentElement.setAttribute("data-theme", resolvedTheme);
      // Guardamos la preferencia del usuario en localStorage
      localStorage.setItem("theme", theme);
    };

    // Aplicar el tema inmediatamente cuando cambia el estado
    applyTheme();

    // Escuchar cambios del sistema operativo en tiempo real
    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    
    // Limpieza del event listener al desmontar
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  // Nueva función para establecer el tema explícitamente
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);