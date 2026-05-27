// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// On Vercel we don't want the @cloudflare/vite-plugin (it produces a Worker
// bundle that Vercel can't serve). Vercel sets VERCEL=1 during builds, so we
// disable the Cloudflare plugin there and let TanStack Start emit a plain
// Node-compatible SSR bundle into dist/server/, which our api/index.mjs
// serverless function then wraps. See docs/vercel-deployment.md.
const isVercel = process.env.VERCEL === "1" || !!process.env.VERCEL_ENV;

export default defineConfig({
  ...(isVercel ? { cloudflare: false as const } : {}),
  tanstackStart: {
    server: { entry: "server" },
  },
});
