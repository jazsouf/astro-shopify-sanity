import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } =
  loadEnv(process.env.NODE_ENV, process.cwd(), "");

import svelte from "@astrojs/svelte";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import sanity from "@sanity/astro";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [
    svelte(),
    react(),
    sanity({
      projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
      dataset: PUBLIC_SANITY_STUDIO_DATASET,
      useCdn: true,
      apiVersion: "2025-03-11",
      studioBasePath: "/studio",
      stega: {
        studioUrl: "/studio",
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@sanity/astro"],
    },
  },
});
