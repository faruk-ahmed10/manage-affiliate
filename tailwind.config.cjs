/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3357f6',
        'secondary': '#131f33',
        'success': '#00c68a',
        'error': '#7f3f49',
        'warning': '#f6e700',
      },
      fontSize: {
        "tiny": '10px',
      },
    },
  },
  plugins: [],
}