/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
        port_gore: {
          100: "#d4d3df",
          200: "#a8a8c0",
          300: "#7d7ca0",
          400: "#515181",
          500: "#262561",
          600: "#1e1e4e",
          700: "#17163a",
          800: "#0f0f27",
          900: "#080713",
        },
        gin_fizz: {
          100: "#fffef9",
          200: "#fffdf2",
          300: "#fffbec",
          400: "#fffae5",
          500: "#fff9df",
          600: "#EDD7A4",
          700: "#999586",
          800: "#666459",
          900: "#33322d",
        },
        success: {
          300: "#3C5233",
          400: "#264027",
        },
        error: {
          300: "#D8514E",
          400: "#B80C09",
        },
      },
    },
  },
  plugins: [],
};
