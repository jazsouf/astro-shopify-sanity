import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { PUBLIC_SANITY_STUDIO_PROJECT_ID, PUBLIC_SANITY_STUDIO_DATASET } =
  loadEnv(process.env.NODE_ENV, process.cwd(), "");

import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    svelte(),
    react(),
    sanity({
      projectId: PUBLIC_SANITY_STUDIO_PROJECT_ID,
      dataset: PUBLIC_SANITY_STUDIO_DATASET,
      useCdn: true,
      apiVersion: "2025-03-11",
      studioBasePath: "/admin",
      stega: {
        studioUrl: "/admin",
      },
    }),
  ],
});
