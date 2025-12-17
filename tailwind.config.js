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
          orange: "#FF5500", // Approximate from image
          dark: "#050505",   // Deep black/grey
          gray: "#1A1A1A",
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #FF5500 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
};
