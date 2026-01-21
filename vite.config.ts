import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { webcrypto } from "node:crypto";

// Vite uses `crypto.getRandomValues()` in Node during builds.
// Some environments don't provide Web Crypto on `globalThis.crypto`.
if (!globalThis.crypto?.getRandomValues) {
  // @ts-expect-error - Node's webcrypto matches the needed API surface.
  globalThis.crypto = webcrypto;
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
