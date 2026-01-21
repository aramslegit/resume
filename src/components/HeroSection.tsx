import profilePhoto from "@/assets/profile-photo.jpeg";
import { Mail, Phone, MapPin, Linkedin, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";
import { getResumeLatestFilename, RESUME_LATEST_URL_DIR } from "@/config/resumeNaming";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { usePaletteTheme } from "@/theme/paletteTheme";
import { useCallback, useMemo, useState } from "react";
import { generateAndDownloadResumePdf } from "@/lib/resumePdfDownload";

const HeroSection = () => {
  const { copy, language, formatRich } = useI18n();
  const resumeFilename = getResumeLatestFilename(language);
  const helloTooltip = copy.hero.helloTooltip;
  const mailtoHref = `mailto:${copy.hero.email}`;
  const telHref = `tel:${copy.hero.phone.replace(/\s+/g, "")}`;
  const [isDownloading, setIsDownloading] = useState(false);
  const { resolvedTheme } = useTheme();
  const { theme: paletteTheme } = usePaletteTheme();

  const effectiveMode = useMemo<"light" | "dark">(() => (resolvedTheme === "dark" ? "dark" : "light"), [resolvedTheme]);

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      await generateAndDownloadResumePdf({
        language,
        paletteTheme,
        mode: effectiveMode,
      });
    } catch {
      // Fallback to the pre-generated PDF.
      const href = `${RESUME_LATEST_URL_DIR}/${resumeFilename}`;
      const a = document.createElement("a");
      a.href = href;
      a.download = resumeFilename;
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setIsDownloading(false);
    }
  }, [effectiveMode, isDownloading, language, paletteTheme, resumeFilename]);

  return (
    <section className="relative pb-12 md:pb-20">
      {/* Header with download, language and theme toggles */}
      <div className="flex justify-end gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
          {isDownloading ? copy.hero.downloadLoading : copy.hero.download}
        </Button>
        <LanguageToggle />
        <ThemeSwitcher />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Profile Photo */}
        <div className="animate-fade-in">
          <div className="relative">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-elevated">
              <img
                src={profilePhoto}
                alt={copy.hero.name}
                className="block w-full h-full object-cover object-[50%_30%] scale-[1.065]"
              />
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={helloTooltip}
                  title={helloTooltip}
                  className="absolute bottom-2 right-4 translate-x-1/4 translate-y-1/4 w-8 h-8 md:w-9 md:h-9 rounded-full bg-foreground flex cursor-default items-center justify-center shadow-lg ring-4 ring-white transition-opacity hover:opacity-90 active:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <span aria-hidden="true" className="text-checkmark-foreground text-base leading-none select-none">
                    👋
                  </span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                sideOffset={10}
                avoidCollisions={false}
                className="bg-foreground text-background border-transparent"
              >
                <strong>{helloTooltip}</strong>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 animate-slide-up">
          <div className="accent-bar" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-3">
            {copy.hero.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light mb-6">
            {copy.hero.role}
          </p>
          <p className="text-base md:text-lg text-secondary-foreground leading-relaxed max-w-2xl mb-8">
            {formatRich(copy.hero.summary, {
              companyName: <strong>{copy.hero.companyName}</strong>,
            })}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm">
            <a
              href={mailtoHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              {copy.hero.email}
            </a>
            <a
              href={telHref}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              {copy.hero.phone}
            </a>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {copy.hero.location}
            </span>
            <a
              href="https://linkedin.com/in/arammamian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              {copy.hero.linkedInLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
