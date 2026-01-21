import { GraduationCap, Calendar } from "lucide-react";
import { useI18n } from "@/i18n";

const EducationSection = () => {
  const { copy } = useI18n();
  const education = copy.education.items;

  return (
    <section className="animate-slide-up animate-delay-400">
      <h2 className="section-heading flex items-center gap-2">
        <GraduationCap className="w-4 h-4" />
        {copy.education.title}
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {education.map((edu, index) => (
          <div key={index} className="card-elevated">
            <h3 className="text-lg font-serif font-semibold text-foreground">
              {edu.degree}
            </h3>
            <p className="text-accent font-medium mb-1">{edu.field}</p>
            <p className="text-secondary-foreground">{edu.institution}</p>
            <p className="text-sm text-muted-foreground mb-3">{edu.location}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {edu.period}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
