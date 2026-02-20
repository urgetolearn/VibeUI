export type VibePreset =
  | "cyberpunk"
  | "minimal"
  | "glassmorphism"
  | "pastel"
  | "brutalist";

export type VibeDesign = {
  name: string;
  vibe: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono: string;
  };
  layout: {
    density: "compact" | "comfortable" | "airy";
    radius: "none" | "sm" | "md" | "lg" | "xl";
    shadow: "none" | "soft" | "medium" | "hard";
    borderStyle: "none" | "subtle" | "strong";
    spacingScale: 4 | 6 | 8 | 10 | 12;
  };
  componentStyles: {
    button: {
      style: "solid" | "outline" | "ghost" | "gradient";
      textTransform: "none" | "uppercase";
      borderWidth: 0 | 1 | 2 | 3;
    };
    card: {
      glass: boolean;
      border: boolean;
      padding: "sm" | "md" | "lg";
    };
    form: {
      inputStyle: "filled" | "outline" | "underlined";
      labelWeight: "normal" | "medium" | "bold";
      focusRing: "subtle" | "strong";
    };
  };
};

export type GeneratedTheme = VibeDesign & {
  id: string;
  createdAt: string;
  prompt: string;
  preset: VibePreset | "auto";
};
