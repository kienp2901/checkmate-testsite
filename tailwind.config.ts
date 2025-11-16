import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors
    },
    extend: {}
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    plugin(function () {})
  ],
} satisfies Config;


