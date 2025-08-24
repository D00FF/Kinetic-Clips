// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",   // safe to include even if unused
  ],
  theme: {
    extend: {
      colors: {
        fuel: {
          orange: "#FF6B2C",
          red:    "#E63946",
          ember:  "#FF9248",
          dark:   "#1C1C1C",
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
