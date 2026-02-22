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

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const val = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(val)) return null;
  return {
    r: Number.parseInt(val.slice(0, 2), 16),
    g: Number.parseInt(val.slice(2, 4), 16),
    b: Number.parseInt(val.slice(4, 6), 16)
  };
}

function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const chan = [rgb.r, rgb.g, rgb.b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * chan[0] + 0.7152 * chan[1] + 0.0722 * chan[2];
}

function contrastRatio(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

export function sanitizeTheme(input: Partial<VibeDesign>, fallback: VibeDesign): VibeDesign {
  const colors = {
    primary: clampHex(input.colors?.primary || "", fallback.colors.primary),
    secondary: clampHex(input.colors?.secondary || "", fallback.colors.secondary),
    accent: clampHex(input.colors?.accent || "", fallback.colors.accent),
    background: clampHex(input.colors?.background || "", fallback.colors.background),
    surface: clampHex(input.colors?.surface || "", fallback.colors.surface),
    text: clampHex(input.colors?.text || "", fallback.colors.text),
    muted: clampHex(input.colors?.muted || "", fallback.colors.muted)
  };

  if (contrastRatio(colors.text, colors.background) < 4.5) {
    const bgLum = luminance(colors.background);
    colors.text = bgLum > 0.55 ? "#111827" : "#f8fafc";
  }

  if (contrastRatio(colors.muted, colors.background) < 2.6) {
    const bgLum = luminance(colors.background);
    colors.muted = bgLum > 0.55 ? "#475569" : "#94a3b8";
  }

  return {
    name: input.name?.slice(0, 60) || fallback.name,
    vibe: input.vibe?.slice(0, 200) || fallback.vibe,
    colors,
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
