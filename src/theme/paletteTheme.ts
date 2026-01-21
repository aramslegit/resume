import React from "react";
import { DEFAULT_THEME, isThemeName, THEME_CLASS_BY_THEME, THEMES, type ThemeName } from "@/config/themes";

export type PaletteThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: readonly ThemeName[];
};

export const PaletteThemeContext = React.createContext<PaletteThemeContextValue | null>(null);

export const PALETTE_THEME_STORAGE_KEY = "stratae:palette-theme";

export function applyPaletteClass(theme: ThemeName) {
  const root = document.documentElement;
  for (const name of THEMES) root.classList.remove(THEME_CLASS_BY_THEME[name]);
  root.classList.add(THEME_CLASS_BY_THEME[theme]);
}

export function getInitialPaletteTheme(defaultTheme: ThemeName = DEFAULT_THEME): ThemeName {
  try {
    const raw = localStorage.getItem(PALETTE_THEME_STORAGE_KEY);
    return isThemeName(raw) ? raw : defaultTheme;
  } catch {
    return defaultTheme;
  }
}

export function persistPaletteTheme(theme: ThemeName) {
  try {
    localStorage.setItem(PALETTE_THEME_STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

export function usePaletteTheme() {
  const ctx = React.useContext(PaletteThemeContext);
  if (!ctx) throw new Error("usePaletteTheme must be used within <PaletteThemeProvider />");
  return ctx;
}

