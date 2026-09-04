/**
 * Resolves a Strapi media `url` (which Strapi returns as a path relative to
 * itself, e.g. "/uploads/foo.png") to an absolute URL next/image can fetch.
 */
export function strapiImage(url: string): string {
  if (url.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_API_URL ?? ""}${url}`
  }
  return url
}
