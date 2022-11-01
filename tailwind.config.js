/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#2e6bc6",
        darkPrimary: "#2b5fad",
        grey: "#585858",
        lightGrey: "#797979",

        backgroundPrimary: "#2e6bc6",
        backgroundDarkPrimary: "#2b5fad",
        backgroundLightPrimary: "#2e6bc6c4",
        backgroundDarkestGrey: "#353535",
        backgroundGrey: "#eee",
      },
      maxWidth: {
        productCard: "300px",
        1200: "1200px",
      },
      keyframes: {
        shaking: {
          "0%": {
            transform: "rotate(0deg) scale(1.2)",
          },
          "25%": {
            transform: "rotate(30deg) scale(1.5)",
          },
          "50%": {
            transform: "rotate(0eg) scale(1)",
          },
          "75%": {
            transform: "rotate(-30deg) scale(1.5)",
          },
          "100%": {
            transform: "rotate(0deg) scale(1.1)",
          },
        },
      },
      animation: {
        shaking: "shaking 1s ease",
      },
    },
  },
  plugins: [],
};
