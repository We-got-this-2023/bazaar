import { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,ts,js,jsx,tsx}"],
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
} as Config;
