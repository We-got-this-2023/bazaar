/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#a92425",
        },
        black: {
          0: "#000",
          200: "#222",
        },
      },
    },
  },
  plugins: [],
};
