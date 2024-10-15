/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pink-gradient":
          "linear-gradient(to top right, rgba(143, 62, 151, 0.7), transparent)",
        "pink-gradient-secondary":
          "linear-gradient(to right, rgba(143, 62, 151, 0.7), transparent)",
        "pink-radial-gradient":
          "radial-gradient(circle at bottom, #903e9788, #903e9756, #903e9719)",
      },
    },
  },
  plugins: [],
};
