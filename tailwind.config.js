module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    fontFamily: {
      hanken: ["Hanken Grotesk", "sans-serif"],
    },
    extend: {
      colors: {
        speechBlue: "#00B7EB",
        speechBlueDark: "#00a4d3",
        speechBluer: "#007FFF",
        speechBlueLight: "#ADD8E6",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg)" },
          "50%": { transform: "rotate(6deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  plugins: [],
};
