import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#17201c", paper: "#f6f7f2", moss: "#315c4b", mint: "#dcefe4", coral: "#ec806c", gold: "#efbd54" },
      boxShadow: { soft: "0 12px 35px rgba(32, 55, 43, 0.08)" },
    },
  },
  plugins: [],
};

export default config;
