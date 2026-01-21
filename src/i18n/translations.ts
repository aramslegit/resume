import type { Language, ResumeCopy } from "./types";

export const translations: Record<Language, ResumeCopy> = {
  en: {
    a11y: {
      toggleTheme: "Toggle theme",
      switchLanguage: "Switch language",
      languageMenuLabel: "Language",
    },
    hero: {
      download: "Download",
      role: "Hybrid IT Professional",
      companyName: "Stratae",
      summary:
        "Full-stack development expertise blended with strategic project leadership and business analysis. Equally comfortable architecting applications, conducting functional analysis, or steering multi-team projects from concept to launch. Founded {companyName} in 2020—a software development, project management, and delivery company—where I lead a dynamic team of developers and analysts on digital product initiatives.",
      linkedInLabel: "LinkedIn",
    },
    experience: {
      title: "Experience",
      items: [
        {
          title: "Founder & Lead Developer",
          company: "Stratae",
          location: "Louvain-la-Neuve",
          period: "February 2020 — Present",
          description:
            "Founded a software development and project management company. Lead a dynamic team of developers and analysts, overseeing project delivery, resource allocation, and professional growth. From 2020 to 2024, led the Automation practice at Partena Professional.",
          bullets: [
            "Manage and mentor a team of developers and analysts, fostering collaboration and ensuring high-quality deliverables",
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
      ],
    },
    projects: {
      title: "Current Projects",
      intro:
        "Since 2022, through Stratae, I've been developing digital products end-to-end—from product discovery and requirements gathering to functional analysis, UI/UX collaboration, and full-stack development. I manage a dynamic team of remote developers and analysts, applying project management best practices to deliver high-quality solutions.",
      items: [
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
      ],
    },
    skills: {
      coreTitle: "Core Competencies",
      technologiesTitle: "Technologies & Tools",
      languagesTitle: "Languages",
      core: [
        "Full-Stack Development",
        "Mobile App Development",
        "Project Management",
        "Business Analysis",
        "Functional Analysis",
        "Team Leadership",
        "Resource Management",
        "Agile Methodologies",
        "Process Automation",
        "Solution Architecture",
        "Technical Mentoring",
        "Product Discovery",
        "Stakeholder Management",
        "Requirements Gathering",
        "RPA Center of Excellence",
        "Cross-functional Collaboration",
      ],
      technologies: [
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
      ],
      languages: [
        { name: "Dutch", level: "Native" },
        { name: "English", level: "Fluent" },
        { name: "French", level: "Professional" },
        { name: "Armenian", level: "Fluent" },
        { name: "German", level: "Basic" },
      ],
    },
    education: {
      title: "Education",
      items: [
        {
          degree: "Master of Science (MSc)",
          field: "Business Engineering",
          institution: "KU Leuven",
          location: "Leuven",
          period: "October 2014 — January 2017",
        },
        {
          degree: "Bachelor of Science (BSc)",
          field: "Business Engineering",
          institution: "KU Leuven",
          location: "Leuven",
          period: "October 2010 — September 2014",
        },
      ],
    },
    footer: {
      availableForOpportunities: "Available for new opportunities.",
    },
  },

  nl: {
    a11y: {
      toggleTheme: "Thema wisselen",
      switchLanguage: "Taal wisselen",
      languageMenuLabel: "Taal",
    },
    hero: {
      download: "Download",
      role: "Hybride IT-professional",
      companyName: "Stratae",
      summary:
        "Full-stack development expertise gecombineerd met strategisch projectleiderschap en businessanalyse. Even comfortabel met het ontwerpen van applicaties, het uitvoeren van functionele analyse of het aansturen van multi-team projecten van concept tot lancering. In 2020 richtte ik {companyName} op—een bedrijf voor softwareontwikkeling, projectmanagement en delivery—waar ik een dynamisch team van developers en analysts leid op digitale productinitiatieven.",
      linkedInLabel: "LinkedIn",
    },
    experience: {
      title: "Ervaring",
      items: [
        {
          title: "Founder & Lead Developer",
          company: "Stratae",
          location: "Louvain-la-Neuve",
          period: "Februari 2020 — Heden",
          description:
            "Oprichter van een softwareontwikkelings- en projectmanagementbedrijf. Ik leid een dynamisch team van developers en analysts en stuur project delivery, resource-allocatie en professionele groei aan. Van 2020 tot 2024 leidde ik de Automation-practice bij Partena Professional.",
          bullets: [
            "Aansturen en coachen van een team van developers en analysts, met focus op samenwerking en kwalitatieve oplevering",
            "RPA discovery, delivery en operations opgezet met Blue Prism, met 60%+ reductie in manuele verwerkingstijd",
            "Custom applicaties en scripts ontwikkeld in C#, VB en Python voor enterprise automation",
            "Low-code oplossingen gebouwd met Retool en Power Automate, waardoor interne tooling sneller geleverd werd",
            "Chatbot-oplossingen geïmplementeerd (Inbenta, Crisp, Intercom) met betere responstijden voor klanten",
            "Complexe SQL-queries gemaakt voor meerdere teams en stakeholders",
            "Bedrijfsbrede productdocumentatie opgezet voor betere knowledge sharing",
          ],
        },
        {
          title: "Automation Project Manager",
          company: "BrightKnight (Belfius Studio)",
          location: "Brussel",
          period: "Januari 2019 — Januari 2020",
          bullets: [
            "Volledige RPA Center of Excellence geleid voor Partena Professional",
            "Rechtstreeks samengewerkt met interne budget- en product owners over business units heen",
            "Bijgedragen aan sales-initiatieven met prospecten",
            "Project managers en consultants gecoacht rond delivery excellence en technische best practices",
          ],
        },
        {
          title: "Technology Consultant",
          company: "Accenture",
          location: "Brussel",
          period: "Mei 2017 — Januari 2019",
          bullets: [
            "End-to-end NLP-projecten (Natural Language Processing) geleverd voor Belfius",
            "RPA-oplossingen geïmplementeerd op enterprise schaal",
            "Technische oplossingen vertaald naar business requirements met meerdere stakeholders",
          ],
        },
      ],
    },
    projects: {
      title: "Huidige projecten",
      intro:
        "Sinds 2022 ontwikkel ik via Stratae digitale producten end-to-end—van product discovery en requirements gathering tot functionele analyse, samenwerking met UI/UX en full-stack development. Ik manage een dynamisch team van remote developers en analysts en pas projectmanagement best practices toe om kwaliteitsvolle oplossingen te leveren.",
      items: [
        {
          name: "1Fifty",
          description:
            "Een AI-gedreven businesscard-scanner en contact/relatiebeheerder die scans en gedeelde profielen omzet naar verrijkte, actiegerichte contacten met touchpoints en taakopvolging.",
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
            "AI-gedreven businesscard scanning met OCR-accuracy optimalisatie",
            "Relatiebeheer met touchpoint tracking en reminders",
            "Custom native modules voor betere device-integratie",
          ],
        },
        {
          name: "Paymen",
          description:
            "Een modern platform dat factuurbeheer stroomlijnt van capture tot betalingsverwerking, met slimme document parsing en workflow automation.",
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
            "End-to-end factuurlifecycle: van capture tot betaling",
            "Chromium-based browser extension gebouwd met Svelte",
            "Python-powered email backend voor geautomatiseerde document ingestion",
            "Architectuurkeuzes geleid en opgetreden als lead full-stack developer",
          ],
        },
        {
          name: "Balas",
          description:
            "Een mobiele applicatie voor private social circles die kernfunctionaliteiten centraliseert zoals messaging, feeds, location sharing, calendar integratie en budgetbeheer.",
          techStack: [
            "Expo",
            "React Native",
            "Tailwind",
            "Supabase",
            "GraphQL",
            "MongoDB",
          ],
          highlights: [
            "Real-time messaging en activity feeds voor private groepen",
            "Integratie van location sharing en kalendercoördinatie",
            "Collaborative budget management voor groepsuitgaven",
            "Een remote team van full-stack developers gerekruteerd en geleid",
          ],
        },
      ],
    },
    skills: {
      coreTitle: "Kerncompetenties",
      technologiesTitle: "Technologieën & tools",
      languagesTitle: "Talen",
      core: [
        "Full-stack development",
        "Mobiele app development",
        "Projectmanagement",
        "Businessanalyse",
        "Functionele analyse",
        "Team leadership",
        "Resource management",
        "Agile methodologieën",
        "Procesautomatisatie",
        "Solution architecture",
        "Technische mentoring",
        "Product discovery",
        "Stakeholder management",
        "Requirements gathering",
        "RPA Center of Excellence",
        "Cross-functionele samenwerking",
      ],
      technologies: [
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
      ],
      languages: [
        { name: "Nederlands", level: "Moedertaal" },
        { name: "Engels", level: "Vloeiend" },
        { name: "Frans", level: "Professioneel" },
        { name: "Armeens", level: "Vloeiend" },
        { name: "Duits", level: "Basis" },
      ],
    },
    education: {
      title: "Opleiding",
      items: [
        {
          degree: "Master of Science (MSc)",
          field: "Handelsingenieur (Business Engineering)",
          institution: "KU Leuven",
          location: "Leuven",
          period: "Oktober 2014 — Januari 2017",
        },
        {
          degree: "Bachelor of Science (BSc)",
          field: "Handelsingenieur (Business Engineering)",
          institution: "KU Leuven",
          location: "Leuven",
          period: "Oktober 2010 — September 2014",
        },
      ],
    },
    footer: {
      availableForOpportunities: "Beschikbaar voor nieuwe opportuniteiten.",
    },
  },

  fr: {
    a11y: {
      toggleTheme: "Basculer le thème",
      switchLanguage: "Changer de langue",
      languageMenuLabel: "Langue",
    },
    hero: {
      download: "Télécharger",
      role: "Professionnel IT hybride",
      companyName: "Stratae",
      summary:
        "Expertise en développement full-stack, combinée à la gestion stratégique de projets et à l’analyse métier. À l’aise aussi bien pour concevoir l’architecture d’applications, mener l’analyse fonctionnelle ou piloter des projets multi-équipes de l’idée au lancement. J’ai fondé {companyName} en 2020—une société de développement logiciel, de gestion de projet et de delivery—où je dirige une équipe dynamique de développeurs et d’analystes sur des initiatives de produits digitaux.",
      linkedInLabel: "LinkedIn",
    },
    experience: {
      title: "Expérience",
      items: [
        {
          title: "Founder & Lead Developer",
          company: "Stratae",
          location: "Louvain-la-Neuve",
          period: "Février 2020 — Présent",
          description:
            "Fondateur d’une société de développement logiciel et de gestion de projets. Je dirige une équipe dynamique de développeurs et d’analystes, en supervisant la delivery, l’allocation des ressources et la croissance professionnelle. De 2020 à 2024, j’ai dirigé la practice Automation chez Partena Professional.",
          bullets: [
            "Manager et coacher une équipe de développeurs et d’analystes, en favorisant la collaboration et des livrables de haute qualité",
            "Piloter la discovery, la delivery et les opérations RPA avec Blue Prism, réduisant le temps de traitement manuel de 60%+",
            "Développer des applications et scripts sur mesure en C#, VB et Python pour l’automatisation en entreprise",
            "Créer des solutions low-code avec Retool et Power Automate, accélérant la livraison d’outils internes",
            "Mettre en place des solutions chatbot (Inbenta, Crisp, Intercom) améliorant les temps de réponse client",
            "Réaliser des requêtes SQL complexes au service de plusieurs équipes et parties prenantes",
            "Mettre en place une documentation produit à l’échelle de l’entreprise pour améliorer le partage de connaissances",
          ],
        },
        {
          title: "Automation Project Manager",
          company: "BrightKnight (Belfius Studio)",
          location: "Bruxelles",
          period: "Janvier 2019 — Janvier 2020",
          bullets: [
            "Diriger le RPA Center of Excellence complet pour Partena Professional",
            "Collaborer directement avec les responsables budget et product owners internes sur plusieurs business units",
            "Participer à des initiatives commerciales avec des prospects",
            "Coacher des chefs de projet et consultants sur l’excellence de delivery et les meilleures pratiques techniques",
          ],
        },
        {
          title: "Technology Consultant",
          company: "Accenture",
          location: "Bruxelles",
          period: "Mai 2017 — Janvier 2019",
          bullets: [
            "Livrer des projets NLP (Natural Language Processing) de bout en bout pour Belfius",
            "Implémenter des solutions RPA à l’échelle entreprise",
            "Faire le lien entre solutions techniques et besoins métiers avec de multiples parties prenantes",
          ],
        },
      ],
    },
    projects: {
      title: "Projets actuels",
      intro:
        "Depuis 2022, via Stratae, je développe des produits digitaux de bout en bout—de la découverte produit et la collecte des besoins à l’analyse fonctionnelle, la collaboration UI/UX et le développement full-stack. Je manage une équipe dynamique de développeurs et d’analystes à distance, en appliquant les meilleures pratiques de gestion de projet pour livrer des solutions de haute qualité.",
      items: [
        {
          name: "1Fifty",
          description:
            "Un scanner de cartes de visite dopé à l’IA et un gestionnaire de contacts/relations qui transforme des scans et profils partagés en contacts enrichis et actionnables, avec suivi des interactions et des tâches.",
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
            "Scan de cartes de visite assisté par IA avec optimisation de la précision OCR",
            "Gestion de relations avec suivi des touchpoints et rappels",
            "Modules natifs sur mesure pour une meilleure intégration device",
          ],
        },
        {
          name: "Paymen",
          description:
            "Une plateforme moderne qui simplifie la gestion des factures, de la capture au traitement des paiements, avec parsing intelligent de documents et automatisation de workflows.",
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
            "Gestion du cycle de vie des factures de la capture au paiement",
            "Extension navigateur basée sur Chromium construite avec Svelte",
            "Backend email en Python pour l’ingestion automatisée de documents",
            "Pilotage des décisions d’architecture et rôle de lead full-stack developer",
          ],
        },
        {
          name: "Balas",
          description:
            "Une application mobile pour cercles sociaux privés qui centralise des fonctionnalités clés comme la messagerie, les feeds, le partage de localisation, l’intégration calendrier et la gestion de budget.",
          techStack: [
            "Expo",
            "React Native",
            "Tailwind",
            "Supabase",
            "GraphQL",
            "MongoDB",
          ],
          highlights: [
            "Messagerie en temps réel et activity feeds pour des groupes privés",
            "Partage de localisation et coordination via calendrier intégrés",
            "Gestion collaborative de budget pour les dépenses de groupe",
            "Recrutement et management d’une équipe remote de développeurs full-stack",
          ],
        },
      ],
    },
    skills: {
      coreTitle: "Compétences clés",
      technologiesTitle: "Technologies & outils",
      languagesTitle: "Langues",
      core: [
        "Développement full-stack",
        "Développement d’applications mobiles",
        "Gestion de projet",
        "Analyse métier",
        "Analyse fonctionnelle",
        "Leadership d’équipe",
        "Gestion des ressources",
        "Méthodologies Agile",
        "Automatisation des processus",
        "Architecture de solutions",
        "Mentorat technique",
        "Découverte produit",
        "Gestion des parties prenantes",
        "Collecte des besoins",
        "RPA Center of Excellence",
        "Collaboration cross-fonctionnelle",
      ],
      technologies: [
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
      ],
      languages: [
        { name: "Néerlandais", level: "Langue maternelle" },
        { name: "Anglais", level: "Courant" },
        { name: "Français", level: "Professionnel" },
        { name: "Arménien", level: "Courant" },
        { name: "Allemand", level: "Notions" },
      ],
    },
    education: {
      title: "Formation",
      items: [
        {
          degree: "Master of Science (MSc)",
          field: "Ingénieur de gestion (Business Engineering)",
          institution: "KU Leuven",
          location: "Louvain",
          period: "Octobre 2014 — Janvier 2017",
        },
        {
          degree: "Bachelor of Science (BSc)",
          field: "Ingénieur de gestion (Business Engineering)",
          institution: "KU Leuven",
          location: "Louvain",
          period: "Octobre 2010 — Septembre 2014",
        },
      ],
    },
    footer: {
      availableForOpportunities: "Disponible pour de nouvelles opportunités.",
    },
  },
};

