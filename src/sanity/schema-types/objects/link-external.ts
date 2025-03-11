import { ArrowTopRightIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const linkExternal = defineField({
  name: "linkExternal",
  title: "External Link",
  type: "object",
  icon: ArrowTopRightIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "url",
      title: "URL",
      description: "Enter an external URL path",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "newTab",
      title: "Open in new tab?",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
      newTab: "newTab",
    },
    prepare(selection) {
      const { title, url, newTab } = selection;

      return {
        media: ArrowTopRightIcon,
        subtitle: `→ ${url}`,
        title: `${title ?? "Untitled Link"}${newTab ? " (New Tab Link)" : ""}`,
      };
    },
  },
});
