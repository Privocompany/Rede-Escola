import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      colors: {
        brand: {
          purple: "#6835D6",
          purple_hover: "#5A2EBA",
          blue: "#00B2F7",
          blue_hover: "#009DDE",
          yellow: "#FFCA28",
          orange: "#FF4500", // Reddit-style upvote/action color
        },
        ui: {
          wash: "#F0F2F5",
          surface: "#FFFFFF",
          divider: "#E4E6EB",
        },
        text: {
          primary: "#050505",
          secondary: "#65676B",
          placeholder: "#8A8D91",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        card: "0 1px 2px rgba(0, 0, 0, 0.1)",
        float: "0 8px 30px rgba(104, 53, 214, 0.15)",
        nav: "0 4px 14px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "slide-in": "slideIn 0.2s ease-out",
        "fade-in": "fadeIn 0.3s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
