/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        primary: ['Space Grotesk', 'sans-serif'],
        secondary: ['Inter', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        primary: {
          900: 'var(--primary-900)',
          800: 'var(--primary-800)',
          700: 'var(--primary-700)',
        },
        accent: {
          500: 'var(--accent-500)',
          400: 'var(--accent-400)',
          300: 'var(--accent-300)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'meteor': 'meteor 5s linear infinite',
        'sparkle': 'sparkle 1s forwards',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
        sparkle: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0,
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'hover:bg-accent-500/10',
    'hover:border-accent-500',
    'bg-accent-500/20',
    'bg-accent-300/20',
  ],
};