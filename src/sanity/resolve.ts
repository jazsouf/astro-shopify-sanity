import type {
  DocumentLocation,
  PresentationPluginOptions,
} from "sanity/presentation";
import { defineDocuments, defineLocations } from "sanity/presentation";
import { resolveHref } from "./utils/resolve-href";

export const resolve: PresentationPluginOptions["resolve"] = {
  // The Main Document Resolver API provides a method of resolving a main document from a given route or route pattern. https://www.sanity.io/docs/presentation-resolver-api#57720a5678d9
  mainDocuments: defineDocuments([
    {
      route: "/",
      filter: `_type == "home"`,
    },
    {
      route: "/:slug",
      filter: `_type == "page" && slug.current == $slug || _id == $slug`,
    },
    {
      route: "/products/:slug",
      filter: `_type == "product" && slug.current == $slug || _id == $slug`,
    },
  ]),
  // Locations Resolver API allows you to define where data is being used in your application. https://www.sanity.io/docs/presentation-resolver-api#8d8bca7bfcd7
  locations: {
    settings: defineLocations({
      locations: [
        {
          title: "Home",
          href: "/",
        },
      ],
      message: "This document is used on all pages",
      tone: "positive",
    }),
    page: defineLocations({
      select: {
        name: "name",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.name || "Untitled",
            href: resolveHref("page", doc?.slug)!,
          },
        ],
      }),
    }),
    product: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: resolveHref("product", doc?.slug)!,
          },
          {
            title: "Home",
            href: "/",
          } satisfies DocumentLocation,
        ].filter(Boolean) as DocumentLocation[],
      }),
    }),
  },
};
