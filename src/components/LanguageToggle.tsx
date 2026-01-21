import { Button } from "@/components/ui/button";
import { useI18n, type Language } from "@/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LANGUAGE_LABELS: Record<
  Language,
  { short: string; name: string; nativeName: string }
> = {
  en: { short: "EN", name: "English", nativeName: "English" },
  nl: { short: "NL", name: "Dutch", nativeName: "Nederlands" },
  fr: { short: "FR", name: "French", nativeName: "Français" },
};

const LanguageToggle = () => {
  const { language, setLanguage, copy } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <span className="text-[11px] font-semibold tracking-wide">
            {LANGUAGE_LABELS[language].short}
          </span>
          <span className="sr-only">{copy.a11y.switchLanguage}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>{copy.a11y.languageMenuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={(value) => setLanguage(value as Language)}
        >
          {(
            Object.keys(LANGUAGE_LABELS) as Array<keyof typeof LANGUAGE_LABELS>
          ).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              <div className="flex items-center justify-between w-full gap-3">
                <span className="font-medium">{LANGUAGE_LABELS[key].name}</span>
                <span className="text-xs text-muted-foreground">
                  {LANGUAGE_LABELS[key].nativeName}
                </span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;

