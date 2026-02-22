import { GeneratedTheme } from "@/lib/types";

const PADDING: Record<string, string> = {
  sm: "p-3",
  md: "p-5",
  lg: "p-7"
};

export function ComponentPreview({ theme }: { theme: GeneratedTheme }) {
  const cardPadding = PADDING[theme.componentStyles.card.padding];
  const buttonTransform = theme.componentStyles.button.textTransform === "uppercase" ? "uppercase" : "";
  const inputStyle =
    theme.componentStyles.form.inputStyle === "underlined"
      ? "border-b border-x-0 border-t-0 rounded-none bg-transparent"
      : theme.componentStyles.form.inputStyle === "filled"
        ? "border border-transparent"
        : "border bg-transparent";

  return (
    <section
      className="rounded-3xl p-5"
      style={{
        border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 84%)",
        background: "color-mix(in oklab, var(--vibe-surface), transparent 18%)"
      }}
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-vibe-muted">Component Styles</h3>
      <div className="mt-4 grid gap-4">
        <div
          className={`rounded-2xl ${cardPadding}`}
          style={{ border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 80%)" }}
        >
          <h4 className="text-base font-semibold text-vibe-text">Card Preview</h4>
          <p className="mt-1 text-sm text-vibe-muted">Runtime-generated design tokens applied.</p>
          <div className="mt-3 flex gap-2">
            <button
              className={`rounded-xl px-3 py-2 text-xs font-semibold ${buttonTransform}`}
              style={{
                borderWidth: theme.componentStyles.button.borderWidth,
                borderStyle: "solid",
                borderColor: theme.colors.primary,
                background:
                  theme.componentStyles.button.style === "gradient"
                    ? `linear-gradient(100deg, ${theme.colors.primary}, ${theme.colors.secondary})`
                    : theme.componentStyles.button.style === "solid"
                      ? theme.colors.primary
                      : "transparent",
                color: theme.componentStyles.button.style === "outline" ? theme.colors.text : "#fff"
              }}
            >
              Primary Action
            </button>
            <button
              className="rounded-xl px-3 py-2 text-xs text-vibe-text"
              style={{ border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 72%)" }}
            >
              Secondary
            </button>
          </div>
        </div>

        <form
          className={`rounded-2xl ${cardPadding}`}
          style={{ border: "1px solid color-mix(in oklab, var(--vibe-text), transparent 80%)" }}
        >
          <label className="text-xs text-vibe-muted">Email</label>
          <input
            className={`mt-2 w-full px-3 py-2 text-sm text-vibe-text outline-none transition focus:ring-2 focus:ring-vibe-primary/40 ${inputStyle}`}
            placeholder="designer@vibeui.dev"
            style={{
              borderColor: "color-mix(in oklab, var(--vibe-text), transparent 72%)",
              background:
                theme.componentStyles.form.inputStyle === "filled"
                  ? "color-mix(in oklab, var(--vibe-surface), transparent 12%)"
                  : undefined
            }}
          />
        </form>
      </div>
    </section>
  );
}
