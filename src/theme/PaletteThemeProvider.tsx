import React from "react";
import { DEFAULT_THEME, THEMES, type ThemeName } from "@/config/themes";
import {
  applyPaletteClass,
  getInitialPaletteTheme,
  PaletteThemeContext,
  persistPaletteTheme,
  type PaletteThemeContextValue,
} from "@/theme/paletteTheme";

export function PaletteThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  forcedTheme,
}: React.PropsWithChildren<{ defaultTheme?: ThemeName; forcedTheme?: ThemeName }>) {
  const [theme, setThemeState] = React.useState<ThemeName>(() => getInitialPaletteTheme(defaultTheme));

  const effectiveTheme = forcedTheme ?? theme;

  React.useEffect(() => {
    applyPaletteClass(effectiveTheme);
  }, [effectiveTheme]);

  const setTheme = React.useCallback(
    (next: ThemeName) => {
      if (forcedTheme) return;
      setThemeState(next);
      persistPaletteTheme(next);
    },
    [forcedTheme],
  );

  const value = React.useMemo<PaletteThemeContextValue>(
    () => ({ theme: effectiveTheme, setTheme, themes: THEMES }),
    [effectiveTheme, setTheme],
  );

  return <PaletteThemeContext.Provider value={value}>{children}</PaletteThemeContext.Provider>;
}
