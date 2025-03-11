import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "object",
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        defineArrayMember({ type: "linkInternal" }),
        defineArrayMember({ type: "linkExternal" }),
      ],
    }),
  ],
});
