import { defineField, defineType } from "sanity";
import { ShopifyIcon } from "../../components/shopify-icon";
import { ShopifyDocumentStatus } from "../../components/shopify/shopify-document-status";

export const productVariant = defineType({
  name: "productVariant",
  title: "Product variant",
  type: "document",
  groups: [
    {
      name: "shopifySync",
      title: "Shopify sync",
      icon: ShopifyIcon,
    },
  ],
  fields: [
    // Title (proxy)
    defineField({
      title: "Title",
      name: "titleProxy",
      type: "proxyString",
      options: { field: "store.title" },
    }),
    // Shopify product variant
    defineField({
      name: "store",
      title: "Shopify",
      description: "Variant data from Shopify (read-only)",
      type: "shopifyProductVariant",
      group: "shopifySync",
    }),
  ],
  preview: {
    select: {
      isDeleted: "store.isDeleted",
      previewImageUrl: "store.previewImageUrl",
      sku: "store.sku",
      status: "store.status",
      title: "store.title",
    },
    prepare(selection) {
      const { isDeleted, previewImageUrl, sku, status, title } = selection;

      return {
        media: (
          <ShopifyDocumentStatus
            isActive={status === "active"}
            isDeleted={isDeleted}
            type="variant"
            url={previewImageUrl}
            title={title}
          />
        ),
        subtitle: sku,
        title,
      };
    },
  },
});
