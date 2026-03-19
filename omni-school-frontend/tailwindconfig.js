/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 This covers all your components
  ],
  theme: {
    extend: {
      colors: {
        schoolPrimary: "#1e40af", // 🔵 Now your custom color will work!
      },
    },
  },
  plugins: [],
};



