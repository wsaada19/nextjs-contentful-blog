const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        blue: {
          600: '#2565C7',
          700: '#1c4d97',
          800: '#14376c',
          900: '#0c2141',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
