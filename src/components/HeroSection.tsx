import profilePhoto from "@/assets/profile-photo.jpeg";
import { Mail, Phone, MapPin, Linkedin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";
import { getResumeLatestFilename, RESUME_LATEST_URL_DIR } from "@/config/resumeNaming";

const HeroSection = () => {
  const { copy, language, formatRich } = useI18n();
  const resumeFilename = getResumeLatestFilename(language);

  return (
    <section className="relative pb-12 md:pb-20">
      {/* Header with download, language and theme toggles */}
      <div className="flex justify-end gap-2 mb-6">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="gap-2"
        >
          <a
            href={`${RESUME_LATEST_URL_DIR}/${resumeFilename}`}
            download={resumeFilename}
          >
            <Download className="w-4 h-4" />
            {copy.hero.download}
          </a>
        </Button>
        <LanguageToggle />
        <ThemeToggle />
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Profile Photo */}
        <div className="animate-fade-in">
          <div className="relative">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-elevated">
              <img
                src={profilePhoto}
                alt="Aram Mamian"
                className="block w-full h-full object-cover object-[50%_30%] scale-[1.065]"
              />
            </div>
            <div className="absolute bottom-2 right-4 translate-x-1/4 translate-y-1/4 w-8 h-8 md:w-9 md:h-9 rounded-full bg-accent flex items-center justify-center shadow-lg ring-4 ring-background">
              <span className="text-checkmark-foreground text-sm">✓</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 animate-slide-up">
          <div className="accent-bar" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground mb-3">
            Aram Mamian
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
              href="mailto:aram@stratae.io"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              aram@stratae.io
            </a>
            <a
              href="tel:+32473770711"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4" />
              +32 473 77 07 11
            </a>
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Mechelen, Belgium
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
