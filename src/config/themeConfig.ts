import { DEFAULT_MODE, DEFAULT_THEME, isMode, isThemeName, type Mode, type ThemeName } from "@/config/themes";

export type RuntimeThemeConfig = {
  theme: ThemeName;
  mode: Mode;
};

const THEME_CONFIG_URL = "/theme-config.json";

function readStringProp(obj: unknown, key: string): string | null {
  if (typeof obj !== "object" || obj === null) return null;
  if (!(key in obj)) return null;
  const value = (obj as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

export async function loadRuntimeThemeConfig(): Promise<RuntimeThemeConfig> {
  try {
    const res = await fetch(THEME_CONFIG_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load ${THEME_CONFIG_URL}: ${res.status}`);
    const json = (await res.json()) as unknown;
    const themeRaw = readStringProp(json, "theme");
    const modeRaw = readStringProp(json, "mode");

    return {
      theme: isThemeName(themeRaw) ? themeRaw : DEFAULT_THEME,
      mode: isMode(modeRaw) ? modeRaw : DEFAULT_MODE,
    };
  } catch {
    return { theme: DEFAULT_THEME, mode: DEFAULT_MODE };
  }
}

