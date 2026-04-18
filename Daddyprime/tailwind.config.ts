import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './index.html',
    './**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          midnight: '#1A1B2F', 
          mint: '#2AF598',     
          slate: '#F1F4F9',    
          coral: '#FF6B6B',    
          dark: '#1A1B2F',     
          card: '#252640',     
          primary: '#1A1B2F',  
          accent: '#2AF598',   
          surface: '#F1F4F9',
          'midnight-hover': '#23243E',
          'mint-hover': '#22C57A',
        }
      },
      fontFamily: {
        sans: ['"Century Gothic"', 'Tw Cen MT', 'Futura', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'fade-in-down': 'fadeInDown 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
