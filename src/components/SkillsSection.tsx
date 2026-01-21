import { Wrench, Code, Globe } from "lucide-react";
import { useI18n } from "@/i18n";

const SkillsSection = () => {
  const { copy } = useI18n();

  return (
    <section className="animate-slide-up animate-delay-300 space-y-10">
      {/* Core Skills */}
      <div>
        <h2 className="section-heading flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          {copy.skills.coreTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          {copy.skills.core.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div>
        <h2 className="section-heading flex items-center gap-2">
          <Code className="w-4 h-4" />
          {copy.skills.technologiesTitle}
        </h2>
        <div className="flex flex-wrap gap-2">
          {copy.skills.technologies.map((tech, index) => (
            <span key={index} className="tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <h2 className="section-heading flex items-center gap-2">
          <Globe className="w-4 h-4" />
          {copy.skills.languagesTitle}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {copy.skills.languages.map((lang, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-secondary/30">
              <p className="font-medium text-foreground">{lang.name}</p>
              <p className="text-sm text-muted-foreground">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
