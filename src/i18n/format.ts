import React from "react";

export type FormatValues = Record<string, string | number | boolean | null | undefined>;
export type RichFormatValues = Record<string, React.ReactNode>;

const PLACEHOLDER_RE = /\{([a-zA-Z0-9_]+)\}/g;

export function format(template: string, values: FormatValues = {}): string {
  return template.replace(PLACEHOLDER_RE, (full, key: string) => {
    const value = values[key];
    if (value === null || value === undefined) return full;
    return String(value);
  });
}

export function formatRich(template: string, values: RichFormatValues): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // eslint-disable-next-line no-cond-assign
  while ((match = PLACEHOLDER_RE.exec(template))) {
    const [full, key] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push(template.slice(lastIndex, start));
    }

    const replacement = values[key];
    parts.push(replacement === undefined ? full : replacement);
    lastIndex = start + full.length;
  }

  if (lastIndex < template.length) {
    parts.push(template.slice(lastIndex));
  }

  // Return a keyed array to avoid React "missing key" warnings.
  return parts.map((part, idx) => React.createElement(React.Fragment, { key: idx }, part));
}

