/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#165DFF',
        secondary: '#36BFFA',
        neutral: {
          100: '#F5F7FA',
          200: '#E4E7ED',
          300: '#C0C6CF',
          800: '#303133',
          900: '#1E1E1E',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}