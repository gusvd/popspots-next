/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: "#FEFBF6",
          100: "#FBEEDA",
          200: "#F4DAB3",
          300: "#EAC085",
          400: "#E09E57",
          500: "#D68538",
          600: "#C46E31",
          700: "#A0562C",
          800: "#7F482E",
          900: "#653D2A",
          950: "#371E15",
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
