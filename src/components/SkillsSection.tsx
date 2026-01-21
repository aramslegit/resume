import { Wrench, Code, Globe } from "lucide-react";
import { useI18n } from "@/i18n";

const SkillsSection = () => {
  const { copy, format } = useI18n();

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
            <a
              key={index}
              className="skill-badge"
              href={`https://www.google.com/search?q=${encodeURIComponent(skill)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={format(copy.a11y.searchGoogleFor, { query: skill })}
            >
              {skill}
            </a>
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
            <a
              key={index}
              className="tech-badge"
              href={`https://www.google.com/search?q=${encodeURIComponent(tech)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={format(copy.a11y.searchGoogleFor, { query: tech })}
            >
              {tech}
            </a>
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
            <div key={index} className="language-card">
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
