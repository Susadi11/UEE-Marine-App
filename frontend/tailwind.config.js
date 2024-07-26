/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {colors: {
      'custom-blue': '#1fb6ff',
      'custom-pink': '#ff49db',
    },},
  },
  plugins: [require('tailwindcss-react-native/preset')],
}

