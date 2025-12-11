import { useState, useEffect } from "react";

const THEME_STORAGE_KEY = "speckit_theme";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    // Check localStorage for saved theme preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "light" || savedTheme === "dark") {
        setTheme(savedTheme);
      } else {
        // Default to system preference
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDarkMode ? "dark" : "light");
      }
    }
  }, []);

  // Effect to apply theme class to HTML element and persist
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("light", "dark");

      if (theme === "system") {
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.classList.add(prefersDarkMode ? "dark" : "light");
      } else {
        root.classList.add(theme);
      }
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      let nextTheme: "light" | "dark";
      if (prevTheme === "light") {
        nextTheme = "dark";
      } else {
        nextTheme = "light";
      }
      return nextTheme;
    });
  };

  const setSystemTheme = () => {
    setTheme("system");
  };

  return { theme, toggleTheme, setSystemTheme };
}
