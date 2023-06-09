/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["garden", "dark"],
  },
};
