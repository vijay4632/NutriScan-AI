/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefdf4',
          100: '#dcfce8',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Emerald Green
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        darkbg: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b', // Main Dark background
          950: '#09090b', // Deepest Black
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      animation: {
        'scan': 'scanEffect 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar': 'radarWave 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        scanEffect: {
          '0%, 100%': { transform: 'translateY(0%)', opacity: '0.9' },
          '50%': { transform: 'translateY(100%)', opacity: '0.9' },
        },
        radarWave: {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '100%': { transform: 'scale(1.3)', opacity: '0' },
        }
      },
      boxShadow: {
        'glow-emerald': '0 0 15px -3px rgba(16, 185, 129, 0.4)',
        'glow-cyan': '0 0 15px -3px rgba(6, 182, 212, 0.4)',
      }
    },
  },
  plugins: [],
}
