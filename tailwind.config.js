/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#165DFF',
          light: '#4080FF',
          dark: '#0E42D2',
          gradient: 'linear-gradient(135deg, #165DFF 0%, #36BFFA 100%)',
        },
        secondary: '#36BFFA',
        success: '#00B42A',
        warning: '#FF7D00',
        danger: '#F53F3F',
        neutral: {
          50: '#F9FAFB',
          100: '#F5F7FA',
          200: '#E4E7ED',
          300: '#C0C6CF',
          400: '#909399',
          500: '#606266',
          600: '#303133',
          700: '#1E1E1E',
          800: '#141414',
          900: '#0A0A0A',
        }
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'button': '0 2px 5px rgba(22, 93, 255, 0.2)',
        'button-hover': '0 4px 8px rgba(22, 93, 255, 0.3)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform-shadow': 'transform, box-shadow',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        }
      }
    },
  },
  plugins: [],
}