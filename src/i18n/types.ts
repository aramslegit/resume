export type Language = "en" | "nl" | "fr";

export interface ExperienceRole {
  title: string;
  organization?: string;
  period: string;
  description?: string;
  bullets: string[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description?: string;
  bullets: string[];
  roles?: ExperienceRole[];
}

export interface ProjectItem {
  name: string;
  url?: string;
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

export type PrivacyGroup = "contact" | "company" | "experienceCompanies";
export type PrivacyField =
  | "phone"
  | "email"
  | "location"
  | "linkedIn"
  | "companyName"
  | "experienceCompanies";

export interface PrivacyConfig {
  groups: Record<PrivacyGroup, boolean>;
  fields: Record<PrivacyField, boolean>;
}

export interface ResumeCopy {
  a11y: {
    toggleTheme: string;
    switchLanguage: string;
    languageMenuLabel: string;
    searchGoogleFor: string;
  };
  languageMenu: {
    languages: Record<Language, { short: string; name: string; nativeName: string }>;
  };
  themeMenu: {
    paletteLabel: string;
    modeLabel: string;
    themes: {
      linear: { label: string; description: string };
      classic: { label: string; description: string };
      paper: { label: string; description: string };
      terminal: { label: string; description: string };
    };
    modes: {
      light: { label: string; hint: string };
      dark: { label: string; hint: string };
      system: { label: string; hint: string };
    };
  };
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    author: string;
  };
  notFound: {
    message: string;
    returnHome: string;
  };
  ui: {
    common: {
      close: string;
    };
    sidebar: {
      toggle: string;
    };
    breadcrumb: {
      label: string;
      more: string;
    };
    pagination: {
      label: string;
      previous: string;
      next: string;
      morePages: string;
      goToPreviousPage: string;
      goToNextPage: string;
    };
    carousel: {
      roleDescription: string;
      slideRoleDescription: string;
      previousSlide: string;
      nextSlide: string;
    };
  };
  hero: {
    firstName: string;
    lastName: string;
    download: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    companyName: string;
    companyFallback: string;
    summary: string;
    linkedInLabel: string;
    helloTooltip: string;
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
    copyright: string;
    availableForOpportunities: string;
  };
  errorBoundary?: {
    title: string;
    message: string;
    reload: string;
  };
}
