module.exports = {
  darkMode: "class",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    fontFamily: {
      hanken: ["Hanken Grotesk", "Inter"],
      general: ["General Sans", "Inter"],
    },
    extend: {
      colors: {
        speechBlue: "#00B7EB",
        speechBlueDark: "#00a4d3",
        speechBlueDarker: "#209ec2",
        speechBluer: "#007FFF",
        speechBlueLight: "#ADD8E6",
        speechButton: "#1fa7ce",
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
