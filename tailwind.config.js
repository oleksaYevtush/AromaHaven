/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#c5bad2',
        mainTextColor: '#4B445390',
        mainTextGrey: '#c3c5c9',
        mainBlack: '#2e2e2e',
        headingColor: '#845EC2',
        itemBg: 'rgb(86 39 82 / 64%)',
        hoverColor: '#B39CD080',
        hoverColorShadow: '0 2px 6px 0 grey',
        textColor: '#515151',
        cartNumBg: '#e80013',
        primary: '#f5f3f3',
        cardOverlay: 'rgba(256,256,256,0.4)',
        card: 'rgba(256,256,256,0.8)',
        cartBg: '#282a2c',
        cardGray: '#343538',
        mainGray: '#181716',
        mainWhite: '#ffffff',
        cartItem: '#2e3033',
        cartTotal: '#343739',
      },
      screens: {
        sml: '375px',
        sm: '640px',
        md: '768px',
        mdX: '912px',
        mdXX: '913px',
        lg: '1024px',
        xl: '1280px',
        xlL: '1366px',
        xlM: '1440px',
        xxM: '1920px',
        xxL: '2304px',
        xxx: '2560px',
        '2xl': '1736px',
        '3xl': '2880px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
