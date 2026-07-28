import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        night: "#0d0d0d",
        surface: "#161213",
        surface2: "#1f1a1c",
        ink: "#fff7ed",
        muted: "#a8a29e",
        flare: {
          orange: "#ff5f1f",
          peach: "#fdba74",
          violet: "#8b5cf6",
          deep: "#3b0764",
        },
      },
      fontFamily: {
        heading: ["var(--font-sora)"],
        body: ["var(--font-inter)"],
        label: ["var(--font-space-grotesk)"],
      },
      backgroundImage: {
        "flare-gradient": "linear-gradient(90deg, #ff5f1f 0%, #8b5cf6 100%)",
        "flare-radial": "radial-gradient(120% 120% at 15% 0%, #2a0f05 0%, #0d0d0d 55%)",
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
