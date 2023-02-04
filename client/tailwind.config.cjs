/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brick-red": "#792424",
        "silk-blue": "#5F7FC0",
        pastel: {
          green: "#65D29D",
          blue: "#76C8E2",
          red: "#E89898",
        },
        black: "#121212",
        white: "#EFEFEF",
      },
      fontFamily: {
        display: ["Roboto Mono", "monospace"],
        body: ["Lato", "sans-serif"],
        logo: "Goldman",
      },
    },
  },
  darkMode: "class",
};
