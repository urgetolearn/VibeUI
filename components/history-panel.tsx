"use client";

import { GeneratedTheme } from "@/lib/types";

type Props = {
  items: GeneratedTheme[];
  onSelect: (theme: GeneratedTheme) => void;
};

export function HistoryPanel({ items, onSelect }: Props) {
  return (
    <section
      className="rounded-3xl p-5"
      style={{
        border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
        background: "color-mix(in oklab, var(--vibe-surface), transparent 18%)"
      }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-vibe-muted">Theme History</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-vibe-muted">No generated themes yet.</p>
      ) : (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:border-vibe-primary"
              style={{ border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)" }}
            >
              <span className="mr-3 truncate text-sm text-vibe-text">{item.prompt}</span>
              <span className="text-xs text-vibe-muted">{new Date(item.createdAt).toLocaleDateString()}</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
