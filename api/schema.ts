export const VIBE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    name: { type: "string" },
    vibe: { type: "string" },
    colors: {
      type: "object",
      additionalProperties: false,
      properties: {
        primary: { type: "string" },
        secondary: { type: "string" },
        accent: { type: "string" },
        background: { type: "string" },
        surface: { type: "string" },
        text: { type: "string" },
        muted: { type: "string" }
      },
      required: ["primary", "secondary", "accent", "background", "surface", "text", "muted"]
    },
    fonts: {
      type: "object",
      additionalProperties: false,
      properties: {
        heading: { type: "string" },
        body: { type: "string" },
        mono: { type: "string" }
      },
      required: ["heading", "body", "mono"]
    },
    layout: {
      type: "object",
      additionalProperties: false,
      properties: {
        density: { type: "string", enum: ["compact", "comfortable", "airy"] },
        radius: { type: "string", enum: ["none", "sm", "md", "lg", "xl"] },
        shadow: { type: "string", enum: ["none", "soft", "medium", "hard"] },
        borderStyle: { type: "string", enum: ["none", "subtle", "strong"] },
        spacingScale: { type: "integer", enum: [4, 6, 8, 10, 12] }
      },
      required: ["density", "radius", "shadow", "borderStyle", "spacingScale"]
    },
    componentStyles: {
      type: "object",
      additionalProperties: false,
      properties: {
        button: {
          type: "object",
          additionalProperties: false,
          properties: {
            style: { type: "string", enum: ["solid", "outline", "ghost", "gradient"] },
            textTransform: { type: "string", enum: ["none", "uppercase"] },
            borderWidth: { type: "integer", enum: [0, 1, 2, 3] }
          },
          required: ["style", "textTransform", "borderWidth"]
        },
        card: {
          type: "object",
          additionalProperties: false,
          properties: {
            glass: { type: "boolean" },
            border: { type: "boolean" },
            padding: { type: "string", enum: ["sm", "md", "lg"] }
          },
          required: ["glass", "border", "padding"]
        },
        form: {
          type: "object",
          additionalProperties: false,
          properties: {
            inputStyle: { type: "string", enum: ["filled", "outline", "underlined"] },
            labelWeight: { type: "string", enum: ["normal", "medium", "bold"] },
            focusRing: { type: "string", enum: ["subtle", "strong"] }
          },
          required: ["inputStyle", "labelWeight", "focusRing"]
        }
      },
      required: ["button", "card", "form"]
    }
  },
  required: ["name", "vibe", "colors", "fonts", "layout", "componentStyles"]
} as const;
