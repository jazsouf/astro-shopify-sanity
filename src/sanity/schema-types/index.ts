import type { SchemaTypeDefinition } from "sanity";

import { collection } from "./documents/collection";
import { page } from "./documents/page";
import { product } from "./documents/product";
import { productVariant } from "./documents/product-variant";
import { backgroundImage } from "./objects/background-image";
import { editorialSection } from "./objects/editorial-section";
import { footer } from "./objects/footer";
import { header } from "./objects/header";
import { linkExternal } from "./objects/link-external";
import { linkInternal } from "./objects/link-internal";
import { pageSeo } from "./objects/page-seo";
import { richText } from "./objects/rich-text";
import { inventory } from "./objects/shopify/inventory";
import { option } from "./objects/shopify/option";
import { placeholderString } from "./objects/shopify/placeholder-string";
import { priceRange } from "./objects/shopify/price-range";
import { productWithVariant } from "./objects/shopify/product-with-variant";
import { proxyString } from "./objects/shopify/proxy-string";
import { shopifyCollection } from "./objects/shopify/shopify-collection";
import { shopifyCollectionRule } from "./objects/shopify/shopify-collection-rule";
import { shopifyProduct } from "./objects/shopify/shopify-product";
import { shopifyProductVariant } from "./objects/shopify/shopify-product-variant";
import { home } from "./singletons/home";
import { settings } from "./singletons/settings";
import { plp } from "./singletons/plp";

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types
export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  settings,
  home,
  plp,
  // Documents
  collection,
  page,
  product,
  productVariant,
  // Objects
  /// Editorial
  backgroundImage,
  richText,
  editorialSection,
  /// Global
  pageSeo,
  linkExternal,
  linkInternal,
  header,
  footer,
  /// Shopify
  inventory,
  option,
  placeholderString,
  priceRange,
  productWithVariant,
  proxyString,
  shopifyCollection,
  shopifyCollectionRule,
  shopifyProduct,
  shopifyProductVariant,
];
