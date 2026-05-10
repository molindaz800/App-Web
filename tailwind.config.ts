import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#03060a",
        carbon: "#071018",
        plasma: "#00d8ff",
        ambercore: "#ff8a3d",
        ion: "#7df9ff",
        danger: "#ff3d67"
      },
      boxShadow: {
        hud: "0 0 35px rgba(0, 216, 255, 0.18), inset 0 0 28px rgba(0, 216, 255, 0.08)",
        amber: "0 0 35px rgba(255, 138, 61, 0.24)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
