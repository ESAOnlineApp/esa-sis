/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    },
    backgroundImage: {
      loginbg: "url('/images/ESA2.jpg')",
      // loginbg: "url('/images/lgin.jpg')",
    },
    extend: {
      display: ['group-focus'],
      colors: {
        primary: '#002857',
        secondary: '#12437b',
        third: '#2b6ab3'
        // Add more colors as needed
      },
    },
  },
  plugins: [],
};
