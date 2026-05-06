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
        cinema: {
          black: "#0a0a0a",
          dark: "#111111",
          charcoal: "#1a1a1a",
          brown: "#1c1410",
          gold: "#c9a84c",
          "gold-light": "#e8c96d",
          "gold-dark": "#8b6914",
          cream: "#f5e6c8",
          muted: "#6b6b6b",
          red: "#8b1a1a",
        },
      },
      fontFamily: {
        cinzel: ["Georgia", "serif"],
        mono: ["Courier New", "monospace"],
      },
      backgroundImage: {
        "grain": "url('/grain.svg')",
      },
      boxShadow: {
        "gold-glow": "0 0 20px rgba(201, 168, 76, 0.3)",
        "gold-sm": "0 0 8px rgba(201, 168, 76, 0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.8)",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
