import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          pale:  '#f5e4b0',
          light: '#e8c96a',
          main:  '#c9952a',
          dark:  '#8a6010',
        },
        bg: {
          primary:   '#0d0a06',
          secondary: '#120e07',
          card:      '#16100a',
        },
      },
      fontFamily: {
        heading: ['var(--font-cinzel)',  'Georgia', 'serif'],
        body:    ['var(--font-raleway)', 'Arial',   'sans-serif'],
      },
      backgroundImage: {
        'grad-gold': 'linear-gradient(135deg, #e8c96a 0%, #c9952a 50%, #8a6010 100%)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'page-in': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'ring-rotate': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up':     'fade-up 0.8s cubic-bezier(0.4,0,0.2,1) both',
        'page-in':     'page-in 0.5s cubic-bezier(0.4,0,0.2,1) both',
        'ring-rotate': 'ring-rotate 20s linear infinite',
        'ring-reverse':'ring-rotate 15s linear infinite reverse',
        float:         'float 6s ease-in-out infinite',
        blink:         'blink 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
