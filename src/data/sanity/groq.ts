import { defineQuery } from "groq";

const pageSeoFields = /* groq */ `
  _type,
  "title": coalesce(title, ^.name),
  description,
  ogImage
`;

const pageBuilderFields = /* groq */ `
  _key,
  _type,
  "cover": cover[] {
    _type,
    "backgroundImage": select(_type == "backgroundImage" => {
      asset,
      crop,
      hotspot,
      alt,
    }),
    "color": select(_type == "color" => hex)
  },
  "content": content[]{
    ...,
    markDefs[]{
      ...,
      "url": select(
      _type == 'linkInternal' => select(reference->._type == 'product' => '/products/' + reference->store.slug.current,
        reference->._type == 'home' => '/',
        reference->._type == 'page' => '/' + reference->.slug.current,
        reference->._type == 'plp' => '/products',
      ),
      _type == 'linkExternal' => url,
      )},
    },
  "textColor": coalesce(textColor.hex, 'black'),
`;

const linkFields = /* groq */ `
  _type,
  _key,
  linkType,
  "url": select(
    linkType == 'href' => href,
    linkType == 'home' => '/',
    linkType == 'plp' => '/products',
    linkType == 'page' => '/' + page->slug.current,
    linkType == 'product' => '/products/' + product->store.slug.current,
    linkType == 'collection' => '/collections/' + collection->store.slug.current,
  ),
  "label": select(
      label.length > 0 => label,
      linkType == 'home' => 'Home',
      linkType == 'plp' => 'All Products',
      linkType == 'page' => page->name,
      linkType == 'product' => product->store.title,
      linkType == 'collection' => collection->store.title,
      "Link"
    ),
  openInNewTab
`;

export type LinkFieldsType = {
  _type: "link";
  _key: string;
  linkType: "collection" | "home" | "href" | "page" | "plp" | "product";
  url: string | "/" | "/colections/all" | null;
  label: string | "All Products" | "Home" | "Link" | null;
  openInNewTab: boolean;
};

export const SETTINGS_QUERY = defineQuery(`
  *[_type == "settings"][0]{
    _type,
    _id,
    _updatedAt,
    _createdAt,
    "title": coalesce(title, "Untitled Store"),
    metadataBase,
    header{
      _type,
      announcementBar{
        _type,
        content,
        "link": links[0]{${linkFields}}
      },
      "links": links[]{${linkFields}}
    },
    footer{
      _type,
      "links": links[]{${linkFields}}
    },
  }`);

export const HOME_QUERY = defineQuery(`
  *[_type == 'home' ][0]{
    _type,
    _id,
    _updatedAt,
    _createdAt,
    "status": select(_id in path("drafts.**") => "draft", "published"),
    "name": "Home",
    "slug": "/",
    "pageBuilder": pageBuilder[]{
      ${pageBuilderFields}
    },
    pageSeo{${pageSeoFields}}
  }
`);

export const MODULAR_PAGE_QUERY = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _type,
    _id,
    _updatedAt,
    _createdAt,
    "status": select(_id in path("drafts.**") => "draft", "published"),
    "name": coalesce(name, "Untitled Page"),
    "slug": slug.current,
    "pageBuilder": pageBuilder[]{
      ${pageBuilderFields}
    },
    pageSeo{${pageSeoFields}}
  }
`);

export const COLLECTION_QUERY = defineQuery(`
  *[_type == 'collection' && slug.current == $slug][0]{
    _type,
    _id,
    _updatedAt,
    _createdAt,
    "status": select(_id in path("drafts.**") => "draft", "published"),
    "name": coalesce(name, "Untitled Collection"),
    "slug": slug.current,
    "editorial": {
      "_type":'page',
      _id,
      _updatedAt,
      _createdAt,
      "status": select(_id in path("drafts.**") => "draft", "published"),
      "name": coalesce(name, "Untitled Page"),
      "slug": store.slug.current,
      pageBuilder[]{
        ${pageBuilderFields}
      },
    },
    pageSeo{${pageSeoFields}}
  }
`);

export const ALL_COLLECTIONS_QUERY = defineQuery(`
  *[_type == "collection" && defined(store.slug.current)] | order(date desc, _updatedAt desc) {
    ...,
  }
`);

export const ALL_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && defined(store.slug.current)] | order(date desc, _updatedAt desc) {
    ...,
  }
`);

export const MORE_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && _id != $skip && defined(store.slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ...,
  }
`);

export const PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && store.slug.current == $slug] [0] {
    _type,
    _id,
    _updatedAt,
    _createdAt,
    "status": select(_id in path("drafts.**") => "draft", "published"),
    "name": coalesce(name, "Untitled Page"),
    "slug": store.slug.current,
    pageBuilder[]{
      ${pageBuilderFields}
    },
    pageSeo{${pageSeoFields}}
  }
`);

export const PRODUCT_METADATA_QUERY = defineQuery(`
  *[_type == "product" && store.slug.current == $slug] [0] {
    _type,
    _id,
    store
  }
`);

export const ALL_PRODUCT_PAGES_SLUGS = defineQuery(`
  *[_type == "product" && defined(store.slug.current)]
  {"slug": store.slug.current}
`);

export const ALL_PAGES_SLUGS = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
