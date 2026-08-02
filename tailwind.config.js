/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#faf5ec',
        ink: {
          DEFAULT: '#463a32',
          soft: '#7c6b5f',
          faint: '#a99a8a'
        },
        cream: {
          DEFAULT: '#faf5ec',
          deep: '#f1e7d7'
        },
        peach: {
          100: '#fdeadd',
          200: '#f9d4bb',
          300: '#f3b48a',
          400: '#e89a6e',
          500: '#d9825a'
        },
        retro: {
          beige: '#e8dcc8',
          screen: '#2b1a26',
          rose: '#e596ae',
          blush: '#f6c6d4',
          peach: '#f3b48a'
        }
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        body: ['Satoshi', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        'float-x': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(14px, -18px)' },
          '66%': { transform: 'translate(-12px, 10px)' }
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(60px, -80px) scale(1.15)' },
          '66%': { transform: 'translate(-50px, 50px) scale(0.9)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' }
        },
        caret: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        'ring-orbit': {
          from: { transform: 'rotate(0deg) translateX(3rem) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(3rem) rotate(-360deg)' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-x': 'float-x 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        blob: 'blob 16s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 28s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        caret: 'caret 1s step-end infinite',
        'ring-orbit': 'ring-orbit 12s linear infinite'
      },
      boxShadow: {
        glow: '0 12px 44px -14px rgba(207, 122, 151, 0.45)',
        'glow-cyan': '0 12px 44px -14px rgba(207, 122, 151, 0.35)',
        'glow-pink': '0 12px 44px -14px rgba(244, 114, 182, 0.35)',
        'card': '0 24px 70px -28px rgba(120, 84, 70, 0.35)'
      }
    }
  },
  plugins: []
}
