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

function normalizeLanguage(value: string | null): Language | null {
  if (!value) return null;
  if (value === "en" || value === "nl" || value === "fr") return value;
  return null;
}

const ResumePdf = () => {
  const { language, setLanguage, copy, formatRich } = useI18n();
  const [searchParams] = useSearchParams();
  const { setTheme } = useTheme();

  useEffect(() => {
    // Ensure a consistent, print-friendly theme.
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    const requested = normalizeLanguage(searchParams.get("lang"));
    if (requested && requested !== language) {
      setLanguage(requested);
    }
  }, [language, searchParams, setLanguage]);

  return (
    <div className="pdf-root min-h-screen bg-background text-foreground">
      <div className="pdf-container mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="pdf-header mb-14">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0">
              <div className="pdf-avatar w-28 h-28 rounded-full overflow-hidden shadow-elevated">
                <img
                  src={profilePhoto}
                  alt="Aram Mamian"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="accent-bar" />
              <h1 className="pdf-name text-4xl md:text-5xl font-serif font-semibold text-foreground mb-2">
                Aram Mamian
              </h1>
              <p className="pdf-role text-xl text-muted-foreground font-light mb-5">
                {copy.hero.role}
              </p>
              <p className="pdf-summary text-base text-secondary-foreground leading-relaxed mb-6">
                {formatRich(copy.hero.summary, {
                  companyName: <strong>{copy.hero.companyName}</strong>,
                })}
              </p>

              <div className="pdf-contact flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <a
                  href="mailto:aram@stratae.io"
                  className="inline-flex items-center gap-2 text-muted-foreground"
                >
                  <Mail className="w-4 h-4" />
                  aram@stratae.io
                </a>
                <a
                  href="tel:+32473770711"
                  className="inline-flex items-center gap-2 text-muted-foreground"
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
                  className="inline-flex items-center gap-2 text-muted-foreground"
                >
                  <Linkedin className="w-4 h-4" />
                  {copy.hero.linkedInLabel}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="pdf-main space-y-14 bg-transparent">
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

        <footer className="pdf-footer mt-14 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Aram Mamian. {copy.footer.availableForOpportunities}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ResumePdf;

