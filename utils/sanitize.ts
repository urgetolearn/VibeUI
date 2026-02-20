import { VibeDesign } from "@/lib/types";

function clampHex(color: string, fallback: string): string {
  const normalized = color?.trim();
  if (!normalized) return fallback;
  const hex = normalized.startsWith("#") ? normalized : `#${normalized}`;
  return /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : fallback;
}

function oneOf<T extends string | number>(value: unknown, allowed: readonly T[], fallback: T): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

export function sanitizeTheme(input: Partial<VibeDesign>, fallback: VibeDesign): VibeDesign {
  return {
    name: input.name?.slice(0, 60) || fallback.name,
    vibe: input.vibe?.slice(0, 200) || fallback.vibe,
    colors: {
      primary: clampHex(input.colors?.primary || "", fallback.colors.primary),
      secondary: clampHex(input.colors?.secondary || "", fallback.colors.secondary),
      accent: clampHex(input.colors?.accent || "", fallback.colors.accent),
      background: clampHex(input.colors?.background || "", fallback.colors.background),
      surface: clampHex(input.colors?.surface || "", fallback.colors.surface),
      text: clampHex(input.colors?.text || "", fallback.colors.text),
      muted: clampHex(input.colors?.muted || "", fallback.colors.muted)
    },
    fonts: {
      heading: input.fonts?.heading || fallback.fonts.heading,
      body: input.fonts?.body || fallback.fonts.body,
      mono: input.fonts?.mono || fallback.fonts.mono
    },
    layout: {
      density: oneOf(input.layout?.density, ["compact", "comfortable", "airy"], fallback.layout.density),
      radius: oneOf(input.layout?.radius, ["none", "sm", "md", "lg", "xl"], fallback.layout.radius),
      shadow: oneOf(input.layout?.shadow, ["none", "soft", "medium", "hard"], fallback.layout.shadow),
      borderStyle: oneOf(input.layout?.borderStyle, ["none", "subtle", "strong"], fallback.layout.borderStyle),
      spacingScale: oneOf(input.layout?.spacingScale, [4, 6, 8, 10, 12], fallback.layout.spacingScale)
    },
    componentStyles: {
      button: {
        style: oneOf(
          input.componentStyles?.button?.style,
          ["solid", "outline", "ghost", "gradient"],
          fallback.componentStyles.button.style
        ),
        textTransform: oneOf(
          input.componentStyles?.button?.textTransform,
          ["none", "uppercase"],
          fallback.componentStyles.button.textTransform
        ),
        borderWidth: oneOf(
          input.componentStyles?.button?.borderWidth,
          [0, 1, 2, 3],
          fallback.componentStyles.button.borderWidth
        )
      },
      card: {
        glass: input.componentStyles?.card?.glass ?? fallback.componentStyles.card.glass,
        border: input.componentStyles?.card?.border ?? fallback.componentStyles.card.border,
        padding: oneOf(input.componentStyles?.card?.padding, ["sm", "md", "lg"], fallback.componentStyles.card.padding)
      },
      form: {
        inputStyle: oneOf(
          input.componentStyles?.form?.inputStyle,
          ["filled", "outline", "underlined"],
          fallback.componentStyles.form.inputStyle
        ),
        labelWeight: oneOf(
          input.componentStyles?.form?.labelWeight,
          ["normal", "medium", "bold"],
          fallback.componentStyles.form.labelWeight
        ),
        focusRing: oneOf(
          input.componentStyles?.form?.focusRing,
          ["subtle", "strong"],
          fallback.componentStyles.form.focusRing
        )
      }
    }
  };
}
