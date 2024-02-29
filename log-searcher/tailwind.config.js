/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,vue,ts}"],
  theme: {
    extend: {
      colors: {
				primary: '#5E6DB3',
				secondary: '#AFBC36',
				tertiary: '#1D2530',
				linkcolor: '#5E6DB3'
      }
    }
  },
  plugins: [],
}

