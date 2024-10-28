import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        rubik: ["var(--rubik)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "infinite-scroll": {
          "0%": { transform: "translateY(100%)" },
          "10%": { transform: "translateY(0%)" },
          "20%": { transform: "translateY(0%)" },
          "35%": { transform: "translateY(-25%)" },
          "45%": { transform: "translateY(-25%)" },
          "60%": { transform: "translateY(-50%)" },
          "70%": { transform: "translateY(-50%)" },
          "85%": { transform: "translateY(-75%)" },
          "100%": { transform: "translateY(-75%)" },
        },
        "infinite-scroll-5": {
          "0%": { transform: "translateY(25%)" },
          "5%": { transform: "translateY(0%)" },
          "15%": { transform: "translateY(0%)" },
          "30%": { transform: "translateY(-25%)" },
          "40%": { transform: "translateY(-25%)" },
          "55%": { transform: "translateY(-50%)" },
          "65%": { transform: "translateY(-50%)" },
          "80%": { transform: "translateY(-75%)" },
          "89%": { transform: "translateY(-75%)" },
          "100%": { transform: "translateY(-100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-scroll": "infinite-scroll 10s infinite",
        "infinite-scroll-5": "infinite-scroll-5 10s infinite",
      },
      colors: {
        "spacesync-purple": "#8D51FF",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
