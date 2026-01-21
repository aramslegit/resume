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

const STORAGE_KEY = "stratae.language";

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

  const value = useMemo<LanguageContextValue>(() => {
    return {
      language,
      setLanguage,
      copy: translations[language],
      format,
      formatRich,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return ctx;
}

