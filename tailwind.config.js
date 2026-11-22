/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: '#062618',
          brand: '#107C41',
          vibrant: '#00A859',
          glow: '#00FF88',
          light: '#2AE689',
        },
        carbon: {
          bg: '#0A0D0C',
          surface: '#121715',
          card: '#161E1A',
          border: 'rgba(16, 124, 65, 0.25)',
        },
        metallic: {
          silver: '#E2E8F0',
          chrome: '#F8FAFC',
          muted: '#94A3B8'
        }
      },
      fontFamily: {
        giant: ['"Anton"', '"Bebas Neue"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(circle at 50% 50%, #062618 0%, #04170E 45%, #0A0D0C 90%)',
        'spotlight-radial': 'radial-gradient(ellipse at 50% 45%, rgba(16, 124, 65, 0.35) 0%, rgba(6, 38, 24, 0.15) 50%, transparent 80%)',
        'carbon-pattern': 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
