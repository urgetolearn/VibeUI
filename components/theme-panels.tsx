import { GeneratedTheme } from "@/lib/types";

export function PalettePanel({ theme }: { theme: GeneratedTheme }) {
  const entries = Object.entries(theme.colors);
  return (
    <section
      className="rounded-3xl p-5"
      style={{
        border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
        background: "color-mix(in oklab, var(--vibe-surface), transparent 18%)"
      }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-vibe-muted">Palette</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {entries.map(([token, color]) => (
          <article
            key={token}
            className="rounded-2xl p-2"
            style={{ border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)" }}
          >
            <div className="h-12 rounded-xl" style={{ backgroundColor: color }} />
            <p className="mt-2 text-xs text-vibe-muted">{token}</p>
            <p className="text-xs text-vibe-text">{color}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TypographyPanel({ theme }: { theme: GeneratedTheme }) {
  return (
    <section
      className="rounded-3xl p-5"
      style={{
        border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
        background: "color-mix(in oklab, var(--vibe-surface), transparent 18%)"
      }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-vibe-muted">Typography</h3>
      <div className="mt-4 space-y-4">
        <div>
          <p className="text-xs text-vibe-muted">Heading</p>
          <p className="text-3xl text-vibe-text" style={{ fontFamily: theme.fonts.heading }}>
            VibeUI Aesthetic
          </p>
        </div>
        <div>
          <p className="text-xs text-vibe-muted">Body</p>
          <p className="text-sm text-vibe-text" style={{ fontFamily: theme.fonts.body }}>
            Build polished interfaces from one prompt, instantly.
          </p>
        </div>
        <div>
          <p className="text-xs text-vibe-muted">Mono</p>
          <code className="text-xs text-vibe-text" style={{ fontFamily: theme.fonts.mono }}>
            tokens.spacing = {theme.layout.spacingScale}
          </code>
        </div>
      </div>
    </section>
  );
}
