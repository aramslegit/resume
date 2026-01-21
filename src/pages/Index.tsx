import HeroSection from "@/components/HeroSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <HeroSection />
        
        <div className="space-y-16 md:space-y-20">
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aram Mamian. Available for new opportunities.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
