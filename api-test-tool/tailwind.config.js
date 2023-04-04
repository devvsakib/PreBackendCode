/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "Inter", "sans-serif"],
        barlowCon: ["Barlow Condensed", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

