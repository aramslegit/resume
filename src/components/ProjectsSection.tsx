import { Rocket } from "lucide-react";
import { useI18n } from "@/i18n";

const ProjectsSection = () => {
  const { copy, format } = useI18n();
  const projects = copy.projects.items;

  return (
    <section className="animate-slide-up animate-delay-200">
      <h2 className="section-heading flex items-center gap-2">
        <Rocket className="h-4 w-4" />
        {copy.projects.title}
      </h2>
      <p className="mb-6 text-secondary-foreground">{copy.projects.intro}</p>
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <div key={index} className="card-elevated group">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.name}
                </h3>
              </div>
            </div>
            <p className="mb-4 text-secondary-foreground">{project.description}</p>
            <ul className="mb-5 space-y-2">
              {project.highlights.map((highlight, hIndex) => (
                <li key={hIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
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
