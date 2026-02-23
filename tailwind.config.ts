import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        'cream-dark': '#EDE6D6',
        pink: {
          DEFAULT: '#F4A7B9',
          dark: '#E8829A',
          light: '#FAD0DA',
        },
        gold: {
          DEFAULT: '#F9D89C',
          dark: '#F0C060',
        },
        charcoal: '#3D3D3D',
      },
      fontFamily: {
        script: ['var(--font-daydream)', 'cursive'],
        body: ['var(--font-montserrat)', 'sans-serif'],
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delay': 'float 5s ease-in-out infinite 1s',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 4px 15px rgba(244, 167, 185, 0.3)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 8px 25px rgba(244, 167, 185, 0.55)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
