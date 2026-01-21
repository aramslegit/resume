/**
 * Single source of truth for resume PDF naming/paths.
 *
 * This module is intentionally plain ESM JavaScript so it can be imported by:
 * - the Vite/React frontend (TypeScript)
 * - Node scripts in `scripts/` (ESM)
 */

/** Base file name used for all generated PDFs (without language / timestamp). */
export const RESUME_BASE_NAME = "Aram_Mamian_Resume";

/** Public URL directory where the "latest" PDFs live. */
export const RESUME_LATEST_URL_DIR = "/resume";

/** Output directories (relative to repo root) used by the PDF generator. */
export const RESUME_LATEST_PUBLIC_PATH = ["public", "resume"];
export const RESUME_ARCHIVE_PUBLIC_PATH = ["public", "archive"];

export const RESUME_PDF_EXTENSION = "pdf";

export function getResumeLatestFilename(language) {
  return `${RESUME_BASE_NAME}_${language}.${RESUME_PDF_EXTENSION}`;
}

/**
 * Theme-specific resume filename (light mode only).
 * Example: Aram_Mamian_Resume_en_linear.pdf
 */
export function getResumeVariantFilename(language, theme) {
  return `${RESUME_BASE_NAME}_${language}_${theme}.${RESUME_PDF_EXTENSION}`;
}

export function getResumeArchiveFilename(language, timestamp) {
  return `${RESUME_BASE_NAME}_${language}_${timestamp}.${RESUME_PDF_EXTENSION}`;
}

/**
 * Timestamped archive filename for a theme-specific resume (light mode only).
 * Example: Aram_Mamian_Resume_en_linear_20260121_154201.pdf
 */
export function getResumeArchiveVariantFilename(language, theme, timestamp) {
  return `${RESUME_BASE_NAME}_${language}_${theme}_${timestamp}.${RESUME_PDF_EXTENSION}`;
}

export function getResumeLatestHref(language) {
  return `${RESUME_LATEST_URL_DIR}/${getResumeLatestFilename(language)}`;
}

export function getResumeVariantHref(language, theme) {
  return `${RESUME_LATEST_URL_DIR}/${getResumeVariantFilename(language, theme)}`;
}
