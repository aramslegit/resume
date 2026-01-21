import profilePhoto from "@/assets/profile-photo.jpeg";
import { Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";
import { getResumeVariantFilename, RESUME_LATEST_URL_DIR } from "@/config/resumeNaming";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { usePaletteTheme } from "@/theme/paletteTheme";
import { useMemo } from "react";
import { usePrivacy } from "@/hooks/use-privacy";

const HeroSection = () => {
  const { copy, language, formatRich } = useI18n();
  const { isVisible } = usePrivacy();
  const helloTooltip = copy.hero.helloTooltip;
  const fullName = `${copy.hero.firstName} ${copy.hero.lastName}`;
  const mailtoHref = `mailto:${copy.hero.email}`;
  const telHref = `tel:${copy.hero.phone.replace(/\s+/g, "")}`;
  const { theme: paletteTheme } = usePaletteTheme();

  const themedResumeFilename = useMemo(
    () => getResumeVariantFilename(language, paletteTheme),
    [language, paletteTheme],
  );

  return (
    <section className="relative pb-12 md:pb-20">
      {/* Header with download, language and theme toggles */}
      <div className="mb-6 flex justify-end gap-2">
        <Button variant="outline" size="sm" asChild className="gap-2">
          <a
            href={`${RESUME_LATEST_URL_DIR}/${themedResumeFilename}`}
            download={themedResumeFilename}
          >
            <Download className="h-4 w-4" />
            {copy.hero.download}
          </a>
        </Button>
        <LanguageToggle />
        <ThemeSwitcher />
      </div>

      <div className="flex flex-col items-start gap-8 md:flex-row md:gap-12">
        {/* Profile Photo */}
        <div className="animate-fade-in">
          <div className="relative">
            <div className="h-36 w-36 overflow-hidden rounded-full shadow-elevated md:h-44 md:w-44">
              <img
                src={profilePhoto}
                alt={fullName}
                className="block h-full w-full scale-[1.065] object-cover object-[50%_30%]"
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={helloTooltip}
                  title={helloTooltip}
                  className="absolute bottom-2 right-4 flex h-8 w-8 translate-x-1/4 translate-y-1/4 cursor-default items-center justify-center rounded-full bg-foreground shadow-lg ring-4 ring-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white active:opacity-85 md:h-9 md:w-9"
                >
                  <span
                    aria-hidden="true"
                    className="text-checkmark-foreground select-none text-base leading-none"
                  >
                    👋
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                sideOffset={10}
                avoidCollisions={false}
                className="border-transparent bg-foreground text-background"
              >
                <strong>{helloTooltip}</strong>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Info */}
        <div className="animate-slide-up flex-1">
          <div className="accent-bar" />
          <h1 className="mb-3 font-serif text-4xl font-semibold text-foreground md:text-5xl lg:text-6xl">
            {fullName}
          </h1>
          <p className="mb-6 text-xl font-light text-muted-foreground md:text-2xl">
            {copy.hero.role}
          </p>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-secondary-foreground md:text-lg">
            {formatRich(copy.hero.summary, {
              companyName: isVisible("companyName") ? (
                <strong>{copy.hero.companyName}</strong>
              ) : (
                <strong>a software development company</strong>
              ),
            })}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 text-sm md:gap-6">
            {isVisible("email") && (
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                <Mail className="h-4 w-4" />
                {copy.hero.email}
              </a>
            )}
            {isVisible("phone") && (
              <a
                href={telHref}
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                <Phone className="h-4 w-4" />
                {copy.hero.phone}
              </a>
            )}
            {isVisible("location") && (
              <span className="inline-flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {copy.hero.location}
              </span>
            )}
            {isVisible("linkedIn") && (
              <a
                href="https://linkedin.com/in/arammamian"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
              >
                <Linkedin className="h-4 w-4" />
                {copy.hero.linkedInLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
