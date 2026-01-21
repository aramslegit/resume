import type { ThemeName } from "@/config/themes";
import type { Language } from "@/i18n";
import { THEME_CLASS_BY_THEME } from "@/config/themes";

type EffectiveMode = "light" | "dark";

function buildDynamicResumeFilename(language: Language, paletteTheme: ThemeName, mode: EffectiveMode) {
  // Keep the filename stable + descriptive for users who download multiple variants.
  return `Aram_Mamian_Resume_${language}_${paletteTheme}_${mode}.pdf`;
}

function waitForCondition(fn: () => boolean, { timeoutMs = 15_000 } = {}) {
  const start = Date.now();
  return new Promise<void>((resolve, reject) => {
    const tick = () => {
      try {
        if (fn()) return resolve();
      } catch {
        // ignore transient access errors while iframe is settling
      }
      if (Date.now() - start > timeoutMs) return reject(new Error("Timed out waiting for condition"));
      requestAnimationFrame(tick);
    };
    tick();
  });
}

function waitForSelector(doc: Document, selector: string, { timeoutMs = 15_000 } = {}) {
  const start = Date.now();
  return new Promise<HTMLElement>((resolve, reject) => {
    const tick = () => {
      const el = doc.querySelector(selector) as HTMLElement | null;
      if (el) return resolve(el);
      if (Date.now() - start > timeoutMs) return reject(new Error(`Timed out waiting for ${selector}`));
      requestAnimationFrame(tick);
    };
    tick();
  });
}

async function waitForImagesReady(root: HTMLElement) {
  const imgs = Array.from(root.querySelectorAll("img"));
  if (imgs.length === 0) return;
  await waitForCondition(() => imgs.every((img) => img.complete), { timeoutMs: 15_000 });
}

async function waitForFonts(win: Window) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fonts = (win.document as any).fonts as { ready?: Promise<unknown> } | undefined;
    await fonts?.ready;
  } catch {
    // ignore
  }
}

async function createHiddenIframe(url: string): Promise<HTMLIFrameElement> {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.left = "0";
  iframe.style.top = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  iframe.style.border = "0";

  const loaded = new Promise<void>((resolve, reject) => {
    iframe.onload = () => resolve();
    iframe.onerror = () => reject(new Error("Failed to load PDF iframe"));
  });

  iframe.src = url;
  document.body.appendChild(iframe);
  await loaded;
  return iframe;
}

export async function generateAndDownloadResumePdf(opts: {
  language: Language;
  paletteTheme: ThemeName;
  mode: EffectiveMode;
}) {
  const { language, paletteTheme, mode } = opts;

  const params = new URLSearchParams({
    lang: language,
    theme: paletteTheme,
    mode,
    export: "1",
    t: String(Date.now()),
  });

  const url = `/print/resume?${params.toString()}`;
  const iframe = await createHiddenIframe(url);

  try {
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) throw new Error("PDF iframe not ready");

    const themeClass = THEME_CLASS_BY_THEME[paletteTheme];
    await waitForCondition(() => {
      const cls = doc.documentElement.classList;
      const paletteOk = cls.contains(themeClass);
      const modeOk = mode === "dark" ? cls.contains("dark") : !cls.contains("dark");
      return paletteOk && modeOk;
    });

    await waitForFonts(win);
    const pdfRoot = await waitForSelector(doc, ".pdf-root");
    await waitForImagesReady(pdfRoot);

    // Lazy-load only when needed (keeps main bundle smaller).
    const mod = await import("html2pdf.js");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const html2pdf: any = (mod as any).default ?? mod;

    const filename = buildDynamicResumeFilename(language, paletteTheme, mode);

    await html2pdf()
      .set({
        filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], after: ".pdf-break-after" },
      })
      .from(pdfRoot)
      .save();
  } finally {
    iframe.remove();
  }
}

