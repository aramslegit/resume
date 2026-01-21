import type { PrivacyConfig } from "@/i18n/types";

const DEFAULT_PRIVACY_CONFIG: PrivacyConfig = {
  groups: {
    contact: true,
    company: true,
    experienceCompanies: true,
  },
  fields: {
    phone: false, // Hidden by default
    email: true,
    location: true,
    linkedIn: true,
    companyName: true,
    experienceCompanies: true,
  },
};

function readBooleanProp(obj: unknown, key: string): boolean | null {
  if (typeof obj !== "object" || obj === null) return null;
  if (!(key in obj)) return null;
  const value = (obj as Record<string, unknown>)[key];
  return typeof value === "boolean" ? value : null;
}

function readObjectProp(obj: unknown, key: string): Record<string, boolean> | null {
  if (typeof obj !== "object" || obj === null) return null;
  if (!(key in obj)) return null;
  const value = (obj as Record<string, unknown>)[key];
  if (typeof value !== "object" || value === null) return null;
  const result: Record<string, boolean> = {};
  for (const [k, v] of Object.entries(value)) {
    if (typeof v === "boolean") {
      result[k] = v;
    }
  }
  return result;
}

export async function loadPrivacyConfig(): Promise<PrivacyConfig> {
  try {
    // Try to import the config file (will fail if it doesn't exist)
    let config: unknown;
    try {
      // Use dynamic import with ?url to get the file path, then fetch it
      // Since the file is gitignored, this will fail in most cases, which is fine
      const configModule = await import("./privacy-config.json");
      config = configModule.default;
    } catch {
      // File doesn't exist, use defaults
      return DEFAULT_PRIVACY_CONFIG;
    }

    const groupsRaw = readObjectProp(config, "groups");
    const fieldsRaw = readObjectProp(config, "fields");

    return {
      groups: {
        contact: groupsRaw?.contact ?? DEFAULT_PRIVACY_CONFIG.groups.contact,
        company: groupsRaw?.company ?? DEFAULT_PRIVACY_CONFIG.groups.company,
        experienceCompanies:
          groupsRaw?.experienceCompanies ?? DEFAULT_PRIVACY_CONFIG.groups.experienceCompanies,
      },
      fields: {
        phone: fieldsRaw?.phone ?? DEFAULT_PRIVACY_CONFIG.fields.phone,
        email: fieldsRaw?.email ?? DEFAULT_PRIVACY_CONFIG.fields.email,
        location: fieldsRaw?.location ?? DEFAULT_PRIVACY_CONFIG.fields.location,
        linkedIn: fieldsRaw?.linkedIn ?? DEFAULT_PRIVACY_CONFIG.fields.linkedIn,
        companyName: fieldsRaw?.companyName ?? DEFAULT_PRIVACY_CONFIG.fields.companyName,
        experienceCompanies:
          fieldsRaw?.experienceCompanies ?? DEFAULT_PRIVACY_CONFIG.fields.experienceCompanies,
      },
    };
  } catch {
    return DEFAULT_PRIVACY_CONFIG;
  }
}
