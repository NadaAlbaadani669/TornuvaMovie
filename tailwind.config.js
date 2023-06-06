/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      xxs:"430px",
      xs:"640px",
      md:"768px",
      lg:"910px",
      xl:"1020px"
    },
    
  },
  plugins: [],
}

