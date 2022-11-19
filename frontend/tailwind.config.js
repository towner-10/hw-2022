const colors = require('tailwindcss/colors')


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      cornsilk: {
        200: "rgb(237, 215, 164)",
        400: "#FFF9DF",
      },
      "patrick-blue": {
        400: "#262561",
      },
      cerise: {
        400: "#EC2964",
      },
      orange: {
        400: "#FB8621",
      },
      black: colors.black,
      white: colors.white,
    },
    extend: {},
  },
  plugins: [],
};
