import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTheme } from "next-themes";
import profilePhoto from "@/assets/profile-photo.jpeg";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import { useI18n, type Language } from "@/i18n";
import { DEFAULT_THEME, isMode, normalizeThemeName, type Mode, type ThemeName } from "@/config/themes";
import { loadRuntimeThemeConfig } from "@/config/themeConfig";
import { usePaletteTheme } from "@/theme/paletteTheme";

function normalizeLanguage(value: string | null): Language | null {
  if (!value) return null;
  if (value === "en" || value === "nl" || value === "fr") return value;
  return null;
}

function normalizeMode(value: string | null): Mode | null {
  if (!value) return null;
  return isMode(value) ? value : null;
}

const ResumePdf = () => {
  const { language, setLanguage, copy, format, formatRich } = useI18n();
  const [searchParams] = useSearchParams();
  const { theme, setTheme } = useTheme();
  const { setTheme: setPaletteTheme } = usePaletteTheme();

  useEffect(() => {
    let cancelled = false;

    const applyPrintTheme = async () => {
      // Mode: by default keep print-friendly light, but allow `?mode=` override.
      const requestedMode = normalizeMode(searchParams.get("mode"));
      const modeToApply: Mode = requestedMode ?? "light";
      if (theme !== modeToApply) setTheme(modeToApply);

      // Palette theme: follow configured theme, but allow `?theme=` override for generation.
      const fromQuery = searchParams.get("theme");
      const queryTheme: ThemeName | null = normalizeThemeName(fromQuery);
      const configTheme = (await loadRuntimeThemeConfig()).theme;
      const pdfPaletteTheme = queryTheme ?? configTheme ?? DEFAULT_THEME;

      if (!cancelled) setPaletteTheme(pdfPaletteTheme);
    };

    applyPrintTheme();

    return () => {
      cancelled = true;
    };
  }, [searchParams, setPaletteTheme, setTheme, theme]);

  useEffect(() => {
    const requested = normalizeLanguage(searchParams.get("lang"));
    if (requested && requested !== language) {
      setLanguage(requested);
    }
  }, [language, searchParams, setLanguage]);

  return (
    <div className="pdf-root min-h-screen text-foreground">
      <div className="pdf-container mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="pdf-header">
          <div className="flex flex-col items-start gap-8 sm:flex-row">
            <div className="shrink-0">
              <div className="pdf-avatar h-28 w-28 overflow-hidden rounded-full shadow-elevated">
                <img
                  src={profilePhoto}
                  alt={copy.hero.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="accent-bar" />
              <h1 className="pdf-name mb-2 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                {copy.hero.name}
              </h1>
              <p className="pdf-role mb-5 text-xl font-light text-muted-foreground">
                {copy.hero.role}
              </p>
              <p className="pdf-summary mb-6 text-base leading-relaxed text-secondary-foreground">
                {formatRich(copy.hero.summary, {
                  companyName: <strong>{copy.hero.companyName}</strong>,
                })}
              </p>

              <div className="pdf-contact flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <a
                  href={`mailto:${copy.hero.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {copy.hero.email}
                </a>
                <a
                  href={`tel:${copy.hero.phone.replace(/\s+/g, "")}`}
                  className="inline-flex items-center gap-2 text-muted-foreground"
                >
                  <Phone className="h-4 w-4" />
                  {copy.hero.phone}
                </a>
                <span className="inline-flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {copy.hero.location}
                </span>
                <a
                  href="https://linkedin.com/in/arammamian"
                  className="inline-flex items-center gap-2 text-muted-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  {copy.hero.linkedInLabel}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pdf-main space-y-14 bg-transparent mt-12">
          <div className="pdf-section pdf-break-after">
            <ExperienceSection />
          </div>
          <div className="pdf-section pdf-break-after">
            <ProjectsSection />
          </div>
          <div className="pdf-section">
            <SkillsSection />
          </div>
          <div className="pdf-section">
            <EducationSection />
          </div>
        </main>

        <footer className="pdf-footer mt-14 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {format(copy.footer.copyright, {
              year: new Date().getFullYear(),
              name: copy.hero.name,
            })}{" "}
            {copy.footer.availableForOpportunities}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ResumePdf;
