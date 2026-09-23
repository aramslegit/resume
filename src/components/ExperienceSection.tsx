import { Building2, Calendar } from "lucide-react";
import { useI18n } from "@/i18n";
import { usePrivacy } from "@/hooks/use-privacy";

const BulletList = ({ bullets }: { bullets: string[] }) => (
  <ul className="space-y-2">
    {bullets.map((bullet, bulletIndex) => (
      <li key={bulletIndex} className="flex items-start gap-3 text-secondary-foreground">
        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
        {bullet}
      </li>
    ))}
  </ul>
);

const ExperienceSection = () => {
  const { copy } = useI18n();
  const { isVisible } = usePrivacy();
  const experiences = copy.experience.items;

  return (
    <section className="animate-slide-up animate-delay-100">
      <h2 className="section-heading flex items-center gap-2">
        <Building2 className="h-4 w-4" />
        {copy.experience.title}
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="card-elevated relative">
            <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="font-serif text-xl font-semibold text-foreground">{exp.title}</h3>
                {isVisible("experienceCompanies") && (
                  <p className="font-medium text-accent">{exp.company}</p>
                )}
                <p className="text-sm text-muted-foreground">{exp.location}</p>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {exp.period}
              </div>
            </div>
            {exp.description && <p className="mb-4 text-secondary-foreground">{exp.description}</p>}
            {exp.bullets.length > 0 && <BulletList bullets={exp.bullets} />}
            {exp.roles && exp.roles.length > 0 && (
              <div className="mt-6 space-y-6">
                {exp.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="border-l-2 border-accent/40 pl-4 md:pl-5">
                    <div className="mb-3 flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">{role.title}</h4>
                        {role.organization && isVisible("experienceCompanies") && (
                          <p className="text-sm font-medium text-accent">{role.organization}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        {role.period}
                      </div>
                    </div>
                    {role.description && (
                      <p className="mb-3 text-secondary-foreground">{role.description}</p>
                    )}
                    <BulletList bullets={role.bullets} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
