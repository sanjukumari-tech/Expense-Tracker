import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            DEFAULT: "#27ae60",
            hover: "#219653",
            light: "#ebf7ee",
          },
          orange: {
            DEFAULT: "#f97316",
            hover: "#ea580c",
            light: "#fff7ed",
          },
          dark: {
            DEFAULT: "#1a1a1a",
            card: "#262626",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
