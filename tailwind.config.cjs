module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        sub: ["Poppins", "sans-serif"],
      },
      colors: {},
      boxShadow: {
        "top-sm": "0 -1px 0px 0 rgba(0, 0, 0, 0.05)",
        "top-md": "0px -2px 10px -1px rgba(0,0,0,0.10)",
      },
      outline: {
        black: ["2px solid #000000"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
