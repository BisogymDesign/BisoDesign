import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#07060b",
        surface: "#120f17",
        surface2: "#1a1522",
        ink: "#fff7ed",
        muted: "#a8a29e",
        flare: {
          orange: "#ff5f1f",
          peach: "#fdba74",
          violet: "#8b5cf6",
          deep: "#3b0764",
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)"],
        body: ["var(--font-inter)"],
        label: ["var(--font-space-grotesk)"],
      },
      backgroundImage: {
        "flare-gradient": "linear-gradient(90deg, #ff5f1f 0%, #c04cfd 60%, #8b5cf6 100%)",
        "flare-radial":
          "radial-gradient(120% 120% at 15% 0%, rgba(255,95,31,0.14) 0%, rgba(7,6,11,0) 55%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 95, 31, 0.35)",
        glowViolet: "0 0 40px rgba(139, 92, 246, 0.35)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
