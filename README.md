# VibeUI

Generate full app UI from text vibes.

## Features

- Prompt-to-theme generation (`colors`, `fonts`, `layout`, `componentStyles`)
- Next.js API route with OpenAI integration and resilient fallback generator
- Live preview with dynamic theme tokens (buttons, cards, form inputs, dashboard layout)
- Preset templates: `cyberpunk`, `minimal`, `glassmorphism`, `pastel`, `brutalist`
- React + Tailwind starter export (`.zip`) with generated theme config
- Loading and error states
- Bonus: local theme history + shareable theme link

## Tech Stack

- Next.js (App Router)
- React
- TailwindCSS
- Framer Motion
- OpenAI API (server-side via Next API route)

## Project Structure

```txt
app/
  api/generate/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
lib/
styles/
utils/
api/
```

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env vars:
   ```bash
   cp .env.example .env.local
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000`.

## Environment Variables

- `OPENAI_API_KEY`: required for real AI generation
- `OPENAI_MODEL`: optional model override (default: `gpt-4.1-mini`)

If `OPENAI_API_KEY` is missing, the app still works using deterministic local fallback generation for demo reliability.

## How Export Works

`Export UI` generates a downloadable zip containing:

- React starter app (Vite)
- Tailwind config
- Generated theme tokens in CSS variables
- `theme.json` with full design data

## Deployment (Vercel)

1. Push repository to GitHub.
2. Import project in Vercel.
3. Set environment variables:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL` (optional)
4. Deploy.

Vercel will auto-detect Next.js build settings.

## API Contract

`POST /api/generate`

Request:

```json
{
  "vibe": "dark cyberpunk dashboard",
  "preset": "auto"
}
```

Response:

```json
{
  "design": {
    "name": "Cyberpunk Voltage Remix",
    "vibe": "dark cyberpunk dashboard",
    "colors": {},
    "fonts": {},
    "layout": {},
    "componentStyles": {}
  }
}
```
