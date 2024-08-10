import theme from "./src/theme";

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        preparing: theme.colors.preparing,
        ready: theme.colors.ready,
        delivered: theme.colors.delivered,
      },
    },
  },
  plugins: [],
});

