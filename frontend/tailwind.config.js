/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        mirage: {
          primary: '#ED2478',
          'primary-hover': '#D41A67',
          cream: '#EEEBE4',
          dark: '#181818',
          grey: '#E6E8EA',
          lila: '#E4DAF6',
          lime: '#D8F66D',
          blue: '#DFEBF3',
        },
      },
    },
  },
  plugins: [],
};
