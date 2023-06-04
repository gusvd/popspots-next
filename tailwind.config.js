/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-DMSans)"],
      },
      colors: {
        // https://uicolors.app/edit?sv1=old-lace:50-fefbf6/100-faeedb/200-f2dab6/300-e4bf8b/400-d39d64/500-bf854f/600-a9734c/700-8b5c41/800-6f4e3e/900-584137/950-30221d
        beige: {
          50: "#fefbf6",
          100: "#faeedb",
          200: "#f2dab6",
          300: "#e4bf8b",
          400: "#d39d64",
          500: "#bf854f",
          600: "#a9734c",
          700: "#8b5c41",
          800: "#6f4e3e",
          900: "#584137",
          950: "#30221d",
        },
        purple: {
          50: "#F1F0FF",
          100: "#E4E0FF",
          200: "#CAC2FF",
          300: "#AC99FF",
          400: "#8861FF",
          500: "#6924FF",
          600: "#6400FA",
          700: "#5C04D7",
          800: "#4C04A9",
          900: "#3C0580",
          950: "#1E0047",
        },
      },
    },
  },
  plugins: [],
};
