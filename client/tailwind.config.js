/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pink-gradient":
          "linear-gradient(to top right, rgba(143, 62, 151, 0.7), transparent)",
      },
    },
  },
  plugins: [],
};
