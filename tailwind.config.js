/** @type {import('tailwindcss').Config} */

//@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;1,400&display=swap');
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['poppins', 'sans-serif']
      },
    },
  },
  plugins: [],
}
