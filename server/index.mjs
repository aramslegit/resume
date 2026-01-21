import http from "node:http";
import { readFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const distDir = path.join(repoRoot, "dist");
const indexHtmlPath = path.join(distDir, "index.html");

const PORT = Number(process.env.PORT ?? "8080");
const HOST = process.env.HOST ?? "127.0.0.1";

function contentTypeForPath(p) {
  const ext = path.extname(p).toLowerCase();
  switch (ext) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".ico":
      return "image/x-icon";
    case ".webmanifest":
      return "application/manifest+json; charset=utf-8";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

function safeFilename(name) {
  return String(name).replace(/[^a-zA-Z0-9._-]/g, "_");
}

let playwright;
let browserPromise;

async function getBrowser() {
  if (!browserPromise) {
    playwright = playwright ?? (await import("playwright"));
    // Force "new headless" (full Chromium) to match `page.pdf()` output better
    // and to avoid instability seen with `chromium-headless-shell` on some systems.
    browserPromise = playwright.chromium.launch({ headless: true, channel: "chromium" });
  }
  return browserPromise;
}

async function renderResumePdf({ baseUrl, lang, theme, mode }) {
  const browser = await getBrowser();
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();

  try {
    const params = new URLSearchParams();
    if (lang) params.set("lang", lang);
    if (theme) params.set("theme", theme);
    if (mode) params.set("mode", mode);
    params.set("t", String(Date.now()));

    const url = `${baseUrl}/print/resume?${params.toString()}`;

    await page.goto(url, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });

    await page.waitForFunction(() => {
      // @ts-ignore
      return document.fonts ? document.fonts.status === "loaded" : true;
    });

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

    return pdf;
  } finally {
    await context.close();
  }
}

async function handleApiResumePdf(req, res) {
  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
  const lang = url.searchParams.get("lang") ?? "en";
  const theme = url.searchParams.get("theme") ?? "";
  const mode = url.searchParams.get("mode") ?? "";

  // Prefer the request host for correct base URL in real deployments.
  const reqHost = req.headers.host;
  const baseUrl = reqHost ? `http://${reqHost}` : `http://${HOST}:${PORT}`;
  const filename = safeFilename(
    `Aram_Mamian_Resume_${lang}${theme ? `_${theme}` : ""}${mode ? `_${mode}` : ""}.pdf`,
  );

  try {
    const pdf = await renderResumePdf({ baseUrl, lang, theme, mode });
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    });
    res.end(Buffer.from(pdf));
  } catch (err) {
    res.writeHead(500, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(JSON.stringify({ error: "Failed to generate PDF" }));
    console.error(err);
  }
}

async function serveStatic(req, res) {
  if (!existsSync(distDir)) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Missing dist/. Run `npm run build` first.");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);
  const pathname = decodeURIComponent(url.pathname);
  const relPath = pathname.replace(/^\/+/, "");

  // Serve assets directly from dist/ when they exist.
  const candidatePath = path.normalize(path.join(distDir, relPath));
  const distPrefix = distDir.endsWith(path.sep) ? distDir : `${distDir}${path.sep}`;
  const isInDist = candidatePath === distDir || candidatePath.startsWith(distPrefix);
  if (
    pathname !== "/" &&
    isInDist &&
    existsSync(candidatePath) &&
    !candidatePath.endsWith(path.sep)
  ) {
    res.writeHead(200, { "Content-Type": contentTypeForPath(candidatePath) });
    createReadStream(candidatePath).pipe(res);
    return;
  }

  // SPA fallback.
  const html = await readFile(indexHtmlPath);
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      res.writeHead(400);
      return res.end();
    }

    if (req.url.startsWith("/api/resume.pdf")) {
      return await handleApiResumePdf(req, res);
    }

    return await serveStatic(req, res);
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error");
    console.error(err);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
  console.log(`- App:            http://${HOST}:${PORT}/`);
  console.log(
    `- PDF endpoint:   http://${HOST}:${PORT}/api/resume.pdf?lang=en&theme=linear&mode=light`,
  );
});

async function shutdown() {
  try {
    server.close();
  } catch {
    // ignore
  }
  try {
    const b = await browserPromise;
    await b?.close();
  } catch {
    // ignore
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
