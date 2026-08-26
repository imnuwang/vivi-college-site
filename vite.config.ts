import { cloudflare } from "@cloudflare/vite-plugin";
import { sites } from "@openai/sites-vite-plugin";
import tailwindcss from "@tailwindcss/postcss";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [
    react(),
    sites(),
    cloudflare({
      configPath: path.resolve(import.meta.dirname, "wrangler.jsonc"),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: import.meta.dirname,
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  server: {
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
  },
});
