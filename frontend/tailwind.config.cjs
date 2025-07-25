module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        primary: "#15803d", // BoardWithMe green
        secondary: "#22c55e", // lighter green
        accent: "#0d9488", // teal
        neutral: "#1f2937", // dark grey
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
