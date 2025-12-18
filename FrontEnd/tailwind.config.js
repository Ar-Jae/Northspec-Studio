/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C6A668", // Elegant Gold
          dark: "#050505",   // Deep black/grey
          gray: "#1A1A1A",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #C6A668 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
};
