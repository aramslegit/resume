import { Building2, Calendar } from "lucide-react";
import { useI18n } from "@/i18n";

const ExperienceSection = () => {
  const { copy } = useI18n();
  const experiences = copy.experience.items;

  return (
    <section className="animate-slide-up animate-delay-100">
      <h2 className="section-heading flex items-center gap-2">
        <Building2 className="w-4 h-4" />
        {copy.experience.title}
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="card-elevated relative">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
              <div>
                <h3 className="text-xl font-serif font-semibold text-foreground">
                  {exp.title}
                </h3>
                <p className="text-accent font-medium">{exp.company}</p>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <Calendar className="w-4 h-4" />
                {exp.period}
              </div>
            </div>
            {exp.description && (
              <p className="text-secondary-foreground mb-4">{exp.description}</p>
            )}
            <ul className="space-y-2">
              {exp.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  className="flex items-start gap-3 text-secondary-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
