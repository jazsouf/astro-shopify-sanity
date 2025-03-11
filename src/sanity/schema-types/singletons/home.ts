import { defineField, defineType } from "sanity";

export const home = defineType({
  name: "home",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "pageBuilder",
      title: "Page builder",
      type: "array",
      of: [{ type: "editorialSection" }],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: "grid",
              // previewImageUrl: (schemaTypeName) =>
              //   `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
    defineField({
      name: "pageSeo",
      type: "pageSeo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home" }),
  },
});
