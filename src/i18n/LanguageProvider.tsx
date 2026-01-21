import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Language, ResumeCopy } from "./types";
import { translations } from "./translations";
import { format, formatRich } from "./format";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: ResumeCopy;
  format: typeof format;
  formatRich: typeof formatRich;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "resume.language";

function normalizeLanguage(value: string | null): Language | null {
  if (!value) return null;
  if (value === "en" || value === "nl" || value === "fr") return value;
  return null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const urlLanguage = normalizeLanguage(
        new URLSearchParams(window.location.search).get("lang"),
      );
      if (urlLanguage) return urlLanguage;
      const stored = normalizeLanguage(localStorage.getItem(STORAGE_KEY));
      return stored ?? "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore (e.g., storage disabled)
    }
  }, [language]);

  const copy = translations[language];

  // Keep document metadata in sync with language.
  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {
      // ignore
    }

    const fullName = `${copy.hero.firstName} ${copy.hero.lastName}`;
    const values = { name: fullName, role: copy.hero.role };
    const title = format(copy.meta.title, values);
    const ogTitle = format(copy.meta.ogTitle, values);
    const author = format(copy.meta.author, { name: fullName });

    try {
      document.title = title;
    } catch {
      // ignore
    }

    const setMeta = (attr: "name" | "property", key: string, content: string) => {
      const el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) el.setAttribute("content", content);
    };

    setMeta("name", "description", copy.meta.description);
    setMeta("name", "author", author);
    setMeta("property", "og:title", ogTitle);
    setMeta("property", "og:description", copy.meta.ogDescription);
  }, [language, copy]);

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      copy,
      format,
      formatRich,
    };
  }, [copy, language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return ctx;
}
