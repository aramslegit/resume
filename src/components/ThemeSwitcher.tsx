import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/i18n";
import {
  DEFAULT_MODE,
  DEFAULT_THEME,
  isMode,
  MODES,
  THEME_ITEMS,
  THEME_MENU_ICON,
  type Mode,
  type ThemeName,
} from "@/config/themes";
import { useTheme } from "next-themes";
import { usePaletteTheme } from "@/theme/paletteTheme";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { theme: paletteTheme, setTheme: setPaletteTheme } = usePaletteTheme();
  const { copy } = useI18n();

  const activeMode: Mode = isMode(theme) ? theme : DEFAULT_MODE;
  const activeItem = THEME_ITEMS.find((t) => t.id === paletteTheme) ?? THEME_ITEMS.find((t) => t.id === DEFAULT_THEME);
  const TriggerIcon = activeItem?.icon ?? THEME_MENU_ICON;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <TriggerIcon className="h-5 w-5" />
          <span className="sr-only">{copy.a11y.toggleTheme}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-64">
        <DropdownMenuLabel>{copy.themeMenu.paletteLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={paletteTheme}
          onValueChange={(value) => setPaletteTheme(value as ThemeName)}
        >
          {THEME_ITEMS.map(({ id, icon: Icon }) => (
            <DropdownMenuRadioItem key={id} value={id}>
              <div className="flex items-center w-full gap-3">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{copy.themeMenu.themes[id].label}</span>
                  <span className="sr-only"> — {copy.themeMenu.themes[id].description}</span>
                </div>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>{copy.themeMenu.modeLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={activeMode} onValueChange={(value) => setTheme(value as Mode)}>
          {MODES.map((mode) => (
            <DropdownMenuRadioItem key={mode} value={mode}>
              <div className="flex items-center justify-between w-full gap-3">
                <span className="font-medium">{copy.themeMenu.modes[mode].label}</span>
                <span className="text-xs text-muted-foreground">
                  {copy.themeMenu.modes[mode].hint}
                </span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;

