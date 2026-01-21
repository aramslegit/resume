import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import ScrollReveal from "@/components/ScrollReveal";
import { useI18n } from "@/i18n";

const Index = () => {
  const { copy, format } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
        <ScrollReveal>
          <HeroSection />
        </ScrollReveal>

        <div className="space-y-16 md:space-y-20">
          <ScrollReveal delay={0.1}>
            <ExperienceSection />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <ProjectsSection />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SkillsSection />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <EducationSection />
          </ScrollReveal>
        </div>

        {/* Footer */}
        <ScrollReveal delay={0.1}>
          <footer className="mt-20 border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              {format(copy.footer.copyright, {
                year: new Date().getFullYear(),
                name: `${copy.hero.firstName} ${copy.hero.lastName}`,
              })}{" "}
              {copy.footer.availableForOpportunities}
            </p>
          </footer>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Index;
