import { strapiImage } from "../strapi/strapiImage"

export function generateMetadataObject(seo: any) {
  return {
    title: seo?.metaTitle || "Next.js + Strapi Starter",
    description: seo?.metaDescription || "A production-ready starter combining Next.js, Strapi, and Auth.js.",
    openGraph: {
      title: seo?.ogTitle || seo?.metaTitle || "Next.js + Strapi Starter",
      description: seo?.ogDescription || seo?.metaDescription || "A production-ready starter combining Next.js, Strapi, and Auth.js.",
      images: seo?.metaImage ? [{ url: strapiImage(seo?.metaImage.url) }] : [],
    },
    twitter: {
      card: seo?.twitterCard || "summary_large_image",
      title: seo?.twitterTitle || seo?.metaTitle || "Next.js + Strapi Starter",
      description: seo?.twitterDescription || seo?.metaDescription || "A production-ready starter combining Next.js, Strapi, and Auth.js.",
      images: seo?.twitterImage ? [{ url: seo.twitterImage }] : [],
    },
  }
}
