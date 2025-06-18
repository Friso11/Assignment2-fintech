/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C6BED',
          50: '#E9F0FE',
          100: '#C5D8FC',
          200: '#92B7F9',
          300: '#5E96F6',
          400: '#2C6BED',
          500: '#1653D4',
          600: '#1142AC',
          700: '#0C3285',
          800: '#08215D',
          900: '#041135',
        },
        success: {
          DEFAULT: '#36B37E',
          50: '#E6F5EF',
          100: '#BFE5D6',
          200: '#86D0B3',
          300: '#4CBB8F',
          400: '#36B37E',
          500: '#2A9A68',
          600: '#227F55',
          700: '#1A6341',
          800: '#12472E',
          900: '#0A2A1B',
        },
        warning: {
          DEFAULT: '#FFAB00',
          50: '#FFF6E5',
          100: '#FFE9B8',
          200: '#FFD87A',
          300: '#FFC73D',
          400: '#FFAB00',
          500: '#CC8900',
          600: '#A36E00',
          700: '#7A5200',
          800: '#523600',
          900: '#291B00',
        },
        danger: {
          DEFAULT: '#FF5630',
          50: '#FFEAE5',
          100: '#FFC7B8',
          200: '#FF9A7A',
          300: '#FF6D3D',
          400: '#FF5630',
          500: '#FA3A12',
          600: '#D42E0E',
          700: '#A9230B',
          800: '#7E1A08',
          900: '#531105',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};