import { VibeDesign, VibePreset } from "@/lib/types";

const BASE_THEME: Omit<VibeDesign, "name" | "vibe"> = {
  colors: {
    primary: "#5eead4",
    secondary: "#60a5fa",
    accent: "#f472b6",
    background: "#09090b",
    surface: "#111827",
    text: "#f8fafc",
    muted: "#94a3b8"
  },
  fonts: {
    heading: "Space Grotesk",
    body: "Manrope",
    mono: "JetBrains Mono"
  },
  layout: {
    density: "comfortable",
    radius: "lg",
    shadow: "soft",
    borderStyle: "subtle",
    spacingScale: 8
  },
  componentStyles: {
    button: {
      style: "gradient",
      textTransform: "none",
      borderWidth: 1
    },
    card: {
      glass: true,
      border: true,
      padding: "md"
    },
    form: {
      inputStyle: "outline",
      labelWeight: "medium",
      focusRing: "strong"
    }
  }
};

export const PRESET_THEMES: Record<VibePreset, VibeDesign> = {
  cyberpunk: {
    name: "Cyberpunk Voltage",
    vibe: "Dark cyberpunk dashboard",
    ...BASE_THEME,
    colors: {
      primary: "#22d3ee",
      secondary: "#a855f7",
      accent: "#facc15",
      background: "#060214",
      surface: "#120d28",
      text: "#e2e8f0",
      muted: "#94a3b8"
    },
    fonts: {
      heading: "Rajdhani",
      body: "Space Grotesk",
      mono: "JetBrains Mono"
    },
    componentStyles: {
      ...BASE_THEME.componentStyles,
      button: { style: "gradient", textTransform: "uppercase", borderWidth: 1 }
    }
  },
  minimal: {
    name: "Minimal Clarity",
    vibe: "Minimal fintech landing page",
    ...BASE_THEME,
    colors: {
      primary: "#1d4ed8",
      secondary: "#0f172a",
      accent: "#14b8a6",
      background: "#f8fafc",
      surface: "#ffffff",
      text: "#0f172a",
      muted: "#64748b"
    },
    fonts: {
      heading: "Sora",
      body: "Manrope",
      mono: "IBM Plex Mono"
    },
    layout: {
      density: "airy",
      radius: "md",
      shadow: "none",
      borderStyle: "subtle",
      spacingScale: 10
    },
    componentStyles: {
      button: { style: "solid", textTransform: "none", borderWidth: 0 },
      card: { glass: false, border: true, padding: "lg" },
      form: { inputStyle: "underlined", labelWeight: "medium", focusRing: "subtle" }
    }
  },
  glassmorphism: {
    name: "Aurora Glass",
    vibe: "Glassmorphism product control panel",
    ...BASE_THEME,
    colors: {
      primary: "#38bdf8",
      secondary: "#6366f1",
      accent: "#34d399",
      background: "#0c1224",
      surface: "#111b33",
      text: "#e5e7eb",
      muted: "#9ca3af"
    },
    componentStyles: {
      button: { style: "outline", textTransform: "none", borderWidth: 1 },
      card: { glass: true, border: true, padding: "lg" },
      form: { inputStyle: "filled", labelWeight: "normal", focusRing: "strong" }
    }
  },
  pastel: {
    name: "Pastel Bloom",
    vibe: "Cute pastel todo app",
    ...BASE_THEME,
    colors: {
      primary: "#f472b6",
      secondary: "#22d3ee",
      accent: "#fbbf24",
      background: "#fff7fb",
      surface: "#ffffff",
      text: "#3f3f46",
      muted: "#71717a"
    },
    fonts: {
      heading: "Fredoka",
      body: "Nunito",
      mono: "JetBrains Mono"
    },
    layout: {
      density: "comfortable",
      radius: "xl",
      shadow: "soft",
      borderStyle: "subtle",
      spacingScale: 10
    },
    componentStyles: {
      button: { style: "solid", textTransform: "none", borderWidth: 0 },
      card: { glass: false, border: true, padding: "md" },
      form: { inputStyle: "filled", labelWeight: "bold", focusRing: "subtle" }
    }
  },
  brutalist: {
    name: "Brutalist Impact",
    vibe: "Raw brutalist portfolio",
    ...BASE_THEME,
    colors: {
      primary: "#f97316",
      secondary: "#000000",
      accent: "#facc15",
      background: "#ffffff",
      surface: "#f3f4f6",
      text: "#111827",
      muted: "#4b5563"
    },
    fonts: {
      heading: "Archivo Black",
      body: "Space Grotesk",
      mono: "JetBrains Mono"
    },
    layout: {
      density: "compact",
      radius: "none",
      shadow: "hard",
      borderStyle: "strong",
      spacingScale: 6
    },
    componentStyles: {
      button: { style: "outline", textTransform: "uppercase", borderWidth: 3 },
      card: { glass: false, border: true, padding: "sm" },
      form: { inputStyle: "outline", labelWeight: "bold", focusRing: "strong" }
    }
  }
};

export const PRESET_KEYS = Object.keys(PRESET_THEMES) as VibePreset[];

export function detectPreset(vibe: string): VibePreset | null {
  const lower = vibe.toLowerCase();
  if (lower.includes("cyber")) return "cyberpunk";
  if (lower.includes("minimal")) return "minimal";
  if (lower.includes("glass")) return "glassmorphism";
  if (lower.includes("pastel") || lower.includes("cute")) return "pastel";
  if (lower.includes("brutal")) return "brutalist";
  return null;
}
