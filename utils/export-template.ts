"use client";

import JSZip from "jszip";
import { GeneratedTheme } from "@/lib/types";

function uiTemplate(theme: GeneratedTheme) {
  const buttonTextTransform = theme.componentStyles.button.textTransform === "uppercase" ? "uppercase" : "none";
  const primaryButtonBackground =
    theme.componentStyles.button.style === "solid"
      ? "var(--vibe-primary)"
      : theme.componentStyles.button.style === "outline" || theme.componentStyles.button.style === "ghost"
        ? "transparent"
        : "linear-gradient(90deg, var(--vibe-primary), var(--vibe-secondary))";
  const primaryButtonColor =
    theme.componentStyles.button.style === "outline" || theme.componentStyles.button.style === "ghost"
      ? "var(--vibe-text)"
      : "#ffffff";
  const formInputClasses =
    theme.componentStyles.form.inputStyle === "underlined"
      ? "input underlined"
      : theme.componentStyles.form.inputStyle === "filled"
        ? "input filled"
        : "input outlined";

  return `import "./index.css";

export default function App() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-bold">${theme.name}</h1>
        <p className="mt-3 muted">${theme.vibe}</p>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="card">
            <h2 className="text-lg font-semibold">Revenue</h2>
            <p className="mt-2 text-3xl font-bold">$87.2k</p>
          </article>
          <article className="card">
            <h2 className="text-lg font-semibold">Retention</h2>
            <p className="mt-2 text-3xl font-bold">92.4%</p>
          </article>
          <article className="card">
            <h2 className="text-lg font-semibold">Conversions</h2>
            <p className="mt-2 text-3xl font-bold">14.8%</p>
          </article>
        </section>

        <section className="mt-8 card">
          <h3 className="text-xl font-semibold">Quick Action</h3>
          <div className="mt-4 flex gap-3">
            <button className="btn-primary" style={{ textTransform: "${buttonTextTransform}", background: "${primaryButtonBackground}", color: "${primaryButtonColor}" }}>
              Generate
            </button>
            <button className="btn-secondary">Secondary</button>
          </div>
        </section>

        <section className="mt-8 card">
          <h3 className="text-xl font-semibold">Form Preview</h3>
          <label className="mt-4 block muted">Email</label>
          <input className="${formInputClasses}" placeholder="founder@vibeui.dev" />
        </section>
      </div>
    </main>
  );
}
`;
}

function cssTemplate(theme: GeneratedTheme) {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --vibe-primary: ${theme.colors.primary};
  --vibe-secondary: ${theme.colors.secondary};
  --vibe-accent: ${theme.colors.accent};
  --vibe-bg: ${theme.colors.background};
  --vibe-surface: ${theme.colors.surface};
  --vibe-text: ${theme.colors.text};
  --vibe-muted: ${theme.colors.muted};
  --vibe-radius: ${radiusValue(theme.layout.radius)};
  --vibe-shadow: ${shadowValue(theme.layout.shadow)};
}

body {
  margin: 0;
  background: var(--vibe-bg);
  color: var(--vibe-text);
  font-family: "${theme.fonts.body}", sans-serif;
}

.muted {
  color: var(--vibe-muted);
}

.card {
  background: var(--vibe-surface);
  border: ${theme.componentStyles.card.border ? "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)" : "none"};
  border-radius: var(--vibe-radius);
  box-shadow: var(--vibe-shadow);
  padding: ${theme.componentStyles.card.padding === "sm" ? "0.85rem" : theme.componentStyles.card.padding === "lg" ? "1.7rem" : "1.25rem"};
  backdrop-filter: ${theme.componentStyles.card.glass ? "blur(12px)" : "none"};
}

.btn-primary {
  border-radius: var(--vibe-radius);
  border: ${theme.componentStyles.button.style === "outline" ? `${theme.componentStyles.button.borderWidth}px solid var(--vibe-primary)` : `${theme.componentStyles.button.borderWidth}px solid transparent`};
  padding: 0.65rem 1rem;
}

.btn-secondary {
  border-radius: var(--vibe-radius);
  background: transparent;
  color: var(--vibe-text);
  border: 1px solid color-mix(in oklab, var(--vibe-text), transparent 60%);
  padding: 0.65rem 1rem;
}

.input {
  margin-top: 0.45rem;
  width: 100%;
  border-radius: calc(var(--vibe-radius) * 0.75);
  color: var(--vibe-text);
  padding: 0.65rem 0.85rem;
  outline: none;
}

.input::placeholder {
  color: var(--vibe-muted);
}

.input.outlined {
  border: 1px solid color-mix(in oklab, var(--vibe-text), transparent 70%);
  background: transparent;
}

.input.filled {
  border: 1px solid transparent;
  background: color-mix(in oklab, var(--vibe-surface), white 8%);
}

.input.underlined {
  border: none;
  border-bottom: 1px solid color-mix(in oklab, var(--vibe-text), transparent 65%);
  border-radius: 0;
  padding-left: 0;
}
`;
}

function radiusValue(radius: string) {
  if (radius === "none") return "0px";
  if (radius === "sm") return "8px";
  if (radius === "md") return "12px";
  if (radius === "lg") return "16px";
  return "24px";
}

function shadowValue(shadow: string) {
  if (shadow === "none") return "none";
  if (shadow === "soft") return "0 16px 30px rgba(0,0,0,0.14)";
  if (shadow === "medium") return "0 24px 40px rgba(0,0,0,0.18)";
  return "8px 8px 0 rgba(0,0,0,0.38)";
}

export async function exportThemeTemplate(theme: GeneratedTheme) {
  const zip = new JSZip();
  zip.file(
    "package.json",
    JSON.stringify(
      {
        name: "vibeui-export",
        private: true,
        version: "1.0.0",
        scripts: {
          dev: "vite",
          build: "vite build",
          preview: "vite preview"
        },
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0"
        },
        devDependencies: {
          "@vitejs/plugin-react": "^4.3.4",
          autoprefixer: "^10.4.20",
          postcss: "^8.4.49",
          tailwindcss: "^3.4.16",
          vite: "^6.0.5"
        }
      },
      null,
      2
    )
  );
  zip.file(
    "tailwind.config.js",
    `export default { content: ["./index.html", "./src/**/*.{js,jsx}"], theme: { extend: {} }, plugins: [] };`
  );
  zip.file("postcss.config.js", `export default { plugins: { tailwindcss: {}, autoprefixer: {} } };`);
  zip.file(
    "index.html",
    `<!doctype html><html><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0" /><title>VibeUI Export</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`
  );
  zip.file("src/App.jsx", uiTemplate(theme));
  zip.file("src/index.css", cssTemplate(theme));
  zip.file(
    "src/main.jsx",
    `import { createRoot } from "react-dom/client"; import App from "./App"; createRoot(document.getElementById("root")).render(<App />);`
  );
  zip.file("theme.json", JSON.stringify(theme, null, 2));
  zip.file(
    "README.md",
    `# VibeUI Export\n\n1. npm install\n2. npm run dev\n\nGenerated by VibeUI with prompt: "${theme.prompt}".`
  );

  const blob = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `vibeui-${theme.id}.zip`;
  link.click();
  URL.revokeObjectURL(link.href);
}
