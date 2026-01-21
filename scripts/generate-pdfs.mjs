import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  RESUME_ARCHIVE_PUBLIC_PATH,
  RESUME_LATEST_PUBLIC_PATH,
  getResumeArchiveVariantFilename,
  getResumeVariantFilename,
} from "../src/config/resumeNaming.js";

const DEFAULT_LANGUAGES = ["en", "nl", "fr"];
const DEFAULT_THEMES = ["linear", "classic", "paper", "terminal"];
const DEFAULT_PORT = 4173;

function assertSupportedNode() {
  const major = Number(String(process.versions.node).split(".")[0] ?? "0");
  if (Number.isNaN(major) || major < 18) {
    console.error("\nNode.js 18+ is required to generate resume PDFs.");
    console.error("Please run:\n  nvm use 24\n");
    process.exit(1);
  }
}

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function parseList(value, fallback) {
  if (!value) return fallback;
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function timestampForFilename(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());
  return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
}

function npmCmd() {
  return process.platform === "win32" ? "npm.cmd" : "npm";
}

function run(cmd, args, { cwd, env } = {}) {
  const child = spawn(cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
  return new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command failed: ${cmd} ${args.join(" ")} (exit ${code})`));
    });
  });
}

function spawnLongRunning(cmd, args, { cwd, env } = {}) {
  return spawn(cmd, args, {
    cwd,
    env: { ...process.env, ...env },
    stdio: "inherit",
  });
}

async function waitForHttpOk(url, { timeoutMs = 60_000, intervalMs = 400 } = {}) {
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok) return;
    } catch {
      // ignore
    }
    if (Date.now() - start > timeoutMs) {
      throw new Error(`Timed out waiting for server at ${url}`);
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
}

async function main() {
  const portRaw = getArgValue("--port");
  const port = portRaw ? Number(portRaw) : DEFAULT_PORT;
  const baseUrl = getArgValue("--base-url") ?? `http://127.0.0.1:${port}`;
  const langsRaw = getArgValue("--langs") ?? getArgValue("--languages");
  const languages = parseList(langsRaw, DEFAULT_LANGUAGES);

  const themes = parseList(getArgValue("--theme"), DEFAULT_THEMES);
  const archive = hasFlag("--archive");
  const force = hasFlag("--force");
  const ifMissing = hasFlag("--if-missing");

  const skipBuild = hasFlag("--skip-build");
  const skipPreview = hasFlag("--skip-preview");

  const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptsDir, "..");

  const outLatestDir = path.join(repoRoot, ...RESUME_LATEST_PUBLIC_PATH);
  const outArchiveDir = path.join(repoRoot, ...RESUME_ARCHIVE_PUBLIC_PATH);

  // Optional fast path (used by `npm run dev` via predev).
  // When `--if-missing` is set, only generate if at least one expected PDF is missing.
  if (!archive && ifMissing && !force) {
    const missing = [];
    for (const lang of languages) {
      for (const theme of themes) {
        const p = path.join(outLatestDir, getResumeVariantFilename(lang, theme));
        if (!existsSync(p)) missing.push(path.relative(repoRoot, p));
      }
    }
    if (missing.length === 0) {
      console.log("Resume PDFs already exist. Skipping generation.");
      return;
    }
    console.log("Missing resume PDFs (will generate):");
    for (const p of missing) console.log(`- ${p}`);
  }

  assertSupportedNode();

  await mkdir(outLatestDir, { recursive: true });
  await mkdir(outArchiveDir, { recursive: true });

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch (err) {
    console.error("\nMissing dependency: playwright\n");
    console.error("Install it with:");
    console.error("  npm i -D playwright");
    console.error("  npx playwright install chromium\n");
    throw err;
  }

  if (!skipBuild) {
    await run(npmCmd(), ["run", "build"], { cwd: repoRoot });
  }

  let previewProcess = null;
  if (!skipPreview) {
    previewProcess = spawnLongRunning(
      npmCmd(),
      ["run", "preview", "--", "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
      { cwd: repoRoot },
    );
    previewProcess.on("error", (e) => {
      console.error("Preview process error:", e);
    });
    await waitForHttpOk(`${baseUrl}/`);
  } else {
    await waitForHttpOk(`${baseUrl}/`);
  }

  const ts = timestampForFilename();
  const browser = await chromium.launch();

  try {
    for (const lang of languages) {
      for (const theme of themes) {
        const url = `${baseUrl}/print/resume?lang=${encodeURIComponent(lang)}&theme=${encodeURIComponent(theme)}`;

        const context = await browser.newContext({
          viewport: { width: 1280, height: 720 },
        });
        const page = await context.newPage();

        await page.goto(url, { waitUntil: "networkidle" });
        await page.emulateMedia({ media: "print" });

        // Ensure fonts are ready before rendering PDF.
        await page.waitForFunction(() => {
          // @ts-ignore - fonts exists in browsers, not in TS DOM lib always
          return document.fonts ? document.fonts.status === "loaded" : true;
        });

        const pdf = await page.pdf({
          format: "A4",
          printBackground: true,
          preferCSSPageSize: true,
        });

        if (archive) {
          const archiveName = getResumeArchiveVariantFilename(lang, theme, ts);
          const archivePath = path.join(outArchiveDir, archiveName);
          await writeFile(archivePath, pdf);
          console.log(`Archived:  ${path.relative(repoRoot, archivePath)}`);
        } else {
          const latestName = getResumeVariantFilename(lang, theme);
          const latestPath = path.join(outLatestDir, latestName);
          await writeFile(latestPath, pdf);
          console.log(`Generated: ${path.relative(repoRoot, latestPath)}`);
        }

        await context.close();
      }
    }
  } finally {
    await browser.close();
    if (previewProcess) {
      previewProcess.kill("SIGTERM");
    }
  }
}

process.on("SIGINT", () => {
  process.exit(130);
});

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
