import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors")


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "twitter-brand-blue": "#1DA1F2",
        "twitter-blue": "#1D9BF0",
        "twitter-faded-blue": "#E4EEF7",
        "twitter-red": "#F91880",
        "twitter-faded-red": "#F7E0EB",
        "twitter-green": "#00BA7C",
        "twitter-faded-green": "#DEF1EB",
        "twitter-gray": "#536471",
        "twitter-gray-border": "#CFD9DE",
        gray: {
          ...colors.neutral,
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
