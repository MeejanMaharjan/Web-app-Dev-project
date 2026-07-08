/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mdb: {
          green: '#88C273',
          cream: '#FFF1DB',
          taupe: '#D2C4B1',
          blue: '#566A94',
        }
      }
    },
  },
  plugins: [],
}