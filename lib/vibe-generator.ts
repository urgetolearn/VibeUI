import { VIBE_SCHEMA } from "@/api/schema";
import { getOpenAIClient } from "@/lib/openai";
import { VibeDesign, VibePreset } from "@/lib/types";
import { PRESET_THEMES, detectPreset } from "@/utils/presets";
import { sanitizeTheme } from "@/utils/sanitize";

function fromHash(vibe: string, preset: VibePreset | "auto"): VibeDesign {
  const resolvedPreset = preset === "auto" ? detectPreset(vibe) || "cyberpunk" : preset;
  const fallback = PRESET_THEMES[resolvedPreset];
  const h = [...vibe].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shift = (seed: number) => `#${(((h + seed) * 2654435761) % 0xffffff).toString(16).padStart(6, "0")}`;

  return sanitizeTheme(
    {
      ...fallback,
      name: `${fallback.name} Remix`,
      vibe,
      colors: {
        ...fallback.colors,
        primary: shift(3),
        secondary: shift(7),
        accent: shift(11)
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
