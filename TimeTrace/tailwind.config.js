/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { 
      colors: {
      'github': {
        borderWhiteBg: '#D1D5DA',
        textWhiteBg: '#1F2328',
        navbarBg: '#F6F8FA',
        white: '#FFFFFF',
        placeholderTextWhiteBg: '#9CA3AF',
        highlightedBtnNavBg: '#DEE3E8',
        buttonNavBg: '#EFF1F4',
        
      },
    },
    }
  },
  plugins: [],
}

