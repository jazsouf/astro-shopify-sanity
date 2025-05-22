import { PackageIcon, TextIcon } from "@sanity/icons";
import pluralize from "pluralize-esm";
import { defineField, defineType } from "sanity";
import { ShopifyIcon } from "../../components/shopify-icon";
import { CollectionHiddenInput } from "../../components/shopify/collection-hidden-input";
import { ShopifyDocumentStatus } from "../../components/shopify/shopify-document-status";

const GROUPS = [
  {
    default: true,
    name: "editorial",
    title: "Editorial",
    icon: TextIcon,
  },
  {
    name: "shopifySync",
    title: "Shopify sync",
    icon: ShopifyIcon,
  },
];

export const collection = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  __experimental_formPreviewTitle: false,
  icon: PackageIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: "hidden",
      type: "string",
      components: {
        field: CollectionHiddenInput,
      },
      hidden: ({ parent }) => {
        const isDeleted = parent?.store?.isDeleted;
        return !isDeleted;
      },
    }),
    defineField({
      name: "titleProxy",
      title: "Title",
      type: "proxyString",
      options: { field: "store.title" },
    }),
    defineField({
      name: "slugProxy",
      title: "Slug",
      type: "proxyString",
      options: { field: "store.slug.current" },
    }),
    defineField({
      name: "pageBuilder",
      title: "Page Builder",
      type: "array",
      readOnly: false,
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
      name: "store",
      title: "Shopify",
      type: "shopifyCollection",
      description: "Collection data from Shopify (read-only)",
      group: "shopifySync",
    }),
  ],
  orderings: [
    {
      name: "titleAsc",
      title: "Title (A-Z)",
      by: [{ field: "store.title", direction: "asc" }],
    },
    {
      name: "titleDesc",
      title: "Title (Z-A)",
      by: [{ field: "store.title", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      imageUrl: "store.imageUrl",
      isDeleted: "store.isDeleted",
      rules: "store.rules",
      title: "store.title",
    },
    prepare(selection) {
      const { imageUrl, isDeleted, rules, title } = selection;
      const ruleCount = rules?.length || 0;

      return {
        media: (
          <ShopifyDocumentStatus
            isDeleted={isDeleted}
            title={title}
            type="collection"
            url={imageUrl}
          />
        ),
        subtitle:
          ruleCount > 0
            ? `Automated (${pluralize("rule", ruleCount, true)})`
            : "Manual",
        title,
      };
    },
  },
});
