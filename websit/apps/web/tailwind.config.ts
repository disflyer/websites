import { nextui } from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [nextui()],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
      },
      animation: {
        'text-gradient': 'text-gradient 4s linear 0s infinite normal forwards running',
      },
      screens: {
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
    }
  },
  darkMode: "class",
}
export default config;