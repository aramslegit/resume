import type { LucideIcon } from "lucide-react";
import { BookOpen, Home, Layers, Palette, Terminal } from "lucide-react";

// Palette themes (color/typography) — independent of light/dark/system mode.
export const THEMES = ["default", "linear", "paper", "terminal"] as const;
export type ThemeName = (typeof THEMES)[number];

// Modes (light/dark/system) — handled by next-themes.
export const MODES = ["light", "dark", "system"] as const;
export type Mode = (typeof MODES)[number];

export const DEFAULT_THEME: ThemeName = "linear";
export const DEFAULT_MODE: Mode = "system";

export const THEME_CLASS_BY_THEME: Record<ThemeName, string> = {
  default: "theme-default",
  linear: "theme-linear",
  paper: "theme-paper",
  terminal: "theme-terminal",
};

export function isThemeName(value: unknown): value is ThemeName {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

export function isMode(value: unknown): value is Mode {
  return typeof value === "string" && (MODES as readonly string[]).includes(value);
}

export type ThemeItem = {
  id: ThemeName;
  icon: LucideIcon;
};

export const THEME_ITEMS: ThemeItem[] = [
  { id: "default", icon: Home },
  { id: "linear", icon: Layers },
  { id: "paper", icon: BookOpen },
  { id: "terminal", icon: Terminal },
];

export const THEME_MENU_ICON: LucideIcon = Palette;

