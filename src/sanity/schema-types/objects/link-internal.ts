import { LinkIcon } from "@sanity/icons";
import { defineField } from "sanity";
import { PAGE_REFERENCES } from "../../constants";

export const linkInternal = defineField({
  name: "linkInternal",
  title: "Internal Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "reference",
      to: PAGE_REFERENCES,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      referenceTitle: "reference.title",
    },
    prepare(selection) {
      const { title, referenceTitle } = selection;

      return {
        title: title ?? referenceTitle,
        media: LinkIcon,
      };
    },
  },
});
