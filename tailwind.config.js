/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf5',
          100: '#d1fae5',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          900: '#064e3b',
        },
        slate: {
          950: '#0b1220',
        },
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            a: { color: '#059669' },
            'ol > li::marker': { color: '#059669' },
            'ul > li::marker': { color: '#059669' },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
