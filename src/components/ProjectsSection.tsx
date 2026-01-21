import { Rocket, ExternalLink } from "lucide-react";

interface Project {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

const projects: Project[] = [
  {
    name: "1Fifty",
    description:
      "An AI-powered business card scanner and contact/relationship manager that transforms scans and shared profiles into enriched, actionable contacts with touchpoints and task tracking.",
    techStack: [
      "Expo",
      "React Native",
      "TypeScript",
      "Hono",
      "tRPC",
      "Supabase",
      "PostgreSQL",
      "React Query",
      "i18n",
      "Deep Links",
    ],
    highlights: [
      "AI-powered business card scanning with OCR accuracy optimization",
      "Relationship management with touchpoint tracking and reminders",
      "Custom native modules for enhanced device integration",
    ],
  },
  {
    name: "Paymen",
    description:
      "A modern platform streamlining invoice management from capture to payment processing, featuring intelligent document parsing and workflow automation.",
    techStack: [
      "Vue 3",
      "Nuxt 3",
      "Vuetify 3",
      "NestJS",
      "REST",
      "GraphQL",
      "MongoDB",
      "Python",
      "Svelte",
    ],
    highlights: [
      "End-to-end invoice lifecycle management from capture to payment",
      "Chromium-based browser extension built with Svelte",
      "Python-powered email backend for automated document ingestion",
      "Led architecture decisions and served as lead full-stack developer",
    ],
  },
  {
    name: "Balas",
    description:
      "A mobile application for private social circles that centralises key social features including messaging, feeds, location sharing, calendar integration, and budget management.",
    techStack: [
      "Expo",
      "React Native",
      "Tailwind",
      "Supabase",
      "GraphQL",
      "MongoDB",
    ],
    highlights: [
      "Real-time messaging and activity feeds for private groups",
      "Integrated location sharing and calendar coordination",
      "Collaborative budget management for group expenses",
      "Recruited and led a team of remote full-stack developers",
    ],
  },
];

const ProjectsSection = () => {
  return (
    <section className="animate-slide-up animate-delay-200">
      <h2 className="section-heading flex items-center gap-2">
        <Rocket className="w-4 h-4" />
        Current Projects
      </h2>
      <p className="text-secondary-foreground mb-6">
        Since 2022, I've been developing digital products—conceptualising initial ideas, 
        defining requirements, collaborating with UI/UX designers, and leading remote development teams.
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
                <span key={techIndex} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
