const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  safelist: ['bg-blue-400', 'bg-yellow-700, bg-red-600'], // TODO remove this and just use hex codes for custom colors
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      backgroundColor: ['checked'],
      minHeight: {
        full: '100vh',
      },
      scale: {
        1025: '1.025',
      },
      colors: {
        blue: {
          400: '#0096FF',
          600: '#2565C7',
          700: '#1c4d97',
          800: '#14376c',
          900: '#09172e',
        },
        yellow: {
          700: '#ed8106',
        },
        red: {
          600: '#C9082A',
        },
        green: {
          600: 'rgb(27, 177, 82)',
        },
      },
    },
  },
  variants: {
    extend: { backgroundColor: ['even'] },
  },
  plugins: [],
};
