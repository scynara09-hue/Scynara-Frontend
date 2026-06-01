import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let resolvedTheme = theme;

      
      if (theme === "system") {
        resolvedTheme = mediaQuery.matches ? "dark" : "light";
      }

      
      document.documentElement.setAttribute("data-theme", resolvedTheme);
      
      localStorage.setItem("theme", theme);
    };

    
    applyTheme();

    
    const handleChange = () => {
      if (theme === "system") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  
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