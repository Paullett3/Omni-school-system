// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        schoolPrimary: "#4F46E5",   // Indigo
        schoolSecondary: "#10B981", // Emerald
        schoolAccent: "#F59E0B",    // Amber
        schoolDanger: "#EF4444",    // Red
      },
    },
  },
  plugins: [],
}