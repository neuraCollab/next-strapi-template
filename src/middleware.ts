import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { i18n } from "@/i18n.config"
import { match as matchLocale } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore - `locales` are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(req: NextRequest) {
  const { nextUrl } = req
  const pathname = nextUrl.pathname

  // Исключаем статические файлы (mp4, svg, woff и др.)
  if (/\.(png|jpg|jpeg|gif|svg|webp|mp4|woff|woff2|ttf|otf|ico|eot|css|js)$/.test(pathname)) {
    return NextResponse.next()
  }

  // Проверяем, есть ли в URL локаль
  const pathnameIsMissingLocale = i18n.locales.every((locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`)

  if (pathnameIsMissingLocale) {
    const locale = getLocale(req)
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`, nextUrl))
  }

  return NextResponse.next()
}

// Настройки middleware (исключаем статические файлы и API)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
