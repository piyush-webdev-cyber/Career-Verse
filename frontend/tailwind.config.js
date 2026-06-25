/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#09090B',
        surface: {
          DEFAULT: '#111217',
          raised: '#16171D',
          hover: '#1A1B22',
        },
        primary: {
          DEFAULT: '#6366F1',
          hover: '#818CF8',
        },
        nav: {
          DEFAULT: 'rgba(15,15,20,0.78)',
          scrolled: 'rgba(10,10,12,0.88)',
          elevated: '#0D0E12',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.12)',
        },
        accent: {
          DEFAULT: '#6366F1',
          muted: 'rgba(99,102,241,0.12)',
          hover: '#818CF8',
        },
        highlight: '#8B5CF6',
        success: '#10B981',
        warning: '#F97316',
        danger: '#EF4444',
        muted: '#94A3B8',
        foreground: '#F8FAFC',
        secondary: '#71717A',
      },
      borderColor: {
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        card: '0 2px 8px rgba(0,0,0,0.24), 0 0 0 1px rgba(255,255,255,0.06)',
        elevated: '0 8px 24px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.06)',
        nav: '0 4px 24px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.05)',
        'nav-scrolled': '0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.06)',
        'nav-elevated': '0 16px 48px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
