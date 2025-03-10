import { Metadata } from "next"
import PageContent from "@/lib/shared/PageContent"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { generateMetadataObject } from "@/lib/shared/metadata"
import ClientSlugHandler from "../ClientSlugHandler"

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
    console.log(`🔍 Fetching metadata for slug=${params.slug}, locale=${params.locale}`)

    const pageData = await fetchContentType(
      "pages",
      {
        filters: {
          slug: params.slug,
          locale: params.locale,
        },
        populate: "seo.metaImage",
      },
      true,
    )

    if (!pageData) {
      console.warn(`⚠ No metadata found for slug=${params.slug}, locale=${params.locale}`)
      return {}
    }

    return generateMetadataObject(pageData.seo)
  } catch (error) {
    console.error("❌ Error generating metadata:", error)
    return {}
  }
}

export default async function Page({ params }: { params: { locale: string; slug: string } }) {
  try {
    console.log(`🔍 Fetching page content for slug=${params.slug}, locale=${params.locale}`)

    const pageData = await fetchContentType(
      "pages",
      {
        filters: {
          slug: params.slug,
          locale: params.locale,
        },
      },
      true,
    )

    if (!pageData) {
      console.warn(`⚠ No page data found for slug=${params.slug}, locale=${params.locale}`)
      return <h1>Page not found</h1>
    }

    const localizedSlugs = pageData.localizations?.reduce(
      (acc: Record<string, string>, localization: any) => {
        acc[localization.locale] = localization.slug
        return acc
      },
      { [params.locale]: params.slug },
    )

    return (
      <>
        <ClientSlugHandler localizedSlugs={localizedSlugs} />
        <PageContent pageData={pageData} />
      </>
    )
  } catch (error) {
    console.error("❌ Error loading page:", error)
    return <h1>Something went wrong</h1>
  }
}
