/** @type {import('tailwindcss').Config} */

import { zinc } from "tailwindcss/colors"

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,js}"
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
        gray: zinc,
      },
      transitionProperty: {
        "rect": "left, top, width, height",
      },
      backgroundImage: {
        radial: "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}

