import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/utils/cn";
import { Locale, i18n } from "@/i18n.config";

import "@/app/style.css";

import { ThemeProvider } from "@/components/ThemeProvider";
import SocialIcons from "@/components/ui/SocialIcons";
import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/NavBar";
import AuthProvider from "@/app/context/AuthProvider";
import { SlugProvider } from "./context/SlugContext";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Next Auth Postgres Starter",
  description: "An example of how to use NextJS with Auth.js and a PostgreSQL database",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SlugProvider>
            <AuthProvider>

              {children}

            </AuthProvider>
          </SlugProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
