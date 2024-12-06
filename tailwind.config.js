/** @type {import('tailwindcss').Config} */

import { neutral } from "tailwindcss/colors";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["selector", "[data-color-scheme=\"dark\"]"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: neutral,
      }
    },
  },
  plugins: [],
}

