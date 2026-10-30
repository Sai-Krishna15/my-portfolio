/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#030712",
        surface: {
          DEFAULT: "rgba(17, 24, 39, 0.7)",
          light: "rgba(31, 41, 55, 0.8)",
          card: "rgba(15, 23, 42, 0.65)",
          border: "rgba(148, 163, 184, 0.12)",
        },
        cyan: {
          glow: "#38bdf8",
          DEFAULT: "#06b6d4",
        },
        purple: {
          glow: "#c084fc",
          DEFAULT: "#a855f7",
        },
        emerald: {
          glow: "#34d399",
          DEFAULT: "#10b981",
        },
      },
      fontFamily: {
        sans: ["'Inter Variable'", "sans-serif"],
        display: ["'Space Grotesk Variable'", "'Inter Variable'", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { opacity: 0.4 },
          "100%": { opacity: 0.9 },
        },
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(56, 189, 248, 0.3)",
        "glow-purple": "0 0 25px -5px rgba(192, 132, 252, 0.3)",
        "glow-emerald": "0 0 25px -5px rgba(52, 211, 153, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
