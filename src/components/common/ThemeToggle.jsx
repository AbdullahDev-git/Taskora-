import React, { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { isDark, toggleTheme, mounted } = useContext(ThemeContext);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-dark-bg3 text-gray-700 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-dark-border transition-colors"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;
