const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // 'nunito': ['Nunito', 'cursive'],
        sans: ["Nunito", "sans-serif"],
        },
      colors: {
        primary: "#FF3E3E",
        secondary: "#9C2626",
        background: "#F8F8F8",
        badge: "#FF8F8F",
        variant: "#ff5f5f",
        tsp_background: "#D9BFBF;",


      },

      backgroundImage: {
        paymentcard:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/src/assets/images/cards.webp)",
        hero:
          "url(/src/assets/images/hero.png)",
      },
    },


    screens: {
      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px',
      // => @media (min-width: 960px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
});