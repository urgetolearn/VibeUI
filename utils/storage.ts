"use client";

import { GeneratedTheme } from "@/lib/types";

const KEY = "vibeui.theme.history.v1";

export function saveThemeToHistory(theme: GeneratedTheme) {
  if (typeof window === "undefined") return;
  const current = readThemeHistory();
  const deduped = [theme, ...current.filter((item) => item.id !== theme.id)].slice(0, 12);
  window.localStorage.setItem(KEY, JSON.stringify(deduped));
}

export function readThemeHistory(): GeneratedTheme[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GeneratedTheme[];
  } catch {
    return [];
  }
}

export function encodeTheme(theme: GeneratedTheme): string {
  return btoa(unescape(encodeURIComponent(JSON.stringify(theme))));
}

export function decodeTheme(value: string): GeneratedTheme | null {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value)))) as GeneratedTheme;
  } catch {
    return null;
  }
}
