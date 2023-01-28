/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: '#FDBAA3',
        midNight: '#3C3D43',
        screamWhite: '#FFFDFA',
        semanticRed: '#F7685C',
        semanticGreen: '#30C58D',
        opaqueLightYellow: 'rgba(251, 235, 149, 0.4)',
        opaqueRedOrange: 'rgba(253, 186, 163, 0.4)',
        opaqueLilac: 'rgba(182, 165, 203, 0.4)',
        opaqueGreenCyan: 'rgba(151, 210, 188, 0.6)',
        opaqueLightCyan: 'rgba(174, 223, 232, 0.6',
        gray: {
          900: '#000000',
          800: '#343539',
          600: '#4D4D4D',
          400: '#808080',
          300: '#8C8A97',
        },
      },
    },
  },
  plugins: [],
};
