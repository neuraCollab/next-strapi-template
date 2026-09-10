import { Metadata } from "next"
import PageContent from "@/lib/shared/PageContent"
import fetchContentType from "@/lib/strapi/fetchContentType"
import { generateMetadataObject } from "@/lib/shared/metadata"
import ClientSlugHandler from "../ClientSlugHandler"
import { Container } from "@/components/container"
import { Heading } from "@/components/elements/heading"
import { Subheading } from "@/components/elements/subheading"
import { Button } from "@/components/elements/button"
import { Link } from "next-view-transitions"

const PageMessage = ({ locale, title, message }: { locale: string; title: string; message: string }) => (
  <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
    <Heading as="h1" size="sm">
      {title}
    </Heading>
    <Subheading>{message}</Subheading>
    <Button as={Link} href={`/${locale}`} className="mt-6">
      Back home
    </Button>
  </Container>
)

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  try {
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
      return <PageMessage locale={params.locale} title="Page not found" message="We couldn't find the page you're looking for." />
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
    return <PageMessage locale={params.locale} title="Something went wrong" message="Please try again in a moment." />
  }
}
