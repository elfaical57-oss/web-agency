import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1a56db",
        dark: "#0f172a",
      },
      fontFamily: {
        arabic: ["Cairo", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
