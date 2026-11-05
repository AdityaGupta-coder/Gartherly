import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const explicit = localStorage.getItem("gatherly_theme_preference");
      if (explicit === "light" || explicit === "dark") return explicit;
      return "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
    try {
      localStorage.setItem("gatherly_theme_preference", theme);
      localStorage.setItem("gatherly_theme", theme);
    } catch {}
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const value = {
    theme,
    isDark: theme === "dark",
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
