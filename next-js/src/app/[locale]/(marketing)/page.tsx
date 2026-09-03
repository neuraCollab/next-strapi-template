import { Metadata } from "next"

import PageContent from "@/lib/shared/PageContent"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { generateMetadataObject } from "@/lib/shared/metadata"
import ClientSlugHandler from "./ClientSlugHandler"

// Rendered whenever the "homepage" entry in Strapi has no dynamic zone
// configured yet (e.g. a freshly cloned instance with no seed data), so the
// homepage still looks complete out of the box.
const DEFAULT_DYNAMIC_ZONE = [
  {
    __component: "dynamic-zone.header",
    id: 1,
    header_left_block: {
      title: "Next.js + Strapi Starter",
      subtitle: "A production-ready template combining Next.js 14, a Strapi headless CMS, and Auth.js authentication.",
    },
    header_right_block: {
      title: "Build content-driven pages from Strapi without writing code for each one.",
    },
    button: [
      { id: 1, text: "Get Started", URL: "/blog", variant: "primary" },
      { id: 2, text: "View on GitHub", URL: "https://github.com/neuraCollab/next-strapi-template", target: "_blank", variant: "simple" },
    ],
  },
  {
    __component: "dynamic-zone.features",
    id: 2,
    heading: "Everything you need to ship",
    sub_heading: "A batteries-included stack for building and shipping content-driven products fast.",
    globe_card: {
      span: "two",
      title: "Built-in internationalization",
      description: "Locale-aware routing and content out of the box, powered by Strapi's i18n plugin.",
    },
    ray_card: {
      span: "one",
      title: "App Router + Server Components",
      description: "Next.js 14 with fast, SEO-friendly server rendering.",
    },
    graph_card: {
      span: "two",
      title: "Postgres + Drizzle ORM",
      description: "A type-safe schema for users, sessions, and everything Auth.js needs.",
    },
    social_media_card: {
      span: "one",
      title: "Multiple sign-in providers",
      description: "GitHub, Yandex, and email/password out of the box via Auth.js.",
    },
  },
  {
    __component: "dynamic-zone.cta",
    id: 3,
    heading: "Ready to build your own?",
    sub_heading: "Clone the repository and have a full-stack, CMS-powered app running locally in minutes.",
    CTAs: [{ URL: "/blog", text: "Read the blog", variant: "primary" }],
  },
]

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true,
  )

  const seo = pageData?.seo
  const metadata = generateMetadataObject(seo)
  return metadata
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const pageData = await fetchContentType(
    "pages",
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
    },
    true,
  )

  const localizedSlugs = pageData?.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = ""
      return acc
    },
    { [params.locale]: "" },
  )

  const dynamicZone = pageData?.dynamic_zone?.length ? pageData.dynamic_zone : DEFAULT_DYNAMIC_ZONE

  return (
    <>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      <PageContent pageData={{ ...pageData, locale: pageData?.locale || params.locale, dynamic_zone: dynamicZone }} />
    </>
  )
}
