/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        jade:    { DEFAULT: "#1A5C2A", 50: "#eef6f0", 100: "#c8e6cf", 400: "#3a8c50", 500: "#1A5C2A", 600: "#154a22", 700: "#103818" },
        saffron: { DEFAULT: "#C8550A", 50: "#fdf0e8", 100: "#fad4b8", 500: "#C8550A", 600: "#a34508", 700: "#7e3506" },
        gold:    { DEFAULT: "#B8860B", 50: "#fdf8e6", 100: "#f7e6a0", 300: "#d4b44a", 500: "#B8860B", 600: "#956d09" },
        maroon:  { DEFAULT: "#7B1C1C", 50: "#fdf0f0", 100: "#f5c6c6", 500: "#7B1C1C", 600: "#621616" },
        lotus:   { DEFAULT: "#C06080", 50: "#fdf0f4", 100: "#f5c6d4", 500: "#C06080" },
        ivory:   { DEFAULT: "#FDF6E8", dark: "#F5EDD4" },
        parchment: "#EDE0C4",
        temple:  "#2C1810",
      },
      fontFamily: {
        sans:    ['"Crimson Text"', "Georgia", "serif"],
        display: ['"Cinzel"', '"Playfair Display"', "Georgia", "serif"],
        body:    ['"Crimson Text"', "Georgia", "serif"],
      },
      backgroundImage: {
        "paisley": "url(\"data:image/svg+xml,%3Csvg...%3E\")",
      },
      animation: {
        "fade-in":   "fadeIn 0.8s ease forwards",
        "slide-up":  "slideUp 0.6s ease forwards",
        "float":     "float 8s ease-in-out infinite",
        "shimmer":   "shimmer 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-gold":"pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn:    { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp:   { from: { opacity: "0", transform: "translateY(24px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-14px)" } },
        shimmer:   { "0%,100%": { opacity: "0.6" }, "50%": { opacity: "1" } },
        pulseGold: { "0%,100%": { boxShadow: "0 0 0 0 rgba(184,134,11,0.4)" }, "50%": { boxShadow: "0 0 0 8px rgba(184,134,11,0)" } },
      },
      boxShadow: {
        "temple": "0 4px 24px rgba(44,24,16,0.18), inset 0 1px 0 rgba(255,255,255,0.1)",
        "card":   "0 2px 16px rgba(44,24,16,0.10), 0 1px 4px rgba(44,24,16,0.06)",
        "gold":   "0 0 20px rgba(184,134,11,0.3)",
      },
    },
  },
  plugins: [],
};

