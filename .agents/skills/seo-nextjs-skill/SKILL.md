---
name: seo-nextjs-skill
description: Configure shared SEO for Next.js App Router frontend projects. Use when an agent needs to add or review metadata, canonical and alternate language URLs, Open Graph fields, JSON-LD structured data, sitemap, robots, manifest, favicon, analytics, or SEO-related layout/page conventions.
---

# SEO Next.js Skill

## Related Skills

- Apply `nextjs-skill` first for route structure and i18n decisions.
- Apply `i18n-skill` before SEO alternates when the project supports multiple locales.
- Apply `next-best-practices` for Next.js metadata file conventions.

## Files To Check

SEO in the reference project appears in:

```text
src/app/[locale]/layout.tsx
src/app/[locale]/sitemap.ts
src/components/layout/JsonLd.tsx
src/lib/json-ld/index.ts
src/lib/json-ld/schemas/organization.ts
src/lib/json-ld/schemas/website.ts
src/lib/json-ld/schemas/faq-page.ts
src/lib/json-ld/schemas/product.ts
src/app/**/page.tsx                  # page-level metadata
src/app/favicon.ico
package.json                         # schema-dts, @next/third-parties
```

Also check and add when missing:

```text
src/app/robots.ts
src/app/manifest.ts
public/og-image.* or public/placeholder.svg
public/logo.* or brand asset used by JSON-LD
```

The reference project did not include `robots.ts` or `manifest.ts`; add them when the target project needs a complete SEO baseline.

## Shared Metadata

In the root layout, export `metadata` with:

- `title`
- `description`
- `keywords`
- `openGraph.title`
- `openGraph.description`
- `openGraph.siteName`
- `openGraph.url`
- `openGraph.images.url`
- `openGraph.images.width`
- `openGraph.images.height`
- `openGraph.images.alt`
- `openGraph.locale`
- `openGraph.type`
- `openGraph.countryName` when relevant
- `alternates.languages`
- `alternates.canonical`
- `metadataBase`

Compute `baseUrl` from `NEXT_PUBLIC_SITE_URL`, stripping a trailing slash. Use a production fallback only when the user/project provides one.

Also export `viewport` from the root layout:

```ts
export const viewport = {
  width: "device-width",
  initialScale: 1,
};
```

## Page Metadata

Every public page should export route-level metadata or `generateMetadata`:

- Auth pages: title, description, auth-specific keywords, Open Graph, canonical, language alternates.
- Content pages: title, description, keywords, Open Graph, canonical, language alternates.
- Detail pages: use `generateMetadata` when title/description depend on fetched content.

For i18n projects, include language alternates:

```ts
alternates: {
  languages: {
    vi: "/route",
    en: "/en/route",
  },
  canonical: "/route",
}
```

Adjust paths if `localePrefix` is not the reference project's `"never"` convention.

## JSON-LD

Use `schema-dts` for typed structured data.

Create `src/components/layout/JsonLd.tsx`:

- Accept `WithContext<Thing> | undefined`.
- Return `null` when data is missing.
- Render `<script type="application/ld+json">`.
- Use `JSON.stringify(data).replace(/</g, "\\u003c")` before injecting.

Create JSON-LD schema creators under `src/lib/json-ld/schemas` and re-export them from `src/lib/json-ld/index.ts`.

Common schemas:

- Organization: `@context`, `@type: Organization`, `name`, `url`, `logo`.
- WebSite: `@context`, `@type: WebSite`, `name`, `url`.
- FAQPage: `@context`, `@type: FAQPage`, `name`, `description`, `@id`, `url`.
- Product: `@context`, `@type: Product`, `name`, `description`, `image`, `@id`, `url`, `offers`.
- BreadcrumbList: `itemListElement` with Home, listing page, and detail page.

Render site-wide Organization and WebSite JSON-LD in the root layout. Render page-specific schemas, such as FAQPage or Product/BreadcrumbList, inside the relevant page.

## Sitemap

Create `sitemap.ts` using `MetadataRoute.Sitemap`.

Include:

- static public pages
- grouped feature pages
- dynamic content pages from local data or API/service calls
- `url`
- `lastModified`
- `changeFrequency`
- `priority`
- language alternates when i18n is enabled

Use a helper like `createLanguageAlternates(path)` for i18n projects. Do not leave fake sample IDs in production; replace them with real service/data results or omit unknown dynamic URLs.

## Robots

Add `robots.ts` when the target project needs crawler rules:

- allow public pages
- disallow private account/authenticated areas if appropriate
- include sitemap URL
- use `MetadataRoute.Robots`

## Manifest And Icons

Add `manifest.ts` when the app needs installability or richer mobile metadata:

- `name`
- `short_name`
- `description`
- `start_url`
- `display`
- `background_color`
- `theme_color`
- `icons`

Ensure `favicon.ico`, logo, and Open Graph image assets exist in `public` or `src/app` according to Next.js file conventions.

## Analytics

Use `@next/third-parties/google` for Google Analytics when the user provides a GA ID:

- Import `GoogleAnalytics`.
- Render it once from the root layout.
- Do not hardcode a reference project's GA ID; read from environment or user-provided config.

## SEO Review Checklist

- `NEXT_PUBLIC_SITE_URL` is configured.
- Root metadata has title, description, Open Graph, alternates, and metadataBase.
- Each public page has metadata or `generateMetadata`.
- Canonical and alternate URLs match the i18n routing mode.
- JSON-LD is escaped before injection.
- Site-wide Organization and WebSite schemas render once.
- Page-specific FAQ/Product/Breadcrumb schemas render only on relevant pages.
- Sitemap includes static and dynamic public URLs.
- No fake dynamic IDs remain in sitemap.
- Robots and manifest are present when required.
- Authenticated/private pages are not over-indexed.
- Analytics ID is environment-driven.
