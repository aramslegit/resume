import { GraduationCap, Calendar } from "lucide-react";
import { useI18n } from "@/i18n";

const EducationSection = () => {
  const { copy } = useI18n();
  const education = copy.education.items;

  return (
    <section className="animate-slide-up animate-delay-400">
      <h2 className="section-heading flex items-center gap-2">
        <GraduationCap className="h-4 w-4" />
        {copy.education.title}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((edu, index) => (
          <div key={index} className="card-elevated">
            <h3 className="font-serif text-lg font-semibold text-foreground">{edu.degree}</h3>
            <p className="mb-1 font-medium text-accent">{edu.field}</p>
            <p className="text-secondary-foreground">{edu.institution}</p>
            <p className="mb-3 text-sm text-muted-foreground">{edu.location}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {edu.period}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
