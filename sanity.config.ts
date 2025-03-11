import { defineConfig, isDev } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schema-types";

import { colorInput } from "@sanity/color-input";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";

import { customDocumentActions } from "./src/sanity/custom-document-action";
import { resolve } from "./src/sanity/resolve";
import { singletonTypes } from "./src/sanity/structure/singletons";

const devPlugins = [visionTool()];

export default defineConfig({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  plugins: [
    structureTool(),
    presentationTool({
      title: "Preview",
      previewUrl: location.origin,
      resolve,
    }),
    media(),
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
