/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#cabffd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        "dark-bg": "#0a0e27",
        "dark-bg2": "#151829",
        "dark-bg3": "#1f2139",
        "dark-border": "#2d3142",
        "dark-text": "#e5e7eb",
        "dark-text2": "#9ca3af",
      },
      borderRadius: {
        lg: "12px",
        xl: "16px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        "sidebar-collapsed": "80px",
        "sidebar-expanded": "240px",
      },
    },
  },
  plugins: [],
};
