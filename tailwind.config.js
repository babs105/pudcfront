//const colors = require('tailwindcss/colors')
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    //colors: {},
    fontFamily: {
      quicksand: ["Quicksand"],
    },
    extend: {
      //   spacing: {},
      //   borderRadius: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
