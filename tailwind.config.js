/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['ttfont', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },

      // My
      backgroundImage: {
        "linear-1": "linear-gradient(173deg, #FFF 5.46%, rgba(255, 255, 255, 0.00) 128.42%)",
        "linear-2": "linear-gradient(145deg, rgba(190, 190, 190, 0.16) 23.23%, rgba(190, 190, 190, 0.00) 114.49%)",
        "linear-3": "linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.80) 62.65%, rgba(0, 0, 0, 0.49) 88.93%, rgba(0, 0, 0, 0.00) 100%)",
        "linear-4": "linear-gradient(159deg, #FFF 4.02%, rgba(255, 255, 255, 0.00) 107.54%)",
        "linear-5": "linear-gradient(167deg, #FFF -15%, rgba(255, 255, 255, 0.00) 157.25%)",
        "linear-6": "linear-gradient(270deg, rgba(25, 25, 27, 0.10) 0%, rgba(25, 25, 27, 0.29) 50.7%, rgba(25, 25, 27, 0.10) 103.78%)",
        "linear-7": "linear-gradient(0deg, #00000021 0%, rgb(0 0 0 / 0%) 62.65%, rgba(0, 0, 0, 0.49) 88.93%, rgba(0, 0, 0, 0.00) 100%)",
        "linear-8": "linear-gradient(123deg, #FFF 27.05%, rgba(255, 255, 255, 0.00) 123.2%)",
        "linear-9": "linear-gradient(0deg, #0000000f 0%, rgba(0, 0, 0, 0.80) 62.65%, rgba(0, 0, 0, 0.49) 88.93%, rgba(0, 0, 0, 0.00) 100%)"
      }
    },
  },
  plugins: [
    require('autoprefixer'),
  ],
}
