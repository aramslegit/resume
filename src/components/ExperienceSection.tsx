import { Building2, Calendar } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    title: "Founder & Lead Developer",
    company: "Stratae",
    location: "Louvain-la-Neuve",
    period: "February 2020 — Present",
    description:
      "Founded a software development and project management company. Lead a dynamic team of developers and analysts, overseeing project delivery, resource allocation, and professional growth. From 2020 to 2024, led the Automation practice at Partena Professional.",
    bullets: [
      "Manage and mentor a distributed team of developers and analysts, fostering collaboration and ensuring high-quality deliverables",
      "Drove RPA discovery, delivery, and operations using Blue Prism, reducing manual processing time by 60%+",
      "Developed custom applications and scripts in C#, VB, and Python for enterprise automation",
      "Built low-code solutions with Retool and Power Automate, accelerating internal tool delivery",
      "Implemented chatbot solutions (Inbenta, Crisp, Intercom) improving customer response times",
      "Created complex SQL queries serving multiple teams and stakeholders",
      "Established company-wide product documentation systems improving knowledge sharing",
    ],
  },
  {
    title: "Automation Project Manager",
    company: "BrightKnight (Belfius Studio)",
    location: "Brussels",
    period: "January 2019 — January 2020",
    bullets: [
      "Led the complete RPA Center of Excellence for Partena Professional",
      "Collaborated directly with internal budget and product owners across business units",
      "Engaged in sales initiatives with prospective clients",
      "Mentored project managers and consultants on delivery excellence and technical best practices",
    ],
  },
  {
    title: "Technology Consultant",
    company: "Accenture",
    location: "Brussels",
    period: "May 2017 — January 2019",
    bullets: [
      "Delivered end-to-end Natural Language Processing (NLP) projects for Belfius bank",
      "Implemented Robotic Process Automation (RPA) solutions at enterprise scale",
      "Bridged technical solutions with business requirements across multiple stakeholders",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section className="animate-slide-up animate-delay-100">
      <h2 className="section-heading flex items-center gap-2">
        <Building2 className="w-4 h-4" />
        Experience
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
