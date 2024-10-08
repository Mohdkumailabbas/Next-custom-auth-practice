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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'dark-blue-black': '#131324', // Custom dark blue-black color
        'lavender-violet': '#997af0', // Custom lavender violet color
        'semi-black': '#00000076',    // Semi-transparent black color

      },
    },
  },
  plugins: [],
};
export default config;
