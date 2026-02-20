import { NextRequest, NextResponse } from "next/server";
import { generateVibeDesign } from "@/lib/vibe-generator";
import { VibePreset } from "@/lib/types";

type RequestBody = {
  vibe?: string;
  preset?: VibePreset | "auto";
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const vibe = body.vibe?.trim();
    const preset = body.preset || "auto";

    if (!vibe) {
      return NextResponse.json({ error: "Vibe prompt is required." }, { status: 400 });
    }

    const design = await generateVibeDesign(vibe, preset);
    return NextResponse.json({ design });
  } catch {
    return NextResponse.json({ error: "Unable to generate design." }, { status: 500 });
  }
}
