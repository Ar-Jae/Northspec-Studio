/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#C6A668", // Elegant Gold
          dark: "#050505",   // Deep black/grey
          gray: "#1A1A1A",
        },
        // Elevated slate scale for readability on dark backgrounds
        slate: {
          400: "#b8c5d4", // was #94a3b8 — primary body grey, now noticeably brighter
          500: "#8fa3b8", // was #64748b — secondary labels, now clearly legible
          600: "#6b8099", // was #475569 — metadata/muted text, now visible without glasses
        },
      },
      // Body/section text scaled up ~10% for laptop readability. text-4xl+ (heroes) untouched.
      fontSize: {
        xs:   ["0.825rem",  { lineHeight: "1.15rem"  }],
        sm:   ["0.96rem",   { lineHeight: "1.4rem"   }],
        base: ["1.1rem",    { lineHeight: "1.7rem"   }],
        lg:   ["1.25rem",   { lineHeight: "1.9rem"   }],
        xl:   ["1.375rem",  { lineHeight: "1.95rem"  }],
        "2xl":["1.65rem",   { lineHeight: "2.2rem"   }],
        "3xl":["2.0rem",    { lineHeight: "2.5rem"   }],
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
        times: ["Times New Roman", "serif"],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #C6A668 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
};
