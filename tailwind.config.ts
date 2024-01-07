import type { Config } from "tailwindcss";

const config = {
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
      fontSize: {
        h1: [
          "clamp(2rem, 3.4783vw + 0.3043rem, 3rem)",
          {
            lineHeight: "2rem",
            letterSpacing: "-0.01em",
            fontWeight: "800",
          },
        ],
        h2: [
          "clamp(1.85rem, 3.4783vw + 0.3043rem, 3rem)",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        h3: [
          "clamp(1.75rem, 3.4783vw + 0.3043rem, 3rem)",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        h4: [
          "clamp(1.65rem, 3.4783vw + 0.3043rem, 3rem)",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        h5: [
          "clamp(1.5rem, 3.4783vw + 0.3043rem, 3rem)",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        h6: [
          "clamp(1.4rem, 3.4783vw + 0.3043rem, 3rem)",
          {
            lineHeight: "2.25rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        color: "hsl(var(--color))",
        foreground: "hsl(var(--foreground))",
        "dark-blue": "hsl(var(--dark-blue))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "bounce-in": {
          "0%": { opacity: "0", scale: "1.3" },
          "50%": { opacity: "0.8", scale: "0.7" },
          "80%": { opacity: "9", scale: "0.8" },
          "100%": { opacity: "1", scale: "1" },
        },
        "bounce-out": {
          "0%": { opacity: "0", scale: "0.3" },
          "50%": { opacity: "0.8", scale: "1.2" },
          "80%": { opacity: "9", scale: "0.8" },
          "100%": { opacity: "1", scale: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "bounce-in": "bounce-in 0.5s linear forwards 0.3s",
        "bounce-out": "bounce-out 0.5s linear forwards 0.3s",
      },
      fontFamily: {
        inter: ["var(--ff-inter)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
