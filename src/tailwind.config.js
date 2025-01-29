/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enables dark mode using 'class' strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans all components for class names
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Custom primary blue
        secondary: "#9333EA", // Custom secondary purple
        darkBg: "#1A1A2E", // Dark mode background
        darkText: "#EAEAEA", // Dark mode text color
        lightBg: "#F9FAFB", // Light mode background
        lightText: "#1A1A2E", // Light mode text color
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Custom font family
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};