/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '405px',  // You can adjust the value as needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

