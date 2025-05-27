import { defineField, defineType } from "sanity";

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

export const plp = defineType({
  name: "plp",
  title: "PLP",
  type: "document",
  fields: [
    // TODO: filtering options to add here
    defineField({
      name: "pageSeo",
      type: "pageSeo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "PLP" }),
  },
});
