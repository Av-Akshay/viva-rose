/** @type {import('tailwindcss').Config} */
// import daisyui from "daisyui";
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
        poppinsBoldItalic: ["poppinsBoldItalic"],
      },
      boxShadow: {
        cardShadow: " 5px 5px 5px #CECECE",
      },
      colors: {
        headingColor: "#AC051B",
        lightColor: "#D3022C",
        extraLight: "#FBE5EA",
        ratingColor: "#ffa534",
        footerColor: "#292727",
      },
      gridTemplateColumns: {
        "wishlist-layout-one": " 1.4fr 0.6fr 1fr",
        "wishlist-layout-two": "1.4fr 0.4fr 1.2fr",
        "wishlist-layout-third": "1.6fr 0.6fr 0.5fr",
        "cart-layout-one": "1.6fr 0.7fr 0.7fr",
        "cart-layout-two": "1.6fr 0.7fr 0.7fr",
        "cart-layout-third": "1.8fr 0.6fr 0.6fr",
        "account-grid-columns": "0.4fr 1.6fr",
      },
    },
  },
  plugins: [require("daisyui")],
};
