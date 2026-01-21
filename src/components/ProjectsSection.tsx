import { Rocket } from "lucide-react";
import { useI18n } from "@/i18n";

const ProjectsSection = () => {
  const { copy, format } = useI18n();
  const projects = copy.projects.items;

  return (
    <section className="animate-slide-up animate-delay-200">
      <h2 className="section-heading flex items-center gap-2">
        <Rocket className="w-4 h-4" />
        {copy.projects.title}
      </h2>
      <p className="text-secondary-foreground mb-6">
        {copy.projects.intro}
      </p>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div key={index} className="card-elevated group">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
              </div>
            </div>
            <p className="text-secondary-foreground mb-4">{project.description}</p>
            <ul className="space-y-2 mb-5">
              {project.highlights.map((highlight, hIndex) => (
                <li
                  key={hIndex}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                  {highlight}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, techIndex) => (
                <a
                  key={techIndex}
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
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
