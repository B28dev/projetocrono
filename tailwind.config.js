/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#09090b',
          1: '#111113',
          2: '#18181b',
          3: '#27272a',
          4: '#3f3f46',
        },
      },
      keyframes: {
        animationIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)', filter: 'blur(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0px)' },
        },
        textSlide: {
          '0%': { transform: 'translateY(110%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%) skewX(-15deg)' },
          to: { transform: 'translateX(200%) skewX(-15deg)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'animation-in': 'animationIn 0.8s ease-out both',
        'text-slide': 'textSlide 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out both',
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};
