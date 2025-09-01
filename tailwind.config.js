/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'deep-blue': '#1e40af',
        'light-blue': '#dbeafe',
        'gray-25': '#fcfcfc',
      }
    },
  },
  plugins: [],
}

