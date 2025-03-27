/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ this line is super important
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
