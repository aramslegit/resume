export type Language = "en" | "nl" | "fr";

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
}

export interface LanguageSkillItem {
  name: string;
  level: string;
}

export interface ResumeCopy {
  a11y: {
    toggleTheme: string;
    switchLanguage: string;
    languageMenuLabel: string;
  };
  hero: {
    download: string;
    role: string;
    companyName: string;
    summary: string;
    linkedInLabel: string;
  };
  experience: {
    title: string;
    items: ExperienceItem[];
  };
  projects: {
    title: string;
    intro: string;
    items: ProjectItem[];
  };
  skills: {
    coreTitle: string;
    technologiesTitle: string;
    languagesTitle: string;
    core: string[];
    technologies: string[];
    languages: LanguageSkillItem[];
  };
  education: {
    title: string;
    items: EducationItem[];
  };
  footer: {
    availableForOpportunities: string;
  };
}

