/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppinsExtraBold: ["poppinsExtraBold"],
        poppinsBold: ["poppinsBold"],
        poppinsSemibold: ["poppinsSemibold"],
        poppinsMedium: ["poppinsMedium"],
        poppinsLight: ["poppinsLight"],
        poppinsExtraLight: ["poppinsExtraLight"],
        poppinsRegular: ["poppinsRegular"],
        poppinsThin: ["poppinsThin"],
      },
      boxShadow: {
        cardShadow: " 5px 5px 5px #CECECE",
      },
      colors: {
        headingColor: "#AC051B",
        lightColor: "#D3022C",
        extraLight: "#FBE5EA",
      },
    },
  },
  plugins: [require("daisyui")],
};
