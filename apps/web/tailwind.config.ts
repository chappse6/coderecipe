import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        recipe: {
          primary: { DEFAULT: "#FBBF24", hover: "#F59E0B" },
          accent: { DEFAULT: "#F97316", hover: "#EA580C" },
          bg: {
            light: "#FFFBEB",
            surface: "#FEF3C7",
            dark: "#292524",
            "dark-surface": "#3D3835",
          },
          text: {
            primary: "#44403C",
            secondary: "#78716C",
            tertiary: "#A8A29E",
            "on-dark": "#F5F5F4",
            "on-primary": "#292524",
            "on-accent": "#FFFFFF",
          },
          success: { DEFAULT: "#16A34A", bg: "#F0FDF4" },
          error: { DEFAULT: "#DC2626", bg: "#FEF2F2" },
          info: { DEFAULT: "#2563EB", bg: "#EFF6FF" },
          warning: { DEFAULT: "#D97706", bg: "#FFFBEB" },
          code: {
            bg: "#1C1917",
            text: "#E7E5E4",
            keyword: "#FBBF24",
            string: "#4ADE80",
            comment: "#78716C",
          },
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
