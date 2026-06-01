import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // ============================================
  // Initialize theme from localStorage
  // ============================================
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setIsDark(savedTheme === "dark");

    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  // ============================================
  // Toggle theme
  // ============================================
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);

    // Save to localStorage
    localStorage.setItem("theme", newTheme);

    // Apply to document
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const value = {
    isDark,
    toggleTheme,
    mounted,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
