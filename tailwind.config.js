/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#0A2463',
        'gold': {
          50: '#FFF9E6',
          100: '#FFF3CC',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFCF33',
          500: '#FFC300',
          600: '#CC9C00',
          700: '#997500',
          800: '#664D00',
          900: '#332600',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
}
