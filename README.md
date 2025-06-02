# Astro starter theme to build a headless ecommerce website with Shopify and Sanity

This theme is an extension of the work done by [Thomas](https://github.com/thomasKn). If you want to check the original code, [click here](https://github.com/thomasKn/astro-shopify).

This reposition adds a Sanity studio content management system, synced with Shopify for better control on your website.
I also added variant selection to product pages for a more featured theme.

The theme is built with Svelte components and you can use any framework you like (Vue, Solid etc.) thanks to Astro.
Tailwind CSS 4 is used for styling with a modern design system.

## ✨ New Features

- **Sanity CMS Integration**: Full content management system with visual editing capabilities
- **Live Preview**: Real-time preview of content changes with Sanity's presentation tool
- **Page Builder**: Flexible content blocks with rich text, images, and color backgrounds
- **Enhanced Product Management**: Synced Shopify products with additional editorial content
- **Visual Editing**: In-context editing experience with Sanity Studio
- **Custom Schema Types**: Products, collections, pages, and global settings
- **Server-Side Rendering**: Built for performance with Astro's SSR capabilities

![astro_shopify_preview](https://cdn.sanity.io/images/81pocpw8/production/af923e749c4655b655209f527eb097df8256fd11-2880x1800.png)

## 🧑‍🚀 Where to start

1. Create a `.env` file based on `.env.example` with your Shopify store credentials and Sanity project details
2. Set up your Shopify store (see Shopify Configuration Guide below)
3. Set up your Sanity project (see Sanity Configuration Guide below)
4. Run `npm install` or `yarn` or `pnpm install`
5. Run `npm run dev` or `yarn run dev` or `pnpm run dev`
6. Visit `/studio` to access the Sanity Studio for content management

## Shopify Configuration Guide

- Create a new account or use an existing one. https://accounts.shopify.com/store-login
- Add the [Shopify Headless channel](https://apps.shopify.com/headless) to your store
- Click on `Add Storefront`
- Copy/Paste your `public` and `private` access tokens to your .env file
- Next, check Storefront API access scopes
  - `unauthenticated_read_product_listings` and `unauthenticated_read_product_inventory` access should be fine to get you started.
  - Add more scopes if you require additional permissions.

## Sanity Configuration Guide

1. Create a new Sanity project at https://www.sanity.io/manage
2. Copy your Project ID and add it to your `.env` file as `PUBLIC_SANITY_STUDIO_PROJECT_ID`
3. Create a read token in your Sanity project's API settings and add it as `SANITY_API_READ_TOKEN`
4. Set `PUBLIC_SANITY_STUDIO_DATASET` to "production" (or your preferred dataset)
5. Enable visual editing by setting `PUBLIC_SANITY_VISUAL_EDITING_ENABLED="true"`
6. Run `npm run dev` and visit `/studio` to start creating content

### Shopify Troubleshooting

- If you encounter an error like `error code 401` you likely didn't set this up correctly. Revisit your scopes and be sure add at least one test product. Also make sure you are using the `Storefront API` and not the `Admin API` as the endpoints and scopes are different.
- If you do not see a checkout sidebar, or if it is empty after adding a product, you need to add an image to your test product.

### Sanity Troubleshooting

- If the studio doesn't load, check your `PUBLIC_SANITY_STUDIO_PROJECT_ID` and ensure your dataset exists
- For visual editing issues, verify `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` is set to "true"
- If products aren't syncing, check your Shopify webhook configuration and Sanity API tokens

## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

```
/
├── public/
├── src/
│   └── components/          # Svelte & React components
│       ├── Header.astro
│       ├── ProductCard.astro
│       ├── PageBuilder.astro
│       └── CartDrawer.svelte
│   └── data/               # Data layer
│       ├── sanity/         # Sanity queries & types
│       └── shopify/        # Shopify API integration
│   └── layouts/
│       └── BaseLayout.astro
│   └── pages/
│       ├── index.astro     # Homepage
│       ├── products/       # Product pages
│       ├── [slug].astro    # Dynamic pages
│       └── studio/         # Sanity Studio (auto-generated)
│   └── sanity/             # Sanity configuration
│       ├── schema-types/   # Content schemas
│       ├── structure/      # Studio structure
│       └── components/     # Custom studio components
│   └── stores/
│       └── cart.ts         # Cart state management
│   └── styles/
│       └── global.css
│   └── utils/
│       └── shopify.ts
├── sanity.config.ts        # Sanity studio configuration
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                  | Action                                                    |
| :----------------------- | :-------------------------------------------------------- |
| `npm install`            | Installs dependencies                                     |
| `npm run dev`            | Starts dev server with Sanity typegen at `localhost:4321` |
| `npm run build`          | Build your production site to `./dist/`                   |
| `npm run preview`        | Preview your build locally, before deploying              |
| `npm run sanity:typegen` | Generate TypeScript types from Sanity schemas             |
| `npm run astro ...`      | Run CLI commands like `astro add`, `astro check`          |
| `npm run astro --help`   | Get help using the Astro CLI                              |
