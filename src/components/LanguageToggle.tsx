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

const LanguageToggle = () => {
  const { language, setLanguage, copy } = useI18n();
  const labels = copy.languageMenu.languages;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <span className="text-[11px] font-semibold tracking-wide">
            {labels[language].short}
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
          {(Object.keys(labels) as Language[]).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              <div className="flex items-center justify-between w-full gap-3">
                <span className="font-medium">{labels[key].name}</span>
                <span className="text-xs text-muted-foreground">
                  {labels[key].nativeName}
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

