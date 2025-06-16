/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': '#DDA0DD',
        'accent': '#BA55D3',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #DDA0DD 0%, #BA55D3 100%)',
      }
    },
  },
  plugins: [],
}
