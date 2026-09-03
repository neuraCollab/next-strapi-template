import "@/app/style.css"

import AuthProvider from "@/app/context/AuthProvider"
import { SlugProvider } from "./context/SlugContext"

// The <html> and <body> tags are owned by `[locale]/layout.tsx`, which is the
// only layout every route actually renders through. Keeping them here as well
// used to produce invalid nested <html>/<body> markup (the browser silently
// "fixes" this by hoisting/reordering elements, which is what caused the
// footer/content overlap and other layout glitches across the site).
// (ThemeProvider lives in `[locale]/layout.tsx` instead - next-themes injects
// a script that must be a direct child of <body>.)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SlugProvider>
      <AuthProvider>{children}</AuthProvider>
    </SlugProvider>
  )
}
