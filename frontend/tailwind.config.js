/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'cornsilk': {
        400: '#FFF9DF',
      },
      'patrick-blue': {
        400: '#262561'
      },
      'cerise': {
        400: '#EC2964'
      },
      'orange': {
        400: '#FB8621'
      }
    },
    extend: {},
  },
  plugins: [],
}
