"use client";

import { motion } from "framer-motion";
import { VibePreset } from "@/lib/types";
import { PRESET_KEYS } from "@/utils/presets";

type Props = {
  vibe: string;
  preset: VibePreset | "auto";
  loading: boolean;
  onVibeChange: (value: string) => void;
  onPresetChange: (value: VibePreset | "auto") => void;
  onSubmit: () => void;
};

const EXAMPLES = [
  "Dark cyberpunk analytics command center",
  "Minimal fintech landing page with confidence",
  "Cute pastel todo app for students",
  "Brutalist creator portfolio with bold blocks"
];

export function VibeInput({
  vibe,
  preset,
  loading,
  onVibeChange,
  onPresetChange,
  onSubmit
}: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="rounded-3xl p-6 backdrop-blur-xl"
      style={{
        border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
        background: "color-mix(in oklab, var(--vibe-surface), transparent 15%)"
      }}
    >
      <h2 className="text-lg font-semibold text-vibe-text">Describe Your Vibe</h2>
      <p className="mt-2 text-sm text-vibe-muted">Prompt the design engine with mood, style, and product type.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_auto]">
        <textarea
          value={vibe}
          onChange={(event) => onVibeChange(event.target.value)}
          rows={3}
          placeholder="Example: dark cyberpunk dashboard for crypto portfolio tracking"
          className="w-full rounded-2xl px-4 py-3 text-sm text-vibe-text outline-none transition focus:border-vibe-primary focus:ring-2 focus:ring-vibe-primary/30"
          style={{
            border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 80%)",
            background: "color-mix(in oklab, var(--vibe-surface), transparent 8%)"
          }}
        />
        <select
          value={preset}
          onChange={(event) => onPresetChange(event.target.value as VibePreset | "auto")}
          className="rounded-2xl px-3 py-2 text-sm text-vibe-text outline-none focus:border-vibe-primary"
          style={{
            border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 80%)",
            background: "color-mix(in oklab, var(--vibe-surface), transparent 8%)"
          }}
        >
          <option value="auto">Auto preset</option>
          {PRESET_KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button
          disabled={!vibe.trim() || loading}
          onClick={onSubmit}
          className="rounded-2xl px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "linear-gradient(90deg, var(--vibe-primary), var(--vibe-secondary))" }}
        >
          {loading ? "Generating..." : "Generate UI"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <button
            key={example}
            onClick={() => onVibeChange(example)}
            className="rounded-full px-3 py-1.5 text-xs text-vibe-muted transition hover:border-vibe-primary hover:text-vibe-text"
            style={{
              border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 82%)",
              background: "color-mix(in oklab, var(--vibe-surface), transparent 18%)"
            }}
          >
            {example}
          </button>
        ))}
      </div>
    </motion.section>
  );
}
