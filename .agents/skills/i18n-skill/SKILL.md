---
name: i18n-skill
description: Configure internationalization for Next.js App Router projects with next-intl. Use when an agent needs to add or maintain multilingual routing, locale messages, next-intl plugin config, middleware/proxy setup, locale-aware navigation, language switching, or translated UI text.
---

# i18n Skill

## Target Pattern

Use `next-intl` with the App Router, locale segment routing, JSON message files, and middleware/proxy-based locale resolution.

Default conventions:

- Supported locales: `vi`, `en`
- Default locale: `vi`
- Route segment: `src/app/[locale]`
- Message files: `src/messages/vi.json`, `src/messages/en.json`
- i18n helpers: `src/i18n`
- Middleware/proxy file: `src/proxy.ts`
- URL locale prefix mode: `localePrefix: "never"` unless the user wants visible locale prefixes

## Install

Add `next-intl` to dependencies:

```bash
npm install next-intl
```

If the project uses another package manager, use the equivalent command.

## Required Files

Create or update this structure:

```text
src/
|-- app/
|   +-- [locale]/
|       |-- layout.tsx
|       |-- page.tsx
|       |-- loading.tsx
|       |-- error.tsx
|       +-- route-groups-and-pages/
|-- i18n/
|   |-- action.ts
|   |-- navigation.ts
|   |-- request.ts
|   +-- routing.ts
|-- messages/
|   |-- en.json
|   +-- vi.json
+-- proxy.ts
next.config.js
package.json
```

## Configure Next.js

Wrap the Next.js config with the `next-intl` plugin:

```js
/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

Preserve unrelated existing config such as `images.remotePatterns`, redirects, rewrites, or experimental flags.

## Configure Routing

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "never",
});
```

Use `localePrefix: "never"` when the app should keep clean URLs such as `/login` and store/resolve locale through middleware and navigation state. Use another `next-intl` prefix mode only when the user explicitly wants locale-prefixed URLs.

## Configure Request Messages

Create `src/i18n/request.ts`:

```ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

Keep `resolveJsonModule: true` in `tsconfig.json` so JSON messages import cleanly.

## Configure Navigation

Create `src/i18n/navigation.ts`:

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

Prefer these wrappers for locale-aware navigation, especially in language switchers, redirects, and components that must preserve the current route while changing locale.

## Configure Middleware/Proxy

Create `src/proxy.ts`:

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
```

Keep API routes, framework internals, Vercel internals, and file assets out of the matcher.

## Optional Locale Cookie Action

Create `src/i18n/action.ts` only if the app needs a server action to persist locale manually:

```ts
"use server";

import { cookies } from "next/headers";

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set("locale", locale, {
    path: "/",
    sameSite: "lax",
  });
}
```

Use the navigation wrapper for normal client-side language switching. Use this action when a separate server-side locale cookie write is needed.

## Configure Root Locale Layout

Move the root app shell under `src/app/[locale]/layout.tsx` and wrap children with `NextIntlClientProvider`.

```tsx
import type React from "react";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Keep existing providers, navigation, analytics, JSON-LD, theme providers, and toasters inside this layout. Preserve existing metadata and viewport exports.

## Add Messages

Create one JSON file per locale:

```json
{
  "nav": {
    "rooms": "Properties",
    "packages": "Packages",
    "signin": "Sign In"
  },
  "home": {
    "hero": {
      "title": "Find your next place"
    }
  }
}
```

Keep message keys stable across all locale files. Use the same nested shape in every file.

## Use Translations

Use translations in client or server components:

```tsx
import { useTranslations } from "next-intl";

export function Navigation() {
  const t = useTranslations("nav");

  return <span>{t("signin")}</span>;
}
```

For server-only data, use the server APIs from `next-intl/server` when needed.

## Add Language Switcher

Use `useLocale`, `usePathname`, and `useRouter` to switch locale without losing the current route:

```tsx
"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
      router.refresh();
    }
  }

  return (
    <button type="button" onClick={() => switchLocale(locale === "vi" ? "en" : "vi")}>
      {locale.toUpperCase()}
    </button>
  );
}
```

Replace the example button with the project's actual menu/button components.

## Migration Checklist

1. Install `next-intl`.
2. Wrap `next.config.js` with `createNextIntlPlugin`.
3. Create `src/i18n/routing.ts`, `request.ts`, and `navigation.ts`.
4. Create `src/proxy.ts` with the `next-intl` middleware matcher.
5. Move pages/layouts under `src/app/[locale]`.
6. Add `NextIntlClientProvider`, `hasLocale`, `notFound`, `generateStaticParams`, and `setRequestLocale` to `src/app/[locale]/layout.tsx`.
7. Add `src/messages/<locale>.json` files with matching key shapes.
8. Replace hard-coded UI copy with `useTranslations` or server translation helpers.
9. Use `@/i18n/navigation` for locale-aware route changes and language switching.
10. Run typecheck/build and fix missing message keys, invalid locale params, or import paths.
