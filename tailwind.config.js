/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: "#5D1224",
          gold: "#D4AF37",
          cream: "#FDFBF7",
          text: "#1F2937",
        },
      },

      fontFamily: {
        serif: ["var(--font-serif)", "serif"], // Matches the variable name in layout.tsx
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
