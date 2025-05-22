import { defineConfig, isDev } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema-types";

import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";

import { customDocumentActions } from "./src/sanity/custom-document-action";
import { resolve } from "./src/sanity/resolve";
import { structure } from "./src/sanity/structure";
import { singletonTypes } from "./src/sanity/structure/singletons";
import { TrolleyIcon } from "@sanity/icons";

const devPlugins = [visionTool({ title: "API" })];

export default defineConfig({
  name: "astro-shopify-sanity",
  title: "Astro Shopify Sanity",
  icon: TrolleyIcon,
  projectId:
    typeof process !== "undefined" && process?.env
      ? process.env.PUBLIC_SANITY_STUDIO_PROJECT_ID ||
        import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID
      : import.meta.env.PUBLIC_SANITY_STUDIO_PROJECT_ID,
  dataset:
    typeof process !== "undefined" && process?.env
      ? process.env.PUBLIC_SANITY_STUDIO_DATASET || "production"
      : "production",
  plugins: [
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    presentationTool({
      title: "Preview",
      previewUrl: location.origin,
      resolve,
    }),
    colorInput(),
    customDocumentActions(),
    ...(isDev ? devPlugins : []),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  tools: (prev, context) =>
    prev.filter((tool) => {
      if (tool.name === "schedules") {
        return false;
      } else if (!context.currentUser && tool.name === "presentation") {
        return false;
      }
      return true;
    }),
});
