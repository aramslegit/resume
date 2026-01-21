import { Wrench, Code, Globe } from "lucide-react";

const coreSkills = [
  "Full-Stack Development",
  "Mobile App Development",
  "Project Management",
  "Team Leadership",
  "Agile Methodologies",
  "Process Automation",
  "Solution Architecture",
  "Technical Mentoring",
  "Product Discovery",
  "Stakeholder Management",
  "Requirements Analysis",
  "RPA Center of Excellence",
];

const technologies = [
  // Frontend
  "JavaScript",
  "TypeScript",
  "React",
  "React Native",
  "Expo",
  "Vue",
  "Nuxt",
  "Svelte",
  "Tailwind CSS",
  "Vuetify",
  // Backend
  "Node.js",
  "NestJS",
  "Hono",
  "tRPC",
  "REST APIs",
  "GraphQL",
  // Databases
  "PostgreSQL",
  "MongoDB",
  "SQL",
  "Supabase",
  // Languages
  "C#",
  "Python",
  "VB.NET",
  // RPA & Automation
  "Blue Prism",
  "UiPath",
  "Power Automate",
  "Retool",
  // Other
  "React Query",
  "i18n",
  "Git",
  "CI/CD",
  "Chrome Extensions",
  "NLP",
];

const languages = [
  { name: "Dutch", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent" },
  { name: "Armenian", level: "Conversational" },
  { name: "German", level: "Basic" },
];

const SkillsSection = () => {
  return (
    <section className="animate-slide-up animate-delay-300 space-y-10">
      {/* Core Skills */}
      <div>
        <h2 className="section-heading flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          Core Competencies
        </h2>
        <div className="flex flex-wrap gap-2">
          {coreSkills.map((skill, index) => (
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
          Technologies & Tools
        </h2>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
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
          Languages
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {languages.map((lang, index) => (
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
