/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: '#c5bad2',
        mainTextColor: '#4B445390',
        textGrey: '#c3c5c9',
        headerColor: '#845EC2',
        itemBg: 'rgb(86 39 82 / 64%)',
        hoverColor: '#B39CD080',
        textColor: '#515151',
        primary: '#f5f3f3',
        cartBg: '#282a2c',
        cartItem: '#2e3033',
      },
      screens: {
        sml: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1736px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
