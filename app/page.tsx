"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { HistoryPanel } from "@/components/history-panel";
import { LivePreview } from "@/components/live-preview";
import { VibeInput } from "@/components/vibe-input";
import { GeneratedTheme, VibeDesign, VibePreset } from "@/lib/types";
import { PRESET_THEMES } from "@/utils/presets";
import { exportThemeTemplate } from "@/utils/export-template";
import { decodeTheme, encodeTheme, readThemeHistory, saveThemeToHistory } from "@/utils/storage";

const DEFAULT_PROMPT = "Dark cyberpunk dashboard for a creator analytics app";

function toRadius(radius: VibeDesign["layout"]["radius"]) {
  if (radius === "none") return "0px";
  if (radius === "sm") return "8px";
  if (radius === "md") return "12px";
  if (radius === "lg") return "16px";
  return "24px";
}

function toShadow(shadow: VibeDesign["layout"]["shadow"]) {
  if (shadow === "none") return "none";
  if (shadow === "soft") return "0 16px 34px rgba(0,0,0,0.2)";
  if (shadow === "medium") return "0 24px 40px rgba(0,0,0,0.28)";
  return "8px 8px 0 rgba(0,0,0,0.42)";
}

function buildTheme(design: VibeDesign, prompt: string, preset: VibePreset | "auto"): GeneratedTheme {
  return {
    ...design,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    prompt,
    preset
  };
}

export default function HomePage() {
  const [vibe, setVibe] = useState(DEFAULT_PROMPT);
  const [preset, setPreset] = useState<VibePreset | "auto">("auto");
  const [theme, setTheme] = useState<GeneratedTheme>(() => buildTheme(PRESET_THEMES.cyberpunk, DEFAULT_PROMPT, "auto"));
  const [history, setHistory] = useState<GeneratedTheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const shared = url.searchParams.get("theme");
    const restored = shared ? decodeTheme(shared) : null;
    const initialTheme = restored || buildTheme(PRESET_THEMES.cyberpunk, DEFAULT_PROMPT, "auto");
    setTheme(initialTheme);
    setHistory(readThemeHistory());
  }, []);

  const cssVars = useMemo(
    () =>
      ({
        "--vibe-primary": theme.colors.primary,
        "--vibe-secondary": theme.colors.secondary,
        "--vibe-accent": theme.colors.accent,
        "--vibe-bg": theme.colors.background,
        "--vibe-surface": theme.colors.surface,
        "--vibe-text": theme.colors.text,
        "--vibe-muted": theme.colors.muted,
        "--vibe-radius": toRadius(theme.layout.radius),
        "--vibe-shadow": toShadow(theme.layout.shadow)
      }) as CSSProperties,
    [theme]
  );

  async function generate() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vibe, preset })
      });
      const data = (await res.json()) as { design?: VibeDesign; error?: string };
      if (!res.ok || !data.design) throw new Error(data.error || "Generation failed");

      const generated = buildTheme(data.design, vibe, preset);
      setTheme(generated);
      saveThemeToHistory(generated);
      setHistory(readThemeHistory());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function shareTheme() {
    const payload = encodeTheme(theme);
    const url = `${window.location.origin}?theme=${encodeURIComponent(payload)}`;
    await navigator.clipboard.writeText(url);
  }

  return (
    <main style={cssVars} className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-vibe-muted">VibeUI</p>
          <h1 className="mt-2 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Generate full app UI from text vibes.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-vibe-muted">
            Prompt-driven palette, typography, layout tokens, live preview, and export-ready React + Tailwind starter.
          </p>
        </motion.header>

        <VibeInput
          vibe={vibe}
          preset={preset}
          loading={loading}
          onVibeChange={setVibe}
          onPresetChange={setPreset}
          onSubmit={generate}
        />

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => exportThemeTemplate(theme)}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-white"
            style={{ background: "linear-gradient(90deg,var(--vibe-primary),var(--vibe-secondary))" }}
          >
            Export UI
          </button>
          <button
            onClick={shareTheme}
            className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-vibe-text"
          >
            Copy Share Link
          </button>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_320px]">
            <LivePreview theme={theme} />
            <HistoryPanel items={history} onSelect={setTheme} />
          </div>
        )}
      </div>
    </main>
  );
}
