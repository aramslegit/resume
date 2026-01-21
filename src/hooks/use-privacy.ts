import { useEffect, useState } from "react";
import { loadPrivacyConfig } from "@/config/privacyConfig";
import type { PrivacyGroup, PrivacyField, PrivacyConfig } from "@/i18n/types";

const DEFAULT_PRIVACY_CONFIG: PrivacyConfig = {
  groups: {
    contact: true,
    company: true,
    experienceCompanies: true,
  },
  fields: {
    phone: false,
    email: true,
    location: true,
    linkedIn: true,
    companyName: true,
    experienceCompanies: true,
  },
};

// Field to group mapping
const FIELD_TO_GROUP: Record<PrivacyField, PrivacyGroup | null> = {
  phone: "contact",
  email: "contact",
  location: "contact",
  linkedIn: "contact",
  companyName: "company",
  experienceCompanies: "experienceCompanies",
};

export function usePrivacy() {
  const [config, setConfig] = useState(() => DEFAULT_PRIVACY_CONFIG);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadPrivacyConfig().then((loadedConfig) => {
      if (!cancelled) {
        setConfig(loadedConfig);
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isVisible = (groupOrField: PrivacyGroup | PrivacyField): boolean => {
    // If it's a field, check field first, then fall back to group
    if (groupOrField in FIELD_TO_GROUP) {
      const field = groupOrField as PrivacyField;
      const group = FIELD_TO_GROUP[field];

      // If field has explicit setting, use it
      if (field in config.fields) {
        return config.fields[field];
      }

      // Otherwise, check parent group
      if (group && group in config.groups) {
        return config.groups[group];
      }
    }

    // If it's a group, check group setting
    if (groupOrField in config.groups) {
      return config.groups[groupOrField as PrivacyGroup];
    }

    // Default to visible if not found
    return true;
  };

  return { isVisible, isLoading, config };
}
