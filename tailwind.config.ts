import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        vibe: {
          bg: "var(--vibe-bg)",
          surface: "var(--vibe-surface)",
          primary: "var(--vibe-primary)",
          secondary: "var(--vibe-secondary)",
          accent: "var(--vibe-accent)",
          text: "var(--vibe-text)",
          muted: "var(--vibe-muted)"
        }
      },
      borderRadius: {
        vibe: "var(--vibe-radius)"
      },
      boxShadow: {
        vibe: "var(--vibe-shadow)"
      }
    }
  },
  plugins: []
};

export default config;
