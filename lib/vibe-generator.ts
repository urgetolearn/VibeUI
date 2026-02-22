import { VIBE_SCHEMA } from "@/api/schema";
import { getOpenAIClient } from "@/lib/openai";
import { VibeDesign, VibePreset } from "@/lib/types";
import { PRESET_THEMES, detectPreset } from "@/utils/presets";
import { sanitizeTheme } from "@/utils/sanitize";

function seeded(vibe: string) {
  let state = 2166136261;
  for (let i = 0; i < vibe.length; i += 1) {
    state ^= vibe.charCodeAt(i);
    state = Math.imul(state, 16777619);
  }
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function pick<T>(rand: () => number, values: readonly T[]): T {
  return values[Math.floor(rand() * values.length)];
}

function fromHash(vibe: string, preset: VibePreset | "auto"): VibeDesign {
  const resolvedPreset = preset === "auto" ? detectPreset(vibe) || "cyberpunk" : preset;
  const fallback = PRESET_THEMES[resolvedPreset];
  const rand = seeded(vibe);
  const baseHue = Math.floor(rand() * 360);
  const isLight = resolvedPreset === "minimal" || resolvedPreset === "pastel" || resolvedPreset === "brutalist";
  const bg = isLight ? hslToHex((baseHue + 20) % 360, 0.24, 0.97) : hslToHex((baseHue + 240) % 360, 0.35, 0.08);
  const surface = isLight ? hslToHex((baseHue + 16) % 360, 0.2, 0.99) : hslToHex((baseHue + 245) % 360, 0.28, 0.14);
  const text = isLight ? hslToHex((baseHue + 210) % 360, 0.2, 0.14) : hslToHex((baseHue + 25) % 360, 0.22, 0.94);
  const muted = isLight ? hslToHex((baseHue + 195) % 360, 0.12, 0.42) : hslToHex((baseHue + 50) % 360, 0.2, 0.68);

  return sanitizeTheme(
    {
      ...fallback,
      name: `${fallback.name} Remix`,
      vibe,
      colors: {
        primary: hslToHex(baseHue, 0.8, isLight ? 0.42 : 0.58),
        secondary: hslToHex((baseHue + 35) % 360, 0.78, isLight ? 0.44 : 0.6),
        accent: hslToHex((baseHue + 320) % 360, 0.82, isLight ? 0.46 : 0.62),
        background: bg,
        surface,
        text,
        muted
      },
      fonts: {
        heading: pick(rand, ["Space Grotesk", "Sora", "Rajdhani", "Archivo Black", "Manrope"]),
        body: pick(rand, ["Manrope", "Nunito", "Space Grotesk", "Inter", "DM Sans"]),
        mono: pick(rand, ["JetBrains Mono", "IBM Plex Mono", "Fira Code"])
      },
      layout: {
        density: pick(rand, ["compact", "comfortable", "airy"] as const),
        radius: pick(rand, ["none", "sm", "md", "lg", "xl"] as const),
        shadow: pick(rand, ["none", "soft", "medium", "hard"] as const),
        borderStyle: pick(rand, ["none", "subtle", "strong"] as const),
        spacingScale: pick(rand, [4, 6, 8, 10, 12] as const)
      },
      componentStyles: {
        button: {
          style: pick(rand, ["solid", "outline", "ghost", "gradient"] as const),
          textTransform: pick(rand, ["none", "uppercase"] as const),
          borderWidth: pick(rand, [0, 1, 2, 3] as const)
        },
        card: {
          glass: rand() > 0.52,
          border: rand() > 0.2,
          padding: pick(rand, ["sm", "md", "lg"] as const)
        },
        form: {
          inputStyle: pick(rand, ["filled", "outline", "underlined"] as const),
          labelWeight: pick(rand, ["normal", "medium", "bold"] as const),
          focusRing: pick(rand, ["subtle", "strong"] as const)
        }
      }
    },
    fallback
  );
}

function extractJSON(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;
  const match = trimmed.match(/\{[\s\S]*\}/);
  return match ? match[0] : trimmed;
}

export async function generateVibeDesign(vibe: string, preset: VibePreset | "auto"): Promise<VibeDesign> {
  const autoPreset = preset === "auto" ? detectPreset(vibe) : preset;
  const fallback = PRESET_THEMES[autoPreset || "cyberpunk"];
  const client = getOpenAIClient();

  if (!client) return fromHash(vibe, preset);

  const system = [
    "You are an elite UI design system generator.",
    "Output strictly valid JSON that matches the schema.",
    "Use high-contrast accessible colors and production-ready typography pairings.",
    "Include style decisions appropriate for modern SaaS interfaces."
  ].join(" ");

  const userPrompt = [
    `Vibe: ${vibe}`,
    `Preset: ${preset}`,
    "Return a polished UI theme JSON with palette, fonts, layout tokens, and component styles."
  ].join("\n");

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: userPrompt }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "vibe_theme",
          schema: VIBE_SCHEMA,
          strict: true
        }
      }
    });

    const parsed = JSON.parse(extractJSON(response.output_text || "{}")) as Partial<VibeDesign>;
    return sanitizeTheme(
      {
        ...parsed,
        vibe
      },
      fallback
    );
  } catch {
    return fromHash(vibe, preset);
  }
}
