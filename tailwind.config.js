/** @type {import('tailwindcss').Config} */

import * as colors from "tailwindcss/colors";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["selector", "[data-color-scheme=\"dark\"]"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        gray: colors.zinc,
      },
      transitionProperty: {
        "rect": "left, top, width, height",
      },
    },
  },
  plugins: [],
}

