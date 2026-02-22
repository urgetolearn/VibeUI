"use client";

import { motion } from "framer-motion";
import { GeneratedTheme } from "@/lib/types";
import { ComponentPreview } from "@/components/component-preview";
import { PalettePanel, TypographyPanel } from "@/components/theme-panels";

export function LivePreview({ theme }: { theme: GeneratedTheme }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl p-6"
      style={{
        border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
        background: "color-mix(in oklab, var(--vibe-surface), transparent 12%)"
      }}
    >
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-vibe-text">{theme.name}</h2>
          <p className="text-sm text-vibe-muted">{theme.vibe}</p>
        </div>
        <div
          className="rounded-xl px-3 py-2 text-xs text-vibe-muted"
          style={{ border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)" }}
        >
          Layout: {theme.layout.density} / {theme.layout.radius}
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <PalettePanel theme={theme} />
        <TypographyPanel theme={theme} />
        <ComponentPreview theme={theme} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {["Insights", "Engagement", "Retention"].map((item, index) => (
          <article
            key={item}
            className="rounded-2xl p-4"
            style={{
              border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
              background:
                index === 0
                  ? `linear-gradient(130deg, ${theme.colors.primary}28, color-mix(in oklab, var(--vibe-surface), transparent 20%))`
                  : "color-mix(in oklab, var(--vibe-surface), transparent 20%)"
            }}
          >
            <p className="text-xs text-vibe-muted">{item}</p>
            <p className="mt-2 text-2xl font-semibold text-vibe-text">{[89, 74, 91][index]}%</p>
          </article>
        ))}
      </div>
    </motion.section>
  );
}
